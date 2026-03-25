import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-amber-900/10 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-lg font-semibold text-amber-950">
          华笺 <span className="text-sm font-normal text-amber-800/80">Hua Card</span>
        </Link>
        <nav className="flex gap-3 text-sm text-amber-900/80">
          <Link href="/" className="hover:text-amber-950">
            首页
          </Link>
        </nav>
      </div>
    </header>
  );
}
