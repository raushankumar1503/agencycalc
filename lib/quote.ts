export interface QuoteInputs {
  estimatedHours: number;
  hourlyRate: number;
  fixedCosts: number;
  revisionRoundsIncluded: number;
  extraRevisionRate: number;
  profitBufferPercent: number;
}

export interface QuoteResult {
  laborSubtotal: number;
  fixedCostSubtotal: number;
  baseCost: number;
  profitBuffer: number;
  suggestedQuote: number;
  optionalRevisionCost: number;
}

/**
 * Pure quote math. Kept free of React/DOM so it can be unit-tested directly.
 *
 * Rounds intermediate money figures to 2 decimals via the helper below so the
 * displayed subtotals, buffer, and quote are consistent with one another.
 */
export function calculateQuote(input: QuoteInputs): QuoteResult {
  const laborSubtotal = round2(input.estimatedHours * input.hourlyRate);
  const fixedCostSubtotal = round2(input.fixedCosts);
  const baseCost = round2(laborSubtotal + fixedCostSubtotal);
  const profitBuffer = round2(baseCost * (input.profitBufferPercent / 100));
  const suggestedQuote = round2(baseCost + profitBuffer);
  const optionalRevisionCost = round2(input.extraRevisionRate);

  return {
    laborSubtotal,
    fixedCostSubtotal,
    baseCost,
    profitBuffer,
    suggestedQuote,
    optionalRevisionCost,
  };
}

/** Round to 2 decimal places (for USD display) without float drift. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Format a number as a readable USD string. */
export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}