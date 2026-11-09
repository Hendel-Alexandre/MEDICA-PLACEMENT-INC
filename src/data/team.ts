import { photo } from './photos';
import type { ResponsiveImage } from './insights';

export interface TeamMember {
  /** Grid-area id kept from the original export (site.css positions the card with it). */
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
    gridId: 'w-node-_3b6befee-9c2c-dd95-8ec8-080e21161484-a6a0f880',
    animate: 'team-01',
    image: photo('nurse-bedside', 'Une infirmière au chevet d’un patient.', '432px'),
    eager: true,
    name: 'Infirmière / infirmier',
    role: 'Inscription OIIQ à valider',
  },
  {
    gridId: 'w-node-db378f6c-1d3a-d5d1-5cf9-96cfa34254e0-a6a0f880',
    animate: 'team-02',
    image: photo('aide-bp', 'Une soignante prend la tension artérielle d’une patiente.', '432px'),
    eager: true,
    name: 'Infirmière auxiliaire / infirmier auxiliaire',
    role: 'Inscription OIIAQ à valider',
  },
  {
    gridId: 'w-node-_0ce7435a-114f-19a4-8cbf-0826ea8771e8-a6a0f880',
    animate: 'team-03',
    image: photo('walker-help', 'Une préposée aide une dame âgée avec sa marchette.', '432px'),
    eager: true,
    name: 'Préposé(e) aux bénéficiaires',
    role: 'Attestations exigées par le milieu',
  },
  {
    gridId: 'w-node-_2fdcbc31-3b63-e83a-352c-af9c176a2cfe-a6a0f880',
    image: photo('night-driver', 'Conduite de nuit vue de l’intérieur d’une voiture.', '432px'),
    name: 'Chauffeur',
    role: 'Permis SAAQ valide, assurance commerciale personnelle',
  },
];
