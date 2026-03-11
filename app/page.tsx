import Link from "next/link";

export default function LocaleEntryPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(165,41,255,0.3),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(140,0,255,0.28),transparent_50%)]" />
      <section className="relative z-10 glass-panel w-full max-w-xl rounded-3xl p-10 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-text-muted">Pixel Prestige</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white">
          Select your language
        </h1>
        <p className="mt-3 text-base text-text-muted">Choisissez votre langue pour demarrer l&apos;experience.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/fr" className="btn-primary">
            Francais
          </Link>
          <Link href="/en" className="btn-secondary">
            English
          </Link>
        </div>
      </section>
    </main>
  );
}

