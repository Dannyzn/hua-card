import { NextResponse } from "next/server";
import { peekAiUsage } from "@/lib/ai-usage";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const deviceId = req.headers.get("x-device-id")?.trim() ?? "";
  const u = await peekAiUsage(deviceId);
  return NextResponse.json(u);
}
