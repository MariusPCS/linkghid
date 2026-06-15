import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content & data model.
 *
 * Editorial content (Markdown/MDX) -> src/content/*
 * Structured catalog data (JSON)   -> src/data/*
 *
 * Collections are "empty-ready": with no entries they resolve to [] and the
 * site still builds. README.md files in each folder are excluded from loaders.
 */

const localeEnum = z.enum(['ro', 'en']);
const statusEnum = z.enum(['active', 'needs_review', 'deprecated']);

const md = (dir: string) =>
  glob({ pattern: ['**/*.{md,mdx}', '!**/README.md'], base: `./src/content/${dir}` });

const json = (dir: string) =>
  glob({ pattern: ['**/*.json'], base: `./src/data/${dir}` });

/* ----------------------------- shared frontmatter ----------------------------- */

const editorialBase = z.object({
  title: z.string(),
  description: z.string(),
  locale: localeEnum,
  /** ASCII-safe, SEO-friendly slug. Defaults to the file id when omitted. */
  slug: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  /** Author id from src/data/site/authors.json. */
  author: z.string().default('linkghid'),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  draft: z.boolean().default(false),
  /** Shared key linking the ro/en versions of the same piece (for hreflang). */
  translationKey: z.string().optional(),
  category: reference('categories').optional(),
});

/** Optional, reason-documented page-level affiliate override (per project rules). */
const affiliateOverride = z.object({
  affiliateOverrideUrl: z.string().url().optional(),
  affiliateOverrideReason: z.string().optional(),
});

/* --------------------------------- merchants --------------------------------- */

const merchants = defineCollection({
  loader: json('merchants'),
  schema: z.object({
    name: z.string(),
    website: z.string().url(),
    affiliateNetwork: z.string().default('Profitshare'),
    status: statusEnum.default('active'),
    notes: z.string().optional(),
  }),
});

/* --------------------------------- categories -------------------------------- */

const categories = defineCollection({
  loader: json('categories'),
  schema: z.object({
    name: z.object({ ro: z.string(), en: z.string() }),
    description: z.object({ ro: z.string().optional(), en: z.string().optional() }).optional(),
    locales: z.array(localeEnum).default(['ro', 'en']),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

/* ---------------------------------- products --------------------------------- */

const products = defineCollection({
  loader: json('products'),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    category: reference('categories'),
    merchant: reference('merchants'),
    /** Which audiences this product is relevant to. */
    locales: z.array(localeEnum).min(1),
    summary: z.object({ ro: z.string().optional(), en: z.string().optional() }).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** Non-affiliate canonical product page (optional reference source). */
    destinationUrl: z.string().url().optional(),
    /** Canonical Profitshare affiliate URL. Required + status:active to monetize. */
    affiliateUrl: z.string().url().optional(),
    affiliateNote: z.string().optional(),
    price: z.object({ amount: z.number(), currency: z.string().default('RON') }).optional(),
    lastChecked: z.coerce.date().optional(),
    status: statusEnum.default('needs_review'),
  }),
});

/* ---------------------------------- articles --------------------------------- */

const articles = defineCollection({
  loader: md('articles'),
  schema: editorialBase.extend({
    tags: z.array(z.string()).default([]),
    /** Products referenced for contextual (non-stuffed) affiliate links. */
    products: z.array(reference('products')).default([]),
  }),
});

/* ----------------------------------- reviews --------------------------------- */

const reviews = defineCollection({
  loader: md('reviews'),
  schema: editorialBase
    .extend({
      product: reference('products'),
      verdict: z.string(),
      pros: z.array(z.string()).min(1),
      cons: z.array(z.string()).min(1),
      bestFor: z.array(z.string()).min(1),
      notIdealFor: z.array(z.string()).min(1),
      keyFeatures: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      /** Optional editorial score, 0–5. Never fabricate; omit if not rated. */
      rating: z.number().min(0).max(5).optional(),
      ctaLabel: z.string().optional(),
    })
    .merge(affiliateOverride),
});

/* --------------------------------- comparisons ------------------------------- */

const comparisons = defineCollection({
  loader: md('comparisons'),
  schema: editorialBase
    .extend({
      products: z.array(reference('products')).min(2),
      verdict: z.string(),
      /** "Best for X" style picks, each pointing at a compared product. */
      picks: z
        .array(z.object({ product: reference('products'), label: z.string() }))
        .default([]),
      buyingFactors: z.array(z.string()).default([]),
      useCases: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      ctaLabel: z.string().optional(),
    })
    .merge(affiliateOverride),
});

export const collections = {
  merchants,
  categories,
  products,
  articles,
  reviews,
  comparisons,
};
