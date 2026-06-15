#!/usr/bin/env node
/**
 * Profitshare affiliate-link resolver (static-safe mode).
 *
 * Reads API credentials from the environment (PROFITSHARE_API_USER /
 * PROFITSHARE_API_KEY), converts a merchant product URL into a tracked
 * Profitshare affiliate URL, and writes the result into
 * src/data/products/<slug>.json.
 *
 * The deployed site never runs this — it only calls Profitshare at authoring
 * time and commits the resolved URL. No secret ever reaches the browser.
 *
 * API: POST https://api.profitshare.ro/affiliate-links/?  with body
 *      `0[name]=<name>&0[url]=<destination>`. Auth is HMAC-SHA1 (hex) of
 *      `POST` + `affiliate-links` + `/?` + '' + `/` + apiUser + httpDate,
 *      signed with the API key (per the official Profitshare SDK).
 *
 * Usage:
 *   npm run affiliate -- --url "https://www.merchant.ro/product"   # just print
 *   npm run affiliate -- --product <slug>                          # write into product JSON
 *   npm run affiliate -- --all                                     # all products missing a link
 *   add --force    to refresh an existing affiliateUrl
 *   add --dry-run  to resolve without writing
 */

import crypto from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://api.profitshare.ro';
const LINK_RESOURCE = 'affiliate-links';
const PRODUCTS_DIR = path.resolve('src/data/products');

// Load a local .env if present (gitignored). Falls back to real env vars / CI.
try {
  process.loadEnvFile(path.resolve('.env'));
} catch {
  /* no .env file — rely on the ambient environment */
}

const USER = process.env.PROFITSHARE_API_USER;
const KEY = process.env.PROFITSHARE_API_KEY;

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

if (!USER || !KEY) {
  fail(
    'Missing credentials.\n' +
      '  Set PROFITSHARE_API_USER and PROFITSHARE_API_KEY in a local .env file\n' +
      '  (copy .env.example -> .env). Never commit .env.',
  );
}

// HMAC-SHA1 signature for a POST to the given resource (empty query string).
function authHeaders(resource, date) {
  const stringToSign = 'POST' + resource + '/?' + '' + '/' + USER + date;
  const signature = crypto.createHmac('sha1', KEY).update(stringToSign).digest('hex');
  return {
    Date: date,
    'X-PS-Client': USER,
    'X-PS-Accept': 'json',
    'X-PS-Auth': signature,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
}

/** Convert a destination URL into a tracked Profitshare affiliate URL. */
async function resolveUrl(destinationUrl, name = 'link') {
  if (!/^https?:\/\//i.test(destinationUrl)) {
    throw new Error(`Not a valid http(s) URL: ${destinationUrl}`);
  }
  const date = new Date().toUTCString(); // "Mon, 15 Jun 2026 12:00:00 GMT"
  const body = new URLSearchParams();
  body.set('0[name]', name);
  body.set('0[url]', destinationUrl);

  const res = await fetch(`${API_BASE}/${LINK_RESOURCE}/?`, {
    method: 'POST',
    headers: authHeaders(LINK_RESOURCE, date),
    body: body.toString(),
  });
  const raw = await res.text();

  if (!res.ok) {
    throw new Error(
      `Profitshare API responded ${res.status} ${res.statusText}\n` +
        `  Request : POST /${LINK_RESOURCE}\n` +
        `  Response: ${raw}\n` +
        `  Hints: InvalidSignature -> auth string/key; "not approved" -> join the campaign first.`,
    );
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`Expected JSON but got:\n${raw}`);
  }
  if (data?.error) {
    throw new Error(`Profitshare error: ${data.error.message ?? JSON.stringify(data.error)}`);
  }

  const item = Array.isArray(data?.result) ? data.result[0] : data?.result;
  const link = item?.ps_url || item?.final_url || item?.url;
  if (!link) {
    throw new Error(`No affiliate link in response:\n${JSON.stringify(data, null, 2)}`);
  }
  return link;
}

function today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

async function processProduct(slug, { dryRun, force }) {
  const file = path.join(PRODUCTS_DIR, `${slug}.json`);
  let product;
  try {
    product = JSON.parse(await readFile(file, 'utf8'));
  } catch {
    throw new Error(`Product not found: ${file}`);
  }

  if (!product.destinationUrl) {
    console.warn(`- ${slug}: no "destinationUrl" set — add the merchant product URL first. Skipped.`);
    return;
  }
  if (product.affiliateUrl && !force) {
    console.log(`- ${slug}: already has affiliateUrl (use --force to refresh). Skipped.`);
    return;
  }

  const link = await resolveUrl(product.destinationUrl, slug);
  product.affiliateUrl = link;
  product.lastChecked = today();
  if (product.status !== 'deprecated') product.status = 'active';

  if (!dryRun) await writeFile(file, JSON.stringify(product, null, 2) + '\n');
  console.log(`✔ ${slug}: ${link}${dryRun ? '  (dry-run, not written)' : ''}`);
}

async function listProductSlugs() {
  const files = await readdir(PRODUCTS_DIR);
  return files.filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

// ----- CLI -------------------------------------------------------------------
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name) => args.includes(name);

const opts = { dryRun: has('--dry-run'), force: has('--force') };

try {
  const url = flag('--url');
  const product = flag('--product');

  if (url) {
    console.log(await resolveUrl(url));
  } else if (product) {
    await processProduct(product, opts);
  } else if (has('--all')) {
    const slugs = await listProductSlugs();
    if (slugs.length === 0) fail('No products found in src/data/products/.');
    for (const slug of slugs) {
      try {
        await processProduct(slug, opts);
      } catch (err) {
        console.error(`✖ ${slug}: ${err.message}`);
      }
    }
  } else {
    console.log(
      'Usage:\n' +
        '  npm run affiliate -- --url "<merchant product url>"\n' +
        '  npm run affiliate -- --product <slug> [--force] [--dry-run]\n' +
        '  npm run affiliate -- --all [--force] [--dry-run]',
    );
  }
} catch (err) {
  fail(err.message);
}
