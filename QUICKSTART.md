# 🚀 Guide de Démarrage Rapide

## Installation Express (5 minutes)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le site
npm run dev

# 3. Ouvrir http://localhost:3000
```

C'est tout ! 🎉

## Commandes principales

```bash
# Développement
npm run dev              # Lancer en mode développement
npm run build           # Build pour production
npm run start           # Lancer en production
npm run lint            # Vérifier le code
npm run type-check      # Vérifier TypeScript
```

## Créer ton premier article

### 1. Crée un fichier dans `content/posts/`

```bash
touch content/posts/mon-premier-article.mdx
```

### 2. Ajoute le contenu

```mdx
---
title: "Mon premier article"
description: "Description de mon article"
date: "2025-02-05"
category: "linux"
tags: ["tutorial", "débutant"]
author: "Ton Nom"
youtubeId: "dQw4w9WgXcQ"
---

## Introduction

Contenu de ton article...

## Section 2

Plus de contenu...

```bash
# Code avec syntax highlighting
echo "Hello World"
\```

## Conclusion

Et voilà !
```

### 3. Ton article est automatiquement disponible !

Pas besoin de redémarrer, visite :
`http://localhost:3000/posts/mon-premier-article`

## Personnalisation rapide

### Changer les couleurs

Édite `tailwind.config.ts` ligne 13-25 :

```typescript
colors: {
  light: {
    primary: '#1A4B8C',  // Change cette couleur
  },
  dark: {
    primary: '#00FF7F',  // Change cette couleur
  }
}
```

### Modifier le footer

Édite `components/Footer.tsx` ligne 10-15 :

```typescript
const socialLinks = [
  { icon: Github, href: 'https://github.com/TON-COMPTE', label: 'GitHub' },
  { icon: Youtube, href: 'https://youtube.com/@TA-CHAINE', label: 'YouTube' },
];
```

### Changer le Hero

Édite `components/Hero.tsx` pour modifier :
- Le titre
- Le sous-titre
- Les badges
- Les boutons

## Déployer sur Vercel (2 minutes)

```bash
# 1. Push ton code sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ton-compte/bilearn.git
git push -u origin main

# 2. Va sur vercel.com et connecte ton repo

# 3. C'est en ligne ! 🚀
```

## Structure des fichiers importants

```
bilearn/
├── content/posts/          # ⭐ TES ARTICLES ICI
├── app/page.tsx           # Page d'accueil
├── components/            # Composants React
├── tailwind.config.ts     # Couleurs et thème
└── app/globals.css        # Styles globaux
```

## Astuces

### Prévisualiser avant de publier

```bash
npm run build
npm run start
```

### Voir tous tes articles

```bash
ls content/posts/
```

### Copier un article existant

```bash
cp content/posts/commandes-linux-essentielles.mdx \
   content/posts/mon-nouvel-article.mdx
```

Puis édite le nouveau fichier !

## Problèmes courants

### Port 3000 déjà utilisé ?

```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Ou lance sur un autre port
PORT=3001 npm run dev
```

### Erreur de build ?

```bash
# Nettoie et rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Les images ne s'affichent pas ?

Mets-les dans `public/` et utilise :

```mdx
![Description](/ton-image.png)
```

## Support

- 📧 Email : votre@email.com
- 🐙 GitHub Issues : [Créer une issue](https://github.com/ton-compte/bilearn/issues)
- 💬 Discord : [Rejoindre](#)

---

**Happy coding! 🎉**
