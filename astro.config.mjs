// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Domaine définitif : SITE_URL=https://… npm run build
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  // Pré-assembler les modules GSAP en développement (évite l’erreur « Outdated Optimize Dep »).
  vite: {
    optimizeDeps: {
      include: [
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/SplitText',
        'gsap/CustomEase',
        'gsap/Draggable',
        'gsap/InertiaPlugin',
        'lenis',
      ],
    },
  },
});
