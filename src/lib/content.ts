import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Locale } from '../config';

/**
 * Query helpers. All editorial getters filter by locale, drop drafts, and sort
 * newest-first. All helpers are safe on empty collections (return []).
 */

type EditorialCollection = 'articles' | 'reviews' | 'comparisons';

const isPublished = (data: { draft?: boolean; locale: Locale }, locale: Locale) =>
  data.locale === locale && data.draft !== true;

const byNewest = (
  a: { data: { pubDate: Date } },
  b: { data: { pubDate: Date } },
) => b.data.pubDate.getTime() - a.data.pubDate.getTime();

export async function getArticles(locale: Locale): Promise<CollectionEntry<'articles'>[]> {
  const entries = await getCollection('articles', ({ data }) => isPublished(data, locale));
  return entries.sort(byNewest);
}

export async function getReviews(locale: Locale): Promise<CollectionEntry<'reviews'>[]> {
  const entries = await getCollection('reviews', ({ data }) => isPublished(data, locale));
  return entries.sort(byNewest);
}

export async function getComparisons(locale: Locale): Promise<CollectionEntry<'comparisons'>[]> {
  const entries = await getCollection('comparisons', ({ data }) => isPublished(data, locale));
  return entries.sort(byNewest);
}

/** Products relevant to a locale, excluding deprecated ones. */
export async function getProducts(locale: Locale): Promise<CollectionEntry<'products'>[]> {
  const entries = await getCollection(
    'products',
    ({ data }) => data.locales.includes(locale) && data.status !== 'deprecated',
  );
  return entries.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/** Categories available for a locale, ordered. */
export async function getCategories(locale: Locale): Promise<CollectionEntry<'categories'>[]> {
  const entries = await getCollection(
    'categories',
    ({ data }) => data.locales.includes(locale),
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** The slug used in URLs for an editorial entry. */
export function entrySlug(entry: { id: string; data: { slug?: string } }): string {
  return entry.data.slug ?? entry.id;
}

/** Map of locale -> slug for editorial entries sharing a translationKey. */
export async function getTranslationSlugs(
  collection: EditorialCollection,
  translationKey: string | undefined,
): Promise<Partial<Record<Locale, string>>> {
  if (!translationKey) return {};
  const all = await getCollection(collection);
  const out: Partial<Record<Locale, string>> = {};
  for (const e of all) {
    if (e.data.translationKey === translationKey && e.data.draft !== true) {
      out[e.data.locale] = entrySlug(e);
    }
  }
  return out;
}

/** Resolve a referenced product entry (or undefined). */
export async function resolveProduct(
  ref: { collection: 'products'; id: string } | undefined,
): Promise<CollectionEntry<'products'> | undefined> {
  if (!ref) return undefined;
  return getEntry(ref);
}

export async function resolveProducts(
  refs: Array<{ collection: 'products'; id: string }>,
): Promise<CollectionEntry<'products'>[]> {
  const resolved = await Promise.all(refs.map((r) => getEntry(r)));
  return resolved.filter((p): p is CollectionEntry<'products'> => Boolean(p));
}

export async function resolveCategory(
  ref: { collection: 'categories'; id: string } | undefined,
): Promise<CollectionEntry<'categories'> | undefined> {
  if (!ref) return undefined;
  return getEntry(ref);
}

export async function resolveMerchant(
  ref: { collection: 'merchants'; id: string } | undefined,
): Promise<CollectionEntry<'merchants'> | undefined> {
  if (!ref) return undefined;
  return getEntry(ref);
}

/** Reviews that reference a given product id. */
export async function getReviewsForProduct(
  productId: string,
  locale: Locale,
): Promise<CollectionEntry<'reviews'>[]> {
  const reviews = await getReviews(locale);
  return reviews.filter((r) => r.data.product.id === productId);
}

/** Comparisons that include a given product id. */
export async function getComparisonsForProduct(
  productId: string,
  locale: Locale,
): Promise<CollectionEntry<'comparisons'>[]> {
  const comparisons = await getComparisons(locale);
  return comparisons.filter((c) => c.data.products.some((p) => p.id === productId));
}

/** Localized field accessor for {ro,en} records. */
export function localized<T>(
  value: { ro?: T; en?: T } | undefined,
  locale: Locale,
): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.ro ?? value.en;
}

export type { EditorialCollection };
