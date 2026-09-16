"use client";

import { useMemo, useState } from "react";
import NumberField, { type NumberFieldProps } from "@/components/NumberField";
import { formatUSD } from "@/lib/quote";
import {
  validateMaintenanceForm,
  type MaintenanceErrors,
  type MaintenanceParsed,
} from "@/lib/validate-maintenance";
import { calculateMaintenance } from "@/lib/maintenance";

const DEFAULT_VALUES = {
  numberOfSites: "",
  supportHoursPerSite: "",
  hourlyRate: "",
  softwareCosts: "0",
  hostingPerSite: "0",
  profitBufferPercent: "20",
};

export default function MaintenanceCalculator() {
  const [numberOfSites, setNumberOfSites] = useState(DEFAULT_VALUES.numberOfSites);
  const [supportHoursPerSite, setSupportHoursPerSite] = useState(
    DEFAULT_VALUES.supportHoursPerSite,
  );
  const [hourlyRate, setHourlyRate] = useState(DEFAULT_VALUES.hourlyRate);
  const [softwareCosts, setSoftwareCosts] = useState(DEFAULT_VALUES.softwareCosts);
  const [hostingPerSite, setHostingPerSite] = useState(DEFAULT_VALUES.hostingPerSite);
  const [profitBufferPercent, setProfitBufferPercent] = useState(
    DEFAULT_VALUES.profitBufferPercent,
  );

  const validation = useMemo(
    () =>
      validateMaintenanceForm({
        numberOfSites,
        supportHoursPerSite,
        hourlyRate,
        softwareCosts,
        hostingPerSite,
        profitBufferPercent,
      }),
    [numberOfSites, supportHoursPerSite, hourlyRate, softwareCosts, hostingPerSite, profitBufferPercent],
  );

  const parsed: MaintenanceParsed | null = validation.parsed;
  const errors: MaintenanceErrors = validation.errors;

  const result = useMemo(
    () =>
      parsed
        ? calculateMaintenance({
            numberOfSites: parsed.numberOfSites,
            supportHoursPerSite: parsed.supportHoursPerSite,
            hourlyRate: parsed.hourlyRate,
            softwareCosts: parsed.softwareCosts,
            hostingPerSite: parsed.hostingPerSite,
            profitBufferPercent: parsed.profitBufferPercent,
          })
        : null,
    [parsed],
  );

  const fields: NumberFieldProps[] = [
    {
      id: "numberOfSites",
      name: "numberOfSites",
      label: "Number of client websites",
      required: true,
      helper: "How many hosted sites this maintenance package covers.",
      placeholder: "e.g. 5",
      value: numberOfSites,
      onChange: setNumberOfSites,
      error: errors.numberOfSites,
    },
    {
      id: "supportHoursPerSite",
      name: "supportHoursPerSite",
      label: "Support hours per website (monthly)",
      required: true,
      helper: "Average billable support hours each site needs per month.",
      placeholder: "e.g. 4",
      value: supportHoursPerSite,
      onChange: setSupportHoursPerSite,
      error: errors.supportHoursPerSite,
    },
    {
      id: "hourlyRate",
      name: "hourlyRate",
      label: "Hourly support rate (USD)",
      required: true,
      helper: "Your blended rate for support and maintenance work.",
      placeholder: "e.g. 75",
      value: hourlyRate,
      onChange: setHourlyRate,
      error: errors.hourlyRate,
    },
    {
      id: "softwareCosts",
      name: "softwareCosts",
      label: "Software, plugin, and license costs (USD)",
      helper: "Total monthly spend on tools, plugins, and licenses across all sites.",
      placeholder: "e.g. 100",
      value: softwareCosts,
      onChange: setSoftwareCosts,
      error: errors.softwareCosts,
    },
    {
      id: "hostingPerSite",
      name: "hostingPerSite",
      label: "Hosting cost per website (USD)",
      helper: "Monthly hosting cost for each single site.",
      placeholder: "e.g. 15",
      value: hostingPerSite,
      onChange: setHostingPerSite,
      error: errors.hostingPerSite,
    },
    {
      id: "profitBufferPercent",
      name: "profitBufferPercent",
      label: "Desired profit buffer (%)",
      required: true,
      helper: "Percentage added on top of your base operating cost to protect margin.",
      value: profitBufferPercent,
      onChange: setProfitBufferPercent,
      suffix: "%",
      error: errors.profitBufferPercent,
    },
  ];

  function reset() {
    setNumberOfSites(DEFAULT_VALUES.numberOfSites);
    setSupportHoursPerSite(DEFAULT_VALUES.supportHoursPerSite);
    setHourlyRate(DEFAULT_VALUES.hourlyRate);
    setSoftwareCosts(DEFAULT_VALUES.softwareCosts);
    setHostingPerSite(DEFAULT_VALUES.hostingPerSite);
    setProfitBufferPercent(DEFAULT_VALUES.profitBufferPercent);
  }

  const explanation = useMemo(() => buildExplanation(parsed, result), [parsed, result]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section aria-labelledby="calculator-heading">
        <form
          noValidate
          onSubmit={(e) => e.preventDefault()}
          aria-describedby="required-note"
          className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6"
        >
          <div className="mb-5 border-b border-neutral-200 pb-4">
            <h2 id="calculator-heading" className="text-base font-semibold text-neutral-900">
              Package inputs
            </h2>
            <p id="required-note" className="mt-1 text-xs text-neutral-500">
              Fields marked * are required. All figures are in USD.
            </p>
          </div>

          <div className="space-y-5">
            {fields.map((field) => (
              <NumberField key={field.id} {...field} />
            ))}
          </div>

          <div className="mt-6 flex items-center border-t border-neutral-200 pt-4">
            <button type="button" onClick={reset} className="btn btn-primary">
              Reset calculator
            </button>
          </div>
        </form>
      </section>

      <aside className="self-start lg:sticky lg:top-6" aria-live="polite">
        <div className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-base font-semibold text-neutral-900">Recommended pricing</h2>

          {result && parsed ? (
            <div>
              <dl className="space-y-3 border-b border-neutral-200 pb-4 text-sm">
                <Row label="Total monthly support hours" value={`${result.totalSupportHours} hrs`} />
                <Row
                  label="Monthly labor cost"
                  value={formatUSD(result.monthlyLaborCost)}
                />
                <Row label="Total hosting cost" value={formatUSD(result.totalHostingCost)} />
                <Row
                  label="Software and license costs"
                  value={formatUSD(result.totalSoftwareCosts)}
                />
                <Row
                  label="Base monthly operating cost"
                  value={formatUSD(result.baseOperatingCost)}
                />
                <Row
                  label={`Profit buffer (${parsed.profitBufferPercent}%)`}
                  value={formatUSD(result.profitBuffer)}
                />
              </dl>

              <dl className="mt-4 space-y-1">
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm font-medium text-neutral-700">
                    Recommended monthly package price
                  </dt>
                  <dd className="text-2xl font-semibold tabular-nums text-accent-dark">
                    {formatUSD(result.monthlyPackagePrice)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-neutral-100 pt-2">
                  <dt className="text-sm text-neutral-600">
                    Per-client monthly price ({parsed.numberOfSites} sites)
                  </dt>
                  <dd className="text-base font-semibold tabular-nums text-neutral-900">
                    {formatUSD(result.perClientPrice)}
                  </dd>
                </div>
              </dl>

              {explanation && (
                <p className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-700">
                  {explanation}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              Enter the required fields (client websites, support hours, and hourly rate) to see
              your recommended pricing below.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-neutral-600">{label}</dt>
      <dd className="font-medium tabular-nums text-neutral-900">{value}</dd>
    </div>
  );
}

function buildExplanation(
  parsed: MaintenanceParsed | null,
  result: ReturnType<typeof calculateMaintenance> | null,
): string | null {
  if (!parsed || !result) return null;

  const parts: string[] = [];
  parts.push(
    `${parsed.numberOfSites} sites at ${parsed.supportHoursPerSite} support hours each gives ${result.totalSupportHours} total monthly hours.`,
  );
  parts.push(
    `At ${formatUSD(parsed.hourlyRate)} per hour, monthly labor is ${formatUSD(result.monthlyLaborCost)}.`,
  );
  const extras: string[] = [];
  if (result.totalHostingCost > 0) {
    extras.push(`hosting of ${formatUSD(result.totalHostingCost)}`);
  }
  if (result.totalSoftwareCosts > 0) {
    extras.push(`software and licenses of ${formatUSD(result.totalSoftwareCosts)}`);
  }
  if (extras.length > 0) {
    parts.push(`Adding ${extras.join(" and ")} gives a base operating cost of ${formatUSD(result.baseOperatingCost)}.`);
  } else {
    parts.push(`With no additional fixed costs, the base operating cost is ${formatUSD(result.baseOperatingCost)}.`);
  }
  parts.push(
    `The ${parsed.profitBufferPercent}% profit buffer adds ${formatUSD(result.profitBuffer)}, so the recommended package price is ${formatUSD(result.monthlyPackagePrice)}.`,
  );
  parts.push(`Split across ${parsed.numberOfSites} sites, each client would pay ${formatUSD(result.perClientPrice)} per month.`);
  return parts.join(" ");
}