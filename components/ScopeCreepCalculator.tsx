"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import NumberField, { type NumberFieldProps } from "@/components/NumberField";
import { formatUSD } from "@/lib/quote";
import {
  validateScopeCreepForm,
  type ScopeCreepErrors,
  type ScopeCreepParsed,
} from "@/lib/validate-scope-creep";
import { calculateScopeCreep } from "@/lib/scope-creep";

const DEFAULT_VALUES = {
  originalProjectPrice: "",
  originalEstimatedHours: "",
  additionalRequestedHours: "",
  additionalRevisionRounds: "0",
  revisionRoundCost: "0",
  rushSurchargePercent: "0",
};

export default function ScopeCreepCalculator() {
  const [originalProjectPrice, setOriginalProjectPrice] = useState(
    DEFAULT_VALUES.originalProjectPrice,
  );
  const [originalEstimatedHours, setOriginalEstimatedHours] = useState(
    DEFAULT_VALUES.originalEstimatedHours,
  );
  const [additionalRequestedHours, setAdditionalRequestedHours] = useState(
    DEFAULT_VALUES.additionalRequestedHours,
  );
  const [additionalRevisionRounds, setAdditionalRevisionRounds] = useState(
    DEFAULT_VALUES.additionalRevisionRounds,
  );
  const [revisionRoundCost, setRevisionRoundCost] = useState(
    DEFAULT_VALUES.revisionRoundCost,
  );
  const [rushSurchargePercent, setRushSurchargePercent] = useState(
    DEFAULT_VALUES.rushSurchargePercent,
  );
  const [changeDescription, setChangeDescription] = useState("");

  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const validation = useMemo(
    () =>
      validateScopeCreepForm({
        originalProjectPrice,
        originalEstimatedHours,
        additionalRequestedHours,
        additionalRevisionRounds,
        revisionRoundCost,
        rushSurchargePercent,
      }),
    [
      originalProjectPrice,
      originalEstimatedHours,
      additionalRequestedHours,
      additionalRevisionRounds,
      revisionRoundCost,
      rushSurchargePercent,
    ],
  );

  const parsed: ScopeCreepParsed | null = validation.parsed;
  const errors: ScopeCreepErrors = validation.errors;

  const result = useMemo(
    () =>
      parsed
        ? calculateScopeCreep({
            originalProjectPrice: parsed.originalProjectPrice,
            originalEstimatedHours: parsed.originalEstimatedHours,
            additionalRequestedHours: parsed.additionalRequestedHours,
            additionalRevisionRounds: parsed.additionalRevisionRounds,
            revisionRoundCost: parsed.revisionRoundCost,
            rushSurchargePercent: parsed.rushSurchargePercent,
          })
        : null,
    [parsed],
  );

  const clientMessage = useMemo(() => {
    if (!result || !parsed) return null;
    if (
      parsed.additionalRequestedHours === 0 &&
      result.revisionCost === 0 &&
      result.rushSurcharge === 0
    ) {
      return null;
    }
    const hoursWord = parsed.additionalRequestedHours === 1 ? "hour" : "hours";
    const description = changeDescription.trim();
    if (description) {
      return `Thanks for outlining the requested changes for: ${description}. These items are outside the original project scope and require an estimated ${parsed.additionalRequestedHours} additional ${hoursWord}. The additional work is estimated at ${formatUSD(result.recommendedAdditionalFee)}. Once approved, I can add it to the project plan.`;
    }
    return `Thanks for outlining the requested changes. These items are outside the original project scope and require an estimated ${parsed.additionalRequestedHours} additional ${hoursWord}. The additional work is estimated at ${formatUSD(result.recommendedAdditionalFee)}. Once approved, I can add it to the project plan.`;
  }, [parsed, result, changeDescription]);

  const handleCopy = useCallback(async () => {
    if (!clientMessage) return;
    try {
      await navigator.clipboard.writeText(clientMessage);
      setCopyState("copied");
    } catch {
      // Clipboard API may be unavailable; fail silently.
    }
  }, [clientMessage]);

  // Reset copy confirmation after 2 seconds.
  useEffect(() => {
    if (copyState !== "copied") return;
    const timer = window.setTimeout(() => setCopyState("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const fields: NumberFieldProps[] = [
    {
      id: "originalProjectPrice",
      name: "originalProjectPrice",
      label: "Original project price (USD)",
      required: true,
      helper: "The agreed-upon price for the original project scope.",
      placeholder: "e.g. 8000",
      value: originalProjectPrice,
      onChange: setOriginalProjectPrice,
      error: errors.originalProjectPrice,
    },
    {
      id: "originalEstimatedHours",
      name: "originalEstimatedHours",
      label: "Original estimated hours",
      required: true,
      helper: "Hours you estimated at the start of the project.",
      placeholder: "e.g. 80",
      value: originalEstimatedHours,
      onChange: setOriginalEstimatedHours,
      error: errors.originalEstimatedHours,
    },
    {
      id: "additionalRequestedHours",
      name: "additionalRequestedHours",
      label: "Additional requested hours",
      required: true,
      helper: "New work the client is asking for, in hours.",
      placeholder: "e.g. 20",
      value: additionalRequestedHours,
      onChange: setAdditionalRequestedHours,
      error: errors.additionalRequestedHours,
    },
    {
      id: "additionalRevisionRounds",
      name: "additionalRevisionRounds",
      label: "Additional revision rounds",
      helper: "Revision rounds on the additional work (beyond what was included).",
      value: additionalRevisionRounds,
      onChange: setAdditionalRevisionRounds,
      error: errors.additionalRevisionRounds,
    },
    {
      id: "revisionRoundCost",
      name: "revisionRoundCost",
      label: "Cost per additional revision round (USD)",
      helper: "Flat charge for each revision round on the new scope.",
      placeholder: "e.g. 50",
      value: revisionRoundCost,
      onChange: setRevisionRoundCost,
      error: errors.revisionRoundCost,
    },
    {
      id: "rushSurchargePercent",
      name: "rushSurchargePercent",
      label: "Rush-work surcharge (%)",
      helper: "Surcharge added when the client requests expedited delivery.",
      value: rushSurchargePercent,
      onChange: setRushSurchargePercent,
      suffix: "%",
      error: errors.rushSurchargePercent,
    },
  ];

  function reset() {
    setOriginalProjectPrice(DEFAULT_VALUES.originalProjectPrice);
    setOriginalEstimatedHours(DEFAULT_VALUES.originalEstimatedHours);
    setAdditionalRequestedHours(DEFAULT_VALUES.additionalRequestedHours);
    setAdditionalRevisionRounds(DEFAULT_VALUES.additionalRevisionRounds);
    setRevisionRoundCost(DEFAULT_VALUES.revisionRoundCost);
    setRushSurchargePercent(DEFAULT_VALUES.rushSurchargePercent);
    setChangeDescription("");
    setCopyState("idle");
  }

  const explanation = useMemo(
    () => buildExplanation(parsed, result),
    [parsed, result],
  );

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
              Project and change-request details
            </h2>
            <p id="required-note" className="mt-1 text-xs text-neutral-500">
              Fields marked * are required. All figures are in USD.
            </p>
          </div>

          <div className="space-y-5">
            {fields.map((field) => (
              <NumberField key={field.id} {...field} />
            ))}

            <div>
              <label htmlFor="changeDescription" className="field-label">
                Change-request description{" "}
                <span className="font-normal text-neutral-500">(optional)</span>
              </label>
              <textarea
                id="changeDescription"
                name="changeDescription"
                rows={2}
                autoComplete="off"
                value={changeDescription}
                onChange={(e) => setChangeDescription(e.target.value)}
                placeholder="e.g. Add a blog section and connect to a newsletter API"
                className="field-input text-left placeholder:text-left resize-none"
              />
              <p className="field-helper">
                For your own reference and included in the client message when
                provided.
              </p>
            </div>
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
          <h2 className="mb-4 text-base font-semibold text-neutral-900">
            Scope-creep fee
          </h2>

          {result && parsed ? (
            <div>
              <dl className="space-y-3 border-b border-neutral-200 pb-4 text-sm">
                <Row
                  label="Implied original hourly value"
                  value={formatUSD(result.originalHourlyValue)}
                />
                <Row
                  label="Additional labor cost"
                  value={formatUSD(result.additionalLaborCost)}
                />
                <Row
                  label="Extra revision cost"
                  value={formatUSD(result.revisionCost)}
                />
                <Row label="Rush surcharge" value={formatUSD(result.rushSurcharge)} />
              </dl>

              <dl className="mt-4 space-y-1">
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm font-medium text-neutral-700">
                    Recommended additional fee
                  </dt>
                  <dd className="text-2xl font-semibold tabular-nums text-accent-dark">
                    {formatUSD(result.recommendedAdditionalFee)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-neutral-100 pt-2">
                  <dt className="text-sm text-neutral-600">
                    Updated total project price
                  </dt>
                  <dd className="text-base font-semibold tabular-nums text-neutral-900">
                    {formatUSD(result.updatedProjectPrice)}
                  </dd>
                </div>
              </dl>

              {clientMessage && (
                <div className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-3">
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {clientMessage}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn mt-2"
                    aria-live="polite"
                  >
                    {copyState === "copied" ? "Copied to clipboard" : "Copy message"}
                  </button>
                </div>
              )}

              {explanation && (
                <p className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-700">
                  {explanation}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              Enter the original project price, estimated hours, and additional
              requested hours to see your recommended scope-creep fee below.
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
  parsed: ScopeCreepParsed | null,
  result: ReturnType<typeof calculateScopeCreep> | null,
): string | null {
  if (!parsed || !result) return null;

  const parts: string[] = [];
  parts.push(
    `Your original project of ${formatUSD(parsed.originalProjectPrice)} over ${parsed.originalEstimatedHours} hours implies a rate of ${formatUSD(result.originalHourlyValue)} per hour.`,
  );
  parts.push(
    `The additional ${parsed.additionalRequestedHours} hours at that rate come to ${formatUSD(result.additionalLaborCost)}.`,
  );
  if (result.revisionCost > 0) {
    parts.push(
      `Adding ${parsed.additionalRevisionRounds} revision round${parsed.additionalRevisionRounds === 1 ? "" : "s"} at ${formatUSD(parsed.revisionRoundCost)} each gives ${formatUSD(result.revisionCost)}.`,
    );
  }
  if (result.rushSurcharge > 0) {
    parts.push(
      `The ${parsed.rushSurchargePercent}% rush surcharge adds ${formatUSD(result.rushSurcharge)}.`,
    );
  }
  parts.push(
    `The recommended additional fee is ${formatUSD(result.recommendedAdditionalFee)}, bringing the updated project price to ${formatUSD(result.updatedProjectPrice)}.`,
  );
  return parts.join(" ");
}