export interface PracticeArea {
  number: string;
  title: string;
  services: string[];
  /** Photo (public/images/medica-photo-<image>-*.webp) et texte alternatif. */
  /** Phrase affichée sous le titre. */
  description: string;
  image: string;
  alt: string;
}

/** Nos services : cartes de l’accueil (liste révélée au survol). */
export const practiceAreas: PracticeArea[] = [
  {
    number: '01',
    image: 'nurses-duo',
    alt: 'Deux infirmières en uniforme.',
    title: 'Recrutement',
    description:
      'Nous recrutons des professionnels de la santé qualifiés afin de bâtir un bassin de main-d’œuvre locale fiable.',
    services: [
      'Main-d’œuvre locale',
      'Antécédents judiciaires',
      'Inscription OIIQ ou OIIAQ',
      'RCR et PDSB à jour',
      'Dossier complet avant affectation',
    ],
  },
  {
    number: '02',
    image: 'nurse-bedside',
    alt: 'Une infirmière au chevet d’un patient.',
    title: 'Placement',
    description:
      'Nous assurons le placement de personnel qualifié pour les remplacements ponctuels, les quarts planifiés et les besoins à plus long terme.',
    services: [
      'Urgence 24 h sur 24, 7 jours sur 7',
      'Quarts de jour et de soir',
      'Quarts de nuit et de fin de semaine',
      'Assignations à moyen terme',
      'Assignations à long terme',
    ],
  },
  {
    number: '03',
    image: 'walker-help',
    alt: 'Une préposée aide une dame âgée avec sa marchette.',
    title: 'Logistique',
    description:
      'Nous assurons le transport des professionnels vers les milieux de soins, surtout la nuit, ainsi que l’accompagnement non médicalisé de bénéficiaires.',
    services: [
      'Transport des professionnels',
      'Quarts de nuit',
      'Milieux hors des axes',
      'Accompagnement non médicalisé',
      'Rendez-vous et transferts',
    ],
  },
  {
    number: '04',
    image: 'team-corridor',
    alt: 'Une équipe soignante dans un corridor d’hôpital.',
    title: 'Répartition',
    description:
      'Notre centrale de répartition est disponible 24 heures sur 24, 7 jours sur 7, pour coordonner les demandes et les affectations.',
    services: [
      'Centrale de répartition à distance',
      'Horaires',
      'Feuilles de temps',
      'Paie des employés',
      'Facturation aux établissements',
    ],
  },
];
