# Thinkerview — Portail citoyen

## Projet

Site standalone Thinkerview — portail citoyen d'information indépendante.
Prototype créé initialement comme page ArcanesPage dans le projet Origines Media.

## Design System — Source de vérité

**OBLIGATOIRE** : Avant de créer ou modifier un composant UI, consulter le projet Origines Media Front qui sert de référence design :

```
/Users/alexquilghini1/Documents/origines media front/
```

### Fichiers de référence à consulter dans Origines

| Besoin | Fichier dans Origines Media Front |
|--------|-----------------------------------|
| Guide design complet | `CLAUDE_STYLE_GUIDE.md` |
| Boutons | `src/components/ui/Button.tsx` |
| Cards | `src/components/ui/Card.tsx` |
| Badges | `src/components/ui/Badge.tsx` |
| Design tokens | `src/styles/tokens.ts` |
| Couleurs univers | `src/lib/universColors.ts` |
| Styles globaux | `src/index.css` |
| Footer de référence | `src/components/Footer2/Footer2.tsx` + `.module.css` |
| Header de référence | `src/components/SiteHeader/SiteHeader.tsx` + `.module.css` |
| Ticker de référence | `src/components/Ticker/Ticker.tsx` + `.module.css` |
| Page articles (listing) | `src/pages/ArticlesPageV2.tsx` |
| Page article (détail) | `src/pages/ArticlePageV2.tsx` |
| Page vidéos | `src/pages/VideosPage.tsx` |
| Page dossier | `src/pages/DossierDetailPage.tsx` |

### Comment utiliser la référence

1. **Nouvelle page** → Lire d'abord la page équivalente dans Origines pour comprendre la structure, les patterns de section, les CSS Modules utilisés
2. **Nouveau composant** → Vérifier si un composant similaire existe dans `src/components/ui/` d'Origines et s'en inspirer
3. **Doute sur un pattern** → Consulter `CLAUDE_STYLE_GUIDE.md` dans Origines
4. **Animation / transition** → Regarder les patterns Framer Motion utilisés dans les pages Origines
5. **Responsive** → Observer les breakpoints et patterns mobile-first d'Origines

### Ce qu'on adapte pour Thinkerview (ne PAS copier tel quel)

- Les couleurs d'univers → Thinkerview a ses propres 6 galaxies (voir ci-dessous)
- Le contenu éditorial → Thinkerview = géopolitique, énergie, politique, économie, tech, souveraineté
- Le ton → Plus institutionnel / citoyen que le ton intimiste d'Origines
- Les composants partagés → On ne les importe PAS, on s'en inspire pour créer les nôtres en CSS Modules

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + CSS Modules
- Framer Motion (animations)
- Lucide React (icônes)

## Design Language (adapté d'Origines)

- Fond beige `#F0EDE6` (papier)
- Noir encre `#0A0A0A`
- Bordures `#D5D0C8` / `#E8E5DE`
- Typo : Archivo (titres), Inter Tight (corps), JetBrains Mono (metadata), Fraunces (accents éditoriaux)
- Cards angulaires (0 border-radius), border 1px
- Pas de glow effects, pas de gradient text sur les titres de section

## Structure

```
src/
├── pages/
│   ├── ArcanesPage.tsx        # Page d'accueil Thinkerview
│   └── ArcanesPage.module.css # Styles CSS Module
├── styles/
│   └── tokens.ts              # Design tokens
├── App.tsx                    # Router simplifié
├── main.tsx                   # Point d'entrée
└── index.css                  # Styles globaux + Tailwind
```

## 6 Galaxies éditoriales

| Galaxie | Couleur accent |
|---------|---------------|
| Géopolitique | `#C45A3C` |
| Énergie | `#8B7A3D` |
| Politique | `#6B5B8A` |
| Économie | `#3D7A6B` |
| Technologie | `#4A7A8B` |
| Souveraineté | `#8B5A5A` |

## Pages à créer

- [ ] Page article
- [ ] Page vidéo / interview
- [ ] Page dossier
- [ ] Page galaxie (verticale)
- [ ] Page univers
- [ ] Page forum citoyen
- [ ] Page inscription / connexion
- [ ] Page newsletter
