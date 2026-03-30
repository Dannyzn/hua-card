import type { KVNamespace } from "@cloudflare/workers-types";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/** KV 中存储贺卡全集的 key（JSON: Record<cardId, SavedCard>） */
export const KV_KEY_CARDS = "cards";

/** KV 中存储 AI 用量文件的 key（JSON: UsageFile） */
export const KV_KEY_AI_USAGE = "ai_usage";

/**
 * 在 Cloudflare Worker / opennext dev 代理下返回 STORAGE 绑定；否则 null（走本地 fs）。
 */
export async function getAppKv(): Promise<KVNamespace | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = env.STORAGE;
    if (kv && typeof kv.get === "function") return kv;
  } catch {
    // next build、纯 Node、无请求上下文等
  }
  return null;
}
