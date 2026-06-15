#!/usr/bin/env node
/**
 * Generate one thin Claude Code skill + one merchant record per Profitshare
 * program, from a grounded data table (names/slugs/commissions/domains taken
 * from the live Profitshare category pages, reviewed 2026-06-15).
 *
 * - Each skill defers to the shared `retailer-article` skill for the workflow +
 *   common compliance rules, and adds the advertiser's specific facts and any
 *   category-level legal flags (finance / health / cosmetics / kids / travel).
 * - Exact cookie window + fine print are verified on demand: each skill links
 *   its program page and instructs a re-fetch before publishing.
 * - Idempotent: existing files are skipped, so the hand-written retail skills
 *   (emag, vapetronic, …) and merchants are preserved.
 *
 * Run:  npm run gen:skills        (add --force to overwrite generated files)
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const FORCE = process.argv.includes('--force');
const REVIEWED = '2026-06-15';
const SKILLS_DIR = path.resolve('.claude/skills');
const MERCHANTS_DIR = path.resolve('src/data/merchants');

// Category → { slug (URL segment), label, niche, flags }
const CATEGORIES = {
  itc: { slug: 'it-c', label: 'IT&C', niche: 'electronics, IT hardware & gadgets', flags: [] },
  casa: { slug: 'casa-si-decoratiuni', label: 'Casă & Decorațiuni', niche: 'home, furniture & décor', flags: [] },
  servicii: { slug: 'servicii', label: 'Servicii', niche: 'online services', flags: [] },
  fashion: { slug: 'fashion', label: 'Fashion', niche: 'clothing, footwear & accessories', flags: [] },
  alimente: { slug: 'alimente-bauturi-si-produse-naturale', label: 'Alimente & Produse Naturale', niche: 'food, drinks & natural products', flags: ['health'] },
  auto: { slug: 'auto-si-moto', label: 'Auto & Moto', niche: 'auto & moto parts and accessories', flags: [] },
  ingrijire: { slug: 'ingrijire-personala-si-cosmetice', label: 'Îngrijire Personală & Cosmetice', niche: 'personal care & cosmetics', flags: ['cosmetics'] },
  financiar: { slug: 'servicii-financiare-si-bancare', label: 'Servicii Financiare & Bancare', niche: 'financial & banking services', flags: ['finance'] },
  cadouri: { slug: 'cadouri-si-flori', label: 'Cadouri & Flori', niche: 'gifts & flowers', flags: [] },
  carti: { slug: 'carti-muzica-si-filme', label: 'Cărți, Muzică & Filme', niche: 'books, music & films', flags: [] },
  ceasuri: { slug: 'ceasuri-si-bijuterii', label: 'Ceasuri & Bijuterii', niche: 'watches & jewellery', flags: [] },
  copii: { slug: 'copii-si-jucarii', label: 'Copii & Jucării', niche: 'kids & toys', flags: ['kids'] },
  farma: { slug: 'farmaceutice', label: 'Farmaceutice', niche: 'pharmacy & natural health', flags: ['health'] },
  sport: { slug: 'sport', label: 'Sport', niche: 'sports gear', flags: [] },
  turism: { slug: 'turism', label: 'Turism', niche: 'travel & tourism', flags: ['travel'] },
};

// [slug, name, domain, categoryKey, commission, nicheOverride?, extraFlags?]
const PROGRAMS = [
  // IT&C (14)
  ['vexio', 'Vexio', 'vexio.ro', 'itc', '2%'],
  ['forit', 'ForIT', 'forit.ro', 'itc', '2%'],
  ['itgalaxy', 'IT Galaxy', 'itgalaxy.ro', 'itc', '2–10%'],
  ['vonmag', 'Vonmag', 'vonmag.ro', 'itc', '3%'],
  ['citgrup', 'CIT Grup', 'citgrup.ro', 'itc', '8%'],
  ['dwyn', 'Dwyn', 'dwyn.ro', 'itc', '2–5%'],
  ['techstar', 'Techstar', 'techstar.ro', 'itc', '15%'],
  ['dualstore', 'Dualstore', 'dualstore.ro', 'itc', '5%'],
  ['contakt', 'Contakt', 'contakt.ro', 'itc', '10%'],
  ['abdcomputer', 'ABD Computer', 'abdcomputer.ro', 'itc', '7%'],
  ['streamstore', 'Streamstore', 'streamstore.ro', 'itc', '10%'],
  ['geekmall', 'Geekmall', 'geekmall.ro', 'itc', '2–6%'],
  ['pcmadd', 'PCMadd', 'pcmadd.com', 'itc', '6%'],
  ['seku', 'Seku', 'seku.ro', 'itc', '7%'],
  // Casă & Decorațiuni (11)
  ['mathaus', 'MatHaus', 'mathaus.ro', 'casa', '3.5%', 'DIY, building & home improvement'],
  ['kaercher', 'Kärcher', 'karcher.com/ro/ro', 'casa', '5%', 'cleaning equipment & pressure washers'],
  ['fornello', 'Fornello', 'fornello.ro', 'casa', '3%', 'kitchenware & home goods'],
  ['depozitsolar', 'Depozit Solar', 'depozitsolar.ro', 'casa', '2%', 'solar & photovoltaic equipment'],
  ['novodoors', 'Novodoors', 'novodoors.ro', 'casa', '5%', 'interior & exterior doors'],
  ['exclusive-home', 'Exclusive Home', 'exclusive-home.ro', 'casa', '10%', 'home décor & furniture'],
  ['emobili', 'eMobili', 'emobili.ro', 'casa', '5%', 'furniture'],
  ['case-smart', 'Case Smart', 'case-smart.ro', 'casa', '10%', 'smart-home devices'],
  ['evrik', 'Evrik', 'evrik.ro', 'casa', '12%', 'home & décor'],
  ['startdecor', 'Start Decor', 'startdecor.ro', 'casa', '7%', 'décor & wallpaper'],
  ['decolandia', 'Decolandia', 'decolandia.ro', 'casa', '5%', 'décor'],
  // Servicii (6 — Profitshare self-referral intentionally omitted)
  ['hostico', 'Hostico', 'hostico.ro', 'servicii', '25%', 'web hosting & domains'],
  ['facturis-online', 'Facturis Online', 'facturis-online.ro', 'servicii', '35%', 'online invoicing software'],
  ['daedalusonline', 'Daedalus Online', 'daedalusonline.eu', 'servicii', '7 lei/lead', 'market research panel'],
  ['chroot', 'Chroot', 'chroot.ro', 'servicii', '20%', 'web hosting'],
  ['startco', 'Startco', 'startco.ro', 'servicii', '10%', 'business / company-setup services'],
  ['conectoo', 'Conectoo', 'conectoo.com', 'servicii', '5 lei/lead', 'online services'],
  // Fashion (6)
  ['fashiondays', 'Fashion Days', 'fashiondays.ro', 'fashion', '1–5%', 'fashion & footwear'],
  ['priveboutique', 'Privé Boutique', 'priveboutique.net', 'fashion', '10%'],
  ['mycloset', 'MyCloset', 'mycloset.ro', 'fashion', '8%'],
  ['rubyfashion', 'Ruby Fashion', 'rubyfashion.ro', 'fashion', '10–20%'],
  ['iconicul', 'Iconicul', 'iconicul.ro', 'fashion', '10–20%'],
  ['vesa', 'Vesa', 'vesa.ro', 'fashion', '7.5%'],
  // Alimente & Produse Naturale (5)
  ['parmashop', 'Parmashop', 'parmashop.ro', 'alimente', '1–10%', 'Italian deli & gourmet food'],
  ['vegis', 'Vegis', 'vegis.ro', 'alimente', '8%', 'natural & health products, supplements'],
  ['nosugarshop', 'No Sugar Shop', 'nosugarshop.ro', 'alimente', '3–10%', 'sugar-free & diet foods'],
  ['scufita-rosie', 'Scufița Roșie', 'scufita-rosie.ro', 'alimente', '10%', 'honey & natural foods'],
  ['unicornnaturals', 'Unicorn Naturals', 'unicorn-naturals.ro', 'alimente', '10%', 'natural & organic products'],
  // Auto & Moto (4)
  ['pint', 'Pint', 'pint.ro', 'auto', '0.01–10%'],
  ['navigatiiandroid', 'Navigații Android', 'navigatiiandroid.ro', 'auto', '1–7%', 'car navigation & multimedia'],
  ['anvelope-oferte', 'Anvelope Oferte', 'anvelope-oferte.ro', 'auto', '10 lei/order', 'tyres'],
  ['anvelino', 'Anvelino', 'anvelino.ro', 'auto', '10.5 lei/order', 'tyres'],
  // Îngrijire Personală & Cosmetice (4)
  ['hiris', 'Hiris', 'hiris.ro', 'ingrijire', '8%', 'cosmetics & personal care'],
  ['magazinuldegene', 'Magazinul de Gene', 'magazinuldegene.ro', 'ingrijire', '7%', 'eyelash extensions & beauty supplies'],
  ['colorcosmetics', 'Color Cosmetics', 'colorcosmetics.ro', 'ingrijire', '20%', 'cosmetics & makeup'],
  ['dalisticq-shop', 'Dalisticq Shop', 'dalisticq-shop.com', 'ingrijire', '8%'],
  // Servicii Financiare & Bancare (2)
  ['creditprime', 'CreditPrime', 'creditprime.ro', 'financiar', '20–200 lei/lead', 'non-bank loans / credit'],
  ['axi-card', 'Axi Card', 'axi-card.ro', 'financiar', '25 lei/lead', 'credit card'],
  // Cadouri & Flori (2)
  ['mindblower', 'Mindblower', 'mindblower.ro', 'cadouri', '11%'],
  ['giftspot', 'Giftspot', 'giftspot.ro', 'cadouri', '7%'],
  // Cărți, Muzică & Filme (1)
  ['libris', 'Libris', 'libris.ro', 'carti', '8%', 'books'],
  // Ceasuri & Bijuterii (2)
  ['watch24', 'Watch24', 'watch24.ro', 'ceasuri', '15%', 'watches'],
  ['perfectbijoux', 'Perfect Bijoux', 'perfectbijoux.ro', 'ceasuri', '15%', 'jewellery'],
  // Copii & Jucării (2)
  ['educlass', 'Educlass', 'educlass.ro', 'copii', '5%', 'educational toys & supplies'],
  ['bestkids', 'BestKids', 'bestkids.ro', 'copii', '5%', 'toys & kids products'],
  // Farmaceutice (1)
  ['minuneanaturii', 'Minunea Naturii', 'minuneanaturii.ro', 'farma', '8%', 'natural remedies & supplements'],
  // Sport (1)
  ['sportpartner', 'Sport Partner', 'sportpartner.ro', 'sport', '7%', 'sports equipment'],
  // Turism (1)
  ['exacttravel', 'Exact Travel', 'exact.travel', 'turism', '3%', 'flights & travel'],
];

const FLAG_NOTES = {
  finance:
    '- ⚠️ **Financial product (credit / lending / cards) — high sensitivity.** Follow financial-advertising rules: be transparent about cost/APR and eligibility, never imply "guaranteed" or "free" money, and promote responsible borrowing. If a compliant, non-misleading angle is not achievable, STOP and flag for review.',
  health:
    '- ⚠️ **Health / natural-product claims restricted.** No medical or therapeutic claims; supplements and natural products are not medicines and must not be presented as treating or curing conditions. Follow health-advertising rules.',
  cosmetics:
    '- **Cosmetics:** make cosmetic claims only (appearance, hydration, scent); no medical or therapeutic claims.',
  kids:
    '- **Kids & toys:** address parents, never target children directly; note age-appropriateness and toy safety where relevant.',
  travel:
    '- ⚠️ **Travel:** fares, availability and itineraries change constantly — never present prices as fixed; link out to check live availability and show the booking terms.',
};

function websiteFor(domain) {
  return 'https://' + domain.replace(/\/+$/, '') + '/';
}

function skillBody(p) {
  const cat = CATEGORIES[p.categoryKey];
  const programUrl = `https://profitshare.ro/affiliate-programs/${cat.slug}/${p.slug}`;
  const niche = p.niche || cat.niche;
  const flagLines = p.flags.map((f) => FLAG_NOTES[f]).filter(Boolean);
  const desc =
    `Write a project-compliant article/review/comparison that links to ${p.name} (${cat.label}) ` +
    `via Profitshare, following its affiliate terms. Builds on the shared retailer-article skill.`;

  return [
    '---',
    `name: ${p.slug}-article`,
    `description: ${desc}`,
    'allowed-tools: Bash, Read, Edit, Write, WebFetch',
    '---',
    '',
    `# ${p.name} article`,
    '',
    'Follow the shared **`retailer-article`** workflow and common Profitshare rules, plus these',
    `${p.name} specifics.`,
    '',
    `- Program: <${programUrl}> (re-verify; reviewed ${REVIEWED})`,
    `- Merchant id: \`${p.slug}\` · Category: ${cat.label} · Niche: ${niche}`,
    `- Commission: **${p.commission}** · Cookie window: **verify on the program page** (not pre-recorded here)`,
    '',
    `## ${p.name}-specific rules`,
    ...flagLines,
    `- Don't bid on the "${p.name}" brand keyword (add it to negative keywords) or use it in domains/page names.`,
    '- Keep prices indicative and link out to check; use official product images only, or none.',
    '- **Before publishing, fetch the program page above** and apply its exact terms (cookie window,',
    '  prohibited promotion methods, prohibited categories, brand rules).',
    '',
  ].join('\n');
}

function merchantRecord(p) {
  const cat = CATEGORIES[p.categoryKey];
  const note =
    `Affiliate program via Profitshare (${cat.label}). ` +
    (p.flags.includes('finance') ? 'Financial product — strict advertising rules. ' : '') +
    (p.flags.includes('health') ? 'Health/natural product — no medical claims. ' : '') +
    `Terms: https://profitshare.ro/affiliate-programs/${cat.slug}/${p.slug}`;
  return JSON.stringify(
    {
      name: p.name,
      website: websiteFor(p.domain),
      affiliateNetwork: 'Profitshare',
      status: 'active',
      notes: note,
    },
    null,
    2,
  ) + '\n';
}

async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function maybeWrite(file, contents) {
  if (!FORCE && (await exists(file))) return 'skip';
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents);
  return 'write';
}

let skillsWritten = 0;
let skillsSkipped = 0;
let merchantsWritten = 0;
let merchantsSkipped = 0;

for (const row of PROGRAMS) {
  const [slug, name, domain, categoryKey, commission, niche, extraFlags] = row;
  const cat = CATEGORIES[categoryKey];
  if (!cat) throw new Error(`Unknown category "${categoryKey}" for ${slug}`);
  const p = {
    slug,
    name,
    domain,
    categoryKey,
    commission,
    niche,
    flags: [...cat.flags, ...(extraFlags || [])],
  };

  const skillFile = path.join(SKILLS_DIR, `${slug}-article`, 'SKILL.md');
  const merchantFile = path.join(MERCHANTS_DIR, `${slug}.json`);

  (await maybeWrite(skillFile, skillBody(p))) === 'write' ? skillsWritten++ : skillsSkipped++;
  (await maybeWrite(merchantFile, merchantRecord(p))) === 'write'
    ? merchantsWritten++
    : merchantsSkipped++;
}

console.log(
  `Programs: ${PROGRAMS.length}\n` +
    `Skills:    ${skillsWritten} written, ${skillsSkipped} skipped\n` +
    `Merchants: ${merchantsWritten} written, ${merchantsSkipped} skipped` +
    (FORCE ? '' : '  (use --force to overwrite)'),
);
