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
    description: 'Nous trouvons des professionnels de la santé d’ici, qualifiés et fiables.',
    services: [
      'Professionnels d’ici',
      'Antécédents judiciaires vérifiés',
      'Membres de l’OIIQ ou de l’OIIAQ',
      'Formations RCR et PDSB à jour',
      'Dossier complet avant chaque mandat',
    ],
  },
  {
    number: '02',
    image: 'nurse-bedside',
    alt: 'Une infirmière au chevet d’un patient.',
    title: 'Placement',
    description:
      'Un remplacement de dernière minute, un quart à combler ou un besoin à long terme? Nous avons quelqu’un pour vous.',
    services: [
      'Urgences 24/7',
      'Quarts de jour et de soir',
      'Quarts de nuit et de fin de semaine',
      'Mandats de quelques semaines',
      'Mandats de plusieurs mois',
    ],
  },
  {
    number: '03',
    image: 'walker-help',
    alt: 'Une préposée aide une dame âgée avec sa marchette.',
    title: 'Transport',
    description:
      'Nous conduisons notre personnel jusqu’à votre établissement, surtout la nuit. Nous accompagnons aussi des patients à leurs rendez-vous.',
    services: [
      'Transport de notre personnel',
      'Trajets de nuit',
      'Endroits plus éloignés',
      'Accompagnement de patients',
      'Rendez-vous et transferts',
    ],
  },
  {
    number: '04',
    image: 'team-corridor',
    alt: 'Une équipe soignante dans un corridor d’hôpital.',
    title: 'Service 24/7',
    description:
      'Une vraie personne vous répond, jour et nuit, 7 jours sur 7. Nous nous occupons aussi de toute la paperasse.',
    services: [
      'Une ligne ouverte 24/7',
      'Horaires',
      'Feuilles de temps',
      'Paie de notre personnel',
      'Facturation simple',
    ],
  },
];
