# Thinkerview — Portail citoyen

## Projet

Site standalone Thinkerview — portail citoyen d'information indépendante.
Prototype créé initialement comme page ArcanesPage dans le projet Origines Media.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + CSS Modules
- Framer Motion (animations)
- Lucide React (icônes)

## Design Language

Le design suit le système Origines (voir `CLAUDE_STYLE_GUIDE.md`) adapté à Thinkerview :
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
