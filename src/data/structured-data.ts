import { site } from '../config/site';

/**
 * Schema.org Organization + EmploymentAgency. Adresse du siège seulement (ajoutée dès qu’elle est
 * fournie dans src/config/site.ts), zone desservie : Québec. Aucune note agrégée.
 */
export function organizationJsonLd(siteUrl: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EmploymentAgency'],
    name: site.name,
    legalName: site.legalName,
    description:
      'Agence québécoise de dotation, de placement et de logistique pour le réseau de la santé. Main-d’œuvre locale qualifiée, répartition 24/7, transport intégré vers les milieux de soins.',
    telephone: site.phone.international,
    areaServed: { '@type': 'AdministrativeArea', name: 'Québec' },
    knowsLanguage: 'fr-CA',
    ...(siteUrl && { url: siteUrl.href }),
    ...(site.email && { email: site.email }),
    ...(site.address && {
      address: { '@type': 'PostalAddress', streetAddress: site.address, addressRegion: 'QC', addressCountry: 'CA' },
    }),
  };
}
