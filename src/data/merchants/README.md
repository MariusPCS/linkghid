# Merchants

One JSON file per merchant: `src/data/merchants/<slug>.json`. The filename (without
`.json`) is the merchant id referenced by products. Use an ASCII-safe slug.

`README.md` is ignored by the content loader.

## Schema

| Field              | Type     | Required | Notes                                            |
| ------------------ | -------- | -------- | ------------------------------------------------ |
| `name`             | string   | yes      | Display name of the store/merchant.              |
| `website`          | url      | yes      | Merchant homepage (non-affiliate).               |
| `affiliateNetwork` | string   | no       | Defaults to `Profitshare`.                       |
| `status`           | enum     | no       | `active` \| `needs_review` \| `deprecated`.      |
| `notes`            | string   | no       | Internal note (not rendered publicly).           |

## Example

```json
{
  "name": "<Merchant name>",
  "website": "https://www.<merchant-domain>/",
  "affiliateNetwork": "Profitshare",
  "status": "active"
}
```
