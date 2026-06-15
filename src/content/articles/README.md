# Articles

One Markdown/MDX file per article: `src/content/articles/<slug>.md`. Articles are
editorial pieces; they may reference products for contextual affiliate links, but
links should never be stuffed.

`README.md` is ignored by the content loader.

## Required frontmatter

```yaml
---
title: '<Article title>'
description: '<Meta description, 1 sentence>'
locale: ro            # or: en
slug: '<ascii-safe-slug>'        # optional; defaults to filename
pubDate: 2026-06-14
updatedDate: 2026-06-14          # optional
author: linkghid                 # optional
category: '<category-slug>'      # optional
translationKey: '<shared-key>'   # optional
tags:                            # optional
  - '<tag>'
products:                        # optional; ids for contextual links
  - '<product-slug>'
---
```

The body is the editorial article (Markdown/MDX).

## Rules

- Include affiliate links only where contextually justified.
- Reference products only when relevant and genuinely useful to the reader.
