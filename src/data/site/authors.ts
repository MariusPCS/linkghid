import authorsData from './authors.json';
import type { Locale } from '../../config';

export interface Author {
  name: string;
  role: { ro: string; en: string };
  bio: { ro: string; en: string };
}

const authors = authorsData as Record<string, Author>;

export function getAuthor(id: string | undefined): Author {
  return (id && authors[id]) || authors.linkghid;
}

export function authorRole(id: string | undefined, locale: Locale): string {
  return getAuthor(id).role[locale];
}
