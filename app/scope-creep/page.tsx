import type { Metadata } from "next";
import ScopeCreepCalculator from "@/components/ScopeCreepCalculator";
import { formatUSD } from "@/lib/quote";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scope-Creep Cost Calculator",
  description:
    "Calculate a fair additional charge when a client requests work outside the original project scope. A planning tool for freelancers and small agencies.",
  alternates: { canonical: "/scope-creep" },
  openGraph: {
    title: "Scope-Creep Cost Calculator",
    description:
      "Calculate a fair additional charge when a client requests work outside the original project scope.",
    url: `${getSiteUrl()}/scope-creep`,
    type: "website",
  },
};

const EXAMPLE = {
  originalPrice: 8000,
  originalHours: 80,
  addHours: 20,
  addRounds: 2,
  roundCost: 50,
  rushPct: 25,
};

export default function ScopeCreepPage() {
  const ex = EXAMPLE;
  const hourly = ex.originalPrice / ex.originalHours;
  const addLabor = ex.addHours * hourly;
  const revCost = ex.addRounds * ex.roundCost;
  const subtotal = addLabor + revCost;
  const rush = subtotal * (ex.rushPct / 100);
  const fee = subtotal + rush;
  const updated = ex.originalPrice + fee;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          AgencyCalc
        </p>
        <h1 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
          Scope-Creep Cost Calculator
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Calculate a fair additional charge when a client requests work outside
          the original project scope. Enter the original project details and the
          new request on the left; the recommended fee updates as you type. All
          calculations run in your browser.
        </p>
      </header>

      <ScopeCreepCalculator />

      <section
        aria-labelledby="worked-example-heading"
        className="mt-8 rounded-lg border border-neutral-200 bg-white p-5 sm:p-6"
      >
        <h2 id="worked-example-heading" className="text-base font-semibold text-neutral-900">
          Worked example
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Your original project is {formatUSD(ex.originalPrice)} over {ex.originalHours}{" "}
          hours. The client asks for {ex.addHours} more hours, plus {ex.addRounds} extra
          revision rounds at {formatUSD(ex.roundCost)} each, with a {ex.rushPct}% rush
          surcharge:
        </p>
        <dl className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
          <ExampleRow
            label={`Implied hourly value (${formatUSD(ex.originalPrice)} / ${ex.originalHours} hrs)`}
            value={formatUSD(hourly)}
          />
          <ExampleRow
            label={`Additional labor (${ex.addHours} x ${formatUSD(hourly)})`}
            value={formatUSD(addLabor)}
          />
          <ExampleRow
            label={`Revision cost (${ex.addRounds} x ${formatUSD(ex.roundCost)})`}
            value={formatUSD(revCost)}
          />
          <ExampleRow label="Subtotal" value={formatUSD(subtotal)} />
          <ExampleRow
            label={`Rush surcharge (${ex.rushPct}%)`}
            value={formatUSD(rush)}
          />
          <ExampleRow
            label="Recommended additional fee"
            emphasize
            value={formatUSD(fee)}
          />
          <ExampleRow
            label="Updated total project price"
            value={formatUSD(updated)}
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