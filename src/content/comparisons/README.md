# Comparisons

One Markdown/MDX file per comparison: `src/content/comparisons/<slug>.md`. Each
comparison references **2 or more** products. The comparison table and per-row CTAs
are generated from product data.

`README.md` is ignored by the content loader.

## Required frontmatter

```yaml
---
title: '<Comparison title>'
description: '<Meta description, 1 sentence>'
locale: ro            # or: en
slug: '<ascii-safe-slug>'        # optional; defaults to filename
pubDate: 2026-06-14
updatedDate: 2026-06-14          # optional
author: linkghid                 # optional
category: '<category-slug>'      # optional
translationKey: '<shared-key>'   # optional

products:                        # required; 2+ product ids
  - '<product-slug-a>'
  - '<product-slug-b>'
verdict: '<Quick verdict / who wins for whom>'
picks:                           # optional "best for X" call-outs
  - { product: '<product-slug-a>', label: '<Best for ...>' }
buyingFactors:                   # optional
  - '<what to look for>'
useCases:                        # optional
  - { title: '<scenario>', text: '<recommendation>' }

# Optional page-level override (must include a reason):
# affiliateOverrideUrl: '...'
# affiliateOverrideReason: '...'
---
```

The body is the editorial comparison (Markdown/MDX).

## Rules

- Every compared product should have a valid affiliate link before publishing.
  Rows without a valid link simply show no CTA (never a placeholder).
- Create/update **all** compared product records before writing the comparison.
- Avoid fabricated scoring unless a transparent methodology is documented on-site.
