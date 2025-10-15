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

### 2. Système d'Emailing Intelligent

#### 2.1 Architecture du Système

Le système d'emailing est composé de **3 tables principales** :

**`email_templates`** - Templates d'emails
- Contenu riche structuré en sections (intro, activités, admin, santé, financier)
- Variables dynamiques (child_name, parent_name, age)
- Versioning des templates
- Support multilingue (futur)

**`email_rules`** - Règles de déclenchement
- 3 types de triggers : relative, absolute, hybrid
- Conditions d'âge sophistiquées (==, >=, <=, between)
- Offsets temporels (jours, semaines, mois)
- Configuration de l'heure d'envoi

**`scheduled_emails`** - Queue d'emails planifiés
- Système d'idempotence (évite les doublons)
- Tracking du statut (scheduled, sent, failed, cancelled)
- Variables pré-calculées pour chaque email

#### 2.2 Types de Triggers

**Trigger Relative (basé sur un événement enfant)**
```
Exemple : "7 jours avant l'anniversaire"
- Anchor : birthday
- Offset : -7 days
- Fréquence : yearly
```

**Trigger Absolute (date fixe dans l'année)**
```
Exemple : "1er juillet pour les 2-5 ans"
- Anchor : calendar (month: 7, day: 1)
- Age condition : between 2 and 5
- Fréquence : yearly
```

**Trigger Hybrid (calendrier + âge + offset)**
```
Exemple : "2 semaines avant la rentrée à 3 ans"
- Anchor : school_start (September 1)
- Offset : -2 weeks
- Age condition : == 3
- Fréquence : once
```

#### 2.3 Conditions d'Âge

Le système supporte 5 types de conditions :
- `==` : Exactement X ans (ex: == 3)
- `>=` : X ans et plus (ex: >= 3)
- `<=` : X ans et moins (ex: <= 5)
- `between` : Entre X et Y ans (ex: between 2 and 5)
- `none` : Pas de condition d'âge

#### 2.4 Logique de Scheduling

**Étapes de calcul automatique :**
1. **Expansion** : Génère toutes les dates candidates possibles
2. **Filtrage** : Applique les conditions d'âge
3. **Offset** : Ajoute/soustrait les jours/semaines/mois
4. **Timing** : Applique l'heure d'envoi configurée
5. **Idempotence** : Génère une clé unique (rule_id + child_id + date)
6. **Queue** : Insère dans scheduled_emails si pas déjà présent

**Exemple de calcul :**
```
Enfant né le : 2022-02-25
Règle : "7 jours avant anniversaire"
Date candidate : 2025-02-25 (anniversaire des 3 ans)
Offset : -7 jours
Résultat : 2025-02-18 à 10h00
```

#### 2.5 Provider & Envoi

- **Provider** : Resend (intégration v1.0)
- **Horizon** : 18 mois (calcul anticipé)
- **Timezone** : Support multi-timezone (Europe/Paris par défaut)
- **Retry** : Gestion automatique des erreurs
- **Logs** : Tracking complet (sent_at, opened_at, clicked_at)

#### 2.6 Exemples de Règles Implémentées

| Règle | Type | Trigger | Condition | Fréquence |
|-------|------|---------|-----------|-----------|
| Birthday Reminder | Relative | -7d avant birthday | none | yearly |
| Summer Activities | Absolute | 1er juillet | 2-5 ans | yearly |
| Back to School | Absolute | 31 août | ≥3 ans | yearly |
| First School Start | Hybrid | 2 sem. avant rentrée | =3 ans | once |

#### 2.7 API de Prévisualisation

**Endpoint** : `/api/schedule/preview`

**GET** : Prévisualisation pour un enfant inscrit
```bash
GET /api/schedule/preview?child_id=xxx&months=18
```

**POST** : Prévisualisation pour un enfant fictif
```bash
POST /api/schedule/preview
Body: { 
  "birth_date": "2022-02-25", 
  "first_name": "Alice",
  "months": 18 
}
```

**Réponse** :
```json
{
  "success": true,
  "total_emails": 5,
  "schedule": [
    {
      "date": "2025-02-18 10:00",
      "date_human": "mardi 18 février 2025 à 10h00",
      "rule_name": "Rappel d'anniversaire",
      "template_id": "tpl_birthday",
      "child_age": 3
    }
  ]
}
```

### 3. Gestion du Contenu des Emails

Structure des templates :
```json
{
  "sections": [
    {
      "type": "intro",
      "body": "Bonjour {parent_name}, ..."
    },
    {
      "type": "activities",
      "title": "Idées d'activités",
      "body": "- Activité 1\n- Activité 2"
    },
    {
      "type": "health",
      "title": "Conseils santé",
      "body": "..."
    }
  ]
}
```

**Types de sections** :
- `intro` : Introduction personnalisée
- `activities` : Suggestions d'activités
- `admin` : Démarches administratives
- `health` : Conseils santé
- `financial` : Gestion financière
- `conclusion` : Signature et clôture

**Variables dynamiques** :
- `{child_name}` : Prénom de l'enfant
- `{parent_name}` : Prénom du parent
- `{age}` : Âge de l'enfant
- `{send_date}` : Date d'envoi

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

