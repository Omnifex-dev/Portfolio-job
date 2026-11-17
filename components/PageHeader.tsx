export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="animate-rise-in mx-auto max-w-4xl text-center">
      <p className="mb-4 text-lg font-light uppercase tracking-[6px] text-accent sm:text-xl">{eyebrow}</p>
      <h1 className="heading-gradient text-4xl font-normal uppercase leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
      {children && <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-muted sm:text-lg">{children}</p>}
    </header>
  );
}
