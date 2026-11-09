/**
 * Typographie française : espace insécable avant « : ; ? ! » et à l’intérieur des guillemets.
 * Appliquée au HTML final par src/middleware.ts ; seuls les nœuds texte sont modifiés
 * (balises, attributs, <script> et <style> restent intacts).
 */
const NBSP = '\u00a0';

function fixText(text: string): string {
  return (
    text
      // espace ordinaire (ou fine) déjà présente → insécable
      .replace(/[ \u202f]([:;?!»])/g, `${NBSP}$1`)
      .replace(/«[ \u202f]/g, `«${NBSP}`)
      // espace manquante avant ? et ! (jamais à l’intérieur d’une entité HTML)
      .replace(/([\p{L}\d)»])([?!])/gu, `$1${NBSP}$2`)
      // guillemets sans espace
      .replace(/«(?=[^\s\u00a0])/g, `«${NBSP}`)
      .replace(/([^\s\u00a0])»/g, `$1${NBSP}»`)
  );
}

export function frenchTypography(html: string): string {
  return html.replace(
    /(<(script|style|textarea)\b[\s\S]*?<\/\2>)|(<!--[\s\S]*?-->)|(<[^>]+>)|([^<]+)/gi,
    (match, block, _tag, comment, tag, text) => (block || comment || tag ? match : fixText(text)),
  );
}
