import { parseNumber } from "./parse";

export interface RawScopeCreepForm {
  originalProjectPrice: string;
  originalEstimatedHours: string;
  additionalRequestedHours: string;
  additionalRevisionRounds: string;
  revisionRoundCost: string;
  rushSurchargePercent: string;
}

export interface ScopeCreepParsed {
  originalProjectPrice: number;
  originalEstimatedHours: number;
  additionalRequestedHours: number;
  additionalRevisionRounds: number;
  revisionRoundCost: number;
  rushSurchargePercent: number;
}

export type ScopeCreepErrorKey =
  | "originalProjectPrice"
  | "originalEstimatedHours"
  | "additionalRequestedHours"
  | "additionalRevisionRounds"
  | "revisionRoundCost"
  | "rushSurchargePercent";

export type ScopeCreepErrors = Record<ScopeCreepErrorKey, string | null>;

export interface ScopeCreepValidation {
  parsed: ScopeCreepParsed | null;
  errors: ScopeCreepErrors;
}

/**
 * Client-side validation with readable inline messages. Results only render
 * when the whole form is valid.
 */
export function validateScopeCreepForm(raw: RawScopeCreepForm): ScopeCreepValidation {
  const errors: ScopeCreepErrors = {
    originalProjectPrice: null,
    originalEstimatedHours: null,
    additionalRequestedHours: null,
    additionalRevisionRounds: null,
    revisionRoundCost: null,
    rushSurchargePercent: null,
  };

  const price = parseNumber(raw.originalProjectPrice);
  if (price === null) {
    errors.originalProjectPrice = "Enter the original project price. Minimum $1.";
  } else if (price < 1) {
    errors.originalProjectPrice = "Original project price must be at least $1.";
  }

  const estHours = parseNumber(raw.originalEstimatedHours);
  if (estHours === null) {
    errors.originalEstimatedHours = "Enter the original estimated hours. Minimum 1.";
  } else if (estHours < 1) {
    errors.originalEstimatedHours = "Original estimated hours must be at least 1.";
  }

  const addHours = parseNumber(raw.additionalRequestedHours);
  if (addHours === null) {
    errors.additionalRequestedHours = "Enter additional requested hours. Minimum 0.";
  } else if (addHours < 0) {
    errors.additionalRequestedHours = "Additional hours cannot be negative.";
  }

  const revRoundsBlank = raw.additionalRevisionRounds.trim() === "";
  const revRounds = revRoundsBlank ? 0 : parseNumber(raw.additionalRevisionRounds);
  if (!revRoundsBlank && revRounds === null) {
    errors.additionalRevisionRounds = "Enter a non-negative whole number.";
  } else if (revRounds !== null && (revRounds < 0 || !Number.isInteger(revRounds))) {
    errors.additionalRevisionRounds =
      "Revision rounds must be a non-negative whole number.";
  }

  const revCostBlank = raw.revisionRoundCost.trim() === "";
  const revCost = revCostBlank ? 0 : parseNumber(raw.revisionRoundCost);
  if (!revCostBlank && revCost === null) {
    errors.revisionRoundCost = "Enter a number, or leave blank for $0.";
  } else if (revCost !== null && revCost < 0) {
    errors.revisionRoundCost = "Revision round cost cannot be negative.";
  }

  const rush = parseNumber(raw.rushSurchargePercent);
  if (rush === null) {
    errors.rushSurchargePercent =
      "Enter a rush surcharge between 0 and 100, or 0 for none.";
  } else if (rush < 0 || rush > 100) {
    errors.rushSurchargePercent = "Rush surcharge must be between 0 and 100.";
  }

  const hasError = Object.values(errors).some((e) => e !== null);
  if (hasError) {
    return { parsed: null, errors };
  }

  const parsed: ScopeCreepParsed = {
    originalProjectPrice: price as number,
    originalEstimatedHours: estHours as number,
    additionalRequestedHours: addHours as number,
    additionalRevisionRounds: revRounds as number,
    revisionRoundCost: revCost as number,
    rushSurchargePercent: rush as number,
  };

  return { parsed, errors };
}