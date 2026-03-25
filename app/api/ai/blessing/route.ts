import { NextResponse } from "next/server";
import { incrementAiUsage, peekAiUsage } from "@/lib/ai-usage";
import {
  fetchBlessingLines,
  type BlessingTone,
} from "@/lib/ai-providers";

export const runtime = "nodejs";

type Tone = BlessingTone;

function mockSuggestions(tone: Tone, categoryTitle: string): string[] {
  const base = categoryTitle;
  if (tone === "elder") {
    return [
      `${base}将至，敬祝您身体安康，心境平和，岁岁有今日之暖。`,
      `纸短情长，愿您三餐有味、夜梦皆安，我们在远方与您同心。`,
      `借${base}之际，恭祝阖家吉祥，万事顺遂，春风常伴您左右。`,
    ];
  }
  if (tone === "peer") {
    return [
      `${base}快乐！愿你这一年想要的都慢慢实现，不想扛的都能放下～`,
      `过节啦！远程干杯🥂 有空视频，没空也要好好吃饭。`,
      `${base}到，祝福到：少熬夜、多开心，钱包和心情一起鼓起来！`,
    ];
  }
  return [
    `Happy ${base}! Wishing you warmth and good food — a little piece of Chinese tradition from afar.`,
    `${base} is a time for family and renewal. Hope your day is bright, wherever you are.`,
    `Thinking of you this ${base}. 节日快乐 — may kindness follow you through the seasons.`,
  ];
}

export async function POST(req: Request) {
  const deviceId = req.headers.get("x-device-id")?.trim() ?? "";
  if (deviceId.length < 8) {
    return NextResponse.json(
      {
        error: "device",
        message: "需要设备标识才能使用 AI。请刷新页面并允许本地存储。",
      },
      { status: 400 }
    );
  }
  const { used, limit } = await peekAiUsage(deviceId);
  if (used >= limit) {
    return NextResponse.json(
      {
        error: "limit",
        message: `今日 AI 体验次数已用完（${limit} 次），请明日再试或手填祝福语。`,
        used,
        limit,
      },
      { status: 429 }
    );
  }

  let body: { tone?: string; categoryTitle?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const tone = body.tone as Tone;
  const categoryTitle = body.categoryTitle?.trim() ?? "";
  if (!categoryTitle || categoryTitle.length > 32) {
    return NextResponse.json({ error: "bad_category" }, { status: 400 });
  }
  if (tone !== "elder" && tone !== "peer" && tone !== "foreign") {
    return NextResponse.json({ error: "bad_tone" }, { status: 400 });
  }

  let fromModel = true;
  const modelResult = await fetchBlessingLines(tone, categoryTitle);
  let suggestions = modelResult?.lines;
  let provider = modelResult?.provider;
  if (!suggestions) {
    fromModel = false;
    suggestions = mockSuggestions(tone, categoryTitle);
    provider = undefined;
  }

  await incrementAiUsage(deviceId);
  const after = await peekAiUsage(deviceId);

  return NextResponse.json({
    suggestions,
    used: after.used,
    limit: after.limit,
    usedMock: !fromModel,
    provider: provider ?? null,
  });
}
