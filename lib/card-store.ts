import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CARDS_FILE = path.join(DATA_DIR, "cards.json");

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidCardId(id: string): boolean {
  return UUID_RE.test(id);
}

export type SavedCard = {
  id: string;
  templateId: string;
  categoryId: string;
  categoryTitle: string;
  templateTitle: string;
  salutation: string;
  signature: string;
  message: string;
  poem: string;
  poemSource: string;
  gradient: [string, string, string];
  createdAt: string;
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readAll(): Promise<Record<string, SavedCard>> {
  try {
    const raw = await fs.readFile(CARDS_FILE, "utf-8");
    return JSON.parse(raw) as Record<string, SavedCard>;
  } catch {
    return {};
  }
}

export async function saveCard(
  card: Omit<SavedCard, "createdAt"> & { createdAt?: string }
): Promise<SavedCard> {
  await ensureDataDir();
  const full: SavedCard = {
    ...card,
    createdAt: card.createdAt ?? new Date().toISOString(),
  };
  const all = await readAll();
  all[full.id] = full;
  await fs.writeFile(CARDS_FILE, JSON.stringify(all), "utf-8");
  return full;
}

export async function getCard(id: string): Promise<SavedCard | null> {
  if (!isValidCardId(id)) return null;
  const all = await readAll();
  return all[id] ?? null;
}
