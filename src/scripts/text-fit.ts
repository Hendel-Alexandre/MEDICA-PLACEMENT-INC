/** Scales `[data-fit-width]` text so it exactly fills its parent's content width. */
export function initTextFit(): void {
  const elements = [...document.querySelectorAll<HTMLElement>('[data-fit-width]')];
  if (!elements.length) return;

  const groups = new Map<HTMLElement, HTMLElement[]>();
  elements.forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    el.style.whiteSpace = 'nowrap';
    groups.set(parent, [...(groups.get(parent) ?? []), el]);
  });

  const availableWidth = (parent: HTMLElement) => {
    const cs = getComputedStyle(parent);
    return parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  };

  const fit = (el: HTMLElement, available: number) => {
    if (available <= 0) return;
    let size = parseFloat(getComputedStyle(el).fontSize) || 16;
    for (let i = 0; i < 5; i++) {
      const width = el.getBoundingClientRect().width;
      if (width <= 0) break;
      const ratio = available / width;
      if (Math.abs(ratio - 1) < 0.002) break;
      size *= ratio;
      el.style.fontSize = `${size}px`;
    }
  };

  const refit = () => groups.forEach((els, parent) => els.forEach((el) => fit(el, availableWidth(parent))));

  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      refit();
    });
  };

  const observer = new ResizeObserver(schedule);
  groups.forEach((_, parent) => observer.observe(parent));
  window.addEventListener('resize', schedule);
  refit();
  document.fonts?.ready.then(refit);
}
