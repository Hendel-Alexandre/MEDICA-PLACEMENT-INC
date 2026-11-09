export interface OpeningHoursDay {
  /** Weekday key read by src/scripts/opening-hours.ts. */
  day: string;
  label: string;
  /** Displayed hours. */
  time: string;
  /** 24h opening and closing times; identical times mean open all day. */
  open?: string;
  close?: string;
  current?: boolean;
}

/** Centrale de répartition (page Contact), heure de Montréal. */
export const openingHours: OpeningHoursDay[] = [
  { day: 'monday', label: 'Lundi', time: '24 h sur 24', open: '00:00', close: '00:00' },
  { day: 'tuesday', label: 'Mardi', time: '24 h sur 24', open: '00:00', close: '00:00' },
  { day: 'wednesday', label: 'Mercredi', time: '24 h sur 24', open: '00:00', close: '00:00' },
  { day: 'thursday', label: 'Jeudi', time: '24 h sur 24', open: '00:00', close: '00:00' },
  { day: 'friday', label: 'Vendredi', time: '24 h sur 24', open: '00:00', close: '00:00' },
  { day: 'saturday', label: 'Samedi', time: '24 h sur 24', open: '00:00', close: '00:00' },
  { day: 'sunday', label: 'Dimanche', time: '24 h sur 24', open: '00:00', close: '00:00' },
];
