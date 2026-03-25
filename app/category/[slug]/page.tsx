import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getTemplatesByCategory } from "@/lib/templates";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const list = getTemplatesByCategory(cat.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-amber-900/65">
        <Link href="/" className="underline-offset-2 hover:underline">
          ← 首页
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-amber-950">
        {cat.emoji} {cat.title}
      </h1>
      <p className="mt-2 text-amber-900/70">{cat.description}</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {list.map((t) => (
          <li key={t.id}>
            <Link
              href={`/edit/${t.id}`}
              className="flex items-center gap-4 rounded-2xl border border-amber-900/12 bg-white p-4 shadow-sm transition hover:border-amber-800/25"
            >
              <div
                className="h-16 w-14 shrink-0 rounded-lg shadow-inner ring-1 ring-black/5"
                style={{
                  background: `linear-gradient(145deg, ${t.gradient[0]}, ${t.gradient[1]}, ${t.gradient[2]})`,
                }}
              />
              <div>
                <p className="font-serif text-lg font-semibold text-amber-950">{t.title}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-amber-800/65">{t.defaultMessage}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
