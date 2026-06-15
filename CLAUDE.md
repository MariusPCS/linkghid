# CLAUDE.md

## Project purpose

This project is a bilingual static affiliate editorial site for Romanian and English audiences.
It must generate a fully functional blog-style website stored on GitHub and deployable to GitHub Pages.
The site publishes:
- reviews
- articles
- product comparisons
- product pages
- category pages
- about page
- contact page
- affiliate disclosure page
- privacy policy

Primary goals:
- publish trustworthy content
- include valid Profitshare affiliate links in all monetized content
- avoid placeholder/demo content
- remain fully static in production
- allow Claude Code to add new content later with minimal prompting

## Non-negotiable rules

- The deployed website must be fully static and compatible with GitHub Pages.
- Never require a server runtime, database, or authenticated backend in production.
- Never expose Profitshare credentials or API secrets in client-side code.
- Do not generate demo content with fake brands, fake products, fake reviews, fake prices, fake ratings, or placeholder affiliate URLs.
- Do not leave TODO markers, lorem ipsum, example.com links, dummy images, or empty sections.
- Every review, comparison, and monetized article must include at least one valid affiliate link before being considered complete.
- Every monetized page must include a short inline affiliate disclosure near the main CTA area.
- The site must also include a dedicated affiliate disclosure page and privacy policy page.
- Content must be useful and readable in both Romanian and English.
- Use clean SEO-friendly slugs, metadata, internal links, and structured content.
- The codebase must stay simple, maintainable, and static-first.

## Build philosophy

Optimize for:
- static generation
- GitHub-native workflow
- content in version control
- low cost
- easy prompting in Claude Code
- future content expansion without architectural rewrites

Avoid:
- SSR
- server actions
- auth systems
- CMS dependency in v1
- external paid services required for the core site
- unnecessary JavaScript

## Recommended stack

Use:
- Astro
- TypeScript
- Markdown or MDX for articles and reviews
- structured JSON or YAML data for products, merchants, affiliate mappings, categories, authors, and comparisons
- GitHub Actions for deployment to GitHub Pages
- simple CSS approach with reusable components; prefer Astro components and scoped styles or a minimal utility layer

Do not use:
- Next.js
- a database
- a backend API for production
- client-side frameworks unless clearly necessary for a small UI enhancement

## Information architecture

Implement these top-level content types:

1. Articles
- editorial content
- can include affiliate links when relevant
- stored as markdown/mdx

2. Reviews
- single product or single service reviews
- stored as markdown/mdx
- must reference a product entry from structured data
- must include verdict, pros, cons, who it is for, who should avoid it, and affiliate CTA

3. Comparisons
- product/service comparison pages
- structured, high-intent affiliate content
- stored as markdown/mdx plus structured frontmatter references to products
- must include comparison table, recommendations, use-case sections, and affiliate CTAs

4. Product pages
- one page per promoted product or service
- generated from structured data
- canonical source for merchant name, product name, category, image, summary, affiliate URL, non-affiliate source URL if available, and status

5. Category pages
- generated from category data and linked content
- must list relevant reviews, articles, products, and comparisons

6. Static pages
- about
- contact
- affiliate disclosure
- privacy policy

## Content storage rules

Use this content model:

- `src/content/articles/` for articles
- `src/content/reviews/` for reviews
- `src/content/comparisons/` for comparisons
- `src/data/products/` for product data files
- `src/data/categories/` for category data files
- `src/data/merchants/` for merchant data files
- `src/data/site/` for shared settings, navigation, authors, and affiliate disclosures

Articles and reviews should be written in Markdown or MDX.
Products, merchants, categories, and affiliate link metadata should be stored in structured JSON or YAML.
Comparisons may use markdown frontmatter plus references to structured product entries.

Do not duplicate affiliate URLs across many files when they can be referenced from canonical product data.
Prefer one canonical affiliate URL per product plus optional page-specific override only when necessary.

## Affiliate link rules

Affiliate links are business-critical.

Each product record should support:
- product name
- brand
- category
- locale relevance
- merchant
- canonical destination URL
- canonical Profitshare affiliate URL
- fallback notes
- last_checked date
- status: active, needs_review, deprecated

When adding or updating monetized content:
- always prefer canonical affiliate links from product data
- if a page needs a special campaign link, store it explicitly in page frontmatter with a reason
- never invent affiliate URLs
- never leave placeholders
- if a valid affiliate URL cannot be obtained, do not publish the page as complete; clearly stop and report the missing data

Claude Code may use static-safe mode:
- use local environment variables or GitHub Actions secrets during content generation or validation
- fetch or generate Profitshare links during authoring/build workflows only
- write final resolved affiliate links into version-controlled content/data files
- never require live secret-based calls from the deployed site

When asked to review links:
- verify that each affiliate link still exists and points to the intended merchant/product or campaign
- mark obsolete links as `needs_review` or replace them with a valid current affiliate link
- update `last_checked`
- preserve content quality and CTA relevance

## Localization rules

The site must support:
- Romanian (`ro`)
- English (`en`)

