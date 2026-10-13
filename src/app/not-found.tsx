import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | EXPLAINERACE",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/work", label: "See the work" },
  { href: "/pricing", label: "View pricing" },
  { href: "/contact", label: "Contact Ali" },
];

export default function NotFound() {
  return (
    <section className="pt-36 pb-28 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-ink">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-ink-muted">
          The link may be old or mistyped. Here are the pages people look for most.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="w-full sm:w-auto text-sm font-semibold text-ink bg-white hover:bg-ink hover:text-white border border-surface-border px-6 py-3 rounded-full shadow-card transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/" className="mt-6 inline-block text-sm text-brand-600 underline underline-offset-4">
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
