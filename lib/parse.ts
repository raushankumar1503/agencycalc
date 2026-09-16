/**
 * Normalize a user-typed numeric string. Accepts commas and a leading "$" for
 * convenience, trims whitespace. Returns null when blank or not a number.
 */
export function parseNumber(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isNaN(n) ? null : n;
}