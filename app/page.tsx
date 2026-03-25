import Link from "next/link";
import { CATEGORIES } from "@/lib/templates";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-amber-950 sm:text-4xl">
        选一份文化贺卡
      </h1>
      <p className="mt-3 max-w-2xl text-amber-900/75">
        涵盖新春年俗、清明端午、七夕中秋重阳、冬至腊八、公历节日与完整二十四节气；可编辑文案、AI
        辅助、下载图片或生成分享页。
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <li key={c.id}>
            <Link
              href={`/category/${c.slug}`}
              className="flex h-full flex-col rounded-2xl border border-amber-900/12 bg-white p-5 shadow-sm transition hover:border-amber-800/25 hover:shadow-md"
            >
              <span className="text-3xl">{c.emoji}</span>
              <span className="mt-3 font-serif text-xl font-semibold text-amber-950">
                {c.title}
              </span>
              <span className="mt-1 text-sm text-amber-800/70">{c.description}</span>
              <span className="mt-4 text-sm font-medium text-amber-900">进入模板 →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
