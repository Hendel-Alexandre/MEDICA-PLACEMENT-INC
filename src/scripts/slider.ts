import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { CustomEase, gsap, ScrollTrigger } from './gsap';

gsap.registerPlugin(Draggable, InertiaPlugin);
CustomEase.create('osmo-ease', '0.625, 0.05, 0, 1');

const MOVE = { ease: 'osmo-ease', duration: 0.725 };

interface LoopConfig {
  paused?: boolean;
  draggable?: boolean;
  center?: boolean;
  repeat?: number;
  speed?: number;
  snap?: number | false;
  paddingRight?: number;
  reversed?: boolean;
  onChange?: (element: HTMLElement, index: number) => void;
}

type LoopTimeline = gsap.core.Timeline & {
  toIndex: (index: number, vars?: gsap.TweenVars) => unknown;
  closestIndex: (setCurrent?: boolean) => number;
  current: () => number;
  next: (vars?: gsap.TweenVars) => unknown;
  previous: (vars?: gsap.TweenVars) => unknown;
  times: number[];
  draggable?: Draggable;
};

/** Centred, draggable testimonial slider with bullets, arrows and viewport-aware autoplay. */
function initSliders(): void {
  document.querySelectorAll<HTMLElement>('[data-centered-slider="wrapper"]').forEach((wrapper) => {
    const slides = gsap.utils.toArray<HTMLElement>(wrapper.querySelectorAll('[data-centered-slider="slide"]'));
    const bullets = gsap.utils.toArray<HTMLElement>(wrapper.querySelectorAll('[data-centered-slider="bullet"]'));
    const prevButton = wrapper.querySelector('[data-centered-slider="prev-button"]');
    const nextButton = wrapper.querySelector('[data-centered-slider="next-button"]');
    const autoplayEnabled = wrapper.getAttribute('data-slider-autoplay') === 'true';
    const autoplayDuration = autoplayEnabled
      ? parseFloat(wrapper.getAttribute('data-slider-autoplay-duration') ?? '') || 0
      : 0;

    let activeElement: HTMLElement | undefined;
    let activeBullet: HTMLElement | undefined;
    let currentIndex = 0;
    let autoplay: gsap.core.Tween | null = null;

    slides.forEach((slide, i) => slide.setAttribute('id', `slide-${i}`));
    bullets.forEach((bullet, i) => {
      bullet.setAttribute('aria-controls', `slide-${i}`);
      bullet.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
    });

    const selectBullet = (index: number) => {
      activeBullet?.classList.remove('active');
      activeBullet = bullets[index];
      activeBullet?.classList.add('active');
      bullets.forEach((b, j) => b.setAttribute('aria-selected', j === index ? 'true' : 'false'));
    };

    const loop = horizontalLoop(slides, {
      paused: true,
      draggable: true,
      center: true,
      onChange: (element, index) => {
        currentIndex = index;
        activeElement?.classList.remove('active');
        element.classList.add('active');
        activeElement = element;
        if (bullets.length) selectBullet(index);
      },
    });

    loop.toIndex(2, { duration: 0.01 });

    const startAutoplay = () => {
      if (autoplayDuration > 0 && !autoplay) {
        const repeat = () => {
          loop.next(MOVE);
          autoplay = gsap.delayedCall(autoplayDuration, repeat);
        };
        autoplay = gsap.delayedCall(autoplayDuration, repeat);
      }
    };
    const stopAutoplay = () => {
      autoplay?.kill();
      autoplay = null;
    };

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: startAutoplay,
      onLeave: stopAutoplay,
      onEnterBack: startAutoplay,
      onLeaveBack: stopAutoplay,
    });
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', () => {
      if (ScrollTrigger.isInViewport(wrapper)) startAutoplay();
    });

    slides.forEach((slide, i) => slide.addEventListener('click', () => loop.toIndex(i, MOVE)));
    bullets.forEach((bullet, i) =>
      bullet.addEventListener('click', () => {
        loop.toIndex(i, MOVE);
        selectBullet(i);
      }),
    );
    prevButton?.addEventListener('click', () => {
      loop.toIndex(currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1, MOVE);
    });
    nextButton?.addEventListener('click', () => {
      loop.toIndex(currentIndex + 1 >= slides.length ? 0 : currentIndex + 1, MOVE);
    });
  });
}

/**
 * GSAP "seamless loop" helper (https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop).
 */
