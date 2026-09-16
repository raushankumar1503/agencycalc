import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides for Freelance Web Developers",
  description:
    "Practical, original guides on pricing website projects, monthly maintenance, extra-scope changes, revision policies, and client communication for freelance web developers.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides for Freelance Web Developers",
    description:
      "Practical guides on pricing website projects, maintenance, extra-scope changes, revision policies, and client communication.",
    url: `${getSiteUrl()}/guides`,
    type: "website",
  },
};

const GUIDES = [
  {
    href: "/guides/how-to-price-a-website-project",
    title: "How to Price a Website Project as a Freelancer",
    category: "Pricing",
    description:
      "A practical way to turn estimated time, costs, and a profit buffer into a fixed project price you can defend.",
  },
  {
    href: "/guides/website-maintenance-pricing",
    title: "How to Price Monthly Website Maintenance",
    category: "Pricing",
    description:
      "How to build a monthly support price that covers labor, hosting, software, and a margin.",
  },
  {
    href: "/guides/how-to-charge-for-extra-website-changes",
    title: "How to Charge for Extra Website Changes",
    category: "Scope and change requests",
    description:
      "A fair, transparent way to quote additional work that falls outside the original project scope.",
  },
  {
    href: "/guides/website-revision-policy",
    title: "How to Set a Website Revision Policy",
    category: "Scope and change requests",
    description:
      "Define how many revisions are included and how to charge for the rest, before work begins.",
  },
  {
    href: "/guides/fixed-price-vs-hourly-web-development",
    title: "Fixed-Price vs. Hourly Pricing for Web Development",
    category: "Pricing",
    description:
      "The trade-offs of each model and how to choose based on scope clarity, project size, and risk.",
  },
  {
    href: "/guides/late-payment-email-template",
    title: "Late-Payment Email Templates for Freelance Web Developers",
    category: "Client communication",
    description:
      "Professional, ready-to-adjust email templates for when an invoice goes past its due date.",
  },
];

export default function GuidesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          Guides
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Short, practical guides on pricing and client management for freelance
          web developers and small agencies. Each guide explains the reasoning
          behind an approach and links to a calculator when it helps.
        </p>
      </header>

      <section aria-labelledby="guides-heading">
        <h2 id="guides-heading" className="mb-4 text-base font-semibold text-neutral-900">
          All guides
        </h2>
        <div className="space-y-3">
          {GUIDES.map((guide) => (
            <article
              key={guide.href}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {guide.category}
              </p>
              <h3 className="mt-1 text-base font-semibold text-neutral-900">
                <Link
                  href={guide.href}
                  className="hover:text-neutral-700"
                >
                  {guide.title}
                </Link>
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-neutral-600">
                {guide.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}