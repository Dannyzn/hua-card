"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Template } from "@/lib/templates";
import { getCategoryForTemplate } from "@/lib/templates";
import { CardFace } from "@/components/CardFace";
import { drawCardToPng, downloadBlob } from "@/components/draw-card";
import { useDeviceId } from "@/lib/use-device-id";
import { AI_DAILY_LIMIT } from "@/lib/constants";

const MAX = { salutation: 24, signature: 24, message: 220, poem: 100, poemSource: 40 };

type Tone = "elder" | "peer" | "foreign";

export function EditClient({ template }: { template: Template }) {
  const category = getCategoryForTemplate(template);
  const deviceId = useDeviceId();

  const [salutation, setSalutation] = useState(template.defaultSalutation);
  const [signature, setSignature] = useState("游子 敬上");
  const [message, setMessage] = useState(template.defaultMessage);
  const [poem, setPoem] = useState(template.poem);
  const [poemSource, setPoemSource] = useState(template.poemSource);

  const [tone, setTone] = useState<Tone>("peer");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiUsed, setAiUsed] = useState(0);
  const aiLimit = AI_DAILY_LIMIT;
  const [aiSuggestions, setAiSuggestions] = useState<string[] | null>(null);

  const [shareBusy, setShareBusy] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copyDone, setCopyDone] = useState(false);

  const syncUsage = useCallback(async () => {
    if (!deviceId) return;
    const res = await fetch("/api/ai/usage", {
      headers: { "x-device-id": deviceId },
    });
    if (res.ok) {
      const j = (await res.json()) as { used: number };
      setAiUsed(j.used);
    }
  }, [deviceId]);

  useEffect(() => {
    void syncUsage();
  }, [syncUsage]);

  const runAi = async () => {
    if (!deviceId) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai/blessing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-device-id": deviceId,
        },
        body: JSON.stringify({
          tone,
          categoryTitle: category.title,
        }),
      });
      const j = (await res.json()) as {
        suggestions?: string[];
        used?: number;
        message?: string;
      };
      if (!res.ok) {
        setAiSuggestions(null);
        setAiError(j.message ?? "生成失败，请稍后重试或手填祝福语。");
        if (typeof j.used === "number") setAiUsed(j.used);
        return;
      }
      if (j.suggestions?.length) {
        setAiSuggestions(j.suggestions);
        setMessage(j.suggestions[0]!.slice(0, MAX.message));
      }
      if (typeof j.used === "number") setAiUsed(j.used);
      setAiError(null);
    } catch {
      setAiError("网络异常，已为你保留当前文案；可稍后再试 AI。");
    } finally {
      setAiLoading(false);
    }
  };

  const pickSuggestion = (line: string) => {
    setMessage(line.slice(0, MAX.message));
  };

  const onDownload = async () => {
    try {
      const blob = await drawCardToPng({
        templateTitle: template.title,
        categoryLabel: category.title,
        salutation,
        signature,
        message,
        poem,
        poemSource,
        gradient: template.gradient,
      });
      downloadBlob(blob, `hua-card-${template.id}.png`);
    } catch {
      alert("导出图片失败，请换浏览器重试或检查是否屏蔽了下载。");
    }
  };

  const onCreateShare = async () => {
    setShareBusy(true);
    setCopyDone(false);
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          salutation,
          signature,
          message,
          poem,
          poemSource,
        }),
      });
      const j = (await res.json()) as { shareUrl?: string; error?: string };
      if (!res.ok) {
        alert(j.error === "message_required" ? "请先填写祝福语。" : "保存分享链接失败。");
        return;
      }
      if (j.shareUrl) setShareUrl(j.shareUrl);
    } catch {
      alert("网络错误，请稍后重试。");
    } finally {
      setShareBusy(false);
    }
  };

  const onCopyShare = async () => {
    if (!shareUrl) return;
    const text = `送你一张${category.title}贺卡：${shareUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2500);
    } catch {
      prompt("复制以下文案发送给亲友：", text);
    }
  };

  const remaining = Math.max(0, aiLimit - aiUsed);
  const canAi = Boolean(deviceId) && remaining > 0 && !aiLoading;

  return (
    <div className="mx-auto max-w-lg px-4 pb-16 pt-6">
      <p className="text-sm text-amber-900/70">
        <Link href={`/category/${category.slug}`} className="underline-offset-2 hover:underline">
          ← {category.title}
        </Link>
        <span className="mx-2 text-amber-900/40">/</span>
        <span>{template.title}</span>
      </p>

      <h1 className="mt-4 font-serif text-2xl font-semibold text-amber-950">编辑贺卡</h1>
      <p className="mt-1 text-sm text-amber-900/65">修改称呼、署名与正文；可选用 AI 生成祝福语（每日 {aiLimit} 次）。</p>

      <div className="mt-8 space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-amber-950">称呼</span>
          <input
            className="mt-1 w-full rounded-xl border border-amber-900/15 bg-white px-3 py-2.5 font-serif text-amber-950 shadow-sm outline-none ring-amber-700/30 focus:ring-2"
            maxLength={MAX.salutation}
            value={salutation}
            onChange={(e) => setSalutation(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-amber-950">署名</span>
          <input
            className="mt-1 w-full rounded-xl border border-amber-900/15 bg-white px-3 py-2.5 font-serif text-amber-950 shadow-sm outline-none ring-amber-700/30 focus:ring-2"
            maxLength={MAX.signature}
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-amber-950">祝福语</span>
          <textarea
            className="mt-1 min-h-[120px] w-full resize-y rounded-xl border border-amber-900/15 bg-white px-3 py-2.5 font-serif text-amber-950 shadow-sm outline-none ring-amber-700/30 focus:ring-2"
            maxLength={MAX.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span className="mt-1 block text-right text-xs text-amber-800/50">
            {message.length}/{MAX.message}
          </span>
        </label>

        <div className="rounded-2xl border border-amber-900/10 bg-amber-100/40 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium text-amber-950">AI 祝福语</span>
            <span className="text-xs text-amber-800/70">
              今日剩余 {remaining}/{aiLimit} 次
            </span>
          </div>
          <p className="mt-1 text-xs text-amber-800/60">
            支持 OpenAI / DeepSeek / Claude（Anthropic）；未配置 API 或调用失败时使用内置文案，仍计入体验次数。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                ["elder", "长辈"],
                ["peer", "朋友"],
                ["foreign", "外国友人"],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                onClick={() => setTone(v)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  tone === v
                    ? "bg-amber-900 text-amber-50"
                    : "bg-white/80 text-amber-900 ring-1 ring-amber-900/15 hover:bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!canAi}
            onClick={() => void runAi()}
            className="mt-3 w-full rounded-xl bg-amber-900 py-2.5 text-sm font-medium text-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {aiLoading ? "生成中…" : canAi ? "生成并填入第 1 条" : "今日次数已用完"}
          </button>
          {aiError ? <p className="mt-2 text-sm text-red-700">{aiError}</p> : null}
        </div>

        <label className="block">
          <span className="text-sm font-medium text-amber-950">诗句（可改）</span>
          <input
            className="mt-1 w-full rounded-xl border border-amber-900/15 bg-white px-3 py-2.5 font-serif text-amber-950 shadow-sm outline-none ring-amber-700/30 focus:ring-2"
            maxLength={MAX.poem}
            value={poem}
            onChange={(e) => setPoem(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-amber-950">诗句出处</span>
          <input
            className="mt-1 w-full rounded-xl border border-amber-900/15 bg-white px-3 py-2.5 font-serif text-amber-950 shadow-sm outline-none ring-amber-700/30 focus:ring-2"
            maxLength={MAX.poemSource}
            value={poemSource}
            onChange={(e) => setPoemSource(e.target.value)}
          />
        </label>
      </div>

      <h2 className="mt-10 font-serif text-lg font-semibold text-amber-950">预览</h2>
      <div className="mt-3">
        <CardFace
          templateTitle={template.title}
          categoryLabel={category.title}
          salutation={salutation}
          signature={signature}
          message={message}
          poem={poem}
          poemSource={poemSource}
          gradient={template.gradient}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => void onDownload()}
          className="flex-1 rounded-xl bg-amber-950 py-3 text-center text-sm font-medium text-amber-50"
        >
          下载 PNG 图片
        </button>
        <button
          type="button"
          disabled={shareBusy}
          onClick={() => void onCreateShare()}
          className="flex-1 rounded-xl border border-amber-900/25 bg-white py-3 text-center text-sm font-medium text-amber-950 disabled:opacity-60"
        >
          {shareBusy ? "生成链接…" : "生成分享页链接"}
        </button>
      </div>

      {shareUrl ? (
        <div className="mt-4 rounded-xl border border-amber-900/15 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-amber-800">分享链接</p>
          <p className="mt-1 break-all font-mono text-sm text-amber-950">{shareUrl}</p>
          <button
            type="button"
            onClick={() => void onCopyShare()}
            className="mt-3 w-full rounded-lg bg-amber-100 py-2 text-sm font-medium text-amber-950"
          >
            {copyDone ? "已复制" : "复制文案 + 链接"}
          </button>
        </div>
      ) : null}

      {aiSuggestions?.length ? (
        <div className="mt-6 rounded-xl border border-dashed border-amber-900/20 bg-amber-50/50 p-4">
          <p className="text-sm font-medium text-amber-950">本次生成的备选句</p>
          <ul className="mt-2 space-y-2">
            {aiSuggestions.map((line, i) => (
              <li key={i}>
                <button
                  type="button"
                  disabled={aiLoading}
                  onClick={() => pickSuggestion(line)}
                  className="w-full rounded-lg bg-white px-3 py-2 text-left text-sm text-amber-950 ring-1 ring-amber-900/10 hover:bg-amber-50 disabled:opacity-50"
                >
                  {line}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
