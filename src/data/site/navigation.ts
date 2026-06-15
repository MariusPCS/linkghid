import type { UIKey } from '../../i18n/ui';

export interface NavItem {
  /** URL segment under /<locale>/ ('' = locale home). */
  segment: string;
  /** UI string key for the label. */
  labelKey: UIKey;
}

/** Primary header navigation (order matters). */
export const mainNav: NavItem[] = [
  { segment: 'reviews', labelKey: 'nav.reviews' },
  { segment: 'comparisons', labelKey: 'nav.comparisons' },
  { segment: 'articles', labelKey: 'nav.articles' },
  { segment: 'categories', labelKey: 'nav.categories' },
  { segment: 'products', labelKey: 'nav.products' },
  { segment: 'about', labelKey: 'nav.about' },
];

/** Footer "Sections" column. */
export const footerSections: NavItem[] = [
  { segment: 'reviews', labelKey: 'nav.reviews' },
  { segment: 'comparisons', labelKey: 'nav.comparisons' },
  { segment: 'articles', labelKey: 'nav.articles' },
  { segment: 'categories', labelKey: 'nav.categories' },
];

/** Footer "Legal" column. */
export const footerLegal: NavItem[] = [
  { segment: 'about', labelKey: 'footer.about' },
  { segment: 'contact', labelKey: 'footer.contact' },
  { segment: 'affiliate-disclosure', labelKey: 'footer.disclosure' },
  { segment: 'privacy', labelKey: 'footer.privacy' },
];
