import type { Metadata } from "next";
import QuoteCalculator from "@/components/QuoteCalculator";
import { formatUSD } from "@/lib/quote";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Project Quote Calculator",
  description:
    "Estimate a fixed project quote from estimated hours, hourly rate, fixed costs, and a profit buffer. A planning tool for freelance web developers.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Website Project Quote Calculator",
    description:
      "Estimate a fixed project quote from estimated hours, hourly rate, fixed costs, and a profit buffer.",
    url: `${getSiteUrl()}/`,
    type: "website",
  },
};

const EXAMPLE = {
  hours: 40,
  rate: 75,
  fixed: 500,
  bufferPct: 15,
  includedRounds: 2,
  extraRate: 40,
};

export default function HomePage() {
  const example = EXAMPLE;
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          AgencyCalc
        </p>
        <h1 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
          Website Project Quote Calculator
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Build a project quote from your estimated time, rate, fixed costs, and
          profit buffer. Enter your numbers on the left; the suggested quote
          updates as you type. All calculations run in your browser.
        </p>
      </header>

      <QuoteCalculator />

      <section
        aria-labelledby="worked-example-heading"
        className="mt-8 rounded-lg border border-neutral-200 bg-white p-5 sm:p-6"
      >
        <h2 id="worked-example-heading" className="text-base font-semibold text-neutral-900">
          Worked example
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          A client asks for a marketing site. You estimate {example.hours} hours of
          work at {formatUSD(example.rate)} per hour, with {formatUSD(example.fixed)} in
          fixed costs (hosting, theme licensing), a {example.bufferPct}% profit buffer,
          and {example.includedRounds} revision rounds included. Charging{" "}
          {formatUSD(example.extraRate)} for each extra round:
        </p>
        <dl className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
          <ExampleRow
            label={`Labor (${example.hours} x ${formatUSD(example.rate)})`}
            value={formatUSD(example.hours * example.rate)}
          />
          <ExampleRow label="Fixed costs" value={formatUSD(example.fixed)} />
          <ExampleRow
            label="Base estimate (labor + fixed)"
            value={formatUSD(example.hours * example.rate + example.fixed)}
          />
          <ExampleRow
            label={`Profit buffer (${example.bufferPct}%)`}
            value={formatUSD(
              (example.hours * example.rate + example.fixed) * (example.bufferPct / 100),
            )}
          />
          <ExampleRow
            label="Suggested quote"
            emphasize
            value={formatUSD(
              (example.hours * example.rate + example.fixed) *
                (1 + example.bufferPct / 100),
            )}
          />
          <ExampleRow
            label="Extra revision round (each)"
            value={formatUSD(example.extraRate)}
          />
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">
          This example is illustrative only and uses rounded figures.
        </p>
      </section>

      <footer className="mt-6">
        <p className="text-xs leading-relaxed text-neutral-500">
          This calculator provides a planning estimate and is not tax, legal, or
          financial advice.
        </p>
      </footer>
    </main>
  );
}

function ExampleRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-neutral-100 py-1.5">
      <dt className="text-neutral-600">{label}</dt>
      <dd
        className={
          emphasize
            ? "font-semibold tabular-nums text-accent-dark"
            : "font-medium tabular-nums text-neutral-900"
        }
      >
        {value}
      </dd>
    </div>
  );
}