export interface ScopeCreepInputs {
  originalProjectPrice: number;
  originalEstimatedHours: number;
  additionalRequestedHours: number;
  additionalRevisionRounds: number;
  revisionRoundCost: number;
  rushSurchargePercent: number;
}

export interface ScopeCreepResult {
  originalHourlyValue: number;
  additionalLaborCost: number;
  revisionCost: number;
  subtotal: number;
  rushSurcharge: number;
  recommendedAdditionalFee: number;
  updatedProjectPrice: number;
}

/**
 * Pure scope-creep math, kept React/DOM-free for direct testing.
 * Money figures are rounded to 2 decimals so displayed subtotals reconcile.
 */
export function calculateScopeCreep(input: ScopeCreepInputs): ScopeCreepResult {
  const originalHourlyValue =
    input.originalEstimatedHours > 0
      ? round2(input.originalProjectPrice / input.originalEstimatedHours)
      : 0;
  const additionalLaborCost = round2(input.additionalRequestedHours * originalHourlyValue);
  const revisionCost = round2(input.additionalRevisionRounds * input.revisionRoundCost);
  const subtotal = round2(additionalLaborCost + revisionCost);
  const rushSurcharge = round2(subtotal * (input.rushSurchargePercent / 100));
  const recommendedAdditionalFee = round2(subtotal + rushSurcharge);
  const updatedProjectPrice = round2(input.originalProjectPrice + recommendedAdditionalFee);

  return {
    originalHourlyValue,
    additionalLaborCost,
    revisionCost,
    subtotal,
    rushSurcharge,
    recommendedAdditionalFee,
    updatedProjectPrice,
  };
}

/** Round to 2 decimal places (USD) without float drift. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}