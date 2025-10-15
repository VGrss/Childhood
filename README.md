# Childhood.ink

Newsletter éducative personnalisée pour accompagner les parents tout au long de la vie de leurs enfants.

## 🎯 Vision

Passer à l'échelle les conseils éducatifs en partageant les bonnes informations au bon moment, adaptées à l'âge de chaque enfant.

## 🚀 Version 0.1 - Infrastructure

### Statut actuel
- ✅ Configuration du projet Remix + TypeScript
- ✅ Setup Tailwind CSS
- ✅ Configuration Supabase (database, auth, storage)
- ✅ Fichiers de configuration Vercel
- 📝 Configuration du domaine childhood.ink (à faire sur Vercel)
- 📝 Intégration GitHub avec Vercel (à faire sur Vercel)

## 🛠️ Stack Technique

- **Frontend**: Remix + TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: Supabase
- **Hébergement**: Vercel
- **Email**: Resend

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Puis éditer .env avec vos clés Supabase

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🔧 Configuration

### Supabase

1. Créer un projet sur [Supabase](https://supabase.com)
2. Récupérer l'URL du projet et les clés API
3. Mettre à jour le fichier `.env` avec ces informations

### Vercel

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel
3. Configurer le domaine `childhood.ink`

### GitHub

1. Pousser le code sur GitHub
2. Configurer l'intégration avec Vercel pour le déploiement automatique

## 📝 Scripts disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Build de production
- `npm run start` - Lancer le serveur de production
- `npm run typecheck` - Vérifier les types TypeScript
- `npm run lint` - Linter le code

## 📚 Documentation

- [Product Specs](./Rules/product_specs.md)
- [Roadmap](./Rules/roadmap.md)
- [Release Procedure](./Rules/release_procedure.md)

## 🎨 Design

Le design utilise une approche moderne et épurée avec :
- Palette de couleurs douce (bleu/violet)
- Typographie Inter
- Composants Tailwind CSS
- Responsive design

## 🔐 Sécurité

- Authentification Google OAuth via Supabase
- Protection des données utilisateurs
- Variables d'environnement sécurisées

## 📄 Licence

Propriétaire - Childhood.ink © 2025

