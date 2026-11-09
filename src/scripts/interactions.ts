import { gsap, ScrollTrigger, SplitText } from './gsap';

/*
 * Scroll and load animations, built with GSAP.
 * Text splits are
 * reverted once their reveal has finished so the copy can re-wrap on resize.
 */

const EASE = 'expo.inOut';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type SplitType = 'chars' | 'words' | 'lines';

/** Splits every element matching `selector` and returns the pieces in document order. */
function split(selector: string | Element[], type: SplitType) {
  const targets = typeof selector === 'string' ? gsap.utils.toArray<Element>(selector) : selector;
  const splits = targets.map((el) => SplitText.create(el, { type, mask: type }));
  const pieces = splits.flatMap((s) => s[type]);
  return { pieces, revert: () => splits.forEach((s) => s.revert()) };
}

/** Scroll trigger that plays once when `trigger` crosses `start`. */
function playOnEnter(trigger: Element, start: string): ScrollTrigger.Vars {
  return {
    trigger,
    start: `clamp(${start})`,
    end: 'clamp(bottom top)',
    toggleActions: 'play none none none',
  };
}

function finish(tl: gsap.core.Timeline) {
  if (reducedMotion) tl.progress(1);
}

/** Homepage load: preloader, then the hero heading, image and practice-area row. */
function homeIntro() {
  if (!document.querySelector('.preloader')) return;
  const heading = split('.hero_heading', 'words');
  const tl = gsap.timeline({ onComplete: heading.revert });
  tl.to('.preloader', { yPercent: -100, duration: 1.1, ease: EASE }, 2.4)
    .from('.preloader_signet', { yPercent: 105, duration: 1.3, ease: EASE }, 1.1)
    .from('.bolt.preloader_01', { x: '8.3em', y: '8.3em', duration: 1.3, ease: EASE }, 0.2)
    .from('.bolt.preloader_02', { x: '-8.3em', y: '8.3em', duration: 1.3, ease: EASE }, 0.2)
    .from('.bolt.preloader_03', { x: '8.3em', y: '-8.3em', duration: 1.3, ease: EASE }, 0.2)
    .from('.bolt.preloader_04', { x: '-8.3em', y: '-8.3em', duration: 1.3, ease: EASE }, 0.2)
    .from(heading.pieces, { yPercent: 100, duration: 1.2, stagger: { amount: 0.8 }, ease: EASE }, 3.05)
    .from('.hero_img-wrap', { width: '0%', duration: 1.2, ease: 'power3.inOut', clearProps: 'width' }, 5.16)
    .from('.hero_heading-wrap', { width: '100%', duration: 1.3, ease: EASE, clearProps: 'width' }, 5.06)
    .from(
      '.hero_bottom .hero_bottom-txt',
      { yPercent: 100, duration: 0.6, stagger: { amount: 0.35 }, ease: EASE },
      5.85,
    );
  finish(tl);
}

/** Homepage: the hero image zooms while each full-screen image section scrolls past. */
function heroImageZoom() {
  const image = document.querySelector('[data-animate="hero-img"]');
  if (!image || reducedMotion) return;
  document.querySelectorAll('.parallax-fullscreen').forEach((trigger) => {
    gsap.to(image, {
      scale: 1.5,
      ease: 'none',
      scrollTrigger: { trigger, start: 'clamp(top bottom)', end: 'clamp(bottom top)', scrub: 1 },
    });
  });
}

/** Homepage headings reveal line by line when scrolled into view. */
function typoReveal() {
  document.querySelectorAll('[data-animate="typo"]').forEach((el) => {
    const lines = split([el], 'lines');
    const tl = gsap.timeline({ scrollTrigger: playOnEnter(el, 'top 80%'), onComplete: lines.revert });
    tl.from(lines.pieces, { yPercent: 100, duration: 1.2, stagger: { each: 0.08 }, ease: EASE });
    finish(tl);
  });
}

/** About and contact load: heading words, bolt, subline and team cards. */
function aboutIntro() {
  if (!document.querySelector('[data-animate="about"]')) return;
  const heading = split('[data-animate="about"]', 'words');
  const sub = split('[data-animate="sub"]', 'lines');
  const tl = gsap.timeline({
    onComplete: () => {
      heading.revert();
      sub.revert();
    },
  });
  tl.from(heading.pieces, { yPercent: 100, duration: 1.2, stagger: { amount: 0.4 }, ease: EASE }, 0)
    .to('.hero_about-wrap', { width: '100%', duration: 1.1, ease: EASE }, 1.45)
    .from('[data-animate="bolt"]', { scale: 0, duration: 0.7, ease: EASE }, 2.26)
    .from(sub.pieces, { yPercent: 100, duration: 1, stagger: { each: 0.04 }, ease: EASE }, 2.24);
  (
    [
      ['team-01', 2.91],
      ['team-02', 3.15],
      ['team-03', 3.34],
    ] as const
  ).forEach(([name, at]) => {
    tl.from(`[data-animate="${name}"]`, { yPercent: 30, opacity: 0, duration: 1, ease: EASE }, at);
  });
  finish(tl);
}

/** Services load: heading lines, the four sub-lines and the bolt. */
function servicesIntro() {
  if (!document.querySelector('[data-animate="service-01"]')) return;
  const parts = (['service-01', 'sub-1', 'sub-12', 'sub-2', 'sub-22'] as const).map((name) =>
    split(`[data-animate="${name}"]`, 'lines'),
  );
  const [heading, sub1, sub12, sub2, sub22] = parts;
  const line = { yPercent: 100, duration: 1, stagger: { amount: 0.3 }, ease: EASE };
  const tl = gsap.timeline({ onComplete: () => parts.forEach((p) => p.revert()) });
  tl.from(heading.pieces, { ...line, duration: 1.4 }, 0)
    .from('[data-animate="bolt"]', { scale: 0, duration: 0.7, ease: EASE }, 1.05)
    .from(sub1.pieces, line, 1.08)
    .from(sub12.pieces, line, 1.28)
    .from(sub2.pieces, line, 1.61)
    .from(sub22.pieces, line, 1.81);
  finish(tl);
}

/** Footer: the full-width wordmark rolls in letter by letter. */
function footerWordmark() {
  const wordmarks = gsap.utils.toArray<Element>('[data-fit-width]');
  document.querySelectorAll('.footer').forEach((footer) => {
    const chars = split(wordmarks, 'chars');
    const tl = gsap.timeline({ scrollTrigger: playOnEnter(footer, 'top 70%'), onComplete: chars.revert });
    tl.from(chars.pieces, { yPercent: 100, duration: 1.7, stagger: { each: 0.06 }, ease: EASE });
    finish(tl);
  });
}

function setup() {
  homeIntro();
  heroImageZoom();
  typoReveal();
  aboutIntro();
  servicesIntro();
  footerWordmark();
  // Start states are applied; let ix.css stop hiding the animated elements.
  document.documentElement.classList.add('ix-ready');
  ScrollTrigger.refresh();
}

/** Animations start once the page (fonts and images) has fully loaded. */
export function initInteractions(): void {
  const start = () => document.fonts.ready.then(setup);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
