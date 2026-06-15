import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from '../config';

/**
 * URL + locale helpers. All page links must go through `pagePath()` so the
 * GitHub Pages `base` (/linkghid) is always applied correctly.
 */

const RAW_BASE = import.meta.env.BASE_URL; // e.g. "/linkghid/" (trailing slash)

/** Base with a single trailing slash, never empty. */
function base(): string {
  const b = RAW_BASE || '/';
  return b.endsWith('/') ? b : b + '/';
}

/** Base with no trailing slash, for prefix matching. e.g. "/linkghid" or "". */
function baseNoSlash(): string {
  return base().replace(/\/$/, '');
}

/**
 * Build a base-prefixed, trailing-slash page path.
 * pagePath('ro', 'reviews', 'x') -> "/linkghid/ro/reviews/x/"
 * pagePath('ro')                 -> "/linkghid/ro/"
 * pagePath()                     -> "/linkghid/"
 */
export function pagePath(...segments: Array<string | undefined | null>): string {
  const parts = segments
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
    .map((s) => s.replace(/^\/+|\/+$/g, ''));
  const joined = base() + parts.join('/');
  const collapsed = joined.replace(/\/{2,}/g, '/');
  return collapsed.endsWith('/') ? collapsed : collapsed + '/';
}

/** Path to an asset in /public (no trailing slash added). */
export function assetPath(file: string): string {
  return (base() + file.replace(/^\/+/, '')).replace(/\/{2,}/g, '/');
}

/** Replace the locale segment in a pathname (used by the language switcher). */
export function swapLocale(pathname: string, to: Locale): string {
  const b = baseNoSlash();
  const rest = pathname.startsWith(b) ? pathname.slice(b.length) : pathname;
  const swapped = rest.replace(/^\/(ro|en)(?=\/|$)/, `/${to}`);
  // If there was no locale segment, fall back to the locale home.
  if (swapped === rest && !/^\/(ro|en)(\/|$)/.test(rest)) {
    return pagePath(to);
  }
  return (b + swapped).replace(/\/{2,}/g, '/') || '/';
}

/** All locales other than the given one. */
export function otherLocales(locale: Locale): Locale[] {
  return LOCALES.filter((l) => l !== locale);
}

/**
 * hreflang alternates for a "mirror" page that exists at the same path segments
 * in every locale (home, listings, static pages). Includes an x-default.
 */
export function mirrorAlternates(
  ...segments: Array<string | undefined>
): Array<{ hreflang: string; href: string }> {
  const segs = segments.filter((s): s is string => typeof s === 'string' && s.length > 0);
  const alts = LOCALES.map((l) => ({ hreflang: l, href: pagePath(l, ...segs) }));
  return [...alts, { hreflang: 'x-default', href: pagePath(DEFAULT_LOCALE, ...segs) }];
}

/** Per-locale URL map for the same mirror page (for the language switcher). */
export function mirrorTranslations(
  ...segments: Array<string | undefined>
): Partial<Record<Locale, string>> {
  const segs = segments.filter((s): s is string => typeof s === 'string' && s.length > 0);
  return Object.fromEntries(LOCALES.map((l) => [l, pagePath(l, ...segs)])) as Partial<
    Record<Locale, string>
  >;
}

export { DEFAULT_LOCALE, LOCALES, isLocale };
export type { Locale };

/** Localized date formatting. */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ro' ? 'ro-RO' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
