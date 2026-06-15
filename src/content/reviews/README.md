# Reviews

One Markdown/MDX file per review: `src/content/reviews/<slug>.md`. Each review must
reference an existing product (which holds the canonical affiliate URL).

`README.md` is ignored by the content loader.

## Required frontmatter

```yaml
---
title: '<Review title>'
description: '<Meta description, 1 sentence>'
locale: ro            # or: en
slug: '<ascii-safe-slug>'        # optional; defaults to filename
pubDate: 2026-06-14
updatedDate: 2026-06-14          # optional
author: linkghid                 # optional; id from data/site/authors.json
category: '<category-slug>'      # optional; id from data/categories/
translationKey: '<shared-key>'   # optional; links the ro/en versions

product: '<product-slug>'        # required; id from data/products/
verdict: '<One-paragraph verdict>'
pros:
  - '<advantage>'
cons:
  - '<drawback>'
bestFor:
  - '<who it suits>'
notIdealFor:
  - '<who it does not suit>'
keyFeatures:                     # optional
  - { label: '<spec>', value: '<value>' }
rating: 4.5                      # optional 0–5; never fabricate, omit if unrated

# Optional, reason-documented page-level affiliate override:
# affiliateOverrideUrl: 'https://<campaign-affiliate-url>'
# affiliateOverrideReason: '<why this differs from the canonical product URL>'
---
```

The body is the editorial review (Markdown/MDX).

## Rules

- The affiliate CTA renders **only** when the referenced product resolves to a valid
  affiliate link (or a documented override). No valid link → no CTA → don't mark the
  review as complete.
- A short affiliate disclosure is shown automatically next to the CTA.
- Create/update the product data **before** writing the review.
