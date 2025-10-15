# Documentation Technique - Childhood.ink

## 🛠️ Stack Technique

### Frontend
- **Framework** : Remix v2.13.1
- **Langage** : TypeScript v5.6.2
- **UI Framework** : React 18.3.1
- **Styling** : Tailwind CSS v3.4.4
- **Composants UI** : Shadcn UI (à intégrer en v1.0)
- **Build Tool** : Vite v5.4.8

### Backend
- **Runtime** : Node.js 20+
- **API Routes** : Remix Server-Side
- **Langage** : TypeScript
- **IA Features** : Vercel AI SDK (à intégrer en v3.0)

### Base de Données
- **Provider** : Supabase
- **Type** : PostgreSQL
- **ORM** : Supabase JS Client v2.45.4
- **Authentification** : Supabase Auth (Google OAuth en v2.0)
- **Storage** : Supabase Storage

### Hébergement & Déploiement
- **Hébergement** : Vercel
- **Région** : Paris (cdg1)
- **CI/CD** : GitHub Actions
- **Domaine** : childhood.ink

### Services Tiers
- **Email Provider** : Resend
- **Commentaires** : Disqus (v1.3)
- **Analytics** : À définir (v3.3)

### Outils de Développement
- **IDE** : Cursor avec Claude Code
- **Linting** : ESLint v8.38.0
- **Type Checking** : TypeScript
- **Version Control** : Git + GitHub

## 📦 Dépendances Principales

### Production
```json
{
  "@remix-run/node": "^2.13.1",
  "@remix-run/react": "^2.13.1",
  "@remix-run/serve": "^2.13.1",
  "@supabase/supabase-js": "^2.45.4",
  "isbot": "^4.1.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### Développement
```json
{
  "@remix-run/dev": "^2.13.1",
  "@types/react": "^18.3.11",
  "@types/react-dom": "^18.3.1",
  "typescript": "^5.6.2",
  "tailwindcss": "^3.4.4",
  "vite": "^5.4.8",
  "eslint": "^8.38.0"
}
```

## 🏗️ Architecture

### Structure du Projet
```
Childhood.ink/
├── app/                    # Application Remix
│   ├── routes/            # Routes et pages
│   ├── lib/               # Bibliothèques et utilitaires
│   ├── components/        # Composants React (à créer)
│   ├── styles/            # Styles globaux
│   └── utils/             # Fonctions utilitaires (à créer)
├── supabase/              # Configuration base de données
├── public/                # Assets statiques
└── .github/               # CI/CD workflows
```

### Architecture Backend
- **Monorepo** : Frontend et Backend dans le même projet
- **Server-Side Rendering** : Remix pour le SSR
- **API Routes** : Routes Remix pour les endpoints API
- **CRON Jobs** : Configuration sur Vercel (v0.8)

### Base de Données

#### Schéma
```sql
-- Tables principales
users               # Profils des parents
children            # Informations des enfants
email_templates     # Templates d'emails
sent_emails         # Historique des envois
```

#### Sécurité
- **Row Level Security (RLS)** activé sur toutes les tables
- **Policies** : Accès restreint aux données utilisateur
- **JWT** : Authentification via Supabase Auth
- **Service Role** : Pour les opérations administratives

## 🔐 Sécurité

### Authentification
- **Provider** : Google OAuth via Supabase (v2.0)
- **Session Management** : Supabase Auth
- **Token Storage** : Cookies sécurisés
- **Protection Routes** : Middleware Remix

### Variables d'Environnement
```env
# Supabase
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Resend
RESEND_API_KEY=xxx

