import { gsap, ScrollTrigger } from './gsap';

/*
 * Number odometer: digits inside `[data-odometer-element]` roll into place when their
 * `[data-odometer-group]` scrolls into view. Skipped entirely for reduced-motion users.
 */

const DEFAULTS = {
  duration: 1,
  ease: 'power3.out',
  elementStagger: 0.1,
  digitStagger: 0.04,
  revealDuration: 0.5,
  revealEase: 'power2.out',
  triggerStart: 'top 80%',
  staggerOrder: 'left',
  digitCycles: 2,
};

interface Segment {
  type: 'digit' | 'static';
  char: string;
  startDigit?: number;
  hidden?: boolean;
}

interface Roller {
  roller: HTMLElement;
  targetPos: number;
}

const lineHeightRatio = (el: Element) => {
  const cs = getComputedStyle(el);
  return cs.lineHeight === 'normal' ? 1.2 : parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
};

const parseSegments = (text: string): Segment[] =>
  [...text].map((char) => ({ type: /\d/.test(char) ? 'digit' : 'static', char }));

function mapStartDigits(segments: Segment[], startValue: number): Segment[] {
  const slots = segments.filter((s) => s.type === 'digit').length;
  const padded = String(Math.floor(Math.abs(startValue)))
    .padStart(slots, '0')
    .slice(-slots);
  let di = 0;
  return segments.map((s) => (s.type === 'digit' ? { ...s, startDigit: parseInt(padded[di++], 10) } : s));
}

function markHiddenSegments(segments: Segment[], startValue: number): Segment[] {
  const totalDigits = segments.filter((s) => s.type === 'digit').length;
  const absStart = Math.floor(Math.abs(startValue));
  const leadingZeros = Math.max(0, totalDigits - (absStart === 0 ? 1 : String(absStart).length));
  if (leadingZeros === 0) return segments;
  let digitsSeen = 0;
  let firstDigitSeen = false;
  let prevDigitHidden = false;
  return segments.map((seg) => {
    if (seg.type === 'digit') {
      firstDigitSeen = true;
      const hidden = digitsSeen < leadingZeros;
      prevDigitHidden = hidden;
      digitsSeen++;
      return { ...seg, hidden };
    }
    return { ...seg, hidden: firstDigitSeen && prevDigitHidden };
  });
}

function shouldGrow(el: Element, hasExplicitStart: boolean, startValue: number, segments: Segment[]) {
  if (el.hasAttribute('data-odometer-grow')) return el.getAttribute('data-odometer-grow') !== 'false';
  if (!hasExplicitStart) return false;
  const absStart = Math.floor(Math.abs(startValue));
  const startDigitCount = absStart === 0 ? 1 : String(absStart).length;
  return startDigitCount < segments.filter((s) => s.type === 'digit').length;
}

function buildRollerDOM(el: HTMLElement, segments: Segment[], step: number, grow: boolean) {
  el.innerHTML = '';
  el.style.height = '';
  const rollers: Roller[] = [];
  const revealEls: HTMLElement[] = [];
  const totalCells = 10 * DEFAULTS.digitCycles;

  segments.forEach((seg) => {
    if (seg.type === 'static') {
      const span = document.createElement('span');
      span.setAttribute('data-odometer-part', 'static');
      span.style.height = `${step}em`;
      span.style.lineHeight = String(step);
      span.textContent = seg.char;
      el.appendChild(span);
      if (grow && seg.hidden) {
        gsap.set(span, { opacity: 0 });
        revealEls.push(span);
      }
      return;
    }
    const mask = document.createElement('span');
    mask.setAttribute('data-odometer-part', 'mask');
    mask.style.height = `${step}em`;
    mask.style.lineHeight = String(step);
    const roller = document.createElement('span');
    roller.setAttribute('data-odometer-part', 'roller');
    roller.style.lineHeight = String(step);
    roller.textContent = Array.from({ length: totalCells }, (_, d) => d % 10).join('\n');
    mask.appendChild(roller);
    el.appendChild(mask);

    const startDigit = seg.startDigit ?? 0;
    const isReveal = grow && seg.hidden;
    gsap.set(roller, { y: isReveal ? `${step}em` : `${-startDigit * step}em` });
    const endDigit = parseInt(seg.char, 10);
    rollers.push({ roller, targetPos: endDigit > startDigit ? endDigit : 10 + endDigit });
    if (isReveal) revealEls.push(mask);
  });
  return { rollers, revealEls };
}

