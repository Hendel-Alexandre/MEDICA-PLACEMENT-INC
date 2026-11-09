export interface Testimonial {
  /** Statement shown in large type. */
  quote: string;
  /** Category label. */
  name: string;
  detail: string;
}

/** Carrousel de la page Services : besoins couverts et titres placés (aucun témoignage inventé). */
export const testimonials: Testimonial[] = [
  { quote: 'Remplacement d’urgence, 24 h sur 24, 7 jours sur 7', name: 'Besoin couvert', detail: '1 / 5' },
  { quote: 'Quarts de jour, de soir, de nuit et de fin de semaine', name: 'Besoin couvert', detail: '2 / 5' },
  { quote: 'Assignation contractuelle à moyen terme', name: 'Besoin couvert', detail: '3 / 5' },
  { quote: 'Assignation à plus long terme, selon le contrat de services', name: 'Besoin couvert', detail: '4 / 5' },
  { quote: 'Surcroît de travail et pénurie ponctuelle', name: 'Besoin couvert', detail: '5 / 5' },
  {
    quote: 'Infirmière clinicienne et infirmière, inscription à l’OIIQ vérifiée',
    name: 'Titre placé',
    detail: '1 / 3',
  },
  {
    quote: 'Infirmière auxiliaire et infirmier auxiliaire, inscription à l’OIIAQ vérifiée',
    name: 'Titre placé',
    detail: '2 / 3',
  },
  { quote: 'Préposé(e) aux bénéficiaires', name: 'Titre placé', detail: '3 / 3' },
];
