export const SITE_NAME = "AgencyCalc";

const DEFAULT_URL = "http://localhost:3000";

/**
 * Resolve the canonical/public site URL.
 *
 * Reads NEXT_PUBLIC_SITE_URL at build time. Set this at deploy time (e.g.
 * "https://www.example.com"). Falls back to localhost for development.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && /^https?:\/\//.test(fromEnv)) {
    return fromEnv.replace(/\/+$/, "");
  }
  return DEFAULT_URL;
}

/**
 * Contact email placeholder for the contact page.
 *
 * Update this before launch. There is no form backend, so this address is what
 * visitors use to reach the site owner.
 */
export const CONTACT_EMAIL = "hello@agencycalctools.com";