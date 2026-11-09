import { photo } from './photos';

export interface ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
}

export interface Insight {
  /** Grid-area id kept from the original export (site.css positions the card with it). */
  gridId: string;
  href: string;
  image: ResponsiveImage;
  category: string;
  /** Second tag shown next to the category. */
  date: string;
  title: string;
  excerpt: string;
  balanceTitle?: boolean;
}

/** Les trois portes de l’accueil : établissements, professionnels, conformité. */
export const insights: Insight[] = [
  {
    gridId: 'w-node-_43565458-c976-d1f2-4ff3-365f69a35247-6bfbca1a',
    href: '/contact',
    image: photo(
      'clinic-bp',
      'Une professionnelle de la santé prend la tension artérielle d’un patient.',
      '(max-width: 991px) 90vw, 30vw',
    ),
    category: 'Pour les établissements',
    date: 'Demander du personnel',
    title: 'Un besoin de personnel? Nous sommes là.',
    excerpt:
      'Qu’il s’agisse d’un remplacement urgent, d’un quart planifié ou d’un besoin récurrent, Médica Placement vous accompagne avec des solutions de dotation adaptées à votre réalité.',
    balanceTitle: true,
  },
  {
    gridId: 'w-node-d9c4726b-45e1-a7ad-6d95-8dec865bcefa-6bfbca1a',
    href: '/contact',
    image: photo('nurse-smile', 'Une infirmière souriante en uniforme.', '(max-width: 991px) 90vw, 30vw'),
    category: 'Pour les professionnels',
    date: 'Soumettre ma candidature',
    title: 'Votre expertise mérite les bonnes opportunités.',
    excerpt:
      'Infirmière, infirmière auxiliaire, préposé(e) aux bénéficiaires ou chauffeur : joignez-vous à notre réseau. Aucun frais n’est exigé des candidats pour le recrutement ou l’affectation.',
  },
  {
    gridId: 'w-node-_6c9d2a78-8ae6-f60f-81eb-4f8a91c82bdc-6bfbca1a',
    href: '/a-propos',
    image: photo('nurse-masks', 'Une infirmière ausculte une collègue.', '(max-width: 991px) 90vw, 30vw'),
    category: 'Conformité et permis',
    date: 'CNESST',
    title: 'La conformité au cœur de nos engagements.',
    excerpt:
      'Médica Placement détient le permis d’agence de placement de personnel délivré par la CNESST, dispose d’une police de cautionnement et est inscrite à l’Autorité des marchés publics.',
  },
];
