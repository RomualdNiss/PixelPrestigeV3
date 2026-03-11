import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-default section-space">
      <div className="rounded-3xl border border-white/15 bg-bg-soft/70 p-8 text-center">
        <h1 className="font-display text-4xl text-white">404</h1>
        <p className="mt-3 text-text-muted">This page does not exist.</p>
        <Link href="/fr" className="btn-primary mt-6">
          Back to home
        </Link>
      </div>
    </main>
  );
}

