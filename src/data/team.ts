import { photo } from './photos';
import type { ResponsiveImage } from './insights';

export interface TeamMember {
  /** Grid-area id (site.css positions the card with it). */
  gridId: string;
  /** Entrance animation target used by src/scripts/interactions.ts (first row only). */
  animate?: string;
  image: ResponsiveImage;
  eager?: boolean;
  name: string;
  role: string;
}

/** Profils recherchés (page À propos). Aucun visage : la banque de candidats est en constitution. */
export const team: TeamMember[] = [
  {
    gridId: 'g-53',
    animate: 'team-01',
    image: photo('nurse-bedside', 'Une infirmière au chevet d’un patient.', '432px'),
    eager: true,
    name: 'Infirmière / infirmier',
    role: 'Membre de l’OIIQ',
  },
  {
    gridId: 'g-54',
    animate: 'team-02',
    image: photo('aide-bp', 'Une soignante prend la tension artérielle d’une patiente.', '432px'),
    eager: true,
    name: 'Infirmière auxiliaire / infirmier auxiliaire',
    role: 'Membre de l’OIIAQ',
  },
  {
    gridId: 'g-55',
    animate: 'team-03',
    image: photo('walker-help', 'Une préposée aide une dame âgée avec sa marchette.', '432px'),
    eager: true,
    name: 'Préposé(e) aux bénéficiaires',
    role: 'Formations demandées par l’établissement',
  },
  {
    gridId: 'g-56',
    image: photo('night-driver', 'Conduite de nuit vue de l’intérieur d’une voiture.', '432px'),
    name: 'Chauffeur',
    role: 'Permis de conduire valide et assurance',
  },
];
