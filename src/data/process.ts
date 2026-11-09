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
    ids: [
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af01547-9fc0289c',
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af0154a-9fc0289c',
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af0154e-9fc0289c',
    ],
    number: '01',
    title: 'Vous déposez le besoin',
    text: 'Titre d’emploi, milieu, quart, durée, contraintes. Par téléphone pour une urgence, par écrit pour une planification.',
  },
  {
    ids: [
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af01554-9fc0289c',
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af01557-9fc0289c',
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af0155b-9fc0289c',
    ],
    number: '02',
    title: 'La répartition confirme',
    text: 'La faisabilité et le créneau sont confirmés, puis un professionnel dont le dossier est complet est affecté.',
  },
  {
    ids: [
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af01561-9fc0289c',
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af01564-9fc0289c',
      'w-node-a656f15f-7a59-bd1d-9a1a-233f5af01568-9fc0289c',
    ],
    number: '03',
    title: 'Transport et suivi',
    text: 'Au besoin, un chauffeur de l’agence assure le transport vers le milieu. Feuille de temps, paie et facturation sont traitées au siège.',
  },
];
