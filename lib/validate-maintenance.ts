import { parseNumber } from "./parse";

export interface RawMaintenanceForm {
  numberOfSites: string;
  supportHoursPerSite: string;
  hourlyRate: string;
  softwareCosts: string;
  hostingPerSite: string;
  profitBufferPercent: string;
}

export interface MaintenanceParsed {
  numberOfSites: number;
  supportHoursPerSite: number;
  hourlyRate: number;
  softwareCosts: number;
  hostingPerSite: number;
  profitBufferPercent: number;
}

export type MaintenanceErrorKey =
  | "numberOfSites"
  | "supportHoursPerSite"
  | "hourlyRate"
  | "softwareCosts"
  | "hostingPerSite"
  | "profitBufferPercent";

export type MaintenanceErrors = Record<MaintenanceErrorKey, string | null>;

export interface MaintenanceValidation {
  parsed: MaintenanceParsed | null;
  errors: MaintenanceErrors;
}

/**
 * Client-side validation with readable inline messages. Results only render
 * when the whole form is valid.
 */
export function validateMaintenanceForm(raw: RawMaintenanceForm): MaintenanceValidation {
  const errors: MaintenanceErrors = {
    numberOfSites: null,
    supportHoursPerSite: null,
    hourlyRate: null,
    softwareCosts: null,
    hostingPerSite: null,
    profitBufferPercent: null,
  };

  // Number of sites — required, minimum 1, whole number.
  const sites = parseNumber(raw.numberOfSites);
  if (sites === null) {
    errors.numberOfSites = "Enter the number of client websites. Minimum 1.";
  } else if (sites < 1) {
    errors.numberOfSites = "Client websites must be at least 1.";
  } else if (!Number.isInteger(sites)) {
    errors.numberOfSites = "Client websites must be a whole number.";
  }

  // Support hours per site — required, minimum 0.
  const hours = parseNumber(raw.supportHoursPerSite);
  if (hours === null) {
    errors.supportHoursPerSite = "Enter monthly support hours per website. Minimum 0.";
  } else if (hours < 0) {
    errors.supportHoursPerSite = "Support hours cannot be negative.";
  }

  // Hourly support rate — required, minimum $1.
  const rate = parseNumber(raw.hourlyRate);
  if (rate === null) {
    errors.hourlyRate = "Enter an hourly rate in USD. Minimum $1.";
  } else if (rate < 1) {
    errors.hourlyRate = "Hourly rate must be at least $1.";
  }

  // Software/plugin/license costs — optional, 0 when blank, cannot be negative.
  const swBlank = raw.softwareCosts.trim() === "";
  const software = swBlank ? 0 : parseNumber(raw.softwareCosts);
  if (!swBlank && software === null) {
    errors.softwareCosts = "Enter a number, or leave blank for $0.";
  } else if (software !== null && software < 0) {
    errors.softwareCosts = "Software costs cannot be negative.";
  }

  // Hosting cost per site — optional, 0 when blank, cannot be negative.
  const hostBlank = raw.hostingPerSite.trim() === "";
  const hosting = hostBlank ? 0 : parseNumber(raw.hostingPerSite);
  if (!hostBlank && hosting === null) {
    errors.hostingPerSite = "Enter a number, or leave blank for $0.";
  } else if (hosting !== null && hosting < 0) {
    errors.hostingPerSite = "Hosting costs cannot be negative.";
  }

  // Desired profit buffer — required within 0–100.
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

  const parsed: MaintenanceParsed = {
    numberOfSites: sites as number,
    supportHoursPerSite: hours as number,
    hourlyRate: rate as number,
    softwareCosts: software as number,
    hostingPerSite: hosting as number,
    profitBufferPercent: pct as number,
  };

  return { parsed, errors };
}