# Spécifications Produit - Childhood.ink

## 📋 Vue d'Ensemble

**Childhood.ink** est une newsletter éducative qui délivre des conseils personnalisés aux parents pour accompagner leurs enfants tout au long de leur vie. Le projet vise à passer à l'échelle les conseils éducatifs en partageant les bonnes informations au bon moment.

**Site web** : childhood.ink

## 🎯 Vision & Mission

### Vision
On sait suffisamment de choses pour conseiller chacun de façon systématique tout au long de sa vie. L'objectif est de passer à l'échelle les conseils éducatifs en partageant les bonnes informations au bon moment.

### Mission
Aider les parents avec des informations livrées à des dates importantes et moments clés de la vie de leurs enfants :
- **Moments clés** : Événements importants dans le développement de l'enfant
- **Inspiration** : Idées et suggestions pour stimuler la créativité
- **Conseils** : Recommandations adaptées à chaque âge
- **Débloquer l'ambition** : Encourager le potentiel de l'enfant
- **Engager à l'action** : Inciter les parents à agir concrètement

### Cible
Les parents pour accompagner leurs enfants dans leur développement.

## 📝 Contenu Éditorial

Le contenu correspond à ce qu'un mentor ou une bonne tante pourrait dire à chaque âge :
- **Conseils d'activités** : Suggestions d'activités adaptées à l'âge
- **Conseils administratifs** : Démarches et formalités importantes
- **Conseils de santé** : Recommandations médicales et bien-être
- **Conseils financiers** : Gestion financière liée à l'enfant

### Style Éditorial
Site de bonnes histoires pour enfants avec un éditorial bien fait et soigné.

### Triggers d'Envoi
- Naissance d'un enfant / Âge de l'enfant
- Lancement d'un projet

## ✨ Fonctionnalités Principales

### 1. Landing Page
- Présentation du concept de la Life Newsletter
- **Formulaire d'inscription** avec 4 champs :
  - Prénom
  - Email
  - Date de naissance de l'enfant
  - Genre (garçon ou fille)
- Design moderne et attrayant
- **Domaine** : childhood.ink

### 2. Emailing Engine
Système automatisé d'envoi d'emails programmés :
- Envoi d'emails à des moments précis basés sur l'âge de l'enfant
- Gestion des triggers temporels
- **Provider** : Resend

### 3. Gestion du Contenu des Emails
Structure simple et efficace :
- **Titre de l'email**
- **Sections & contenu** : Format rich text global incluant titres et liens externes
- **Signature permanente** : Lien vers la Life Newsletter

### 4. Pages Publiques du contenu des Emails
- Chaque email est disponible publiquement sur une page dédiée
- **Système de commentaires** : Intégration de **Disqus** pour permettre aux lecteurs de commenter et suggérer des modifications

## 🔧 Stack Technique

### Frontend
- **Framework** : Next.js
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Composants UI** : Shadcn UI (https://ui.shadcn.com/)

### Backend
- **Langage** : TypeScript (Node.js) ou Python
- **CRON Jobs** : Configuration sur le backend

### Base de Données & Services
- **Supabase** : Base de données, stockage, authentification
- **Authentication** : Google Auth uniquement via Supabase (OAuth client sur Google Cloud)
- **Hébergement** : Vercel
- **Email Provider** : Resend

### Outils de Développement
- **IDE** : Cursor avec Claude Code
- **MCP Tools** :
  - Supabase MCP (après avoir bien compris le fonctionnement de Supabase)
  - Context7 MCP ([https://context7.com/](https://context7.com/)) pour la documentation des packages

## 🏗️ Architecture

- **Monorepo** : Frontend et Backend hébergés ensemble sur Vercel
- **Intégration GitHub** : Déploiement automatisé
- **Séparation claire** : Frontend Next.js + Backend Node.js (API Routes)

## 📱 Interface Utilisateur

- Design moderne et épuré
- Utilisation des composants Shadcn UI pour une cohérence visuelle
- Sidebar Block pour une navigation optimale
- Responsive et adapté aux mobiles

## 🔐 Sécurité & Authentification

- **Google OAuth** uniquement via Supabase
- Gestion sécurisée des données utilisateurs
- Protection des informations sensibles (dates de naissance, emails)

## ⚠️ Notes Importantes

### À Privilégier
- Cursor et Claude Code pour le développement
- Consulter les best practices de Cursor avant de commencer
- S'amuser et apprendre tout au long du projet !

### À Éviter
- Supabase/Vercel Functions (apprentissage plus difficile)

### Changement de Stack (v0.2)
- ✅ Migration de Remix vers Next.js pour simplifier le déploiement Vercel
- Next.js offre une meilleure intégration native avec Vercel (framework officiel)

## 📊 Intégrations Tierces

- **Disqus** : Système de commentaires sur les pages publiques
- **Resend** : Service d'envoi d'emails
- **Google Cloud** : OAuth pour l'authentification
- **Vercel** : Hébergement et déploiement

