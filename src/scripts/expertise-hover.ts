import { gsap } from './gsap';

/** Expertise cards: corner overlay grows, heading recolours, icon flips and the list fades up. */
function initExpertiseHover(): void {
  document.querySelectorAll<HTMLElement>('.expertise_item').forEach((item) => {
    const overlay = item.querySelector('.expertise_overlay');
    const icon = item.querySelector('.expertise_icon');
    const heading = item.querySelector('.heading-size-h4.is_expertise');
    const listItems = item.querySelectorAll('.expertise_list-item');

    gsap.set(overlay, { scaleX: 0, scaleY: 0, transformOrigin: 'top right' });
    gsap.set(listItems, { y: '1em', opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(overlay, { scaleX: 1, scaleY: 1, duration: 0.7, ease: 'expo.inOut' }, 0)
      .to(heading, { color: 'var(--royal)', duration: 0.5, ease: 'expo.inOut' }, 0.1)
      .to(icon, { rotation: 180, duration: 0.7, ease: 'expo.inOut' }, 0.2)
      .to(listItems, { y: '0em', opacity: 1, duration: 0.5, ease: 'expo.inOut', stagger: 0.06 }, 0.3);

    item.addEventListener('mouseenter', () => tl.timeScale(1).play());
    item.addEventListener('mouseleave', () => tl.timeScale(1.5).reverse());
  });
}

initExpertiseHover();
