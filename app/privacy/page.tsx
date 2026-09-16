import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AgencyCalc privacy policy: how calculator inputs are handled, what data may be collected, and how to contact us with questions.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "AgencyCalc privacy policy: how calculator inputs are handled, what data may be collected, and how to contact us with questions.",
    url: `${getSiteUrl()}/privacy`,
    type: "website",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "September 16, 2026";
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated: {lastUpdated}</p>
      </header>

      <section className="guide-prose mb-8">
        <h2>What this policy covers</h2>
        <p>
          This policy describes how AgencyCalc handles information when you use
          the calculators and read the guides on this site. It is written in
          plain language and will be updated if our practices change.
        </p>

        <h2>Calculator inputs stay in your browser</h2>
        <p>
          In the current version, all calculator inputs (hours, rates, costs,
          revision numbers, etc.) are processed entirely in your browser. They
          are not sent to our servers, not stored, and not shared with any
          third party. You can verify this by disconnecting from the internet
          after the page loads — the calculators will continue to work.
        </p>

        <h2>No account required</h2>
        <p>
          The current version does not require you to create an account, sign
          in, or provide any personal information to use the calculators or read
          the guides.
        </p>

        <h2>Hosting and potential future analytics</h2>
        <p>
          Like any website, our hosting provider may collect basic access logs
          (IP address, requested page, timestamp) for operational and security
          purposes. We do not currently use analytics, cookies, or advertising
          scripts. If we add analytics, cookies, or advertising in the future,
          we will update this policy before enabling them and provide a clear
          notice on the site.
        </p>

        <h2>Contact communications</h2>
        <p>
          If you email us using the address on the Contact page, we may retain
          your message and reply to respond to your inquiry. We do not use
          contact information for marketing unless you explicitly ask to
          receive updates.
        </p>

        <h2>Do not enter confidential client data</h2>
        <p>
          Even though calculator inputs are processed locally, we recommend you
          do not enter confidential client information, proprietary financial
          data, or anything you would not want visible on your screen in a
          shared environment. Treat the tools as planning aids, not as secure
          data processors.
        </p>

        <h2>Your rights</h2>
        <p>
          Because we do not collect personal data through the calculators,
          there is no stored data to access, correct, or delete. If you contact
          us by email, you can request deletion of that correspondence at any
          time.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We will update this policy if our data practices change. The &quot;Last
          updated&quot; date at the top of this page reflects the most recent change.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to the email address on the{" "}
          <a href="/contact" className="underline">Contact page</a>.
        </p>
      </section>

      <hr className="border-neutral-200" />

      <footer className="mt-6 text-xs text-neutral-500">
        <p>
          This policy is not a legal compliance certification and does not give
          legal guarantees. It describes our current practices in plain language.
        </p>
      </footer>
    </main>
  );
}