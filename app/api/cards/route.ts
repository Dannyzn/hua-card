import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveCard, type SavedCard } from "@/lib/card-store";
import { getCategoryForTemplate, getTemplateById } from "@/lib/templates";

export const runtime = "nodejs";

const MAX = { salutation: 24, signature: 24, message: 220, poem: 100, poemSource: 40 };

function clip(s: string, n: number) {
  return s.trim().slice(0, n);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const templateId = String(body.templateId ?? "");
  const template = getTemplateById(templateId);
  if (!template) {
    return NextResponse.json({ error: "unknown_template" }, { status: 400 });
  }
  const category = getCategoryForTemplate(template);

  const salutation = clip(String(body.salutation ?? ""), MAX.salutation);
  const signature = clip(String(body.signature ?? ""), MAX.signature);
  const message = clip(String(body.message ?? ""), MAX.message);
  const poem = clip(String(body.poem ?? ""), MAX.poem);
  const poemSource = clip(String(body.poemSource ?? ""), MAX.poemSource);

  if (!message) {
    return NextResponse.json({ error: "message_required" }, { status: 400 });
  }

  const id = randomUUID();
  const card: SavedCard = {
    id,
    templateId: template.id,
    categoryId: category.id,
    categoryTitle: category.title,
    templateTitle: template.title,
    salutation,
    signature,
    message,
    poem,
    poemSource,
    gradient: [...template.gradient] as [string, string, string],
    createdAt: new Date().toISOString(),
  };

  await saveCard(card);

  const origin = new URL(req.url).origin;
  return NextResponse.json({
    id,
    shareUrl: `${origin}/c/${id}`,
  });
}
