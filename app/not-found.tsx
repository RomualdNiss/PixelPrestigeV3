import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-default section-space">
      <div className="rounded-3xl border border-border bg-surface p-8 text-center">
        <h1 className="font-display text-4xl text-text">404</h1>
        <p className="mt-3 text-text-muted">This page does not exist.</p>
        <Link href="/fr" className="btn-primary mt-6">
          Back to home
        </Link>
      </div>
    </main>
  );
}

