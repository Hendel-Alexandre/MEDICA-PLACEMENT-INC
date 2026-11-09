/** Full-screen navigation: toggle button, optional close buttons and the Escape key. */
export function initNavigation(): void {
  const nav = document.querySelector<HTMLElement>('[data-navigation-status]');
  if (!nav) return;
  const tile = nav.querySelector<HTMLElement>('.nav-full__tile');
  const toggles = document.querySelectorAll<HTMLElement>('[data-navigation-toggle="toggle"]');

  const setOpen = (open: boolean) => {
    nav.setAttribute('data-navigation-status', open ? 'active' : 'not-active');
    toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)));
    // Keep the clipped-away menu out of the tab order while it is closed.
    tile?.toggleAttribute('inert', !open);
  };
  const isOpen = () => nav.getAttribute('data-navigation-status') === 'active';

  toggles.forEach((toggle) => toggle.addEventListener('click', () => setOpen(!isOpen())));
  document
    .querySelectorAll('[data-navigation-toggle="close"]')
    .forEach((close) => close.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false);
  });
}

/**
 * The bar sits over the page: when an aqua band (`.is_aqua`) is behind it, the logo and the
 * name switch to navy so they stay readable (see global.css).
 */
export function initNavTone(): void {
  const nav = document.querySelector<HTMLElement>('[data-navigation-status]');
  const bar = nav?.querySelector<HTMLElement>('.nav-full__bar');
  if (!nav || !bar) return;
  let frame = 0;
  const update = () => {
    frame = 0;
    const r = bar.getBoundingClientRect();
    const y = r.top + r.height / 2;
    const overAqua = [...document.querySelectorAll<HTMLElement>('.is_aqua')].some((band) => {
      const b = band.getBoundingClientRect();
      return b.top <= y && b.bottom >= y && b.left <= r.left + 40 && b.right >= r.left + 40;
    });
    nav.toggleAttribute('data-nav-on-aqua', overAqua);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
}
