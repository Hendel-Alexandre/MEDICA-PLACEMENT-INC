/**
 * Coordonnées de l’entreprise. Les valeurs `null` ne sont pas encore fournies : le site affiche
 * alors le libellé entre crochets (ex. « [COURRIEL] »). Remplacez-les dès qu’elles sont connues.
 */
export const site = {
  name: 'Médica Placement',
  legalName: 'MÉDICA PLACEMENT INC.',
  tagline: 'Agence de placement de personnel de la santé',
  lang: 'fr-CA',
  phone: { display: '514 691-0408', href: 'tel:+15146910408', international: '+1-514-691-0408' },
  email: 'medicaplacement@gmail.com' as string | null,
  address: null as string | null,
  permitNumber: null as string | null,
  host: null as string | null,
};

export const orPlaceholder = (value: string | null, label: string) => value ?? `[${label}]`;

export interface NavLink {
  label: string;
  href: string;
}

/** Menu plein écran. */
export const navLinks: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'FAQ', href: '/contact#faq' },
  { label: 'Nous joindre', href: '/contact' },
];

export const footerLinks: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Médica Placement', href: '/' },
  { label: 'FAQ', href: '/contact#faq' },
  { label: 'Nous joindre', href: '/contact' },
];

/** Un lien est « courant » lorsque son adresse est exactement celle de la page. */
export function isCurrent(href: string, pathname: string): boolean {
  const normalise = (path: string) => path.replace(/\/+$/, '') || '/';
  return !href.includes('#') && normalise(href) === normalise(pathname);
}
