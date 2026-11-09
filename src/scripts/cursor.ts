import { gsap } from './gsap';

/** Text bubble that follows the mouse over `[data-cursor-hover]` items (fine pointers only). */
function initDynamicTextCursor(): void {
  const cursor = document.querySelector<HTMLElement>('[data-cursor]');
  const textTarget = document.querySelector('[data-cursor-text-target]');
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let hasMouseMoved = false;
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' });

  const update = () => {
    const hoverItem = document.elementFromPoint(mouseX, mouseY)?.closest('[data-cursor-hover]');
    const isEdge = cursor.getBoundingClientRect().right >= window.innerWidth;
    cursor.setAttribute('data-cursor', hoverItem ? (isEdge ? 'active-edge' : 'active') : '');
    const text = hoverItem?.getAttribute('data-cursor-text');
    if (text && textTarget) textTarget.textContent = text;
  };

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    hasMouseMoved = true;
    xTo(mouseX);
    yTo(mouseY);
    requestAnimationFrame(update);
  });
  window.addEventListener(
    'scroll',
    () => {
      if (hasMouseMoved) requestAnimationFrame(update);
    },
    { passive: true },
  );
}

initDynamicTextCursor();
