"use client";

import { useMemo, useState } from "react";
import { calculateQuote, formatUSD } from "@/lib/quote";
import {
  validateQuoteForm,
  type FieldErrors,
  type QuoteParsed,
} from "@/lib/validate";
import NumberField, { type NumberFieldProps } from "@/components/NumberField";

const DEFAULT_VALUES = {
  projectName: "",
  estimatedHours: "",
  hourlyRate: "",
  fixedCosts: "0",
  revisionRounds: "2",
  extraRevisionRate: "0",
  profitBufferPercent: "15",
};

export default function QuoteCalculator() {
  const [projectName, setProjectName] = useState(DEFAULT_VALUES.projectName);
  const [estimatedHours, setEstimatedHours] = useState(DEFAULT_VALUES.estimatedHours);
  const [hourlyRate, setHourlyRate] = useState(DEFAULT_VALUES.hourlyRate);
  const [fixedCosts, setFixedCosts] = useState(DEFAULT_VALUES.fixedCosts);
  const [revisionRounds, setRevisionRounds] = useState(DEFAULT_VALUES.revisionRounds);
  const [extraRevisionRate, setExtraRevisionRate] = useState(DEFAULT_VALUES.extraRevisionRate);
  const [profitBufferPercent, setProfitBufferPercent] = useState(
    DEFAULT_VALUES.profitBufferPercent,
  );

  const validation = useMemo(
    () =>
      validateQuoteForm({
        estimatedHours,
        hourlyRate,
        fixedCosts,
        revisionRounds,
        extraRevisionRate,
        profitBufferPercent,
      }),
    [estimatedHours, hourlyRate, fixedCosts, revisionRounds, extraRevisionRate, profitBufferPercent],
  );

  const parsed: QuoteParsed | null = validation.parsed;
  const errors: FieldErrors = validation.errors;

  const result = useMemo(
    () =>
      parsed
        ? calculateQuote({
            estimatedHours: parsed.estimatedHours,
            hourlyRate: parsed.hourlyRate,
            fixedCosts: parsed.fixedCosts,
            revisionRoundsIncluded: parsed.revisionRounds,
            extraRevisionRate: parsed.extraRevisionRate,
            profitBufferPercent: parsed.profitBufferPercent,
          })
        : null,
    [parsed],
  );

  const fields: NumberFieldProps[] = [
    {
      id: "estimatedHours",
      name: "estimatedHours",
      label: "Estimated hours",
      required: true,
      helper: "Total billable hours you expect for this project.",
      placeholder: "e.g. 40",
      value: estimatedHours,
      onChange: setEstimatedHours,
      error: errors.estimatedHours,
    },
    {
      id: "hourlyRate",
      name: "hourlyRate",
      label: "Hourly rate (USD)",
      required: true,
      helper: "Your blended rate across the team and tasks.",
      placeholder: "e.g. 75",
      value: hourlyRate,
      onChange: setHourlyRate,
      error: errors.hourlyRate,
    },
    {
      id: "fixedCosts",
      name: "fixedCosts",
      label: "Fixed costs (USD)",
      helper: "Subscriptions, hosting, outside help, licenses - anything not time-based.",
      placeholder: "e.g. 500",
      value: fixedCosts,
      onChange: setFixedCosts,
      error: errors.fixedCosts,
    },
    {
      id: "revisionRounds",
      name: "revisionRounds",
      label: "Revision rounds included",
      helper: "How many revision rounds this price covers before extra rates apply.",
      value: revisionRounds,
      onChange: setRevisionRounds,
      error: errors.revisionRounds,
    },
    {
      id: "extraRevisionRate",
      name: "extraRevisionRate",
      label: "Extra revision rate (USD)",
      helper: "Flat charge for each revision round beyond those included. Optional - 0 or blank means you do not charge for extras.",
      placeholder: "e.g. 40",
      value: extraRevisionRate,
      onChange: setExtraRevisionRate,
      error: errors.extraRevisionRate,
    },
    {
      id: "profitBufferPercent",
      name: "profitBufferPercent",
      label: "Profit buffer (%)",
      required: true,
      helper: "Percentage added on top of your base cost to protect your margin.",
      value: profitBufferPercent,
      onChange: setProfitBufferPercent,
      suffix: "%",
      error: errors.profitBufferPercent,
    },
  ];

  function reset() {
    setProjectName(DEFAULT_VALUES.projectName);
    setEstimatedHours(DEFAULT_VALUES.estimatedHours);
    setHourlyRate(DEFAULT_VALUES.hourlyRate);
    setFixedCosts(DEFAULT_VALUES.fixedCosts);
    setRevisionRounds(DEFAULT_VALUES.revisionRounds);
    setExtraRevisionRate(DEFAULT_VALUES.extraRevisionRate);
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
              Project details
            </h2>
            <p id="required-note" className="mt-1 text-xs text-neutral-500">
              Fields marked * are required. All figures are in USD.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="projectName" className="field-label">
                Project name <span className="font-normal text-neutral-500">(optional)</span>
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                autoComplete="off"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Acme marketing site"
                className="field-input text-left placeholder:text-left"
              />
              <p className="field-helper">Just a label for your own reference. Never shown in results.</p>
            </div>

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
          <h2 className="mb-4 text-base font-semibold text-neutral-900">Suggested quote</h2>

          {result && parsed ? (
            <div>
              <dl className="space-y-3 border-b border-neutral-200 pb-4 text-sm">
                <Row label="Labor subtotal" value={formatUSD(result.laborSubtotal)} />
                <Row label="Fixed-cost subtotal" value={formatUSD(result.fixedCostSubtotal)} />
                <Row
                  label={`Profit buffer (${parsed.profitBufferPercent}%)`}
                  value={formatUSD(result.profitBuffer)}
                />
                {result.optionalRevisionCost > 0 && (
                  <Row
                    label="Optional revision cost"
                    value={`${formatUSD(result.optionalRevisionCost)} per round`}
                  />
                )}
              </dl>

              <dl className="mt-4 flex items-baseline justify-between">
                <dt className="text-sm font-medium text-neutral-700">Suggested project quote</dt>
                <dd className="text-2xl font-semibold tabular-nums text-accent-dark">
                  {formatUSD(result.suggestedQuote)}
                </dd>
              </dl>

              {parsed.extraRevisionRate > 0 && (
                <p className="mt-2 text-xs text-neutral-500">
                  Includes {parsed.revisionRounds} revision round
                  {parsed.revisionRounds === 1 ? "" : "s"}. Additional rounds billed at{" "}
                  {formatUSD(result.optionalRevisionCost)} each.
                </p>
              )}

              {explanation && (
                <p className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-700">
                  {explanation}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              Enter the required fields (estimated hours and hourly rate) to see your quote
              calculated below.
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
  parsed: QuoteParsed | null,
  result: ReturnType<typeof calculateQuote> | null,
): string | null {
  if (!parsed || !result) return null;

  const parts: string[] = [];
  parts.push(
    `Estimated ${parsed.estimatedHours} hours at ${formatUSD(parsed.hourlyRate)} per hour gives a labor cost of ${formatUSD(result.laborSubtotal)}.`,
  );
  if (parsed.fixedCosts > 0) {
    parts.push(
      `Adding ${formatUSD(parsed.fixedCosts)} in fixed costs brings the base estimate to ${formatUSD(result.baseCost)}.`,
    );
  } else {
    parts.push(`With no fixed costs, the base estimate is ${formatUSD(result.baseCost)}.`);
  }
  parts.push(
    `The ${parsed.profitBufferPercent}% profit buffer adds ${formatUSD(result.profitBuffer)}, so the suggested quote is ${formatUSD(result.suggestedQuote)}.`,
  );
  if (parsed.revisionRounds > 0) {
    parts.push(`This price includes ${parsed.revisionRounds} revision round${parsed.revisionRounds === 1 ? "" : "s"}.`);
  }
  return parts.join(" ");
}