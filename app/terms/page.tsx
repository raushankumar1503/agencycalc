import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "AgencyCalc terms of use: informational/planning purpose, no guarantees, user responsibility, and limitation of liability.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use",
    description:
      "AgencyCalc terms of use: informational/planning purpose, no guarantees, user responsibility, and limitation of liability.",
    url: `${getSiteUrl()}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
  const lastUpdated = "September 16, 2026";
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated: {lastUpdated}</p>
      </header>

      <section className="guide-prose mb-8">
        <h2>Purpose of this site</h2>
        <p>
          AgencyCalc provides calculators and guides for informational and
          planning purposes only. The tools help freelance web developers and
          small agencies estimate project quotes, monthly maintenance prices,
          and extra-scope change fees. They are not professional legal, tax,
          financial, accounting, or business advice.
        </p>

        <h2>No guarantees</h2>
        <p>
          We make no guarantee of accuracy, business outcome, income, search
          ranking, or AdSense approval from using these tools or guides. The
          formulas are transparent and explained on each page, but they are
          simplified models that cannot capture every real-world variable.
        </p>

        <h2>User responsibility</h2>
        <p>
          You are responsible for verifying all figures, formulas, and guidance
          against your own situation, contracts, rates, costs, and applicable
          laws before relying on them for any business decision. Treat the
          results as a starting point, not a final answer.
        </p>

        <h2>Not professional advice</h2>
        <p>
          Nothing on this site constitutes legal, financial, accounting, tax, or
          business advice. If you need professional advice, consult a qualified
          attorney, accountant, financial advisor, or tax professional licensed
          in your jurisdiction.
        </p>

        <h2>Prohibited misuse</h2>
        <p>
          You may not use the calculators or guides for any unlawful purpose,
          to mislead clients, or to create content that violates any law or
          regulation. You may not scrape, reverse-engineer, or repackage the
          site&apos;s output as your own product without attribution.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All original AgencyCalc materials — calculator logic, formulas,
          guide text, code, and design — are the intellectual property of
          AgencyCalc. You are welcome to use the calculators for your own
          business planning. You may not copy the guide text, calculator code,
          or design for redistribution, resale, or inclusion in another product
          without permission. Linking to the site is always welcome.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, AgencyCalc and its
          contributors are not liable for any direct, indirect, incidental,
          special, consequential, or exemplary damages arising from your use of
          the calculators, guides, or any information on this site — including
          lost profits, lost data, business interruption, or reputational harm —
          even if advised of the possibility of such damages. Your sole remedy
          for dissatisfaction is to stop using the site.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms at any time. The &quot;Last updated&quot; date at the
          top of this page reflects the most recent change. Continued use of
          the site after changes are posted constitutes acceptance of the new
          terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to the email address on the{" "}
          <a href="/contact" className="underline">Contact page</a>.
        </p>
      </section>

      <hr className="border-neutral-200" />

      <footer className="mt-6 text-xs text-neutral-500">
        <p>
          These terms are not legal advice and do not claim to be. They describe
          the conditions of using this site in plain language.
        </p>
      </footer>
    </main>
  );
}