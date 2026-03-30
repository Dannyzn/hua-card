import fs from "fs/promises";
import path from "path";
import { getAppKv, KV_KEY_AI_USAGE } from "@/lib/app-kv";
import { AI_DAILY_LIMIT } from "@/lib/constants";

const DATA_DIR = path.join(process.cwd(), "data");
const USAGE_FILE = path.join(DATA_DIR, "ai-usage.json");

type DayUsage = Record<string, number>;

type UsageFile = {
  /** YYYY-MM-DD -> deviceId -> count */
  days: Record<string, DayUsage>;
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readFromFs(): Promise<UsageFile> {
  try {
    const raw = await fs.readFile(USAGE_FILE, "utf-8");
    return JSON.parse(raw) as UsageFile;
  } catch {
    return { days: {} };
  }
}

async function readFile(): Promise<UsageFile> {
  const kv = await getAppKv();
  if (kv) {
    const raw = await kv.get(KV_KEY_AI_USAGE, "text");
    if (!raw) return { days: {} };
    try {
      return JSON.parse(raw) as UsageFile;
    } catch {
      return { days: {} };
    }
  }
  return readFromFs();
}

async function writeFile(data: UsageFile) {
  const kv = await getAppKv();
  if (kv) {
    await kv.put(KV_KEY_AI_USAGE, JSON.stringify(data));
    return;
  }
  await ensureDataDir();
  await fs.writeFile(USAGE_FILE, JSON.stringify(data), "utf-8");
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/** AI 调用成功后再记一次，避免失败也扣次数 */
export async function incrementAiUsage(deviceId: string): Promise<void> {
  if (!deviceId || deviceId.length > 128) return;
  const data = await readFile();
  const day = todayKey();
  if (!data.days[day]) data.days[day] = {};
  const used = data.days[day][deviceId] ?? 0;
  data.days[day][deviceId] = used + 1;
  await writeFile(data);
}

/** 不消耗次数，仅查询今日已用 */
export async function peekAiUsage(deviceId: string): Promise<{ used: number; limit: number }> {
  if (!deviceId || deviceId.length > 128) {
    return { used: 0, limit: AI_DAILY_LIMIT };
  }
  const data = await readFile();
  const day = todayKey();
  const used = data.days[day]?.[deviceId] ?? 0;
  return { used, limit: AI_DAILY_LIMIT };
}
