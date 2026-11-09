import { defineMiddleware } from 'astro:middleware';
import { frenchTypography } from './lib/french-typography';

/** Applique la typographie française à chaque page HTML (au rendu et à la génération statique). */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = frenchTypography(await response.text());
  return new Response(html, { status: response.status, headers: response.headers });
});
