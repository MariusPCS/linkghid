# Categories

One JSON file per category: `src/data/categories/<slug>.json`. The filename is the
category id referenced by products and editorial content. Use an ASCII-safe slug.

`README.md` is ignored by the content loader.

## Schema

| Field         | Type             | Required | Notes                                          |
| ------------- | ---------------- | -------- | ---------------------------------------------- |
| `name`        | `{ ro, en }`     | yes      | Localized category name.                       |
| `description` | `{ ro?, en? }`   | no       | Short localized intro shown on the category.   |
| `locales`     | `('ro'\|'en')[]` | no       | Defaults to `['ro','en']`.                     |
| `featured`    | boolean          | no       | Highlight on the homepage. Default `false`.    |
| `order`       | number           | no       | Sort order (ascending). Default `100`.         |

## Example

```json
{
  "name": { "ro": "<Nume categorie>", "en": "<Category name>" },
  "description": {
    "ro": "<Descriere scurtă în română>",
    "en": "<Short description in English>"
  },
  "locales": ["ro", "en"],
  "featured": true,
  "order": 10
}
```
