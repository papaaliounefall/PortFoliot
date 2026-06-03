# Portfolio — Papa Alioune Fall

Portfolio personnel de **Papa Alioune Fall**, Développeur Full Stack basé à Dakar, Sénégal.

Le projet contient deux versions du portfolio :
- **Version HTML/CSS/JS** (racine) — version principale, déployable directement
- **Version Next.js** (dossiers `app/` & `components/`) — version avancée avec TypeScript et Tailwind CSS

## Technologies

### Version HTML/CSS/JS (racine)
- HTML5 sémantique
- CSS3 (Flexbox, Grid, animations, variables CSS)
- JavaScript vanilla (ES6+, Intersection Observer, effet machine à écrire)
- Boxicons pour les icônes

### Version Next.js
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion pour les animations
- Lucide React pour les icônes

## Structure du projet

```
Portfolio/
├── index.html                  # Page principale (version HTML)
├── style.css                   # Styles (version HTML)
├── script.js                   # Scripts (version HTML)
├── unnamed.png                 # Photo de profil
├── CV_Papa_Alioune_Fall.pdf    # CV téléchargeable
├── public/
│   ├── unnamed.png
│   ├── opa.png
│   └── CV_Papa_Alioune_Fall.pdf
├── app/                        # Version Next.js
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                 # Composants Next.js
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── postcss.config.js
```

## Sections du portfolio

| Section | Description |
|---|---|
| **Accueil (Hero)** | Présentation avec effet machine à écrire, liens CV et contact |
| **À propos** | Parcours, stats (2+ ans, 10+ projets, 50+ vidéos YouTube) |
| **Compétences** | JavaScript 85%, React Native 75%, HTML/CSS 90%, Laravel 80%, Django 75%, Docker 70% |
| **Projets** | Grille de réalisations avec technologies et liens |
| **Contact** | Formulaire et informations de contact |

## Compétences présentées

**Front-end** — JavaScript (ES6+), React Native, HTML5/CSS3  
**Back-end** — PHP/Laravel, Python/Django, REST API  
**DevOps** — Docker, Docker Compose, déploiement  
**Outils** — Git, GitHub, Figma

## Utilisation

### Version HTML (recommandée pour visualiser)
Ouvrir directement `index.html` dans un navigateur, ou utiliser un serveur local :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (npx)
npx serve .
```

### Version Next.js
```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
# → http://localhost:3000

# Build de production
npm run build
npm start
```

## Déploiement

- **GitHub Pages** (version HTML) — pousser sur `main`, activer Pages depuis les paramètres
- **Vercel** (version Next.js) — connecter le dépôt, déploiement automatique
- **Netlify** — drag & drop du dossier ou connexion GitHub

## Auteur

**Papa Alioune Fall**
- Email : [papaaliounef25@gmail.com](mailto:papaaliounef25@gmail.com)
- LinkedIn : [Papa Alioune Fall](https://www.linkedin.com/in/papa-alioune-fall-03a1b2377)
- GitHub : [@papaaliounefall](https://github.com/papaaliounefall)
- Twitter/X : [@aliounefall270](https://x.com/aliounefall270)
