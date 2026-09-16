import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "AgencyCalc disclaimer: estimates only, not professional advice, no guarantees of earnings, SEO traffic, or AdSense approval.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer",
    description:
      "AgencyCalc disclaimer: estimates only, not professional advice, no guarantees of earnings, SEO traffic, or AdSense approval.",
    url: `${getSiteUrl()}/disclaimer`,
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          Disclaimer
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Please read this disclaimer before using the calculators or guides on
          this site.
        </p>
      </header>

      <section className="guide-prose mb-8">
        <ul>
          <li>
            <strong>Estimates only.</strong> All calculator results are planning
            estimates based on the inputs you provide. They are not binding
            quotes, guarantees of payment, or predictions of actual project
            costs.
          </li>
          <li>
            <strong>Not legal, tax, financial, accounting, or business
            advice.</strong> The calculators and guides are informational
            resources. They do not constitute professional advice in any field.
            For advice specific to your situation, consult a qualified
            professional.
          </li>
          <li>
            <strong>Verify calculations independently.</strong> The formulas are
            shown and explained on each page. You are responsible for verifying
            that the math, inputs, and assumptions match your own situation
            before relying on any result.
          </li>
          <li>
            <strong>Results vary based on real project requirements.</strong>
            Scope changes, client feedback cycles, technical complexity, rate
            adjustments, and local market conditions all affect actual pricing.
            The tools cannot capture every variable.
          </li>
          <li>
            <strong>No earnings, SEO traffic, or AdSense approval guarantee.</strong>
            Using these calculators or guides does not guarantee any level of
            income, search ranking, website traffic, or advertising program
            approval. Those outcomes depend on many factors outside the scope
            of this site.
          </li>
        </ul>

        <p>
          By using this site, you acknowledge that you have read and understood
          this disclaimer.
        </p>
      </section>

      <hr className="border-neutral-200" />

      <footer className="mt-6 text-xs text-neutral-500">
        <p>
          Questions? <a href="/contact" className="underline">Contact us</a>.
        </p>
      </footer>
    </main>
  );
}