# Application
NODE_ENV=xxx
```

### Best Practices
- Pas de clés API dans le code
- Variables d'environnement pour les secrets
- HTTPS obligatoire en production
- Validation des inputs côté serveur
- Sanitization des données utilisateur

## 🚀 Déploiement

### Environnements
- **Development** : Local (`npm run dev`)
- **Preview** : Vercel (branches GitHub)
- **Production** : Vercel (branche main)

### Process de Déploiement
1. **Push sur GitHub** → Déclenchement automatique
2. **GitHub Actions** → Tests et build
3. **Vercel** → Déploiement automatique
4. **Vérification** → Tests post-déploiement

### Configuration Vercel
```json
{
  "framework": "remix",
  "buildCommand": "npm run build",
  "outputDirectory": "build/client",
  "regions": ["cdg1"]
}
```

## 📊 Performance

### Optimisations
- **SSR** : Server-Side Rendering avec Remix
- **Code Splitting** : Automatique avec Vite
- **Asset Optimization** : Compression images
- **Caching** : Strategy HTTP caching
- **CDN** : Vercel Edge Network

### Monitoring
- **Build Time** : Suivi via Vercel
- **Bundle Size** : Analyse avec Vite
- **Performance** : Web Vitals (à intégrer)

## 🧪 Tests

### Stratégie de Tests (à implémenter)
- **Unit Tests** : Vitest (à configurer)
- **Integration Tests** : Playwright (à configurer)
- **E2E Tests** : Playwright (à configurer)
- **Type Safety** : TypeScript

### Commandes
```bash
npm run typecheck    # Vérification types
npm run lint         # Linting ESLint
npm run test         # Tests unitaires (à implémenter)
npm run test:e2e     # Tests E2E (à implémenter)
```

## 📝 Conventions de Code

### TypeScript
- **Strict Mode** : Activé
- **Types explicites** : Pour les fonctions publiques
- **Interfaces** : Préférer aux types pour les objets
- **Enums** : Éviter, utiliser unions de strings

### React/Remix
- **Functional Components** : Uniquement
- **Hooks** : Suivre les règles des hooks
- **Server Components** : Utiliser les loaders Remix
- **File Naming** : kebab-case pour les fichiers

### Styling
- **Tailwind First** : Utiliser Tailwind par défaut
- **Custom CSS** : Uniquement si nécessaire
- **Responsive** : Mobile-first approach
- **Dark Mode** : Préparation pour v2.0+

### Git
- **Branches** : feature/*, bugfix/*, hotfix/*
- **Commits** : Conventional Commits
- **PR** : Obligatoire pour main
- **Code Review** : Requis avant merge

## 🔄 Workflow de Développement

### Setup Local
```bash
# 1. Clone
git clone https://github.com/VOTRE_USERNAME/childhood-ink.git

# 2. Install
cd childhood-ink
npm install

# 3. Environment
cp .env.example .env
# Éditer .env avec vos clés

# 4. Run
npm run dev
```

### Feature Development
```bash
# 1. Créer une branche
git checkout -b feature/ma-fonctionnalite

# 2. Développer
npm run dev

# 3. Tester
npm run typecheck
npm run lint

# 4. Commit
git add .
git commit -m "feat: ma nouvelle fonctionnalité"

# 5. Push
git push origin feature/ma-fonctionnalite

# 6. Pull Request sur GitHub
```

## 📚 Ressources Techniques

### Documentation
- **Remix** : https://remix.run/docs
- **React** : https://react.dev
- **TypeScript** : https://www.typescriptlang.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs
- **Supabase** : https://supabase.com/docs
- **Vercel** : https://vercel.com/docs

### MCP Tools (Cursor)
- **Supabase MCP** : Pour gérer Supabase depuis Cursor
- **Context7 MCP** : Pour la documentation des packages

## 🛣️ Roadmap Technique

### v0.1-0.3 : Foundation
- ✅ Setup infrastructure
- 🔄 Landing page et formulaire
- 🔄 Intégration Supabase

### v0.4-0.9 : MVP
- 📅 Configuration emailing (Resend)
- 📅 CRON jobs
- 📅 Premier contenu éditorial

### v1.0-1.4 : Polish
- 📅 Shadcn UI integration
- 📅 Sidebar navigation
- 📅 Pages publiques + commentaires

### v2.0-2.4 : User Features
- 📅 Google OAuth
- 📅 Dashboard utilisateur
- 📅 Gestion multi-enfants

### v3.0-3.4 : AI Features
- 📅 Vercel AI SDK
- 📅 Chatbot assistant
- 📅 Génération de contenu IA
- 📅 Analytics & A/B testing

### v4.0-4.5 : Community & Scale
- 📅 Forum communauté
- 📅 Groupes et gamification
- 📅 Bibliothèque ressources
- 📅 Internationalisation

## 🐛 Debugging

### Logs
- **Development** : Console browser + terminal
- **Production** : Vercel logs
- **Database** : Supabase logs

### Common Issues
1. **npm permissions** : `sudo chown -R $(whoami) ~/.npm`
2. **Port occupé** : Vite utilisera automatiquement un autre port
3. **Supabase errors** : Vérifier les clés dans .env
4. **Build errors** : `npm run typecheck` pour identifier

## 📈 Métriques

### KPIs Techniques
- **Build Time** : < 2 minutes
- **Bundle Size** : < 500KB (initial)
- **Lighthouse Score** : > 90
- **TypeScript Coverage** : 100%
- **Zero Errors** : ESLint + TypeScript

## 🔮 Futures Considérations

### Scalabilité
- **Database** : Supabase peut scaler horizontalement
- **Hosting** : Vercel Edge Functions pour la performance
- **CDN** : Assets statiques sur CDN global

### Monitoring (v3.3+)
- **APM** : Application Performance Monitoring
- **Error Tracking** : Sentry ou équivalent
- **Analytics** : Google Analytics ou Plausible

### Optimisations Futures
- **Database Indexing** : Optimiser les queries
- **Caching Strategy** : Redis pour cache distribué
- **Image Optimization** : CDN avec transformation d'images

---

**Dernière mise à jour** : 15 octobre 2025 (v0.1)

