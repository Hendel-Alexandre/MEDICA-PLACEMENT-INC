export interface Faq {
  question: string;
  answer: string;
}

/** Questions fréquentes (page Contact, section « FAQ »). */
export const faqs: Faq[] = [
  {
    question: 'Êtes-vous une agence de placement autorisée?',
    answer:
      'Oui. Médica Placement inc. est titulaire du permis d’agence de placement de personnel délivré par la CNESST, avec police de cautionnement.',
  },
  {
    question: 'Quels titres placez-vous?',
    answer:
      'Infirmières et infirmiers, infirmières et infirmiers auxiliaires, préposés aux bénéficiaires. Les chauffeurs sont employés pour le pôle logistique, ils ne sont pas du personnel soignant.',
  },
  {
    question: 'Quels milieux?',
    answer:
      'Centres hospitaliers et installations des CISSS et CIUSSS, CHSLD publics et privés, RPA, CLSC, soins à domicile.',
  },
  {
    question: 'Faites-vous de l’urgence?',
    answer:
      'Oui. Remplacement 24 h sur 24, 7 jours sur 7, quarts de jour, de soir, de nuit et de fin de semaine, en plus d’assignations contractuelles.',
  },
  {
    question: 'Le personnel est-il employé de l’agence?',
    answer: 'Oui. L’agence gère les feuilles de temps, la paie et la facturation à l’établissement.',
  },
  {
    question: 'Vérifiez-vous les ordres?',
    answer: 'Oui. Inscription à l’OIIQ ou à l’OIIAQ selon le titre, antécédents judiciaires, RCR et PDSB à jour.',
  },
  {
    question: 'Transportez-vous les employés?',
    answer:
      'Oui, lorsque le service est retenu, notamment la nuit ou vers une zone excentrée. Au démarrage, les chauffeurs utilisent leur véhicule personnel, avec permis SAAQ et assurance commerciale vérifiés.',
  },
  {
    question: 'Faites-vous du transport ambulancier?',
    answer:
      'Non. L’accompagnement de bénéficiaires est non médicalisé : rendez-vous ou transfert. Ce n’est pas un service préhospitalier d’urgence.',
  },
  {
    question: 'Recrutez-vous à l’étranger?',
    answer: 'Non. Bassin local uniquement. Pas de permis ARTE.',
  },
  {
    question: 'Êtes-vous membres d’ACSESS?',
    answer: 'Non, pas à ce stade. L’adhésion est volontaire.',
  },
  {
    question: 'Avez-vous un bureau ouvert au public?',
    answer: 'Non. Pas de bail commercial. Répartition et administration en télétravail depuis le siège social.',
  },
  {
    question: 'Puis-je postuler sans numéro d’ordre?',
    answer: 'Seulement si le titre n’exige pas d’ordre (PAB, chauffeur). Un dossier incomplet n’est pas affecté.',
  },
  {
    question: 'Facturez-vous les candidats?',
    answer: 'Non. Aucuns frais au travailleur pour le recrutement ou l’affectation.',
  },
  {
    question: 'Êtes-vous déjà en opération?',
    answer:
      'L’entreprise est en déploiement. Les demandes et les candidatures sont ouvertes. Les premières affectations et paies suivent les premiers contrats de services.',
  },
];
