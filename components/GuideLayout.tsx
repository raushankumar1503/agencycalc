import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";

export interface RelatedTool {
  href: string;
  label: string;
  blurb: string;
}

export interface GuideMeta {
  title: string;
  description: string;
  slug: string;
  updated: string;
}

export type GuideMetaWithSEO = GuideMeta & Metadata;

export function buildGuideMetadata({
  title,
  slug,
  description,
  updated,
}: GuideMeta): GuideMetaWithSEO {
  const siteUrl = getSiteUrl();
  const canonical = `/guides/${slug}`;
  return {
    title,
    description,
    slug,
    updated,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical}`,
      type: "article",
      publishedTime: updated,
      modifiedTime: updated,
      authors: ["AgencyCalc Editorial Team"],
    },
  };
}

interface GuideLayoutProps {
  children: React.ReactNode;
  meta: GuideMeta;
  relatedTools: RelatedTool[];
}

export default function GuideLayout({
  children,
  meta,
  relatedTools,
}: GuideLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Guide
        </p>
        <h1 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
          {meta.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          {meta.description}
        </p>
        <p className="mt-3 text-xs text-neutral-500">
          Last updated: {meta.updated} · Author: AgencyCalc Editorial Team
        </p>
      </header>

      <article className="guide-prose">{children}</article>

      <section aria-labelledby="related-tools-heading" className="mt-8">
        <h2 id="related-tools-heading" className="mb-3 text-base font-semibold text-neutral-900">
          Related tools
        </h2>
        <div className="space-y-2">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm"
            >
              <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-700">
                {tool.label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                {tool.blurb}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <hr className="mt-10 border-neutral-200" />

      <footer className="mt-6 text-xs leading-relaxed text-neutral-500">
        <p>
          This guide is general information to help with planning. It is not
          legal, tax, financial, accounting, or business advice. Your actual
          situation may vary; please consult a qualified professional if you
          need advice specific to your circumstances.
        </p>
      </footer>
    </main>
  );
}