import type { ResponsiveImage } from './insights';

/**
 * Photos libres de droits (licence Unsplash : usage commercial gratuit, sans attribution obligatoire).
 * Chaque photo existe en 1080 et 2000 px de large dans public/images/medica-photo-<nom>-<largeur>.webp.
 * Sources : voir README.md (section « Photos »).
 */
export function photo(name: string, alt: string, sizes = '100vw'): ResponsiveImage {
  const base = `/images/medica-photo-${name}`;
  return {
    src: `${base}-2000.webp`,
    srcset: `${base}-1080.webp 1080w, ${base}-2000.webp 2000w`,
    sizes,
    alt,
  };
}
