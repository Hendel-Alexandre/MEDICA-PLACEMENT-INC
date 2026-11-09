const DEFAULT_TIMEZONE = 'America/Toronto';
const DAY_INDEX: Record<string, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

interface Slot {
  open: boolean;
  openMin: number;
  closeMin: number;
  overnight: boolean;
}

const toMinutes = (value: string) => {
  const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(value);
  return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : null;
};

/** Highlights today in the opening-hours table and shows an open/closed status (checked every minute). */
function initOpeningHours(): void {
  document.querySelectorAll<HTMLElement>('[data-opening-hours-init]').forEach((root) => {
    let tz = root.getAttribute('data-opening-hours-timezone') || DEFAULT_TIMEZONE;
    try {
      new Intl.DateTimeFormat('en-GB', { timeZone: tz });
    } catch {
      tz = DEFAULT_TIMEZONE;
    }

    const ordered: HTMLElement[] = new Array(7);
    root.querySelectorAll<HTMLElement>('[data-opening-hours-day]').forEach((row) => {
      const day = (row.getAttribute('data-opening-hours-day') ?? '').trim().toLowerCase();
      if (day in DAY_INDEX) {
        if (ordered[DAY_INDEX[day]]) console.error(`[OpeningHours] Duplicate day "${day}" found in`, root);
        ordered[DAY_INDEX[day]] = row;
      }
    });
    if ([...ordered].some((row) => !row)) return;

    const schedule: Slot[] = ordered.map((row) => {
      const openMin = toMinutes((row.getAttribute('data-opening-hours-open') ?? '').trim());
      const closeMin = toMinutes((row.getAttribute('data-opening-hours-close') ?? '').trim());
      if (openMin === null || closeMin === null) return { open: false, openMin: 0, closeMin: 0, overnight: false };
      // Identical opening and closing times mean open around the clock.
      if (openMin === closeMin) return { open: true, openMin: 0, closeMin: 24 * 60, overnight: false };
      return { open: true, openMin, closeMin, overnight: openMin > closeMin };
    });

    const now = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).formatToParts(new Date());
      const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
      return {
        dayIdx: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(map.weekday),
        minutes: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10),
      };
    };

    const evaluate = () => {
      const { dayIdx, minutes } = now();
      ordered.forEach((row) => row.removeAttribute('data-opening-hours-current-day'));
      ordered[dayIdx].setAttribute('data-opening-hours-current-day', '');
      const today = schedule[dayIdx];
      const yesterday = schedule[(dayIdx + 6) % 7];
      let isOpen = false;
      if (today.open) {
        isOpen = today.overnight
          ? minutes >= today.openMin || minutes < today.closeMin
          : minutes >= today.openMin && minutes < today.closeMin;
      }
      if (!isOpen && yesterday.open && yesterday.overnight && minutes < yesterday.closeMin) isOpen = true;
      ordered.forEach((row, idx) =>
        row.setAttribute('data-opening-hours-status', idx === dayIdx && isOpen ? 'open' : 'closed'),
      );
      root.setAttribute('data-opening-hours-store-status', isOpen ? 'open' : 'closed');
    };

    evaluate();
    setInterval(evaluate, 60 * 1000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) evaluate();
    });
  });
}

initOpeningHours();
