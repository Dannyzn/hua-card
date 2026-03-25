import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCard } from "@/lib/card-store";
import { CardFace } from "@/components/CardFace";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const card = await getCard(id);
  if (!card) return { title: "贺卡未找到" };
  return {
    title: `${card.categoryTitle} · ${card.templateTitle} · 华笺`,
    description: card.message.slice(0, 80),
  };
}

export default async function ShareCardPage({ params }: Props) {
  const { id } = await params;
  const card = await getCard(id);
  if (!card) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <p className="text-center text-sm text-amber-900/60">
        这是一张来自{" "}
        <Link href="/" className="font-medium text-amber-900 underline-offset-2 hover:underline">
          华笺 Hua Card
        </Link>{" "}
        的分享贺卡
      </p>
      <div className="mt-6">
        <CardFace
          templateTitle={card.templateTitle}
          categoryLabel={card.categoryTitle}
          salutation={card.salutation}
          signature={card.signature}
          message={card.message}
          poem={card.poem}
          poemSource={card.poemSource}
          gradient={card.gradient}
        />
      </div>
      <p className="mt-8 text-center text-xs text-amber-800/50">
        此为网页贺卡预览。收卡人也可自行「做一张」后下载高清 PNG。
      </p>
    </div>
  );
}
