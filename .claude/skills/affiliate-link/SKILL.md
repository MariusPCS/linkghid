---
name: affiliate-link
description: Resolve a real Profitshare affiliate link for a product (or a raw merchant URL) using the API credentials in .env, then write the resolved affiliate URL into src/data/products/*.json. Use whenever adding or updating monetized content (reviews, comparisons, product pages) that needs a valid affiliate link.
allowed-tools: Bash, Read, Edit, Write
---

# Affiliate link resolver (Profitshare)

Generate a **real** Profitshare affiliate link and store it on the canonical product record.

## Non-negotiable rules
- **Never invent or guess** an affiliate URL. It must come from the Profitshare API.
- **Never hardcode credentials.** They are read from `PROFITSHARE_API_USER` / `PROFITSHARE_API_KEY`
  (a local, gitignored `.env`, or a CI secret). Never print the key or commit it.
- If resolution fails or returns no valid link, **STOP and report exactly what is missing**.
  Do not set `status: "active"` and do not publish the page as complete.

## Inputs
- A product slug whose file `src/data/products/<slug>.json` already has a real `destinationUrl`
  (the merchant product page), **or**
- A raw merchant product URL to convert.

## Steps
1. Confirm credentials are available: a local `.env` with `PROFITSHARE_API_USER` and
   `PROFITSHARE_API_KEY` (copy from `.env.example`), or exported in the shell.
2. For a product, ensure `src/data/products/<slug>.json` exists and has a real `destinationUrl`.
3. Run the resolver:
   - One product (writes the file): `npm run affiliate -- --product <slug>`
   - Raw URL (just prints):         `npm run affiliate -- --url "<merchant product url>"`
   - Everything missing a link:     `npm run affiliate -- --all`
   - Add `--force` to refresh an existing link, `--dry-run` to resolve without writing.
4. On success the script writes `affiliateUrl`, sets `lastChecked` to today, and sets
   `status: "active"`. Verify the printed link opens the correct merchant product.
5. Continue building the review/comparison/product content. The CTA only renders once the
   product has a valid `affiliateUrl` and `status: "active"`.

## On failure — report, don't fake
Relay the HTTP status and response body the script printed. Common causes:
- **401/403** — wrong/rotated API key, or the auth signature string in
  `scripts/resolve-affiliate.mjs` needs adjusting to the current API.
- **404** — the `LINK_PATH` endpoint in the script needs updating.
- **"not approved" / empty** — you must join that merchant's Profitshare campaign first.

Do not proceed with a placeholder link under any circumstances.
