import type { Metadata } from "next";
import MaintenanceCalculator from "@/components/MaintenanceCalculator";
import { formatUSD } from "@/lib/quote";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Maintenance Pricing Calculator",
  description:
    "Set a monthly maintenance-package price from support hours, rate, software and hosting costs, and target profit. A planning tool for freelancers and small agencies.",
  alternates: { canonical: "/maintenance" },
  openGraph: {
    title: "Website Maintenance Pricing Calculator",
    description:
      "Set a monthly maintenance-package price from support hours, rate, software and hosting costs, and target profit.",
    url: `${getSiteUrl()}/maintenance`,
    type: "website",
  },
};

const EXAMPLE = {
  sites: 5,
  hoursPerSite: 4,
  rate: 75,
  software: 100,
  hostingPerSite: 15,
  bufferPct: 20,
};

export default function MaintenancePage() {
  const ex = EXAMPLE;
  const totalHours = ex.sites * ex.hoursPerSite;
  const labor = totalHours * ex.rate;
  const hosting = ex.sites * ex.hostingPerSite;
  const base = labor + hosting + ex.software;
  const profit = base * (ex.bufferPct / 100);
  const packagePrice = base + profit;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          AgencyCalc
        </p>
        <h1 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
          Website Maintenance Pricing Calculator
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Price a monthly maintenance package from your support hours, hourly rate,
          software and hosting costs, and target profit. Enter your numbers on the
          left; recommended pricing updates as you type. All calculations run in
          your browser.
        </p>
      </header>

      <MaintenanceCalculator />

      <section
        aria-labelledby="worked-example-heading"
        className="mt-8 rounded-lg border border-neutral-200 bg-white p-5 sm:p-6"
      >
        <h2 id="worked-example-heading" className="text-base font-semibold text-neutral-900">
          Worked example
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          You run {ex.sites} client sites. Each needs about {ex.hoursPerSite} hours of
          support a month at {formatUSD(ex.rate)} per hour, with {formatUSD(ex.software)} in
          monthly software costs and {formatUSD(ex.hostingPerSite)} per site in hosting. You
          want a {ex.bufferPct}% profit buffer:
        </p>
        <dl className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
          <ExampleRow
            label={`Total support hours (${ex.sites} x ${ex.hoursPerSite})`}
            value={`${totalHours} hrs`}
          />
          <ExampleRow
            label={`Monthly labor (${totalHours} x ${formatUSD(ex.rate)})`}
            value={formatUSD(labor)}
          />
          <ExampleRow
            label={`Total hosting (${ex.sites} x ${formatUSD(ex.hostingPerSite)})`}
            value={formatUSD(hosting)}
          />
          <ExampleRow label="Software and licenses" value={formatUSD(ex.software)} />
          <ExampleRow
            label="Base monthly operating cost"
            value={formatUSD(base)}
          />
          <ExampleRow
            label={`Profit buffer (${ex.bufferPct}%)`}
            value={formatUSD(profit)}
          />
          <ExampleRow
            label="Recommended monthly package price"
            emphasize
            value={formatUSD(packagePrice)}
          />
          <ExampleRow
            label={`Per-client monthly price`}
            value={formatUSD(packagePrice / ex.sites)}
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