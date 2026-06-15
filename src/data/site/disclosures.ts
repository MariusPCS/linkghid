import type { Locale } from '../../config';

/**
 * Affiliate disclosure copy. The short `inline` text is rendered next to every
 * CTA; the long-form text lives on the dedicated disclosure page (pages.ts).
 */
export const disclosures: Record<Locale, { inline: string }> = {
  ro: {
    inline:
      'Unele linkuri de pe această pagină sunt linkuri afiliate. Dacă faci o achiziție prin ele, putem primi un comision, fără costuri suplimentare pentru tine.',
  },
  en: {
    inline:
      'Some links on this page are affiliate links. If you buy through them we may earn a commission, at no extra cost to you.',
  },
};
