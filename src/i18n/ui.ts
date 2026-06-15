import type { Locale } from '../config';

/**
 * UI strings for both locales. Editorial content comes from Markdown/data;
 * these are interface labels only. Keep keys in sync across `ro` and `en`.
 */
export const ui = {
  ro: {
    'nav.reviews': 'Recenzii',
    'nav.comparisons': 'Comparații',
    'nav.articles': 'Articole',
    'nav.categories': 'Categorii',
    'nav.products': 'Produse',
    'nav.about': 'Despre',
    'nav.contact': 'Contact',
    'nav.skipToContent': 'Sari la conținut',
    'nav.menu': 'Meniu',
    'nav.breadcrumb': 'Cale de navigare',

    'home.heroKicker': 'Ghid de cumpărături',
    'home.latest': 'Cele mai noi',
    'home.latestReviews': 'Recenzii recente',
    'home.latestComparisons': 'Comparații recente',
    'home.latestArticles': 'Articole recente',
    'home.browseCategories': 'Explorează categoriile',

    'meta.reviews':
      'Recenzii detaliate, cu verdict, avantaje, dezavantaje și recomandări clare, în română.',
    'meta.comparisons':
      'Comparații directe între produse și servicii, ca să alegi rapid opțiunea potrivită.',
    'meta.articles':
      'Ghiduri și articole editoriale practice despre ce să cumperi și la ce să fii atent.',
    'meta.products':
      'Catalogul de produse și servicii analizate de LinkGhid, cu detalii și recomandări.',
    'meta.categories':
      'Explorează recenziile, comparațiile, articolele și produsele LinkGhid pe categorii.',

    'common.readMore': 'Citește mai mult',
    'common.viewAll': 'Vezi toate',
    'common.publishedOn': 'Publicat',
    'common.updatedOn': 'Actualizat',
    'common.by': 'de',
    'common.backTo': 'Înapoi la',
    'common.home': 'Acasă',
    'common.relatedReviews': 'Recenzii asociate',
    'common.relatedComparisons': 'Comparații asociate',
    'common.inCategory': 'În categoria',
    'common.tags': 'Etichete',

    'type.review': 'Recenzie',
    'type.comparison': 'Comparație',
    'type.article': 'Articol',
    'type.product': 'Produs',
    'type.category': 'Categorie',

    'review.verdict': 'Verdict',
    'review.pros': 'Avantaje',
    'review.cons': 'Dezavantaje',
    'review.bestFor': 'Recomandat pentru',
    'review.notIdealFor': 'Mai puțin potrivit pentru',
    'review.keyFeatures': 'Caracteristici cheie',
    'review.rating': 'Scor editorial',
    'review.reviewOf': 'Recenzie pentru',

    'comparison.atAGlance': 'Pe scurt',
    'comparison.table': 'Tabel comparativ',
    'comparison.ourPicks': 'Recomandările noastre',
    'comparison.buyingFactors': 'La ce să fii atent',
    'comparison.useCases': 'Pentru ce scenarii',
    'comparison.product': 'Produs',
    'comparison.brand': 'Brand',
    'comparison.category': 'Categorie',
    'comparison.price': 'Preț',
    'comparison.merchant': 'Magazin',
    'comparison.action': 'Ofertă',
    'comparison.comparing': 'Produse comparate',

    'product.brand': 'Brand',
    'product.category': 'Categorie',
    'product.merchant': 'Magazin',
    'product.price': 'Preț orientativ',
    'product.lastChecked': 'Verificat ultima dată',
    'product.source': 'Pagina produsului',
    'product.statusNeedsReview': 'Informațiile despre acest produs sunt în curs de verificare.',
    'product.statusDeprecated': 'Acest produs nu mai este recomandat activ.',

    'cta.viewOffer': 'Vezi oferta',
    'cta.checkPrice': 'Verifică prețul',
    'cta.heading': 'Gata să cumperi?',

    'disclosure.inline':
      'Unele linkuri din această pagină sunt linkuri afiliate. Dacă faci o achiziție prin ele, putem primi un comision, fără costuri suplimentare pentru tine.',
    'disclosure.label': 'Informare afiliere',

    'empty.generic': 'Momentan nu există conținut publicat aici. Revino în curând.',
    'empty.reviews': 'Nu am publicat încă recenzii. Revino în curând.',
    'empty.comparisons': 'Nu am publicat încă comparații. Revino în curând.',
    'empty.articles': 'Nu am publicat încă articole. Revino în curând.',
    'empty.products': 'Catalogul de produse este în pregătire.',
    'empty.categories': 'Categoriile sunt în pregătire.',

    'footer.tagline': 'Recenzii și comparații independente, în română și engleză.',
    'footer.sections': 'Secțiuni',
    'footer.legal': 'Informații legale',
    'footer.rights': 'Toate drepturile rezervate.',
    'footer.about': 'Despre',
    'footer.contact': 'Contact',
    'footer.disclosure': 'Informare afiliere',
    'footer.privacy': 'Politica de confidențialitate',
    'footer.disclosureNote':
      'LinkGhid conține linkuri afiliate. Putem câștiga un comision din achizițiile eligibile.',

    'lang.switch': 'Schimbă limba',
    'lang.ro': 'Română',
    'lang.en': 'English',

    'page.about': 'Despre LinkGhid',
    'page.contact': 'Contact',
    'page.affiliateDisclosure': 'Informare afiliere',
    'page.privacy': 'Politica de confidențialitate',
    'contact.emailLabel': 'Scrie-ne pe email',

    '404.title': 'Pagina nu a fost găsită',
    '404.message': 'Ne pare rău, pagina căutată nu există sau a fost mutată.',
    '404.cta': 'Mergi la pagina principală',
  },

  en: {
    'nav.reviews': 'Reviews',
    'nav.comparisons': 'Comparisons',
    'nav.articles': 'Articles',
    'nav.categories': 'Categories',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.skipToContent': 'Skip to content',
    'nav.menu': 'Menu',
    'nav.breadcrumb': 'Breadcrumb',

    'home.heroKicker': 'Buying guide',
    'home.latest': 'Latest',
    'home.latestReviews': 'Latest reviews',
    'home.latestComparisons': 'Latest comparisons',
    'home.latestArticles': 'Latest articles',
    'home.browseCategories': 'Browse categories',

    'meta.reviews': 'In-depth reviews with a verdict, pros, cons and clear recommendations.',
    'meta.comparisons':
      'Head-to-head comparisons of products and services to help you choose quickly.',
    'meta.articles':
      'Practical editorial guides and articles on what to buy and what to look for.',
    'meta.products':
      'The catalogue of products and services covered by LinkGhid, with details and recommendations.',
    'meta.categories': 'Browse LinkGhid reviews, comparisons, articles and products by category.',

    'common.readMore': 'Read more',
    'common.viewAll': 'View all',
    'common.publishedOn': 'Published',
    'common.updatedOn': 'Updated',
    'common.by': 'by',
    'common.backTo': 'Back to',
    'common.home': 'Home',
    'common.relatedReviews': 'Related reviews',
    'common.relatedComparisons': 'Related comparisons',
    'common.inCategory': 'In category',
    'common.tags': 'Tags',

    'type.review': 'Review',
    'type.comparison': 'Comparison',
    'type.article': 'Article',
    'type.product': 'Product',
    'type.category': 'Category',

    'review.verdict': 'Verdict',
    'review.pros': 'Pros',
    'review.cons': 'Cons',
    'review.bestFor': 'Best for',
    'review.notIdealFor': 'Not ideal for',
    'review.keyFeatures': 'Key features',
    'review.rating': 'Editorial score',
    'review.reviewOf': 'Review of',

    'comparison.atAGlance': 'At a glance',
    'comparison.table': 'Comparison table',
    'comparison.ourPicks': 'Our picks',
    'comparison.buyingFactors': 'What to look for',
    'comparison.useCases': 'Best by use case',
    'comparison.product': 'Product',
    'comparison.brand': 'Brand',
    'comparison.category': 'Category',
    'comparison.price': 'Price',
    'comparison.merchant': 'Store',
    'comparison.action': 'Deal',
    'comparison.comparing': 'Products compared',

    'product.brand': 'Brand',
    'product.category': 'Category',
    'product.merchant': 'Store',
    'product.price': 'Indicative price',
    'product.lastChecked': 'Last checked',
    'product.source': 'Product page',
    'product.statusNeedsReview': 'Details for this product are currently being verified.',
    'product.statusDeprecated': 'This product is no longer actively recommended.',

    'cta.viewOffer': 'View offer',
    'cta.checkPrice': 'Check price',
    'cta.heading': 'Ready to buy?',

    'disclosure.inline':
      'Some links on this page are affiliate links. If you buy through them we may earn a commission, at no extra cost to you.',
    'disclosure.label': 'Affiliate disclosure',

    'empty.generic': 'There is no content published here yet. Please check back soon.',
    'empty.reviews': 'No reviews published yet. Please check back soon.',
    'empty.comparisons': 'No comparisons published yet. Please check back soon.',
    'empty.articles': 'No articles published yet. Please check back soon.',
    'empty.products': 'The product catalogue is being prepared.',
    'empty.categories': 'Categories are being prepared.',

    'footer.tagline': 'Independent reviews and comparisons, in Romanian and English.',
    'footer.sections': 'Sections',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved.',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.disclosure': 'Affiliate disclosure',
    'footer.privacy': 'Privacy policy',
    'footer.disclosureNote':
      'LinkGhid contains affiliate links. We may earn a commission from qualifying purchases.',

    'lang.switch': 'Change language',
    'lang.ro': 'Română',
    'lang.en': 'English',

    'page.about': 'About LinkGhid',
    'page.contact': 'Contact',
    'page.affiliateDisclosure': 'Affiliate disclosure',
    'page.privacy': 'Privacy policy',
    'contact.emailLabel': 'Email us',

    '404.title': 'Page not found',
    '404.message': 'Sorry, the page you are looking for does not exist or has moved.',
    '404.cta': 'Go to the homepage',
  },
} as const;

export type UIKey = keyof (typeof ui)['ro'];

/** Returns a translator bound to `locale`. Falls back to the key if missing. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return (ui[locale] as Record<string, string>)[key] ?? (ui.ro as Record<string, string>)[key] ?? key;
  };
}
