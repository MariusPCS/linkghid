import type { Locale } from '../../config';

/**
 * Real copy for the static / legal pages, in both locales.
 * Keep this factual and accurate for a static affiliate site — no false claims.
 * Update `lastUpdated` whenever the legal text changes.
 */

export interface PageSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface StaticPageCopy {
  title: string;
  intro: string;
  sections: PageSection[];
  lastUpdated?: string;
}

type PageKey = 'about' | 'contact' | 'affiliateDisclosure' | 'privacy';

export const staticPages: Record<PageKey, Record<Locale, StaticPageCopy>> = {
  about: {
    ro: {
      title: 'Despre LinkGhid',
      intro:
        'LinkGhid este o publicație editorială bilingvă (română și engleză) dedicată recenziilor, comparațiilor și ghidurilor practice de cumpărături. Scopul nostru este simplu: să te ajutăm să iei o decizie bună, mai repede.',
      sections: [
        {
          heading: 'Ce facem',
          paragraphs: [
            'Publicăm recenzii pentru produse și servicii, comparații directe între opțiuni similare și articole editoriale care explică la ce să fii atent înainte de a cumpăra. Fiecare material este organizat ca să poată fi citit rapid: verdict, avantaje, dezavantaje și recomandări clare în funcție de scenariul tău.',
          ],
        },
        {
          heading: 'Cum lucrăm',
          paragraphs: [
            'Ne bazăm pe informații disponibile public, specificații oficiale și pe analiza opțiunilor relevante de pe piață. Atunci când recomandăm un produs, explicăm pentru cine este potrivit și pentru cine nu. Nu inventăm scoruri, prețuri sau experiențe pe care nu le putem susține.',
          ],
        },
        {
          heading: 'Cum ne susținem',
          paragraphs: [
            'LinkGhid este finanțat prin marketing afiliat. Unele linkuri către magazine sunt linkuri afiliate, ceea ce înseamnă că putem primi un comision dacă faci o achiziție prin ele — fără costuri suplimentare pentru tine. Aceste linkuri nu influențează concluziile noastre editoriale. Detalii complete găsești în pagina de informare afiliere.',
          ],
        },
        {
          heading: 'Limbi și public',
          paragraphs: [
            'Publicăm în română și engleză. Conținutul este scris natural în fiecare limbă, nu tradus cuvânt cu cuvânt, pentru cititorii din România și pentru un public internațional.',
          ],
        },
      ],
    },
    en: {
      title: 'About LinkGhid',
      intro:
        'LinkGhid is a bilingual (Romanian and English) editorial publication focused on reviews, comparisons and practical buying guides. Our goal is simple: to help you make a good decision, faster.',
      sections: [
        {
          heading: 'What we do',
          paragraphs: [
            'We publish reviews of products and services, head-to-head comparisons of similar options, and editorial articles that explain what to look for before you buy. Every piece is structured to be read quickly: a verdict, pros and cons, and clear recommendations based on your situation.',
          ],
        },
        {
          heading: 'How we work',
          paragraphs: [
            'We rely on publicly available information, official specifications, and analysis of the relevant options on the market. When we recommend a product, we explain who it is for and who it is not. We do not invent scores, prices, or experiences we cannot support.',
          ],
        },
        {
          heading: 'How we are funded',
          paragraphs: [
            'LinkGhid is funded through affiliate marketing. Some links to stores are affiliate links, which means we may earn a commission if you make a purchase through them — at no extra cost to you. These links do not influence our editorial conclusions. Full details are on our affiliate disclosure page.',
          ],
        },
        {
          heading: 'Languages and audience',
          paragraphs: [
            'We publish in Romanian and English. Content is written naturally in each language, not translated word for word, for readers in Romania and for an international audience.',
          ],
        },
      ],
    },
  },

  contact: {
    ro: {
      title: 'Contact',
      intro:
        'Ai o întrebare, o sugestie de produs pentru recenzie sau ai observat o informație care trebuie corectată? Ne poți scrie oricând.',
      sections: [
        {
          heading: 'Email',
          paragraphs: [
            'Cea mai rapidă cale de a ne contacta este prin email. Răspundem la mesajele relevante cât de curând posibil.',
          ],
        },
        {
          heading: 'Corectări și actualizări',
          paragraphs: [
            'Dacă un link nu mai funcționează, un preț s-a schimbat semnificativ sau o specificație nu mai este corectă, spune-ne și vom verifica și actualiza materialul.',
          ],
        },
      ],
    },
    en: {
      title: 'Contact',
      intro:
        'Have a question, a product suggestion for review, or spotted information that needs correcting? You can reach us any time.',
      sections: [
        {
          heading: 'Email',
          paragraphs: [
            'The fastest way to reach us is by email. We reply to relevant messages as soon as we can.',
          ],
        },
        {
          heading: 'Corrections and updates',
          paragraphs: [
            'If a link no longer works, a price has changed significantly, or a specification is no longer accurate, let us know and we will review and update the content.',
          ],
        },
      ],
    },
  },

  affiliateDisclosure: {
    ro: {
      title: 'Informare afiliere',
      lastUpdated: '14 iunie 2026',
      intro:
        'Transparența contează pentru noi. Această pagină explică relațiile noastre de afiliere și ce înseamnă ele pentru tine ca cititor.',
      sections: [
        {
          heading: 'Ce sunt linkurile afiliate',
          paragraphs: [
            'Unele dintre linkurile către magazine de pe LinkGhid sunt linkuri afiliate, oferite prin rețeaua Profitshare. Dacă accesezi un astfel de link și faci o achiziție, putem primi un comision din partea magazinului.',
          ],
        },
        {
          heading: 'Nu te costă nimic în plus',
          paragraphs: [
            'Comisionul este plătit de magazin, nu de tine. Prețul pe care îl plătești este același, indiferent dacă ajungi în magazin printr-un link afiliat sau direct.',
          ],
        },
        {
          heading: 'Independența editorială',
          paragraphs: [
            'Recomandările noastre nu sunt de vânzare. Un comision potențial nu schimbă verdictul unei recenzii sau ordinea dintr-o comparație. Includem avantaje și dezavantaje reale și spunem clar când o opțiune nu este potrivită.',
          ],
        },
        {
          heading: 'Cum marcăm linkurile',
          paragraphs: [
            'Lângă fiecare buton de tip „call to action” afișăm o scurtă informare. Linkurile afiliate folosesc atributele tehnice recomandate (de exemplu rel="sponsored nofollow"). Dacă o pagină nu are un link afiliat valid, nu afișăm un buton afiliat.',
          ],
        },
        {
          heading: 'Prețuri și disponibilitate',
          paragraphs: [
            'Prețurile și disponibilitatea produselor se pot schimba după publicare. Verifică întotdeauna detaliile finale în magazin înainte de a cumpăra.',
          ],
        },
      ],
    },
    en: {
      title: 'Affiliate disclosure',
      lastUpdated: '14 June 2026',
      intro:
        'Transparency matters to us. This page explains our affiliate relationships and what they mean for you as a reader.',
      sections: [
        {
          heading: 'What affiliate links are',
          paragraphs: [
            'Some of the links to stores on LinkGhid are affiliate links, provided through the Profitshare network. If you click such a link and make a purchase, we may earn a commission from the store.',
          ],
        },
        {
          heading: 'It costs you nothing extra',
          paragraphs: [
            'The commission is paid by the store, not by you. The price you pay is the same whether you reach the store through an affiliate link or directly.',
          ],
        },
        {
          heading: 'Editorial independence',
          paragraphs: [
            'Our recommendations are not for sale. A potential commission does not change a review verdict or the ranking in a comparison. We include real pros and cons and clearly say when an option is not a good fit.',
          ],
        },
        {
          heading: 'How we mark links',
          paragraphs: [
            'A short disclosure is shown next to every call-to-action button. Affiliate links use the recommended technical attributes (for example rel="sponsored nofollow"). If a page has no valid affiliate link, we do not show an affiliate button.',
          ],
        },
        {
          heading: 'Prices and availability',
          paragraphs: [
            'Prices and availability can change after publication. Always check the final details in the store before buying.',
          ],
        },
      ],
    },
  },

  privacy: {
    ro: {
      title: 'Politica de confidențialitate',
      lastUpdated: '14 iunie 2026',
      intro:
        'Această politică descrie cum funcționează LinkGhid din punctul de vedere al datelor. LinkGhid este un site static, fără cont de utilizator și fără bază de date proprie.',
      sections: [
        {
          heading: 'Date pe care nu le colectăm',
          paragraphs: [
            'Nu îți cerem să creezi un cont, nu colectăm nume, adrese sau date de plată prin acest site și nu rulăm un server propriu de aplicație. Nu vindem date personale, pentru că nu colectăm astfel de date prin site.',
          ],
        },
        {
          heading: 'Găzduire',
          paragraphs: [
            'Site-ul este găzduit pe GitHub Pages. Ca orice serviciu de găzduire web, furnizorul poate procesa informații tehnice de bază (de exemplu adresa IP și tipul de browser) în jurnale de server, pentru livrarea și securitatea paginilor.',
          ],
        },
        {
          heading: 'Linkuri afiliate și terți',
          paragraphs: [
            'Când accesezi un link afiliat (de exemplu prin Profitshare) și ajungi pe site-ul unui magazin, acel site terț îți poate seta cookie-uri sau poate prelucra date conform propriei politici de confidențialitate. Nu controlăm aceste site-uri terțe. Te încurajăm să le citești politicile.',
          ],
        },
        {
          heading: 'Cookie-uri',
          paragraphs: [
            'LinkGhid în sine nu plasează cookie-uri de urmărire necesare funcționării. Rețelele afiliate și magazinele către care trimitem pot folosi cookie-uri în momentul în care părăsești site-ul nostru.',
          ],
        },
        {
          heading: 'Drepturile tale',
          paragraphs: [
            'Pentru orice întrebare legată de confidențialitate, ne poți scrie la adresa de contact din pagina de contact. Dacă pe viitor adăugăm instrumente de analiză sau formulare, vom actualiza această politică înainte.',
          ],
        },
        {
          heading: 'Modificări',
          paragraphs: [
            'Putem actualiza această politică periodic. Data ultimei modificări este afișată în partea de sus a paginii.',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy policy',
      lastUpdated: '14 June 2026',
      intro:
        'This policy describes how LinkGhid works from a data perspective. LinkGhid is a static site with no user accounts and no database of its own.',
      sections: [
        {
          heading: 'Data we do not collect',
          paragraphs: [
            'We do not ask you to create an account, we do not collect names, addresses, or payment details through this site, and we do not run our own application server. We do not sell personal data, because we do not collect such data through the site.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'The site is hosted on GitHub Pages. Like any web host, the provider may process basic technical information (such as IP address and browser type) in server logs, in order to deliver and secure the pages.',
          ],
        },
        {
          heading: 'Affiliate links and third parties',
          paragraphs: [
            'When you click an affiliate link (for example via Profitshare) and arrive on a store website, that third-party site may set cookies or process data according to its own privacy policy. We do not control these third-party sites. We encourage you to read their policies.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'LinkGhid itself does not place tracking cookies required to operate. Affiliate networks and the stores we link to may use cookies once you leave our site.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'For any privacy question, you can write to us at the address on the contact page. If we add analytics tools or forms in the future, we will update this policy beforehand.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update this policy from time to time. The date of the last change is shown at the top of the page.',
          ],
        },
      ],
    },
  },
};
