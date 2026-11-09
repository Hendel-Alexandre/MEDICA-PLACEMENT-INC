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
      'Agence de placement de personnel de santé au Québec. Infirmières, infirmières auxiliaires et préposés aux bénéficiaires, service 24/7 et transport du personnel.',
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
