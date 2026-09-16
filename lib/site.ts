export const SITE_NAME = "AgencyCalc";

const DEFAULT_URL = "https://raushankumar1503.github.io/agencycalc";

/**
 * Resolve the canonical/public site URL.
 *
 * Reads NEXT_PUBLIC_SITE_URL at build time. Set this at deploy time (e.g.
 * "https://www.example.com"). Falls back to the GitHub Pages URL.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && /^https?:\/\//.test(fromEnv)) {
    return fromEnv.replace(/\/+$/, "");
  }
  return DEFAULT_URL;
}

/**
 * Contact email placeholder — UPDATE BEFORE LAUNCH.
 *
 * There is no form backend, so this address is what visitors use to reach the
 * site owner. Replace with a real address and grep the repo for this string to
 * make sure you haven't missed any references.
 */
export const CONTACT_EMAIL = "your-email@example.com";