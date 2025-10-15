# Documentation Technique - Childhood.ink

## 🛠️ Stack Technique

### Frontend
- **Framework** : Next.js v14.2.33
- **Langage** : TypeScript v5.6.2
- **UI Framework** : React 18.3.1
- **Styling** : Tailwind CSS v3.4.4
- **Composants UI** : Shadcn UI (à intégrer en v1.0)

### Backend
- **Runtime** : Node.js 20+
- **API Routes** : Next.js API Routes
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
  "@supabase/supabase-js": "^2.45.4",
  "next": "^14.2.33",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### Développement
```json
{
  "@types/node": "^22.9.0",
  "@types/react": "^18.3.11",
  "@types/react-dom": "^18.3.1",
  "autoprefixer": "^10.4.19",
  "eslint": "^8.57.0",
  "eslint-config-next": "^14.2.18",
  "postcss": "^8.4.38",
  "tailwindcss": "^3.4.4",
  "typescript": "^5.6.2"
}
```

## 🏗️ Architecture

### Structure du Projet
```
Childhood.ink/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── layout.tsx    # Layout principal
│   │   └── globals.css   # Styles globaux
│   ├── components/        # Composants React (à créer)
│   └── lib/              # Bibliothèques et utilitaires
│       ├── supabase.ts   # Client Supabase
│       └── types.ts      # Types TypeScript
├── supabase/              # Configuration base de données
├── public/                # Assets statiques
└── .github/               # CI/CD workflows
```

### Architecture Backend
- **Monorepo** : Frontend et Backend dans le même projet
- **Server-Side Rendering** : Next.js App Router pour le SSR
- **API Routes** : Next.js API Routes (`/api/*`)
- **CRON Jobs** : Vercel Cron Jobs (v0.8)

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
- **Protection Routes** : Next.js Middleware

### Variables d'Environnement
```env
# Supabase (NEXT_PUBLIC_ pour accès client)
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
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
{}
```

**Note** : Next.js est auto-détecté par Vercel. Aucune configuration spéciale nécessaire.

## 📊 Performance

### Optimisations
- **SSR** : Server-Side Rendering avec Next.js App Router
- **Code Splitting** : Automatique avec Next.js
- **Asset Optimization** : Next.js Image Optimization
- **Caching** : Next.js Caching Strategy
- **CDN** : Vercel Edge Network

### Monitoring
- **Build Time** : Suivi via Vercel
- **Bundle Size** : Next.js Bundle Analyzer
- **Performance** : Web Vitals intégrés par défaut

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

### React/Next.js
- **Functional Components** : Uniquement
- **Hooks** : Suivre les règles des hooks
- **Server Components** : Next.js App Router (RSC)
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
git clone https://github.com/VGrss/Childhood.git

# 2. Install
cd childhood-ink
npm install

# 3. Environment
cp .env.example .env
# Éditer .env avec vos clés

# 4. Run
npm run dev
# Site accessible sur http://localhost:5173
```

### Configuration Supabase
1. Aller sur https://supabase.com et créer un compte
2. Créer un nouveau projet :
   - Name : `childhood-ink`
   - Database Password : choisir un mot de passe fort
   - Region : Europe (Frankfurt) ou Paris
   - Pricing Plan : Free
3. Attendre 1-2 minutes que le projet soit créé
4. Dans SQL Editor, exécuter le fichier `supabase/schema.sql`
5. Récupérer les clés API dans Settings > API
6. Mettre à jour le fichier `.env` :
   ```env
   SUPABASE_URL=https://xxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Configuration Resend (pour v0.4+)
1. Aller sur https://resend.com et créer un compte
2. Dans le dashboard, aller dans "API Keys"
3. Créer une nouvelle clé API
4. Copier la clé dans `.env` :
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
5. Pour la production, configurer le domaine dans Resend et les DNS

### Déploiement Vercel
1. Aller sur https://vercel.com
2. Importer le repository `VGrss/Childhood`
3. Framework auto-détecté : Next.js ✅
4. Ajouter les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Déployer (1 clic)

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
- **Next.js** : https://nextjs.org/docs
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
1. **npm permissions** : `sudo chown -R $(whoami) ~/.npm ~/.nvm`
2. **Port 5173 occupé** : Vite utilisera automatiquement un autre port
3. **Supabase errors** : Vérifier les clés dans .env, que le schéma SQL a été exécuté
4. **Build errors** : `npm run typecheck` pour identifier
5. **Variables d'environnement manquantes** : Vérifier que `.env` existe et contient toutes les variables

### Commandes Utiles
```bash
# Développement
npm run dev              # Serveur dev (http://localhost:5173)

# Build
npm run build            # Build de production
npm run start            # Serveur de production

# Qualité du code
npm run typecheck        # Vérifier les types
npm run lint             # Linter le code
```

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