function horizontalLoop(itemsInput: HTMLElement[], config: LoopConfig = {}): LoopTimeline {
  let timeline!: LoopTimeline;
  const items = gsap.utils.toArray<HTMLElement>(itemsInput);

  gsap.context(() => {
    const onChange = config.onChange;
    let lastIndex = 0;
    const tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: 'none' },
      onUpdate:
        onChange &&
        function () {
          const i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    }) as LoopTimeline;

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const spaceBefore: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    let indexIsDirty = false;
    const center = config.center;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);
    let timeOffset = 0;
    const container = (center === true ? items[0].parentNode : items[0].parentNode) as HTMLElement;
    let totalWidth = 0;
    let timeWrap: (value: number) => number = (v) => v;
    let proxy: HTMLElement | undefined;

    const scaleX = (el: HTMLElement) => Number(gsap.getProperty(el, 'scaleX'));
    const getTotalWidth = () =>
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      items[length - 1].offsetWidth * scaleX(items[length - 1]) +
      (config.paddingRight || 0);

    const populateWidths = () => {
      let b1 = container.getBoundingClientRect();
      items.forEach((el, i) => {
        widths[i] = parseFloat(String(gsap.getProperty(el, 'width', 'px')));
        xPercents[i] = snap(
          (parseFloat(String(gsap.getProperty(el, 'x', 'px'))) / widths[i]) * 100 +
            Number(gsap.getProperty(el, 'xPercent')),
        );
        const b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, { xPercent: (i: number) => xPercents[i] });
      totalWidth = getTotalWidth();
    };

    const populateOffsets = () => {
      timeOffset = center ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth : 0;
      if (center) {
        times.forEach((_, i) => {
          times[i] = timeWrap(tl.labels['label' + i] + (tl.duration() * widths[i]) / 2 / totalWidth - timeOffset);
        });
      }
    };

    const getClosest = (values: number[], value: number, wrap: number) => {
      let i = values.length;
      let closest = 1e10;
      let index = 0;
      while (i--) {
        let d = Math.abs(values[i] - value);
        if (d > wrap / 2) d = wrap - d;
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    };

    const populateTimeline = () => {
      tl.clear();
      for (let i = 0; i < length; i++) {
        const item = items[i];
        const curX = (xPercents[i] / 100) * widths[i];
        const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        const distanceToLoop = distanceToStart + widths[i] * scaleX(item);
        tl.to(
          item,
          { xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond },
          0,
        )
          .fromTo(
            item,
            { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
            {
              xPercent: xPercents[i],
              duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond,
          )
          .add('label' + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    };

    const refresh = (deep?: boolean) => {
      const progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      if (deep && tl.draggable) tl.time(times[curIndex], true);
      else tl.progress(progress, true);
    };

    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener('resize', () => refresh(true));

    function toIndex(index: number, vars: gsap.TweenVars = {}) {
      if (Math.abs(index - curIndex) > length / 2) index += index > curIndex ? -length : length;
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) vars.modifiers = { time: timeWrap };
      curIndex = newIndex;
      vars.overwrite = true;
      if (proxy) gsap.killTweensOf(proxy);
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }

    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      const index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete?.();
      tl.reverse();
    }

    if (config.draggable) {
      proxy = document.createElement('div');
      const wrap = gsap.utils.wrap(0, 1);
      let ratio = 0;
      let startProgress = 0;
      let lastSnap = 0;
      let initChangeX = 0;
      let wasPlaying = false;
      const syncIndex = () => tl.closestIndex(true);
      const draggable: Draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode as HTMLElement,
        type: 'x',
        onPressInit() {
          const x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy!, { x: startProgress / -ratio });
        },
        onDrag: () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        onThrowUpdate: () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        overshootTolerance: 0,
        inertia: true,
        snap(value: number) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) return lastSnap + initChangeX;
          const time = -(value * ratio) * tl.duration();
          const wrappedTime = timeWrap(time);
          const snapTime = times[getClosest(times, wrappedTime, tl.duration())];
          let dif = snapTime - wrappedTime;
          if (Math.abs(dif) > tl.duration() / 2) dif += dif < 0 ? tl.duration() : -tl.duration();
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          if (draggable.isThrowing) indexIsDirty = true;
        },
        onThrowComplete: () => {
          syncIndex();
          if (wasPlaying) tl.play();
        },
      })[0];
      tl.draggable = draggable;
    }

    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange?.(items[curIndex], curIndex);
    timeline = tl;
  });

  return timeline;
}

initSliders();
