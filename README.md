# Médica Placement inc. : site web

Site vitrine de MÉDICA PLACEMENT INC., agence de placement de personnel de la santé au Québec. Site statique
[Astro](https://astro.build), en français (fr-CA), avec animations GSAP, défilement fluide Lenis, menu plein écran
et préchargeur.

## Commandes

Node.js 22.22 ou plus récent.

```bash
npm install          # installer les dépendances
npm run dev          # serveur de développement (http://localhost:4321)
npm run build        # génération du site dans dist/
npm run preview      # servir la version générée
npm run check        # vérification des types (Astro + TypeScript)
npm run lint         # ESLint
npm run format:check # Prettier (npm run format pour corriger)
npm test             # vérifie dist/ : liens, ancres, fichiers, métadonnées, lang="fr-CA"
```

## Pages

`/` · `/services` · `/a-propos` · `/contact` (FAQ à `/contact#faq`) · `/confidentialite` · `/mentions-legales`

## Valeurs à fournir

Dans `src/config/site.ts`. Tant qu’une valeur vaut `null`, le site affiche le libellé entre crochets.

| Valeur                  | Champ          | État                      |
| ----------------------- | -------------- | ------------------------- |
| Téléphone               | `phone`        | 514 691-0408              |
| Courriel                | `email`        | medicaplacement@gmail.com |
| Adresse du siège social | `address`      | `[ADRESSE]`               |
| Numéro de permis CNESST | `permitNumber` | non affiché               |
| Hébergeur               | `host`         | `[HÉBERGEUR]`             |

Domaine définitif : `SITE_URL=https://www.exemple.ca npm run build` (sans lui, pas d’URL canonique).

## Marque

- Palette : bleu royal #00269B (fond), marine #170C52, blanc (texte), pervenche #B6CBFD (texte secondaire),
  aqua #95ECE8 (bandeaux et accents), bleu vif #1B56FD (dégradé du pied de page).
- Logo : le « M » de Médica, tracé en vecteur (`src/components/icons/Signet.astro`).
- Images : `public/images/medica-*` (photo d’accueil, fond aqua, icônes, image de partage).
- Police : Carbona (Light, Regular, Medium, Bold). Les fichiers d’essai « Carbona Test » ne contiennent ni
  accents ni ponctuation et ne sont pas licenciés pour un site publié ; en attendant la licence complète, la
  famille « Carbona » est servie par DM Sans (licence OFL). Voir `src/styles/fonts.css` pour brancher Carbona.

## Structure

```
src/config/site.ts        coordonnées, menu, pied de page
src/data/                 piliers, cartes d’accueil, profils, services, étapes, chiffres, horaires, FAQ
src/components/           navigation, pied de page, préchargeur, cartes, bandeaux
src/components/sections/  sections de chaque page
src/scripts/              animations, menu, défilement, parallaxe, carrousel, accordéon, horaires
src/styles/               feuilles de style (site.css : mise en page ; global.css : ajouts Médica)
src/middleware.ts         espaces insécables françaises avant : ; ? ! et dans « »
```

## Photos

Photos libres de droits provenant d’[Unsplash](https://unsplash.com/license) (usage commercial gratuit, attribution
non obligatoire). Fichiers : `public/images/medica-photo-<nom>-<1080|2000>.webp`.

| Nom           | Utilisation                                              | Source                                               |
| ------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| phone-call    | Accueil, bandeau « au bout du fil »                      | images.unsplash.com/photo-1576091160399-112ba8d25d1d |
| clinic-bp     | Accueil, carte Établissements ; Contact, bandeau         | images.unsplash.com/photo-1758691462413-b07dee2933fe |
| nurse-smile   | Accueil, carte Professionnels                            | images.unsplash.com/photo-1741707039536-113e200f9e0d |
| nurse-masks   | Accueil, carte Conformité                                | images.unsplash.com/photo-1691139601099-932c01ec198b |
| nurses-duo    | Accueil, service Recrutement                             | images.unsplash.com/photo-1736289162890-78f1ff4f8bd3 |
| nurse-bedside | Accueil, service Placement ; À propos, profil infirmière | images.unsplash.com/photo-1749065312519-1902cb8431ae |
| walker-help   | Accueil, service Transport ; À propos, profil PAB        | images.unsplash.com/photo-1773227055624-07b515ba87c5 |
| team-corridor | Accueil, service Service 24/7                            | images.unsplash.com/photo-1516841273335-e39b37888115 |
| scrubs        | Accueil, bandeau d’introduction                          | images.unsplash.com/photo-1666887360921-85952a86894f |
| care-knitting | Services, milieux desservis                              | images.unsplash.com/photo-1762955911769-d652ceaa94bb |
| care-coloring | Services, transport                                      | images.unsplash.com/photo-1762955911431-4c44c7c3f408 |
| aide-bp       | À propos, profil infirmière auxiliaire                   | images.unsplash.com/photo-1631815590058-860e4f83c1e8 |
| night-driver  | À propos, profil chauffeur                               | images.unsplash.com/photo-1584310881889-93bc9c4577ff |
| nurse-bp      | À propos, bandeau de la promesse                         | images.unsplash.com/photo-1631815590016-ebce183022ce |
