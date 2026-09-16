import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculators and Tools",
  description:
    "Practical calculators for freelance web developers and small agencies: project quotes, website maintenance pricing, and extra-scope change fees.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Calculators and Tools",
    description:
      "Practical calculators for freelance web developers and small agencies: project quotes, website maintenance pricing, and extra-scope change fees.",
    url: `${getSiteUrl()}/tools`,
    type: "website",
  },
};

const TOOLS = [
  {
    href: "/",
    title: "Website Project Quote Calculator",
    description:
      "Estimate a fixed project quote from hours, costs, and a profit buffer.",
  },
  {
    href: "/maintenance",
    title: "Website Maintenance Pricing Calculator",
    description:
      "Calculate a monthly support price that covers labor, hosting, software, and profit.",
  },
  {
    href: "/scope-creep",
    title: "Scope-Creep Cost Calculator",
    description:
      "Calculate a fair additional fee for client work outside the original project scope.",
  },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          Calculators and Tools
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Three small, focused calculators for the day-to-day pricing decisions a
          freelancer or small agency faces. Each one runs entirely in your
          browser — no data is sent anywhere.
        </p>
      </header>

      <section aria-labelledby="calculators-heading">
        <h2
          id="calculators-heading"
          className="mb-4 text-base font-semibold text-neutral-900"
        >
          The tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-lg border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm"
            >
              <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-700">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="how-to-heading"
        className="mt-8 max-w-2xl"
      >
        <h2
          id="how-to-heading"
          className="mb-2 text-base font-semibold text-neutral-900"
        >
          How to use these tools
        </h2>
        <div className="guide-prose">
          <p>
            Each calculator follows the same pattern: enter your numbers on the
            left, and a recommended figure updates on the right as you type. The
            formulas behind every result are shown on the page and explained in
            plain English, so you can check the math yourself.
          </p>
          <p>
            Start with the{" "}
            <a className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-600" href="/">
              Website Project Quote Calculator
            </a>{" "}
            to turn an estimated time and rate into a fixed project quote. If you
            retain clients after a build, use the{" "}
            <a className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-600" href="/maintenance">
              Website Maintenance Pricing Calculator
            </a>{" "}
            to price a monthly support package, and reach for the{" "}
            <a className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-600" href="/scope-creep">
              Scope-Creep Cost Calculator
            </a>{" "}
            when a client asks for work beyond the agreed scope.
          </p>
          <p>
            These tools produce estimates to help you plan. Actual project costs
            depend on your own requirements, timelines, and rates, so treat the
            results as a starting point rather than a guarantee.
          </p>
        </div>
      </section>
    </main>
  );
}