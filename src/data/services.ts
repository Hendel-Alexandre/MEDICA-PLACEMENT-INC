export interface ServiceArea {
  /** Grid-area ids kept from the original export (site.css positions the columns with them). */
  titleId: string;
  textId: string;
  /** Heading lines (rendered with a line break between them). */
  title: string[];
  text: string;
  /** Load-animation targets used by src/scripts/interactions.ts. */
  titleAnimate?: string;
  textAnimate?: string;
}

/** Les quatre piliers (page Services). */
export const serviceAreas: ServiceArea[] = [
  {
    titleId: 'w-node-_0a18d65a-3770-5274-f42b-3d87efcdf0fd-9fc0289c',
    textId: 'w-node-_0a18d65a-3770-5274-f42b-3d87efcdf100-9fc0289c',
    title: ['Recrutement et', 'qualification clinique'],
    text: 'Nous attirons et sélectionnons de la main-d’œuvre locale qualifiée. Avant toute affectation : vérification des antécédents judiciaires, validation de l’inscription à l’OIIQ ou à l’OIIAQ selon le titre, certifications RCR et PDSB à jour. Pour les chauffeurs : permis de conduire valide (SAAQ) et assurance.',
    titleAnimate: 'sub-1',
    textAnimate: 'sub-12',
  },
  {
    titleId: 'w-node-_0ef85db1-0aeb-dca0-4041-6483eb931950-9fc0289c',
    textId: 'w-node-_0ef85db1-0aeb-dca0-4041-6483eb931953-9fc0289c',
    title: ['Placement et', 'dotation'],
    text: 'Temporaire courte durée, urgence 24 h sur 24 et 7 jours sur 7, contractuel moyen et long terme. Quarts de jour, de soir, de nuit et de fin de semaine, pour les centres hospitaliers, les CHSLD publics et privés, les RPA, les CLSC et les soins à domicile.',
    titleAnimate: 'sub-2',
    textAnimate: 'sub-22',
  },
  {
    titleId: 'w-node-d0a4cc9e-ddbc-cb9d-55ad-5927a14cc75d-9fc0289c',
    textId: 'w-node-d0a4cc9e-ddbc-cb9d-55ad-5927a14cc760-9fc0289c',
    title: ['Logistique et', 'transport'],
    text: 'Des chauffeurs de l’agence conduisent les professionnels vers le milieu, surtout la nuit et hors des axes courants. Accompagnement et transport non médicalisé de bénéficiaires, vers un rendez-vous ou lors d’un transfert. Ce n’est pas un transport ambulancier.',
    titleAnimate: 'sub-3',
    textAnimate: 'sub-32',
  },
  {
    titleId: 'w-node-d38e2533-b42f-a7d4-76be-1eae44c63108-9fc0289c',
    textId: 'w-node-d38e2533-b42f-a7d4-76be-1eae44c6310b-9fc0289c',
    title: ['Répartition et', 'administration'],
    text: 'Centrale de répartition à distance. Horaires, feuilles de temps, paie des employés et facturation aux établissements sont traités au siège, en télétravail. Aucun bail commercial : la répartition n’a pas à être un comptoir.',
  },
];
