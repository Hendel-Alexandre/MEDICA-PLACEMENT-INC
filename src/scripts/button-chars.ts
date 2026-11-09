const OFFSET_INCREMENT = 0.01; // seconds between characters

/**
 * Splits `[data-button-animate-chars]` labels into one span per character with a
 * staggered transition delay (the hover roll is pure CSS, see global.css).
 * The link or button keeps the full label as its accessible name.
 */
export function initButtonCharacterStagger(): void {
  document.querySelectorAll<HTMLElement>('[data-button-animate-chars]').forEach((label) => {
    const text = label.textContent ?? '';
    const control = label.closest('a, button');
    if (control && !control.hasAttribute('aria-label')) control.setAttribute('aria-label', text.trim());

    label.textContent = '';
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.transitionDelay = `${index * OFFSET_INCREMENT}s`;
      if (char === ' ') span.style.whiteSpace = 'pre';
      label.appendChild(span);
    });
  });
}
