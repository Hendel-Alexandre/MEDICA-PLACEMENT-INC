export interface Stat {
  /** Grid-area ids of the number and text columns (used by site.css). */
  ids: [string, string];
  /** Final value; digits roll up from 0 when scrolled into view. */
  value: string;
  text: string;
}

/** Chiffres clés (page À propos) : uniquement des faits vérifiables. */
export const stats: Stat[] = [
  {
    ids: [
      'w-node-_703d0e41-a74b-1d30-0676-bc64bdb99a8e-a6a0f880',
      'w-node-_703d0e41-a74b-1d30-0676-bc64bdb99a91-a6a0f880',
    ],
    value: '4',
    text: 'Piliers dans une même entreprise : recrutement, placement, logistique et répartition.',
  },
  {
    ids: [
      'w-node-_703d0e41-a74b-1d30-0676-bc64bdb99a97-a6a0f880',
      'w-node-_703d0e41-a74b-1d30-0676-bc64bdb99a9a-a6a0f880',
    ],
    value: '24/7',
    text: 'Centrale de répartition pour les demandes d’affectation, 24 h sur 24 et 7 jours sur 7.',
  },
  {
    ids: [
      'w-node-_703d0e41-a74b-1d30-0676-bc64bdb99aa0-a6a0f880',
      'w-node-_703d0e41-a74b-1d30-0676-bc64bdb99aa3-a6a0f880',
    ],
    value: '0 $',
    text: 'Frais demandés aux candidats pour être recrutés, formés ou affectés.',
  },
];
