# Products

One JSON file per product/service: `src/data/products/<slug>.json`. The filename is
the product id referenced by reviews, comparisons, and articles.

**This file is the canonical source for the affiliate URL.** Do not duplicate
affiliate URLs across content files — reference the product instead.

`README.md` is ignored by the content loader.

## Schema

| Field            | Type                          | Required | Notes                                                       |
| ---------------- | ----------------------------- | -------- | ----------------------------------------------------------- |
| `name`           | string                        | yes      | Product/service name.                                       |
| `brand`          | string                        | yes      | Brand/manufacturer.                                         |
| `category`       | category id                   | yes      | Must match a file in `src/data/categories/`.                |
| `merchant`       | merchant id                   | yes      | Must match a file in `src/data/merchants/`.                 |
| `locales`        | `('ro'\|'en')[]`              | yes      | Audiences this product is relevant to.                      |
| `summary`        | `{ ro?, en? }`                | no       | Short localized summary.                                    |
| `image`          | string (path/URL)             | no       | Product image. Omit rather than use a placeholder.          |
| `imageAlt`       | string                        | no       | Alt text for the image.                                     |
| `destinationUrl` | url                           | no       | Non-affiliate canonical product page.                       |
| `affiliateUrl`   | url                           | no       | **Canonical Profitshare affiliate URL.**                    |
| `affiliateNote`  | string                        | no       | Internal note about the link.                               |
| `price`          | `{ amount, currency }`        | no       | Indicative price; verify before relying on it.              |
| `lastChecked`    | date (`YYYY-MM-DD`)           | no       | When the link/price was last verified.                      |
| `status`         | enum                          | no       | `active` \| `needs_review` \| `deprecated`. Default `needs_review`. |

## Monetization rule

A product only renders an affiliate CTA when **`affiliateUrl` is set AND
`status: "active"`**. Without a valid affiliate URL, no CTA button is shown — never
invent a URL.

## Example

```json
{
  "name": "<Product name>",
  "brand": "<Brand>",
  "category": "<category-slug>",
  "merchant": "<merchant-slug>",
  "locales": ["ro", "en"],
  "summary": {
    "ro": "<Rezumat scurt>",
    "en": "<Short summary>"
  },
  "destinationUrl": "https://www.<merchant-domain>/<product>",
  "affiliateUrl": "https://<resolved-profitshare-affiliate-url>",
  "price": { "amount": 0, "currency": "RON" },
  "lastChecked": "2026-06-14",
  "status": "active"
}
```
