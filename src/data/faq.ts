export interface Faq {
  question: string;
  answer: string;
}

/** Questions fréquentes (page Contact, section « FAQ »). */
export const faqs: Faq[] = [
  {
    question: 'Êtes-vous une agence autorisée?',
    answer: 'Oui. Nous avons le permis d’agence de placement de personnel de la CNESST, avec un cautionnement.',
  },
  {
    question: 'Quels types de postes offrez-vous?',
    answer:
      'Infirmières et infirmiers, infirmières et infirmiers auxiliaires, et préposés aux bénéficiaires. Nous engageons aussi des chauffeurs pour le transport de notre personnel.',
  },
  {
    question: 'Dans quels milieux travaillez-vous?',
    answer: 'Hôpitaux, CISSS et CIUSSS, CHSLD publics et privés, résidences pour aînés, CLSC et soins à domicile.',
  },
  {
    question: 'Pouvez-vous m’aider en urgence?',
    answer:
      'Oui. Nous répondons 24/7, pour un quart de jour, de soir, de nuit ou de fin de semaine. Nous offrons aussi des mandats plus longs.',
  },
  {
    question: 'Qui paie le personnel?',
    answer:
      'Nous. Le personnel travaille pour Médica Placement. Nous gérons les feuilles de temps et la paie, puis nous vous envoyons une facture.',
  },
  {
    question: 'Vérifiez-vous les candidats?',
    answer:
      'Oui, toujours. Nous vérifions l’inscription à l’OIIQ ou à l’OIIAQ, les antécédents judiciaires et les formations RCR et PDSB.',
  },
  {
    question: 'Offrez-vous le transport?',
    answer:
      'Oui, si vous le demandez, surtout la nuit ou pour les endroits éloignés. Nos chauffeurs ont un permis valide et une assurance, que nous vérifions.',
  },
  {
    question: 'Faites-vous du transport en ambulance?',
    answer:
      'Non. Nous accompagnons des patients à un rendez-vous ou lors d’un transfert, sans soins médicaux. Ce n’est pas un service d’urgence.',
  },
  {
    question: 'Recrutez-vous à l’étranger?',
    answer: 'Non. Nous recrutons seulement des gens d’ici.',
  },
  {
    question: 'Avez-vous un bureau ouvert au public?',
    answer: 'Non. Notre équipe travaille à distance. Le plus simple est de nous appeler.',
  },
  {
    question: 'Puis-je postuler sans être membre d’un ordre?',
    answer:
      'Oui, si votre poste n’en demande pas, comme préposé(e) aux bénéficiaires ou chauffeur. Votre dossier doit être complet avant votre premier mandat.',
  },
  {
    question: 'Dois-je payer pour postuler?',
    answer: 'Non. C’est gratuit, du début à la fin.',
  },
  {
    question: 'Avez-vous commencé vos activités?',
    answer:
      'Nous démarrons. Les établissements peuvent déjà nous envoyer leurs demandes, et les candidats peuvent postuler dès maintenant.',
  },
];
