import type { CollectionEntry } from 'astro:content';

type Product = CollectionEntry<'products'>['data'];

export interface ResolvedAffiliate {
  url: string;
  /** Reason, only present when an explicit page-level override was used. */
  reason?: string;
}

export interface AffiliateOverride {
  affiliateOverrideUrl?: string;
  affiliateOverrideReason?: string;
}

/**
 * Single source of truth for whether a monetized CTA may render.
 *
 * Rules (per project policy):
 *  - An explicit page override wins, but only when both URL *and* reason exist.
 *  - Otherwise the product's canonical affiliate URL is used, and only when the
 *    product status is "active".
 *  - No valid link -> null -> the CTA renders nothing.
 *
 * Never invent URLs. This function is the only place CTA eligibility is decided.
 */
export function resolveAffiliate(
  product: Product | undefined,
  override?: AffiliateOverride,
): ResolvedAffiliate | null {
  if (override?.affiliateOverrideUrl && override.affiliateOverrideReason) {
    return { url: override.affiliateOverrideUrl, reason: override.affiliateOverrideReason };
  }
  if (product?.affiliateUrl && product.status === 'active') {
    return { url: product.affiliateUrl };
  }
  return null;
}