Requirements:
- every public page must belong to one locale
- use locale-prefixed URLs unless implementation strongly justifies another static-safe structure
- provide localized metadata, navigation labels, disclosures, and page copy
- avoid machine-translated awkward phrasing
- write natural Romanian and natural English
- slugs should be ASCII-safe and SEO-friendly
- cross-link equivalent localized pages where appropriate

## Design direction

The visual style should blend:
- premium magazine
- review/comparison affiliate style

Design principles:
- editorial credibility
- high readability
- clear hierarchy
- strong CTA visibility without looking spammy
- fast loading
- clean comparison tables
- good mobile layout
- restrained color use
- professional typography
- clear disclosure treatment
- polished cards and sections

Avoid:
- ad-heavy appearance
- flashing badges
- cluttered layouts
- excessive animation
- dark UX patterns
- fake urgency

## SEO and trust rules

Implement:
- unique title and meta description per page
- canonical URLs
- Open Graph basics
- internal linking between products, reviews, comparisons, and categories
- simple schema markup where useful
- sitemap
- robots.txt
- visible affiliate disclosure strategy
- about page with real project positioning
- privacy policy
- contact page

Do not make unverifiable claims such as:
- “best on the market” without context
- fake pricing
- fake test results
- fabricated scores
- false personal experience

## File structure target

Use a simple structure similar to:

- `src/layouts/`
- `src/components/`
- `src/pages/`
- `src/content/articles/`
- `src/content/reviews/`
- `src/content/comparisons/`
- `src/data/products/`
- `src/data/categories/`
- `src/data/merchants/`
- `src/data/site/`
- `public/`
- `.github/workflows/`

You may adjust exact folders if Astro conventions suggest a cleaner implementation, but keep the distinction between editorial content and structured catalog data.

## GitHub Pages deployment rules

The project must deploy to GitHub Pages using GitHub Actions.
Configure Astro correctly for:
- `site`
- `base` when required by repository path
- static output
- public asset compatibility

Assume repository-based deployment unless a custom domain is later added.
Keep deployment simple and documented in README.

## Prompt execution rules

This project is optimized for a 3-prompt Claude Code workflow.

### Prompt 1 behavior
When asked to implement the project from scratch:
- create the complete Astro project
- create layouts, components, pages, content collections, data schema, and styling
- set up bilingual routing
- add required legal/trust pages
- add GitHub Actions deployment workflow
- add starter navigation, homepage, category listing, article templates, review templates, comparison templates, product pages, and shared CTA/disclosure components
- add real structure only; do not add fake demo content
- if specific initial content was not provided, create empty-ready architecture with clear real-content entry points, not placeholders

### Prompt 2 behavior
When asked to fix/refine:
- validate build correctness
- remove dead code
- improve consistency
- tighten SEO
- improve accessibility
- improve responsive design
- ensure GitHub Pages compatibility
- ensure no placeholder content remains
- ensure all monetized templates require affiliate data before rendering CTAs

### Prompt 3 behavior
When asked to add first content:
- create real content only for the requested review, article, or comparison
- retrieve or validate relevant Profitshare affiliate links using static-safe mode when credentials/tools are available
- if affiliate links cannot be validated, stop and report exactly what is missing
- update related product/category/merchant data
- interlink the new content with existing pages
- maintain bilingual structure if the prompt requests both languages

## Rules for future content creation

When asked to add a new review:
- create or update the related product data first
- ensure canonical affiliate URL exists
- write the review with verdict, pros, cons, best for, not ideal for, key features, and CTA
- include disclosure near CTA
- link to relevant category and comparison pages

When asked to add a new comparison:
- create or update all compared product records first
- ensure each compared product has a valid affiliate URL
- include quick verdict, comparison table, who each option is for, buying factors, and CTA blocks
- avoid fake scoring unless explicitly backed by a transparent methodology included on-site

When asked to add a new article:
- create substantive editorial content
- include affiliate links only where contextually justified
- avoid stuffing affiliate links
- include product references only when relevant and useful

When asked to review or repair affiliate links:
- scan structured product data and page overrides
- identify obsolete or broken links
- replace with current valid affiliate links where possible
- update statuses and dates
- summarize what changed

## Content quality rules

Write for trust and conversions.
Use plain, confident language.
Prefer practical recommendations over hype.
Keep sections scannable.
Comparisons should help a visitor decide quickly.
Reviews should feel editorial, not autogenerated.
Romanian copy should sound native, not translated word-for-word from English.

## What to do when blocked

If a requested output depends on missing real-world input, stop and ask only the minimum necessary questions.
Examples:
- missing repository name for correct Astro `base`
- missing domain
- missing Profitshare credentials or access method
- missing target products for first content batch
- missing brand/site name

Do not continue with guessed production values when they affect deployment, legality, or monetization.

## First implementation assumption set

Until the user specifies otherwise, assume:
- static Astro site
- GitHub Pages deployment
- bilingual `ro` and `en`
- premium magazine + review/comparison design
- no backend
- no placeholder content
- affiliate-first monetization with explicit disclosure
- structured product catalog with canonical affiliate URLs
- future content added by Claude Code through prompts

## Deliverable standard

Every implementation response should:
1. list files created or changed
2. explain key architecture briefly
3. provide code
4. keep the project buildable
5. avoid unnecessary complexity
6. preserve static compatibility
7. preserve monetization rules