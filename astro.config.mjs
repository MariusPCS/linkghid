// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Deployment target: GitHub Pages project site.
//   SITE_URL = https://<username>.github.io
//   BASE     = /<repository>
// Final URL: https://mariuspcs.github.io/linkghid/
//
// If you later move to a custom domain or to a <username>.github.io root repo,
// set BASE = '/' (and add a public/CNAME file for a custom domain).
const SITE_URL = 'https://mariuspcs.github.io';
const BASE = '/linkghid';

// Single source of truth for the deployed home URL (keeps the sitemap filter
// correct even if SITE_URL/BASE change).
const HOME_URL = new URL(BASE.replace(/\/?$/, '/'), SITE_URL).href;

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Emit /path/index.html so URLs work cleanly on GitHub Pages.
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      // Drop the bare root redirect page (it is noindex and only forwards to /ro/).
      filter: (page) => page !== HOME_URL,
      i18n: {
        defaultLocale: 'ro',
        locales: {
          ro: 'ro',
          en: 'en',
        },
      },
    }),
  ],
});
