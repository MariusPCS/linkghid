---
name: retailer-article
description: Shared workflow and common Profitshare compliance rules for writing an editorial article, review, or comparison that links to ANY Profitshare program — across every category (retail, IT&C, fashion, home, food, auto, cosmetics, financial, pharma, kids, travel, etc.). The per-program skills (emag-article, fashiondays-article, creditprime-article, …) layer each advertiser's specific terms on top of this. Use a program-specific skill when you know the advertiser; use this for the common process.
allowed-tools: Bash, Read, Edit, Write, WebFetch
---

# Program article — shared workflow & common rules

Produce real, useful editorial content that links to a Profitshare advertiser (in **any** category)
**without breaking that program's affiliate terms**. This sits on top of the project rules in CLAUDE.md.
The matching **`<program>-article`** skill adds the advertiser's specific terms (niche, commission,
prohibited categories, age/health/finance notes) — always read it too.

## Common Profitshare rules (apply to every retail program)

**Pricing — don't state specific prices as fact.** Prices and stock change; most programs explicitly
say not to rely on them in promotional content. Frame any price as *indicative* and send the reader to
**check the current price** via the CTA. Leave the product `price` field empty by default.

**No coupon / discount-code / cashback framing.** Don't present LinkGhid as a coupons/cashback site or
publish a retailer's discount codes, unless that retailer's skill explicitly allows it.

**Trademark & creatives.** Refer to the retailer factually. Don't misuse its name/logo and don't make
custom brand-styled graphics — use official product images or omit images. **Never** fabricate or use
dummy images.

**Accuracy.** Correct, current specs and product info. No invented test results, scores, or personal
experience.

**Conduct & attribution.** Commissions are paid only on invoiced, paid orders (return window expired
where applicable). No self-purchasing through your own links, no incentivized clicks, no simulated
orders.

**Channel rules (when promoting the article elsewhere).** Across programs: don't bid on the retailer's
**brand keywords** (add them as negative keywords), don't create Facebook pages or domains using the
retailer's brand keywords, and no clone/URL-masking sites. Individual programs also restrict PPC,
email, and social groups — see the retailer's skill.

**Disclosure.** The short affiliate disclosure renders automatically next to CTAs; keep it. The site
also has dedicated affiliate-disclosure and privacy pages.

## Workflow

1. **Merchant** — ensure `src/data/merchants/<id>.json` exists (most retail merchants are pre-created).
2. **Category** — ensure a bilingual category exists in `src/data/categories/`.
3. **Product(s)** — create `src/data/products/<slug>.json` with the real `destinationUrl` (the actual
   product page on the retailer), `merchant` id, `locales`, and a real `summary`. Leave `price` empty.
4. **Affiliate link** — run the `affiliate-link` skill: `npm run affiliate -- --product <slug>`. It
   writes a tracked `affiliateUrl` and sets `status: "active"`. **If it can't resolve a valid link,
   STOP and report** — do not publish.
5. **Write** the article/review/comparison in `src/content/…` per CLAUDE.md: substantive copy,
   contextual links only (no stuffing), reference products via frontmatter so CTAs gate on a valid link.
6. **Bilingual** — if both locales are requested, write natural `ro` and `en` sharing a `translationKey`.
7. **Interlink** with the relevant category, related reviews, and comparisons.
8. **Validate** — `npm run check` (schema/refs) and `npm run build` must pass; confirm the CTA renders
   and the link opens the correct product.

## Stop-if-blocked
If merchant approval, a valid affiliate link, or accurate product data is missing, stop and report
exactly what's missing. Never publish placeholder content, invented prices, or a CTA without a real link.

> Terms change. Before publishing, re-fetch the retailer's program page and reconcile any differences —
> the live page wins.
