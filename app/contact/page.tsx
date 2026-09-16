import type { Metadata } from "next";
import { getSiteUrl, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact AgencyCalc",
  description:
    "Send feedback, correction requests, or tool suggestions to the AgencyCalc team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AgencyCalc",
    description:
      "Send feedback, correction requests, or tool suggestions to the AgencyCalc team.",
    url: `${getSiteUrl()}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          Contact
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          We welcome feedback, correction requests, and tool suggestions from
          freelance web developers and agencies using our calculators.
        </p>
      </header>

      <section className="guide-prose mb-8">
        <h2>How to reach us</h2>
        <p>
          There is no contact form on this page because the site currently has
          no backend to receive or process submissions. Instead, please email us
          directly at:
        </p>
        <p>
          <strong>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></strong>
        </p>
        <p className="text-xs text-neutral-500">
          <em>This is a placeholder email address. Update it before launch in
          <code>lib/site.ts</code>.</em>
        </p>

        <h2>What to write about</h2>
        <ul>
          <li>Feedback on a calculator (unexpected result, unclear explanation)</li>
          <li>Correction requests (a number that seems wrong, a formula you think is off)</li>
          <li>Tool suggestions (a pricing scenario you handle that we do not cover yet)</li>
        </ul>

        <p>
          We read every message. If you are reporting a calculation issue,
          please include the exact inputs you used and the result you expected
          — it helps us reproduce and verify quickly.
        </p>
      </section>

      <hr className="border-neutral-200" />

      <footer className="mt-6 text-xs text-neutral-500">
        <p>
          This is a client-side only site. No messages are submitted, stored, or
          processed by AgencyCalc unless you send an email yourself.
        </p>
      </footer>
    </main>
  );
}