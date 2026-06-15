# LinkGhid

Bilingual (Romanian + English) affiliate editorial site. Fully static, built with [Astro](https://astro.build/) and deployed to **GitHub Pages**. Content lives in version control; no server, database, or backend is required in production.

- **Live URL:** https://mariuspcs.github.io/linkghid/
- **Locales:** `ro` (default) and `en`
- **Affiliate network:** Profitshare (links are stored as resolved values in content/data — no secrets in the client)

---

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to ./dist
npm run preview   # preview the production build locally
npm run check     # type-check content collections and components
```

> The dev server runs under the configured base path, e.g. `http://localhost:4321/linkghid/`.

---

## Deployment (GitHub Pages)

1. Create a **public** repo named `linkghid` under the `MariusPCS` account and push this project to the `main` branch.
2. In **Settings → Pages**, set **Source = GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `./dist`.

The deploy URL is controlled by two constants at the top of [`astro.config.mjs`](astro.config.mjs):

```js
const SITE_URL = 'https://mariuspcs.github.io'; // -> Astro `site`
const BASE = '/linkghid';                       // -> Astro `base`
// Live URL: https://mariuspcs.github.io/linkghid/
```

These two values feed `site`, `base`, and the sitemap filter, so changing them is enough to re-point the whole site. If you move to a **custom domain** or a `mariuspcs.github.io` **root repo**, set `BASE = '/'` (and add a `public/CNAME` file for a custom domain). Remember to update the `Sitemap:` line in [`public/robots.txt`](public/robots.txt) too.

The workflow needs no secrets: `site`/`base` come from `astro.config.mjs`, and there are **no Profitshare credentials in the build** — affiliate URLs are committed into `src/data/products/*.json`.

---

## Architecture

```
src/
  config.ts                 # brand + locale constants
  content.config.ts         # Zod schemas for all content & data collections
  i18n/                     # ui strings (ro/en) + locale helpers
  lib/                      # url builders, affiliate gating, content queries
  layouts/BaseLayout.astro  # html shell: <head>, header, footer
  components/               # head/SEO, header, footer, cards, CTA, tables…
  styles/global.css         # premium-magazine design tokens + base styles
  pages/
    index.astro             # root → redirects to default locale
    404.astro
    [locale]/               # bilingual routes (ro/en)
      index.astro           # homepage
      about | contact | affiliate-disclosure | privacy
      articles/    (index + [slug])
      reviews/     (index + [slug])
      comparisons/ (index + [slug])
      products/    (index + [slug])
      categories/  (index + [slug])

  content/                  # EDITORIAL content (Markdown/MDX)
    articles/ reviews/ comparisons/

  data/                     # STRUCTURED catalog data (JSON)
    products/ categories/ merchants/
    site/                   # settings, navigation, authors, disclosures, page copy
```

**Editorial vs. catalog split** is intentional (per project rules): prose lives in `src/content/*` as Markdown/MDX; products, merchants, categories, and affiliate metadata live in `src/data/*` as structured JSON validated by Zod. Reviews and comparisons *reference* products by id, so affiliate URLs are not duplicated across files.

---

## Adding content

Each content/data folder has its own `README.md` documenting the exact fields. In short:

### Add a product (do this first for any monetized page)
Create `src/data/products/<slug>.json`. The **canonical Profitshare affiliate URL** lives here. A product is only "monetizable" when `affiliateUrl` is set **and** `status: "active"`.

### Add a review
Create `src/content/reviews/<slug>.md(x)` with frontmatter: `locale`, `product` (product id), `verdict`, `pros`, `cons`, `bestFor`, `notIdealFor`. The affiliate CTA renders **only** when the referenced product resolves to a valid affiliate link.

### Add a comparison
Create `src/content/comparisons/<slug>.md(x)` referencing **2+** products. The comparison table and per-row CTAs are generated from product data.

### Add an article
Create `src/content/articles/<slug>.md(x)`. Optionally reference products for contextual links.

---

## Affiliate / monetization rules (enforced in code)

- Affiliate CTAs are **gated**: [`AffiliateCTA`](src/components/AffiliateCTA.astro) renders nothing unless a valid affiliate URL is resolvable from product data (or an explicit, reason-documented page override). No data → no CTA.
- Affiliate links use `rel="sponsored nofollow noopener"`.
- A short inline disclosure is rendered next to every CTA, and there are dedicated **Affiliate Disclosure** and **Privacy Policy** pages.
- **No placeholder content**: no fake brands, products, prices, ratings, or `example.com` links. Empty collections render honest empty states, not demo data.

### Static-safe affiliate workflow
Resolve Profitshare links during authoring, then **write the final URL into `src/data/products/*.json`**. The deployed site never calls Profitshare or reads secrets.

A helper script does this for you ([`scripts/resolve-affiliate.mjs`](scripts/resolve-affiliate.mjs), also exposed as the `affiliate-link` Claude Code skill):

```bash
cp .env.example .env          # then paste your Profitshare API user + key (gitignored)

npm run affiliate -- --url "https://www.merchant.ro/product"   # print a link
npm run affiliate -- --product <slug>                          # write into product JSON
npm run affiliate -- --all                                     # resolve everything missing a link
```

It reads `PROFITSHARE_API_USER` / `PROFITSHARE_API_KEY` from `.env` (or CI secrets), converts a product's `destinationUrl` into a tracked `affiliateUrl`, and sets `lastChecked` + `status: "active"`. **Credentials never leave your machine/CI and are never committed.** If the API can't return a valid link, the script fails loudly and nothing is published.

### Authoring skills (Claude Code)
The skills in [`.claude/skills/`](.claude/skills/) drive the monetized workflow:

- **`affiliate-link`** — resolves a real Profitshare affiliate link into product data (wraps the script above).
- **`retailer-article`** — shared workflow + the Profitshare compliance rules common to **every** program
  (no stated prices, no coupon/cashback framing, no trademark/logo misuse, accurate info, official images only).
- **One skill per advertiser — 71 programs across all 16 Profitshare categories.** Each layers that
  advertiser's real terms (commission, niche, brand keywords) and any category-level legal flags on top
  of the shared workflow:

  | Category | Programs | Sensitive flags baked in |
  |---|---|---|
  | Retail | 9 | **age/legal:** Vapetronic (nicotine 18+), Băuturi Alcoolice (alcohol 18+) |
  | IT&C | 14 | — |
  | Casă & Decorațiuni | 11 | — |
  | Servicii | 6 | — |
  | Fashion | 6 | — |
  | Alimente & Produse Naturale | 5 | health / natural-product claims |
  | Auto & Moto | 4 | — |
  | Îngrijire Personală & Cosmetice | 4 | cosmetics claims only |
  | Servicii Financiare & Bancare | 2 | **financial-advertising rules** (APR/responsible lending) |
  | Cadouri & Flori | 2 | — |
  | Ceasuri & Bijuterii | 2 | — |
  | Copii & Jucării | 2 | kids / toy-safety |
  | Cărți, Muzică & Filme | 1 | — |
  | Farmaceutice | 1 | health claims |
  | Sport | 1 | — |
  | Turism | 1 | travel pricing/availability volatility |

  The 9 retail skills are **hand-written** with each store's full terms (incl. cookie windows). The other
  62 are **generated** from a grounded data table via `npm run gen:skills`
  ([scripts/gen-program-skills.mjs](scripts/gen-program-skills.mjs)) — re-run it when Profitshare adds
  programs (idempotent; `--force` to overwrite). Every skill links its program page and **re-verifies the
  live terms** (cookie window, fine print) before publishing. Merchant records live in
  [`src/data/merchants/`](src/data/merchants/). Programs reviewed 2026-06-15.

Skills appear in the slash menu after a session reload; the underlying `npm run` commands work regardless.

---

## SEO & trust

- Per-page `<title>`, meta description, canonical URL, Open Graph, and JSON-LD.
- `hreflang` alternates between `ro`/`en` equivalents.
- Auto-generated sitemap (`@astrojs/sitemap`, i18n-aware) and a `public/robots.txt` pointing to it.
- Internal linking between products, reviews, comparisons, and categories.

---

## Troubleshooting

- **`[glob-loader] No files found matching …` during `dev`/`build`.** Expected. The content/data collections ship empty (no demo content), so the loaders report empty folders. The warnings disappear as soon as you add a real entry. The build still succeeds (exit 0).
- **A page shows an empty state.** That's by design when a collection/category has no published entries yet — it is not a placeholder. Add real content to populate it.
- **An affiliate button doesn't appear.** Also by design. The CTA only renders when the referenced product has `affiliateUrl` set **and** `status: "active"` (or a reason-documented page override). No valid link → no button.
- **Links/assets 404 locally.** Browse under the base path: `http://localhost:4321/linkghid/`. Use `npm run preview` to test the production build, including the `404.html` page and trailing-slash routing exactly as GitHub Pages serves them.
- **Type-check before pushing:** `npm run check` validates frontmatter against the Zod schemas and catches broken `product`/`category`/`merchant` references.

---

## License / content ownership

All editorial content and catalog data in this repository are owned by the LinkGhid project. Affiliate relationships are disclosed on-site at `/<locale>/affiliate-disclosure/`.
