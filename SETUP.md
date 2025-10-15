# Guide d'Installation - Childhood.ink v0.1

Ce guide vous accompagne dans la configuration complète du projet Childhood.ink.

## 📋 Prérequis

- Node.js 20+ installé
- Un compte GitHub
- Un compte Supabase
- Un compte Vercel
- Un compte Resend (pour les emails)

## 🚀 Étape 1 : Installation Locale

### 1.1 Cloner le projet

```bash
cd /Users/victorgross/Documents/Childhood.ink
```

### 1.2 Installer les dépendances

```bash
npm install
```

### 1.3 Configuration des variables d'environnement

Copier le fichier d'exemple :
```bash
cp .env.example .env
```

Nous allons remplir ce fichier au fur et à mesure des étapes suivantes.

## 🗄️ Étape 2 : Configuration Supabase

### 2.1 Créer un projet Supabase

1. Aller sur [https://supabase.com](https://supabase.com)
2. Créer un compte ou se connecter
3. Cliquer sur "New Project"
4. Remplir les informations :
   - **Name** : childhood-ink
   - **Database Password** : Choisir un mot de passe fort (le noter !)
   - **Region** : Europe (Frankfurt) ou Paris si disponible
   - **Pricing Plan** : Free pour commencer

5. Attendre que le projet soit créé (1-2 minutes)

### 2.2 Récupérer les clés API

1. Dans le dashboard Supabase, aller dans "Settings" > "API"
2. Copier les informations suivantes dans votre fichier `.env` :

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.3 Créer le schéma de base de données

1. Dans le dashboard Supabase, aller dans "SQL Editor"
2. Cliquer sur "New Query"
3. Copier le contenu du fichier `supabase/schema.sql`
4. Coller dans l'éditeur SQL
5. Cliquer sur "Run" pour exécuter le script

### 2.4 Configurer Google OAuth (optionnel pour v0.1)

Cette étape sera nécessaire pour la version 2.0, mais vous pouvez la préparer :

1. Aller dans "Authentication" > "Providers"
2. Activer "Google"
3. Suivre les instructions pour créer un OAuth client sur Google Cloud

## 📧 Étape 3 : Configuration Resend

### 3.1 Créer un compte Resend

1. Aller sur [https://resend.com](https://resend.com)
2. Créer un compte
3. Vérifier votre email

### 3.2 Récupérer la clé API

1. Dans le dashboard Resend, aller dans "API Keys"
2. Créer une nouvelle clé API
3. Copier la clé dans votre fichier `.env` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 3.3 Configurer le domaine (optionnel pour v0.1)

Pour la version 0.4, vous devrez :
1. Ajouter votre domaine dans Resend
2. Configurer les enregistrements DNS

## 🚢 Étape 4 : Tester en Local

### 4.1 Lancer le serveur de développement

```bash
npm run dev
```

Le site devrait être accessible sur `http://localhost:5173`

### 4.2 Vérifier la connexion Supabase

Ouvrir la console du navigateur et vérifier qu'il n'y a pas d'erreurs liées à Supabase.

## ☁️ Étape 5 : Déploiement sur Vercel

### 5.1 Pousser le code sur GitHub

```bash
git init
git add .
git commit -m "Initial commit - v0.1"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/childhood-ink.git
git push -u origin main
```

### 5.2 Connecter à Vercel

1. Aller sur [https://vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "New Project"
4. Importer le repository `childhood-ink`
5. Configurer le projet :
   - **Framework Preset** : Remix
   - **Build Command** : `npm run build`
   - **Output Directory** : `build/client`

### 5.3 Ajouter les variables d'environnement

Dans les settings Vercel, aller dans "Environment Variables" et ajouter :
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

### 5.4 Déployer

Cliquer sur "Deploy". Le déploiement prend environ 1-2 minutes.

## 🌐 Étape 6 : Configuration du Domaine childhood.ink

### 6.1 Acheter le domaine (si pas déjà fait)

1. Acheter le domaine sur un registrar (OVH, Gandi, Namecheap, etc.)

### 6.2 Configurer le domaine dans Vercel

1. Dans le projet Vercel, aller dans "Settings" > "Domains"
2. Ajouter le domaine : `childhood.ink`
3. Suivre les instructions pour configurer les DNS

### 6.3 Configurer les enregistrements DNS

Chez votre registrar, ajouter les enregistrements DNS fournis par Vercel :

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Note** : La propagation DNS peut prendre jusqu'à 48h, mais généralement c'est beaucoup plus rapide (quelques minutes à quelques heures).

## ✅ Tests de la Version 0.1

### Test 1 : Site accessible

- [ ] Le site est accessible sur `http://localhost:5173` en local
- [ ] Le site est accessible sur `https://childhood-ink.vercel.app` (ou votre URL Vercel)
- [ ] Le site est accessible sur `https://childhood.ink` (après configuration DNS)

### Test 2 : Connexion Supabase

- [ ] Pas d'erreurs dans la console liées à Supabase
- [ ] Les tables sont créées dans Supabase

### Test 3 : Déploiement automatique

- [ ] Faire un commit et push sur GitHub
- [ ] Vercel détecte le push et redéploie automatiquement
- [ ] Le nouveau déploiement est visible sur le site

## 🎉 Bravo !

La version 0.1 est maintenant installée et configurée. Vous avez :

- ✅ Un projet Remix fonctionnel avec TypeScript et Tailwind CSS
- ✅ Une base de données Supabase configurée
- ✅ Un hébergement Vercel avec déploiement automatique
- ✅ Le domaine childhood.ink configuré

## 📝 Prochaines Étapes

Consultez la [Roadmap](./Rules/roadmap.md) pour les prochaines versions :
- Version 0.2 : Landing Page
- Version 0.3 : Formulaire d'inscription
- Version 0.4 : Configuration emailing
- etc.

## 🐛 Dépannage

### Erreur npm EPERM

Si vous rencontrez l'erreur de permissions npm, exécuter :
```bash
sudo chown -R $(whoami) ~/.npm
```

### Erreur de build Vercel

Vérifier que toutes les variables d'environnement sont bien configurées dans Vercel.

### Le site ne charge pas

- Vérifier la console du navigateur pour les erreurs
- Vérifier que toutes les variables d'environnement sont correctes
- Vérifier les logs de Vercel

## 📞 Support

Pour toute question, consulter :
- [Documentation Remix](https://remix.run/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vercel](https://vercel.com/docs)

