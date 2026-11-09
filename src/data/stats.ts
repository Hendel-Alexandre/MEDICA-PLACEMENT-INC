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
    ids: ['g-47', 'g-48'],
    value: '4',
    text: 'Services sous un même toit : recrutement, placement, transport et service 24/7.',
  },
  {
    ids: ['g-49', 'g-50'],
    value: '24/7',
    text: 'Une personne vous répond, jour et nuit, 7 jours sur 7.',
  },
  {
    ids: ['g-51', 'g-52'],
    value: '0 $',
    text: 'C’est ce que ça coûte aux candidats pour postuler et travailler avec nous.',
  },
];
