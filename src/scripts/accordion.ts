/**
 * CSS-driven accordion: toggles `data-accordion-status` (the open/close animation lives in accordion.css).
 * Toggles are made keyboard-operable buttons for screen-reader and keyboard users.
 */
function initAccordion(): void {
  document.querySelectorAll<HTMLElement>('[data-accordion-css-init]').forEach((accordion) => {
    const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';
    const toggles = accordion.querySelectorAll<HTMLElement>('[data-accordion-toggle]');

    const sync = () =>
      toggles.forEach((toggle) => {
        const item = toggle.closest('[data-accordion-status]');
        toggle.setAttribute('aria-expanded', String(item?.getAttribute('data-accordion-status') === 'active'));
      });

    const toggleItem = (toggle: HTMLElement) => {
      const item = toggle.closest('[data-accordion-status]');
      if (!item) return;
      const isActive = item.getAttribute('data-accordion-status') === 'active';
      item.setAttribute('data-accordion-status', isActive ? 'not-active' : 'active');
      if (closeSiblings && !isActive) {
        accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
          if (sibling !== item) sibling.setAttribute('data-accordion-status', 'not-active');
        });
      }
      sync();
    };

    toggles.forEach((toggle) => {
      toggle.setAttribute('role', 'button');
      toggle.tabIndex = 0;
    });
    sync();

    accordion.addEventListener('click', (event) => {
      const toggle = (event.target as Element).closest<HTMLElement>('[data-accordion-toggle]');
      if (toggle) toggleItem(toggle);
    });
    accordion.addEventListener('keydown', (event) => {
      const toggle = (event.target as Element).closest<HTMLElement>('[data-accordion-toggle]');
      if (toggle && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        toggleItem(toggle);
      }
    });
  });
}

initAccordion();
