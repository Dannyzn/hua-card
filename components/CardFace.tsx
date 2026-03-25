type Props = {
  templateTitle: string;
  categoryLabel: string;
  salutation: string;
  signature: string;
  message: string;
  poem: string;
  poemSource: string;
  gradient: [string, string, string];
  className?: string;
};

export function CardFace({
  templateTitle,
  categoryLabel,
  salutation,
  signature,
  message,
  poem,
  poemSource,
  gradient,
  className = "",
}: Props) {
  const [a, b, c] = gradient;
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 ${className}`}
      style={{
        background: `linear-gradient(165deg, ${a} 0%, ${b} 45%, ${c} 100%)`,
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

      <div className="relative flex min-h-[420px] flex-col px-8 pb-10 pt-9 text-white sm:min-h-[460px]">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          {categoryLabel}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-semibold tracking-wide sm:text-3xl">
          {templateTitle}
        </h2>
        <div className="mt-8 h-px w-12 bg-white/40" />

        <p className="mt-6 font-serif text-lg font-medium sm:text-xl">{salutation}</p>
        <p className="mt-4 whitespace-pre-wrap font-serif text-base leading-relaxed text-white/95 sm:text-lg">
          {message}
        </p>

        {poem ? (
          <blockquote className="mt-8 border-l-2 border-white/35 pl-4 font-serif text-sm italic leading-relaxed text-white/85 sm:text-base">
            {poem}
            {poemSource ? (
              <cite className="mt-2 block text-xs not-italic text-white/60">
                — {poemSource}
              </cite>
            ) : null}
          </blockquote>
        ) : null}

        {signature ? (
          <p className="mt-auto pt-10 text-right font-serif text-base text-white/90">
            {signature}
          </p>
        ) : (
          <div className="mt-10" />
        )}
      </div>
    </div>
  );
}
