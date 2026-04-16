export type SiteConfig = {
  name: string;
  baseUrl: string;
  locale: string;
};

export const SITES: SiteConfig[] = [
  { name: 'dnv-com', baseUrl: 'https://www.dnv.com', locale: 'en' },
  { name: 'dnv-br', baseUrl: 'https://www.dnv.br', locale: 'pt-BR' },
  { name: 'dnv-it', baseUrl: 'https://www.dnv.it', locale: 'it' },
];
