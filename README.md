# 🚀 BiLearn - Site de tutoriels informatiques

Site moderne de cours et tutoriels sur Linux, DevOps, Réseaux et Sécurité.

## ✨ Stack Technique (Impressive!)

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: TailwindCSS avec thèmes personnalisés (Bleu/Blanc + Noir/Vert)
- **Content**: MDX (Markdown + React Components)
- **Animations**: Framer Motion
- **Code Highlight**: rehype-highlight
- **Fonts**: JetBrains Mono + Outfit
- **Deploy**: Vercel (recommandé)

## 🎨 Features

- ✅ **Dark/Light Mode** avec switch animé
- ✅ **Design moderne** inspiré de laConsole.dev
- ✅ **Animations fluides** avec Framer Motion
- ✅ **Intégration YouTube** avec lazy loading
- ✅ **Syntax Highlighting** pour le code
- ✅ **SEO optimisé** avec metadata Next.js
- ✅ **100% Responsive** (mobile-first)
- ✅ **Performance A+** avec Next.js
- ✅ **Type-safe** avec TypeScript
- ✅ **Articles en MDX** (facile à écrire)

## 📦 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer en développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

### 3. Build pour production

```bash
npm run build
npm start
```

## 📝 Créer un article

### 1. Crée un fichier MDX dans `content/posts/`

```mdx
---
title: "Ton super titre"
description: "Description captivante"
date: "2025-02-05"
category: "linux"
tags: ["linux", "tutorial"]
author: "BiLearn"
youtubeId: "VIDEO_ID"
---

## Introduction

Contenu de ton article en Markdown...

<YouTubeEmbed videoId="VIDEO_ID" title="Titre" />

```bash
# Code avec syntax highlighting
echo "Hello World"
\```
```

### 2. Catégories disponibles

- `linux` - 🐧 Linux
- `devops` - 🚀 DevOps
- `reseaux` - 🌐 Réseaux
- `securite` - 🔒 Sécurité

### 3. Composants disponibles dans MDX

- `<YouTubeEmbed videoId="..." title="..." />` - Embed YouTube
- Tables, listes, code blocks - Markdown standard
- Tout composant React que tu ajoutes dans `components/`

## 🎨 Personnalisation

### Couleurs du thème

Édite `tailwind.config.ts` pour changer les couleurs :

```typescript
colors: {
  light: {
    primary: '#1A4B8C',  // Ton bleu
    // ...
  },
  dark: {
    primary: '#00FF7F',  // Ton vert
    // ...
  }
}
```

### Styles globaux

Édite `app/globals.css` pour personnaliser les styles.

### Navigation

Édite `components/Navigation.tsx` pour modifier le menu.

## 🚀 Déploiement

### Option 1 : Vercel (Recommandé)

1. Push ton code sur GitHub
2. Va sur [vercel.com](https://vercel.com)
3. Connecte ton repo
4. Deploy ! 🎉

Ton site sera en ligne sur `https://ton-site.vercel.app`

### Option 2 : Netlify

1. Push sur GitHub
2. Va sur [netlify.com](https://netlify.com)
3. New site from Git
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy!

### Option 3 : Docker

```bash
# Build
docker build -t bilearn .

# Run
docker run -p 3000:3000 bilearn
```

## 📁 Structure du projet

```
bilearn/
├── app/                    # Pages Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── posts/[slug]/      # Pages articles
│   ├── category/[cat]/    # Pages catégories
│   └── about/             # Page à propos
├── components/            # Composants React
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── YouTubeEmbed.tsx
│   ├── ThemeToggle.tsx
│   └── Footer.tsx
├── content/               # Contenu MDX
│   └── posts/            # Articles
├── lib/                   # Utilitaires
│   ├── utils.ts
│   └── posts.ts          # Gestion des articles
├── public/               # Fichiers statiques
└── tailwind.config.ts    # Config Tailwind
```

## 💡 Tips pour les recruteurs

Ce projet démontre :

- ✅ **Architecture moderne** : Next.js 15 App Router
- ✅ **TypeScript** : Code type-safe
- ✅ **Performance** : SSR, ISR, optimisations
- ✅ **Design System** : Composants réutilisables
- ✅ **UX/UI** : Animations, transitions, responsive
- ✅ **Best Practices** : Clean code, structure, SEO
- ✅ **DevOps ready** : Docker, CI/CD compatible

## 🎓 Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [MDX Docs](https://mdxjs.com/)

## 📝 Todo / Améliorations futures

- [ ] Système de recherche (Algolia)
- [ ] Commentaires (giscus)
- [ ] Newsletter (Buttondown)
- [ ] Analytics (Plausible)
- [ ] Sitemap XML auto
- [ ] RSS Feed
- [ ] PWA support
- [ ] i18n (multi-langue)

## 📄 License

MIT - Fais-en ce que tu veux ! 🎉

---

**Créé avec ❤️ par [Ton nom]**
