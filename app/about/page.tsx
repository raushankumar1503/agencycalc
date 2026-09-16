import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AgencyCalc",
  description:
    "AgencyCalc provides practical calculators and guides for freelance web developers and small agencies to estimate project prices, monthly maintenance costs, and out-of-scope work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AgencyCalc",
    description:
      "AgencyCalc provides practical calculators and guides for freelance web developers and small agencies.",
    url: `${getSiteUrl()}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          About AgencyCalc
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Practical calculators and guides for freelance web developers and
          small digital agencies.
        </p>
      </header>

      <section className="guide-prose mb-8">
        <h2>What we do</h2>
        <p>
          AgencyCalc provides three focused calculators and a small library of
          original guides. The calculators help you estimate project prices,
          monthly maintenance costs, and out-of-scope change fees — the three
          pricing decisions freelancers and small agencies face most often. The
          guides explain the reasoning behind the numbers so you can defend
          them in client conversations.
        </p>

        <h2>How the calculators work</h2>
        <p>
          Each calculator is built on a transparent formula. You enter your
          numbers, and the result updates in your browser — no data is sent
          anywhere. The formulas are shown on the page and explained in plain
          English, so you can check the math yourself or adjust the inputs to
          match your situation.
        </p>

        <p>The current calculators are:</p>
        <ul>
          <li>
            <strong>Website Project Quote Calculator</strong> — builds a fixed
            project quote from estimated hours, hourly rate, fixed costs, and a
            profit buffer.
          </li>
          <li>
            <strong>Website Maintenance Pricing Calculator</strong> — calculates
            a monthly package price from support hours, hosting, software
            licenses, and a profit buffer.
          </li>
          <li>
            <strong>Scope-Creep Cost Calculator</strong> — calculates a fair
            additional fee when a client requests work outside the original
            project scope, using the original project&apos;s implied hourly value.
          </li>
        </ul>

        <h2>Planning tools, not professional advice</h2>
        <p>
          The calculators produce estimates to help you plan. They are not
          legal, tax, financial, accounting, or business advice. Actual project
          costs depend on your own requirements, timelines, rates, contracts,
          and local laws. Treat the results as a starting point and verify them
          against your own situation before committing to a quote or price.
        </p>

        <h2>How we create content</h2>
        <ul>
          <li>
            <strong>Calculators use transparent formulas.</strong> The math is
            shown and explained on each page; no hidden logic or proprietary
            algorithms.
          </li>
          <li>
            <strong>Guides are reviewed for clarity and updated when
            needed.</strong> We publish original, practical writing — no copied
            content, spun text, keyword stuffing, or invented statistics.
          </li>
          <li>
            <strong>Users should verify figures for their own
            situation.</strong> Rates, costs, and legal requirements vary. The
            tools and guides give you a method; your specific numbers come from
            your own business.
          </li>
        </ul>

        <h2>Design and scope</h2>
        <p>
          AgencyCalc is deliberately minimal: no database, authentication,
          payments, analytics, blog, dark mode, gradients, or decorative
          elements. It is a practical resource a working professional opens to
          get a number and moves on.
        </p>
      </section>

      <hr className="border-neutral-200" />

      <footer className="mt-6 text-xs text-neutral-500">
        <p>
          Questions or feedback? <a href="/contact" className="underline">Contact us</a>.
        </p>
      </footer>
    </main>
  );
}