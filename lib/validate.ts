import { parseNumber } from "./parse";

export interface RawQuoteForm {
  estimatedHours: string;
  hourlyRate: string;
  fixedCosts: string;
  revisionRounds: string;
  extraRevisionRate: string;
  profitBufferPercent: string;
}

export interface QuoteParsed {
  estimatedHours: number;
  hourlyRate: number;
  fixedCosts: number;
  revisionRounds: number;
  extraRevisionRate: number;
  profitBufferPercent: number;
}

export type FieldErrorKey =
  | "estimatedHours"
  | "hourlyRate"
  | "fixedCosts"
  | "revisionRounds"
  | "extraRevisionRate"
  | "profitBufferPercent";

export type FieldErrors = Record<FieldErrorKey, string | null>;

export interface QuoteValidation {
  /** Resolved, valid inputs ready for calculation. Null if the form is invalid. */
  parsed: QuoteParsed | null;
  errors: FieldErrors;
}

/**
 * Client-side validation with human-readable inline messages.
 * Required-empty fields and invalid values produce an error; results are only
 * shown when the whole form is valid.
 */
export function validateQuoteForm(raw: RawQuoteForm): QuoteValidation {
  const errors: FieldErrors = {
    estimatedHours: null,
    hourlyRate: null,
    fixedCosts: null,
    revisionRounds: null,
    extraRevisionRate: null,
    profitBufferPercent: null,
  };

  // Estimated hours — required, minimum 1.
  const hours = parseNumber(raw.estimatedHours);
  if (hours === null) {
    errors.estimatedHours = "Enter total estimated hours. Minimum 1 hour.";
  } else if (hours < 1) {
    errors.estimatedHours = "Estimated hours must be at least 1.";
  }

  // Hourly rate — required, minimum $1.
  const rate = parseNumber(raw.hourlyRate);
  if (rate === null) {
    errors.hourlyRate = "Enter an hourly rate in USD. Minimum $1.";
  } else if (rate < 1) {
    errors.hourlyRate = "Hourly rate must be at least $1.";
  }

  // Fixed costs — optional, defaults to 0 when blank; cannot be negative.
  const fixedBlank = raw.fixedCosts.trim() === "";
  const fixed = fixedBlank ? 0 : parseNumber(raw.fixedCosts);
  if (!fixedBlank && fixed === null) {
    errors.fixedCosts = "Enter a number, or leave blank for $0.";
  } else if (fixed !== null && fixed < 0) {
    errors.fixedCosts = "Fixed costs cannot be negative.";
  }

  // Revision rounds included — optional, defaults to 2; non-negative whole number.
  const roundsBlank = raw.revisionRounds.trim() === "";
  const rounds = roundsBlank ? 0 : parseNumber(raw.revisionRounds);
  if (!roundsBlank && rounds === null) {
    errors.revisionRounds = "Enter a non-negative whole number.";
  } else if (rounds !== null && (rounds < 0 || !Number.isInteger(rounds))) {
    errors.revisionRounds = "Revision rounds must be a non-negative whole number.";
  }

  // Extra revision rate — optional, defaults to 0; cannot be negative.
  const revBlank = raw.extraRevisionRate.trim() === "";
  const rev = revBlank ? 0 : parseNumber(raw.extraRevisionRate);
  if (!revBlank && rev === null) {
    errors.extraRevisionRate = "Enter a number, or leave blank for $0.";
  } else if (rev !== null && rev < 0) {
    errors.extraRevisionRate = "Revision rate cannot be negative.";
  }

  // Profit buffer — required within 0–100.
  const pct = parseNumber(raw.profitBufferPercent);
  if (pct === null) {
    errors.profitBufferPercent = "Enter a profit buffer between 0 and 100, or 0 for none.";
  } else if (pct < 0 || pct > 100) {
    errors.profitBufferPercent = "Profit buffer must be between 0 and 100.";
  }

  const hasError = Object.values(errors).some((e) => e !== null);
  if (hasError) {
    return { parsed: null, errors };
  }

  const parsed: QuoteParsed = {
    estimatedHours: hours as number,
    hourlyRate: rate as number,
    fixedCosts: fixed as number,
    revisionRounds: rounds as number,
    extraRevisionRate: rev as number,
    profitBufferPercent: pct as number,
  };

  return { parsed, errors };
}