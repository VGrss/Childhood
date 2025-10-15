# Configuration Supabase - Childhood.ink

## 📋 Vue d'ensemble

Ce dossier contient les fichiers de configuration pour Supabase, la base de données backend de Childhood.ink.

## 🗄️ Schéma de Base de Données

Le fichier `schema.sql` contient le schéma complet de la base de données incluant :

### Tables principales

1. **users** : Profils des parents
   - Lié à `auth.users` de Supabase
   - Contient les informations de base (email, prénom)

2. **children** : Informations sur les enfants
   - Lié aux parents via `parent_id`
   - Contient prénom, date de naissance, genre

3. **email_templates** : Templates des emails à envoyer
   - Contient le titre et le contenu (JSONB)
   - Définit l'âge de déclenchement (`trigger_age_days`)

4. **sent_emails** : Historique des emails envoyés
   - Tracking des envois, ouvertures, clics
   - Statut et gestion des erreurs

### Sécurité (RLS)

Row Level Security est activé sur toutes les tables :
- Les parents ne peuvent voir que leurs propres données
- Les templates d'emails sont publics en lecture
- L'historique des emails est protégé

### Fonctions et Triggers

- **handle_updated_at()** : Met à jour automatiquement `updated_at`
- **handle_new_user()** : Crée automatiquement un profil lors de l'inscription

## 🚀 Installation

### 1. Via le Dashboard Supabase

1. Aller dans "SQL Editor"
2. Créer une nouvelle query
3. Copier-coller le contenu de `schema.sql`
4. Exécuter

### 2. Via la CLI Supabase (optionnel)

```bash
# Installer la CLI Supabase
npm install -g supabase

# Se connecter
supabase login

# Initialiser le projet local
supabase init

# Lancer Supabase localement
supabase start

# Appliquer les migrations
supabase db push
```

## 🔐 Authentification

Pour la version 2.0, nous utiliserons Google OAuth via Supabase.

Configuration dans "Authentication" > "Providers" :
- Activer Google
- Configurer avec les credentials de Google Cloud

## 📊 Données de Test

Voici quelques exemples de données pour tester :

### Créer un template d'email

```sql
INSERT INTO email_templates (title, content, trigger_age_days, is_active)
VALUES (
  'Bienvenue !',
  '{"sections": [{"type": "text", "content": "Félicitations pour la naissance de votre enfant !"}]}',
  0,
  true
);
```

### Ajouter un enfant (après authentification)

```sql
INSERT INTO children (parent_id, first_name, birth_date, gender)
VALUES (
  'user-uuid-here',
  'Emma',
  '2024-10-15',
  'girl'
);
```

## 🔄 Migrations Futures

Les futures modifications du schéma seront versionnées et stockées dans ce dossier avec la nomenclature :
- `V0.1_initial_schema.sql`
- `V0.2_add_something.sql`
- etc.

## 📝 Best Practices

1. **Toujours utiliser des transactions** pour les modifications complexes
2. **Tester les queries** en local avant de les appliquer en production
3. **Documenter les changements** de schéma
4. **Utiliser RLS** pour toutes les tables avec données utilisateur
5. **Créer des indexes** pour améliorer les performances

## 🐛 Dépannage

### Erreur de permissions

Si vous rencontrez des erreurs de permissions :
1. Vérifier que RLS est correctement configuré
2. Vérifier les policies
3. Tester avec le service role key si nécessaire

### Performance

Pour améliorer les performances :
1. Analyser les queries lentes dans le dashboard
2. Ajouter des indexes appropriés
3. Optimiser les policies RLS

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

