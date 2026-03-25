"use client";

export type DrawCardInput = {
  templateTitle: string;
  categoryLabel: string;
  salutation: string;
  signature: string;
  message: string;
  poem: string;
  poemSource: string;
  gradient: [string, string, string];
};

const W = 900;
const H = 1200;
const PAD = 56;
const FONT_SERIF = '"Noto Serif SC","Songti SC","SimSun",serif';

function wrapByChars(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawGradient(
  ctx: CanvasRenderingContext2D,
  g: [string, string, string]
) {
  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, g[0]);
  grd.addColorStop(0.45, g[1]);
  grd.addColorStop(1, g[2]);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
}

export async function drawCardToPng(data: DrawCardInput): Promise<Blob> {
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");

  drawGradient(ctx, data.gradient);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.arc(W - 80, 80, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, H - 100, 100, 0, Math.PI * 2);
  ctx.fill();

  const maxW = W - PAD * 2;
  let y = PAD;

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = `500 22px ${FONT_SERIF}`;
  ctx.fillText(data.categoryLabel.toUpperCase(), PAD, y + 22);
  y += 52;

  ctx.fillStyle = "#fff";
  ctx.font = `600 42px ${FONT_SERIF}`;
  ctx.fillText(data.templateTitle, PAD, y + 36);
  y += 72;

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillRect(PAD, y, 48, 3);
  y += 40;

  ctx.font = `600 30px ${FONT_SERIF}`;
  ctx.fillStyle = "#fff";
  const salLines = wrapByChars(ctx, data.salutation || " ", maxW);
  for (const ln of salLines) {
    ctx.fillText(ln, PAD, y + 28);
    y += 40;
  }
  y += 16;

  ctx.font = `400 28px ${FONT_SERIF}`;
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  const msgLines = wrapByChars(ctx, data.message, maxW);
  for (const ln of msgLines) {
    ctx.fillText(ln, PAD, y + 26);
    y += 38;
  }
  y += 24;

  if (data.poem) {
    ctx.font = `italic 24px ${FONT_SERIF}`;
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    const poemLines = wrapByChars(ctx, `「${data.poem}」`, maxW);
    for (const ln of poemLines) {
      ctx.fillText(ln, PAD, y + 24);
      y += 34;
    }
    if (data.poemSource) {
      ctx.font = `400 20px ${FONT_SERIF}`;
      ctx.fillStyle = "rgba(255,255,255,0.62)";
      ctx.fillText(`— ${data.poemSource}`, PAD + 8, y + 26);
      y += 36;
    }
    y += 16;
  }

  if (data.signature) {
    ctx.font = `400 26px ${FONT_SERIF}`;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    const sig = data.signature;
    const sw = ctx.measureText(sig).width;
    ctx.fillText(sig, W - PAD - sw, H - PAD);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("toBlob"));
      },
      "image/png",
      0.92
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
