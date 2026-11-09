export interface ProcessStep {
  /** Grid-area ids of the number, title and text columns (used by site.css). */
  ids: [string, string, string];
  number: string;
  title: string;
  text: string;
}

/** Comment une demande avance (page Services). */
export const processSteps: ProcessStep[] = [
  {
    ids: ['g-30', 'g-31', 'g-32'],
    number: '01',
    title: 'Vous nous appelez',
    text: 'Dites-nous qui il vous faut, où, quand et pour combien de temps. Appelez-nous pour une urgence, ou écrivez-nous pour planifier.',
  },
  {
    ids: ['g-33', 'g-34', 'g-35'],
    number: '02',
    title: 'Nous trouvons la bonne personne',
    text: 'Nous vous confirmons rapidement, puis nous vous envoyons un professionnel dont le dossier est complet.',
  },
  {
    ids: ['g-36', 'g-37', 'g-38'],
    number: '03',
    title: 'Nous nous occupons du reste',
    text: 'Au besoin, notre chauffeur conduit la personne jusqu’à vous. Nous gérons la feuille de temps, la paie et la facture.',
  },
];
