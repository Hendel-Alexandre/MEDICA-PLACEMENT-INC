import { gsap } from './gsap';

/**
 * Scroll-scrubbed parallax for `[data-parallax="trigger"]` elements.
 * Attributes: -direction (vertical|horizontal), -start / -end (percent),
 * -scrub, -scroll-start / -scroll-end, -disable (mobile|mobileLandscape|tablet).
 */
export function initParallax(): void {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobile: '(max-width:479px)',
      isMobileLandscape: '(max-width:767px)',
      isTablet: '(max-width:991px)',
      isDesktop: '(min-width:992px)',
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions ?? {};
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('[data-parallax="trigger"]').forEach((trigger) => {
          const disable = trigger.getAttribute('data-parallax-disable');
          if (
            (disable === 'mobile' && isMobile) ||
            (disable === 'mobileLandscape' && isMobileLandscape) ||
            (disable === 'tablet' && isTablet)
          ) {
            return;
          }
          const target = trigger.querySelector('[data-parallax="target"]') ?? trigger;
          const prop = trigger.getAttribute('data-parallax-direction') === 'horizontal' ? 'xPercent' : 'yPercent';
          const scrubAttr = trigger.getAttribute('data-parallax-scrub');
          const startAttr = trigger.getAttribute('data-parallax-start');
          const endAttr = trigger.getAttribute('data-parallax-end');
          const scrollStart = trigger.getAttribute('data-parallax-scroll-start') ?? 'top bottom';
          const scrollEnd = trigger.getAttribute('data-parallax-scroll-end') ?? 'bottom top';

          gsap.fromTo(
            target,
            { [prop]: startAttr !== null ? parseFloat(startAttr) : 20 },
            {
              [prop]: endAttr !== null ? parseFloat(endAttr) : -20,
              ease: 'none',
              scrollTrigger: {
                trigger,
                start: `clamp(${scrollStart})`,
                end: `clamp(${scrollEnd})`,
                scrub: scrubAttr ? parseFloat(scrubAttr) : true,
              },
            },
          );
        });
      });
      return () => ctx.revert();
    },
  );
}