function cleanupElement(el: HTMLElement, originalText: string) {
  el.style.overflow = '';
  el.style.height = '';
  const digits = [...originalText].filter((c) => /\d/.test(c));
  let di = 0;
  el.querySelectorAll<HTMLElement>('[data-odometer-part="mask"]').forEach((mask) => {
    mask.querySelector('[data-odometer-part="roller"]')?.remove();
    mask.textContent = digits[di++] ?? '';
    mask.style.opacity = '';
    mask.style.overflow = '';
  });
  el.querySelectorAll<HTMLElement>('[data-odometer-part="static"]').forEach((s) => {
    s.style.opacity = '';
  });
}

function initNumberOdometer(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-odometer-group]').forEach((group) => {
    if (group.hasAttribute('data-odometer-initialized')) return;
    group.setAttribute('data-odometer-initialized', '');
    const elements = [...group.querySelectorAll<HTMLElement>('[data-odometer-element]')];
    if (!elements.length) return;

    const staggerOrder = group.getAttribute('data-odometer-stagger-order') || DEFAULTS.staggerOrder;
    const triggerStart = group.getAttribute('data-odometer-trigger-start') || DEFAULTS.triggerStart;
    const elementStagger = parseFloat(group.getAttribute('data-odometer-stagger') ?? '') || DEFAULTS.elementStagger;

    const elementData = elements.map((el) => {
      const originalText = (el.textContent ?? '').trim();
      const hasExplicitStart = el.hasAttribute('data-odometer-start');
      const startValue = parseFloat(el.getAttribute('data-odometer-start') ?? '') || 0;
      const duration = parseFloat(el.getAttribute('data-odometer-duration') ?? '') || DEFAULTS.duration;
      const step = lineHeightRatio(el);
      const segments = markHiddenSegments(mapStartDigits(parseSegments(originalText), startValue), startValue);
      const grow = shouldGrow(el, hasExplicitStart, startValue, segments);
      const { rollers, revealEls } = buildRollerDOM(el, segments, step, grow);
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      const revealData = revealEls.map((revealEl) => {
        const widthEm = revealEl.offsetWidth / fontSize;
        gsap.set(revealEl, { width: 0, overflow: 'hidden' });
        return { el: revealEl, widthEm };
      });
      return { el, rollers, duration, step, revealData, originalText };
    });

    let ordered = [...elementData];
    if (staggerOrder === 'right') ordered.reverse();
    if (staggerOrder === 'random') ordered = gsap.utils.shuffle(ordered);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: group, start: triggerStart, once: true },
      onComplete: () => elementData.forEach(({ el, originalText }) => cleanupElement(el, originalText)),
    });
    ordered.forEach(({ rollers, duration, step, revealData }, orderIdx) => {
      const offset = orderIdx * elementStagger;
      revealData.forEach(({ el, widthEm }) => {
        tl.to(
          el,
          { width: `${widthEm}em`, opacity: 1, duration: DEFAULTS.revealDuration, ease: DEFAULTS.revealEase },
          offset,
        );
      });
      rollers.forEach(({ roller, targetPos }, digitIdx) => {
        tl.to(
          roller,
          { y: `${-targetPos * step}em`, duration, ease: DEFAULTS.ease, force3D: true },
          offset + (rollers.length - 1 - digitIdx) * DEFAULTS.digitStagger,
        );
      });
    });
  });

  // Keep mask heights in step with the line height after a width change.
  let resizeTimer = 0;
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      document.querySelectorAll<HTMLElement>('[data-odometer-element]').forEach((el) => {
        if (!el.querySelector('[data-odometer-part="roller"]')) return;
        const step = lineHeightRatio(el);
        el.querySelectorAll<HTMLElement>('[data-odometer-part="mask"]').forEach((mask) => {
          mask.style.height = `${step}em`;
          mask.style.lineHeight = String(step);
        });
        el.querySelectorAll<HTMLElement>('[data-odometer-part="roller"], [data-odometer-part="static"]').forEach(
          (part) => {
            part.style.lineHeight = String(step);
          },
        );
      });
      ScrollTrigger.refresh();
    }, 250);
  });
}

initNumberOdometer();
