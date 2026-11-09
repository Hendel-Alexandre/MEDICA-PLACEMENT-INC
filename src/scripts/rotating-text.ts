import { gsap, SplitText } from './gsap';

const IN_DURATION = 0.75;
const OUT_DURATION = 0.6;

/** Headline whose `[data-rotating-words]` span cycles through a comma-separated word list. */
function initRotatingText(): void {
  document.querySelectorAll<HTMLElement>('[data-rotating-title]').forEach((heading) => {
    const stepDuration = parseFloat(heading.getAttribute('data-step-duration') ?? '1.75');
    let next: gsap.core.Tween | undefined;

    SplitText.create(heading, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      linesClass: 'rotating-line',
      onSplit() {
        next?.kill(); // a re-split (resize) restarts the cycle instead of stacking a second one
        const rotatingSpan = heading.querySelector('[data-rotating-words]');
        if (!rotatingSpan) return;
        const words = (rotatingSpan.getAttribute('data-rotating-words') ?? '')
          .split(',')
          .map((w) => w.trim())
          .filter(Boolean);
        if (!words.length) return;

        const wrapper = document.createElement('span');
        wrapper.className = 'rotating-text__inner';
        const wordEls = words.map((word) => {
          const el = document.createElement('span');
          el.className = 'rotating-text__word';
          el.textContent = word;
          wrapper.appendChild(el);
          return el;
        });
        rotatingSpan.textContent = '';
        rotatingSpan.appendChild(wrapper);

        requestAnimationFrame(() => {
          gsap.set(wordEls, { yPercent: 150, autoAlpha: 0 });
          let activeIndex = 0;
          gsap.set(wordEls[0], { yPercent: 0, autoAlpha: 1 });
          wrapper.style.width = `${wordEls[0].getBoundingClientRect().width}px`;

          const showNext = () => {
            const nextIndex = (activeIndex + 1) % wordEls.length;
            const prev = wordEls[activeIndex];
            const current = wordEls[nextIndex];
            gsap.to(wrapper, {
              width: current.getBoundingClientRect().width,
              duration: IN_DURATION,
              ease: 'power4.inOut',
            });
            if (prev !== current) {
              gsap.to(prev, { yPercent: -150, autoAlpha: 0, duration: OUT_DURATION, ease: 'power4.inOut' });
            }
            gsap.fromTo(
              current,
              { yPercent: 150, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: IN_DURATION, ease: 'power4.inOut' },
            );
            activeIndex = nextIndex;
            next = gsap.delayedCall(stepDuration, showNext);
          };

          if (wordEls.length > 1) next = gsap.delayedCall(stepDuration, showNext);
        });
      },
    });
  });
}

initRotatingText();
