"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="pt-36 pb-28 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-ink">Something went wrong.</h1>
        <p className="mt-4 text-ink-muted">
          Please try again. If it keeps happening, email{" "}
          <a className="text-brand-600 underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto text-sm font-semibold text-white bg-ink hover:bg-brand-700 px-6 py-3 rounded-full transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto text-sm font-semibold text-ink bg-white border border-surface-border px-6 py-3 rounded-full shadow-card"
          >
            Go to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
