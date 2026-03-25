/**
 * 贺卡 AI：支持 OpenAI、DeepSeek（OpenAI 兼容）、Anthropic Claude。
 * 优先级：环境变量 AI_PROVIDER 显式指定；否则按 ANTHROPIC → DEEPSEEK → OPENAI 谁有 Key 用谁。
 */

export type BlessingTone = "elder" | "peer" | "foreign";

const TONE_LABEL: Record<BlessingTone, string> = {
  elder: "长辈（敬重、温暖）",
  peer: "朋友同辈（轻松真诚）",
  foreign: "外国友人（简短介绍节日氛围，可夹一句英文问候）",
};

const SYSTEM =
  "你只输出 3 行中文祝福语，每行一条，无编号，文雅得体，遵守用户语气要求。";

function userPrompt(tone: BlessingTone, categoryTitle: string) {
  return `节日/主题：${categoryTitle}。对象语气：${TONE_LABEL[tone]}。
请输出恰好 3 条中文贺卡祝福语，每行一条，不要编号、不要引号、不要空行，每条不超过 72 个汉字。`;
}

function parseLines(text: string, categoryTitle: string): string[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/^\d+[.)、]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 3);
  const pad = `${categoryTitle}快乐，平安喜乐。`;
  while (lines.length < 3) {
    lines.push(lines[lines.length - 1] ?? pad);
  }
  return lines;
}

async function openAiCompatibleChat(params: {
  baseUrl: string;
  apiKey: string;
  model: string;
  tone: BlessingTone;
  categoryTitle: string;
}): Promise<string[] | null> {
  const url = `${params.baseUrl.replace(/\/$/, "")}/chat/completions`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: params.model,
      temperature: 0.8,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userPrompt(params.tone, params.categoryTitle) },
      ],
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) return null;
  return parseLines(text, params.categoryTitle);
}

async function anthropicMessages(params: {
  apiKey: string;
  model: string;
  tone: BlessingTone;
  categoryTitle: string;
}): Promise<string[] | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": params.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: params.model,
      max_tokens: 1024,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: userPrompt(params.tone, params.categoryTitle),
        },
      ],
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const block = data.content?.find((c) => c.type === "text");
  const text = block?.text?.trim();
  if (!text) return null;
  return parseLines(text, params.categoryTitle);
}

export type AiProviderId = "openai" | "deepseek" | "anthropic";

function resolveProvider(): AiProviderId | null {
  const explicit = process.env.AI_PROVIDER?.trim().toLowerCase();
  if (explicit === "openai" || explicit === "deepseek" || explicit === "anthropic") {
    return explicit;
  }
  if (explicit === "claude") return "anthropic";

  if (process.env.ANTHROPIC_API_KEY?.trim()) return "anthropic";
  if (process.env.DEEPSEEK_API_KEY?.trim()) return "deepseek";
  if (process.env.OPENAI_API_KEY?.trim()) return "openai";
  return null;
}

/**
 * 调用已配置的模型；未配置任何 Key 或调用失败时返回 null。
 */
export async function fetchBlessingLines(
  tone: BlessingTone,
  categoryTitle: string
): Promise<{ lines: string[]; provider: AiProviderId } | null> {
  const provider = resolveProvider();
  if (!provider) return null;

  if (provider === "anthropic") {
    const key = process.env.ANTHROPIC_API_KEY?.trim();
    if (!key) return null;
    const model =
      process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-haiku-20241022";
    const lines = await anthropicMessages({
      apiKey: key,
      model,
      tone,
      categoryTitle,
    });
    if (!lines) return null;
    return { lines, provider };
  }

  if (provider === "deepseek") {
    const key = process.env.DEEPSEEK_API_KEY?.trim();
    if (!key) return null;
    const base =
      process.env.DEEPSEEK_BASE_URL?.trim() || "https://api.deepseek.com/v1";
    const model = process.env.DEEPSEEK_MODEL?.trim() || "deepseek-chat";
    const lines = await openAiCompatibleChat({
      baseUrl: base,
      apiKey: key,
      model,
      tone,
      categoryTitle,
    });
    if (!lines) return null;
    return { lines, provider };
  }

  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;
  const base =
    process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const lines = await openAiCompatibleChat({
    baseUrl: base,
    apiKey: key,
    model,
    tone,
    categoryTitle,
  });
  if (!lines) return null;
  return { lines, provider };
}
