export interface MaintenanceInputs {
  numberOfSites: number;
  supportHoursPerSite: number;
  hourlyRate: number;
  softwareCosts: number;
  hostingPerSite: number;
  profitBufferPercent: number;
}

export interface MaintenanceResult {
  totalSupportHours: number;
  monthlyLaborCost: number;
  totalHostingCost: number;
  totalSoftwareCosts: number;
  baseOperatingCost: number;
  profitBuffer: number;
  monthlyPackagePrice: number;
  perClientPrice: number;
}

/**
 * Pure maintenance-package math, kept React/DOM-free for direct testing.
 * Money figures are rounded to 2 decimals so displayed subtotals reconcile.
 */
export function calculateMaintenance(input: MaintenanceInputs): MaintenanceResult {
  const totalSupportHours = input.numberOfSites * input.supportHoursPerSite;
  const monthlyLaborCost = round2(totalSupportHours * input.hourlyRate);
  const totalHostingCost = round2(input.numberOfSites * input.hostingPerSite);
  const totalSoftwareCosts = round2(input.softwareCosts);
  const baseOperatingCost = round2(monthlyLaborCost + totalHostingCost + totalSoftwareCosts);
  const profitBuffer = round2(baseOperatingCost * (input.profitBufferPercent / 100));
  const monthlyPackagePrice = round2(baseOperatingCost + profitBuffer);
  const perClientPrice = round2(monthlyPackagePrice / input.numberOfSites);

  return {
    totalSupportHours,
    monthlyLaborCost,
    totalHostingCost,
    totalSoftwareCosts,
    baseOperatingCost,
    profitBuffer,
    monthlyPackagePrice,
    perClientPrice,
  };
}

/** Round to 2 decimal places (USD) without float drift. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}