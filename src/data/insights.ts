import { photo } from './photos';

export interface ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
}

export interface Insight {
  /** Grid-area id (site.css positions the card with it). */
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
    gridId: 'g-27',
    href: '/contact',
    image: photo(
      'clinic-bp',
      'Une professionnelle de la santé prend la tension artérielle d’un patient.',
      '(max-width: 991px) 90vw, 30vw',
    ),
    category: 'Pour les établissements',
    date: 'Demander du personnel',
    title: 'Besoin de personnel? Nous sommes là.',
    excerpt:
      'Un remplacement urgent, un quart à combler ou un besoin qui revient chaque semaine? Dites-nous ce qu’il vous faut. Nous trouvons la bonne personne.',
    balanceTitle: true,
  },
  {
    gridId: 'g-28',
    href: '/contact',
    image: photo('nurse-smile', 'Une infirmière souriante en uniforme.', '(max-width: 991px) 90vw, 30vw'),
    category: 'Pour les professionnels',
    date: 'Postuler',
    title: 'Trouvez le poste qui vous convient.',
    excerpt:
      'Infirmière, infirmière auxiliaire, préposé(e) aux bénéficiaires ou chauffeur? Joignez-vous à notre équipe. Postuler est gratuit, du début à la fin.',
  },
  {
    gridId: 'g-29',
    href: '/a-propos',
    image: photo('nurse-masks', 'Une infirmière ausculte une collègue.', '(max-width: 991px) 90vw, 30vw'),
    category: 'Une agence en règle',
    date: 'CNESST',
    title: 'Vous pouvez nous faire confiance.',
    excerpt:
      'Nous avons le permis d’agence de placement de la CNESST. Nous avons aussi un cautionnement et sommes inscrits à l’Autorité des marchés publics.',
  },
];
