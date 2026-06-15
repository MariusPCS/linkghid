/**
 * Brand + locale constants used across the site.
 *
 * Deployment values (`site`/`base`) live in astro.config.mjs and are read at
 * runtime via import.meta.env.SITE / import.meta.env.BASE_URL — do not duplicate
 * them here.
 */

export const SITE = {
  name: 'LinkGhid',
  /** Short tagline shown in the header/hero/meta. */
  tagline: {
    ro: 'Recenzii și comparații care te ajută să alegi corect.',
    en: 'Reviews and comparisons that help you choose well.',
  },
  /** Neutral, factual site description for SEO + Open Graph. */
  description: {
    ro: 'LinkGhid publică recenzii, comparații și ghiduri practice în română și engleză, cu recomandări transparente și linkuri afiliate marcate clar.',
    en: 'LinkGhid publishes reviews, comparisons and practical guides in Romanian and English, with transparent recommendations and clearly marked affiliate links.',
  },
  contactEmail: 'puscasudmarius@gmail.com',
  /** Affiliate network powering monetized links. */
  affiliateNetwork: 'Profitshare',
} as const;

export const LOCALES = ['ro', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ro';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
