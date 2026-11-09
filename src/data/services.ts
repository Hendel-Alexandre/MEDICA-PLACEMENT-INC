export interface ServiceArea {
  /** Grid-area ids (site.css positions the columns with them). */
  titleId: string;
  textId: string;
  /** Heading lines (rendered with a line break between them). */
  title: string[];
  text: string;
  /** Load-animation targets used by src/scripts/interactions.ts. */
  titleAnimate?: string;
  textAnimate?: string;
}

/** Nos quatre services (page Services). */
export const serviceAreas: ServiceArea[] = [
  {
    titleId: 'g-39',
    textId: 'g-40',
    title: ['Recrutement et', 'vérifications'],
    text: 'Nous recrutons des professionnels d’ici. Avant chaque mandat, nous vérifions tout : les antécédents judiciaires, l’inscription à l’OIIQ ou à l’OIIAQ et les formations RCR et PDSB. Pour nos chauffeurs : un permis de conduire valide et une assurance.',
    titleAnimate: 'sub-1',
    textAnimate: 'sub-12',
  },
  {
    titleId: 'g-41',
    textId: 'g-42',
    title: ['Placement et', 'remplacements'],
    text: 'Un remplacement d’urgence, un quart à combler ou un mandat de plusieurs mois. De jour, de soir, de nuit et la fin de semaine. Nous travaillons avec les hôpitaux, les CHSLD publics et privés, les résidences pour aînés, les CLSC et les soins à domicile.',
    titleAnimate: 'sub-2',
    textAnimate: 'sub-22',
  },
  {
    titleId: 'g-43',
    textId: 'g-44',
    title: ['Transport et', 'accompagnement'],
    text: 'Nos chauffeurs conduisent notre personnel jusqu’à vous, surtout la nuit et dans les endroits plus éloignés. Nous accompagnons aussi des patients à un rendez-vous ou lors d’un transfert. Ce n’est pas un service d’ambulance.',
    titleAnimate: 'sub-3',
    textAnimate: 'sub-32',
  },
  {
    titleId: 'g-45',
    textId: 'g-46',
    title: ['Service 24/7 et', 'paperasse'],
    text: 'Une personne vous répond jour et nuit, 7 jours sur 7. Nous gérons les horaires, les feuilles de temps, la paie et la facturation. Vous n’avez rien de plus à faire.',
  },
];
