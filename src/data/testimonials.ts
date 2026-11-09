export interface Testimonial {
  /** Statement shown in large type. */
  quote: string;
  /** Category label. */
  name: string;
  detail: string;
}

/** Carrousel de la page Services : besoins couverts et titres placés (aucun témoignage inventé). */
export const testimonials: Testimonial[] = [
  { quote: 'Urgences, 24 h sur 24, 7 jours sur 7', name: 'Nous couvrons', detail: '1 / 5' },
  { quote: 'Quarts de jour, de soir, de nuit et de fin de semaine', name: 'Nous couvrons', detail: '2 / 5' },
  { quote: 'Mandats de quelques semaines', name: 'Nous couvrons', detail: '3 / 5' },
  { quote: 'Mandats de plusieurs mois', name: 'Nous couvrons', detail: '4 / 5' },
  { quote: 'Manque de personnel ou surplus de travail', name: 'Nous couvrons', detail: '5 / 5' },
  {
    quote: 'Infirmières et infirmières cliniciennes, membres de l’OIIQ',
    name: 'Nos professionnels',
    detail: '1 / 3',
  },
  {
    quote: 'Infirmières et infirmiers auxiliaires, membres de l’OIIAQ',
    name: 'Nos professionnels',
    detail: '2 / 3',
  },
  { quote: 'Préposé(e)s aux bénéficiaires', name: 'Nos professionnels', detail: '3 / 3' },
];
