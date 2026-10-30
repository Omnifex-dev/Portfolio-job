export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="animate-rise-in mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-foam/90 text-glow">{eyebrow}</p>
      <h1 className="font-display text-4xl font-bold tracking-tight text-white text-glow sm:text-5xl">{title}</h1>
      {children && <p className="mt-5 text-lg leading-relaxed text-cyan-50/90 text-glow">{children}</p>}
    </header>
  );
}
