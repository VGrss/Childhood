# Childhood.ink

Newsletter éducative personnalisée pour accompagner les parents tout au long de la vie de leurs enfants.

**Repository** : https://github.com/VGrss/Childhook

## 🎯 Vision

Passer à l'échelle les conseils éducatifs en partageant les bonnes informations au bon moment, adaptées à l'âge de chaque enfant.

## 🚀 Quick Start

### Installation (3 minutes)

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Supabase

# 3. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:5173**

### Configuration Supabase

1. Créer un projet sur [https://supabase.com](https://supabase.com)
2. Dans SQL Editor, exécuter le fichier `supabase/schema.sql`
3. Récupérer les clés API dans Settings > API
4. Les mettre dans votre fichier `.env`

Voir **[Rules/tech.md](./Rules/tech.md)** pour la documentation technique complète.

## 🛠️ Stack Technique

- **Frontend** : Remix 2.13.1 + TypeScript 5.6 + React 18
- **Styling** : Tailwind CSS 3.4
- **Database** : Supabase (PostgreSQL)
- **Hosting** : Vercel (région Paris)
- **Email** : Resend
- **CI/CD** : GitHub Actions

## 📊 Version 0.1 - Infrastructure ✅

**Status** : Complète - 37 fichiers créés, 932 packages npm installés

### Réalisations
- ✅ Configuration Remix + TypeScript + Vite + ESLint
- ✅ Setup Tailwind CSS avec thème personnalisé
- ✅ Configuration Supabase (4 tables, RLS, triggers)
- ✅ Configuration Vercel + GitHub Actions (CI/CD)
- ✅ Page d'accueil temporaire avec design moderne
- ✅ Documentation technique complète

### Prochaines étapes
- **v0.2** : Landing page finale
- **v0.3** : Formulaire d'inscription
- **v0.4** : Configuration emailing

Voir **[Rules/roadmap.md](./Rules/roadmap.md)** pour toutes les versions planifiées.

## 📝 Commandes

```bash
npm run dev        # Développement (http://localhost:5173)
npm run build      # Build de production
npm run start      # Serveur de production
npm run typecheck  # Vérification des types
npm run lint       # Linter le code
```

## 📚 Documentation

### Projet
- **[Rules/product_specs.md](./Rules/product_specs.md)** - Spécifications complètes du produit
- **[Rules/roadmap.md](./Rules/roadmap.md)** - Roadmap des versions (v0.1 à v4.5)
- **[Rules/version_history.md](./Rules/version_history.md)** - Historique des versions
- **[Rules/tech.md](./Rules/tech.md)** - Documentation technique détaillée
- **[Rules/release_procedure.md](./Rules/release_procedure.md)** - Procédure de release

### Technique
- **[supabase/README.md](./supabase/README.md)** - Documentation Supabase
- **[manifest.json](./manifest.json)** - Métadonnées du projet

## 🗄️ Base de Données

Le schéma Supabase inclut :
- **users** - Profils des parents
- **children** - Informations des enfants
- **email_templates** - Templates d'emails
- **sent_emails** - Historique des envois

Row Level Security (RLS) activé sur toutes les tables.

## 🚀 Déploiement

### Vercel
1. Importer le repository sur [https://vercel.com](https://vercel.com)
2. Framework Preset : Remix
3. Ajouter les variables d'environnement
4. Déployer

### GitHub
```bash
git push origin main  # Déploiement automatique via GitHub Actions
```

Voir **[Rules/release_procedure.md](./Rules/release_procedure.md)** pour la procédure complète.

## 🎨 Design

Page d'accueil avec :
- Gradient moderne (bleu → violet)
- Typographie Inter
- 3 cards (Moments clés, Inspiration, Ambition)
- Design responsive

## 🔐 Variables d'Environnement

```env
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
NODE_ENV=development
```

## 📄 Licence

Propriétaire - Childhood.ink © 2025

