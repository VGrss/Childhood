# Roadmap - Childhood.ink

## Version 0.1 - Setup & Infrastructure

- [ ] Configuration du projet Remix + TypeScript
- [ ] Setup Tailwind CSS
- [ ] Configuration Supabase (database, auth, storage)
- [ ] Setup Vercel pour l'hébergement
- [ ] Configuration du domaine childhood.ink
- [ ] Intégration GitHub avec Vercel

### Tests v0.1
- [ ] Vérifier que le site est accessible sur childhood.ink
- [ ] Vérifier la connexion à Supabase
- [ ] Vérifier le déploiement automatique via GitHub

---

## Version 0.2 - Landing Page

- [ ] Design de la page d'accueil
- [ ] Présentation du concept Life Newsletter
- [ ] Design responsive mobile

### Tests v0.2
- [ ] Vérifier l'affichage de la landing page
- [ ] Tester la responsivité sur mobile et desktop

---

## Version 0.3 - Formulaire d'Inscription

- [ ] Formulaire d'inscription (prénom, email, date de naissance, genre)
- [ ] Validation des données du formulaire
- [ ] Connexion Supabase pour stocker les inscriptions
- [ ] API d'inscription utilisateur

### Tests v0.3
- [ ] Tester l'inscription d'un utilisateur avec tous les champs
- [ ] Vérifier que les données sont bien enregistrées dans Supabase
- [ ] Tester la validation du formulaire (champs requis, format email)

---

## Version 0.4 - Configuration Emailing

- [ ] Configuration Resend comme provider d'emails
- [ ] Template d'email de base avec signature
- [ ] Email de confirmation d'inscription

### Tests v0.4
- [ ] Inscrire un utilisateur et recevoir l'email de confirmation
- [ ] Vérifier le template et la signature

---

## Version 0.5 - Base de Données Contenu

- [ ] Modèle de données pour les emails
- [ ] Base de données de templates d'emails
- [ ] Système de titre + sections

### Tests v0.5
- [ ] Créer un email dans la base de données
- [ ] Vérifier la structure titre + sections

---

## Version 0.6 - Interface Edition des emails

- [ ] Interface pour créer des emails
- [ ] Éditeur rich text pour le contenu
- [ ] Prévisualisation des emails

### Tests v0.6
- [ ] La liste des emails est disponbile sur childhood.ink/newsletter
- [ ] Vérifier la prévisualisation du contenu rich text

---

## Version 0.7 - Premier Contenu Éditorial

- [ ] Rédaction de 5 premiers emails (0-6 mois)
- [ ] Structure : activités, administratif, santé, financier
- [ ] Validation du style "mentor/bonne tante"

### Tests v0.7
- [ ] Relire et valider les 5 premiers emails
- [ ] Vérifier la cohérence du ton éditorial

---

## Version 0.8 - CRON Jobs & Triggers

- [ ] Système de CRON jobs pour les envois programmés
- [ ] Calcul des triggers basés sur l'âge de l'enfant
- [ ] Gestion des erreurs d'envoi
- [ ] Logs des envois

### Tests v0.8
- [ ] Tester le CRON job manuellement pour un envoi programmé
- [ ] Vérifier le calcul des triggers selon différentes dates de naissance
- [ ] Consulter les logs d'envoi et vérifier la gestion d'erreurs

---

## Version 0.9 - Test Complet MVP

- [ ] Rédaction de 5 emails supplémentaires (6-12 mois)
- [ ] Tests end-to-end complets
- [ ] Optimisations et corrections

### Tests v0.9
- [ ] Inscrire un utilisateur test et recevoir les emails automatiquement
- [ ] Vérifier l'envoi à la bonne date selon l'âge
- [ ] Tester l'ensemble du flux d'inscription à réception

---

## Version 1.0 - Intégration Shadcn UI

- [ ] Installation Shadcn UI
- [ ] Refactorisation landing page avec Shadcn
- [ ] Refactorisation formulaire d'inscription
- [ ] Design system cohérent

### Tests v1.0
- [ ] Vérifier l'intégration des composants Shadcn UI
- [ ] Tester l'uniformité visuelle sur toutes les pages

---

## Version 1.1 - Sidebar & Navigation

- [ ] Implementation du Sidebar Block
- [ ] Navigation principale
- [ ] Optimisation mobile du menu

### Tests v1.1
- [ ] Tester le Sidebar Block sur desktop et mobile
- [ ] Vérifier la navigation entre les pages

---

## Version 1.2 - Pages Publiques

- [ ] Pages publiques pour chaque email envoyé
- [ ] URLs friendly et SEO optimisées
- [ ] Navigation entre les emails et indexation via la liste

### Tests v1.2
- [ ] Accéder à une page publique d'email via son URL
- [ ] Naviguer entre plusieurs emails publics
- [ ] Vérifier le SEO (meta tags, Open Graph)

---

## Version 1.3 - Commentaires & Partage

- [ ] Intégration Disqus pour les commentaires
- [ ] Système de partage social
- [ ] Amélioration de l'accessibilité

### Tests v1.3
- [ ] Tester le système de commentaires Disqus (poster, répondre)
- [ ] Vérifier les boutons de partage social (Facebook, Twitter, LinkedIn)
- [ ] Tester l'accessibilité (navigation clavier, lecteurs d'écran)

---

## Version 1.4 - Contenu Éditorial Étendu

- [ ] Rédaction de 5 emails supplémentaires (12-18 mois)
- [ ] Animations et transitions
- [ ] Polissage général de l'UI

### Tests v1.4
- [ ] Valider les nouveaux emails
- [ ] Vérifier les animations sur toutes les pages

---

## Version 2.0 - Google OAuth

- [ ] Configuration Google Cloud OAuth
- [ ] Setup Google OAuth via Supabase
- [ ] Page de connexion/inscription
- [ ] Gestion des sessions
- [ ] Protection des routes

### Tests v2.0
- [ ] Se connecter avec un compte Google
- [ ] Vérifier la création automatique du profil utilisateur
- [ ] Tester la protection des routes (redirection si non connecté)

---

## Version 2.1 - Dashboard Utilisateur

- [ ] Dashboard utilisateur
- [ ] Historique des emails reçus
- [ ] Interface de profil basique

### Tests v2.1
- [ ] Accéder au dashboard et vérifier l'affichage des données
- [ ] Consulter l'historique des emails reçus

---

## Version 2.2 - Gestion du Profil

- [ ] Gestion du profil (modifier les infos de l'enfant)
- [ ] Préférences de notification
- [ ] Possibilité d'ajouter plusieurs enfants

### Tests v2.2
- [ ] Modifier les informations de l'enfant (nom, date de naissance, genre)
- [ ] Ajouter un deuxième enfant au compte
- [ ] Modifier les préférences de notification

---

## Version 2.3 - Favoris & Timeline

- [ ] Favoris et sauvegarde d'emails
- [ ] Timeline visuelle du développement de l'enfant
- [ ] Historique des conseils reçus

### Tests v2.3
- [ ] Marquer un email en favori et le retrouver
- [ ] Vérifier la timeline visuelle du développement
- [ ] Consulter l'historique complet

---

## Version 2.4 - Recommandations Personnalisées

- [ ] Recommandations basées sur l'âge
- [ ] Suggestions de lecture selon l'historique

### Tests v2.4
- [ ] Tester les recommandations personnalisées selon l'âge
- [ ] Vérifier la pertinence des suggestions

---

## Version 3.0 - Setup IA

- [ ] Intégration Vercel AI SDK
- [ ] Configuration des modèles IA
- [ ] API backend pour IA

### Tests v3.0
- [ ] Vérifier la connexion au SDK IA
- [ ] Tester un appel API simple

---

## Version 3.1 - Chatbot Assistant

- [ ] Chatbot assistant parental
- [ ] Interface de conversation
- [ ] Historique des conversations

### Tests v3.1
- [ ] Demander au chatbot un conseil personnalisé
- [ ] Vérifier la pertinence des réponses du chatbot
- [ ] Consulter l'historique des conversations

---

## Version 3.2 - Génération de Contenu IA

- [ ] Génération de contenu personnalisé
- [ ] Suggestions de conseils basées sur l'historique
- [ ] Recommandations intelligentes d'activités

### Tests v3.2
- [ ] Vérifier la génération de contenu adapté à l'âge de l'enfant
- [ ] Tester les suggestions basées sur l'historique de lecture
- [ ] Recevoir des recommandations d'activités intelligentes

---

## Version 3.3 - Analytics & Optimisation

- [ ] Analyse des interactions utilisateurs
- [ ] Analyse du taux d'ouverture
- [ ] Optimisation des horaires d'envoi
- [ ] Segmentation avancée des utilisateurs

### Tests v3.3
- [ ] Consulter les analytics du taux d'ouverture
- [ ] Confirmer la segmentation des utilisateurs

---

## Version 3.4 - A/B Testing

- [ ] A/B testing des emails
- [ ] Dashboard d'analytics A/B
- [ ] Optimisation des conversions

### Tests v3.4
- [ ] Vérifier l'A/B testing sur un email test
- [ ] Consulter les résultats des tests A/B

---

## Version 4.0 - Forum Communauté

- [ ] Forum de discussion entre parents
- [ ] Création et gestion de posts
- [ ] Système de réponses et commentaires

### Tests v4.0
- [ ] Créer un post sur le forum et recevoir des réponses
- [ ] Répondre à un post existant

---

## Version 4.1 - Groupes & Badges

- [ ] Groupes par âge d'enfant
- [ ] Système de badges et gamification
- [ ] Partage d'expériences

### Tests v4.1
- [ ] Rejoindre un groupe selon l'âge de l'enfant
- [ ] Partager une expérience et gagner un badge

---

## Version 4.2 - Événements & Webinaires

- [ ] Calendrier d'événements
- [ ] Inscription aux webinaires
- [ ] Intégration visioconférence

### Tests v4.2
- [ ] S'inscrire à un événement/webinaire
- [ ] Rejoindre un webinaire en ligne

---

## Version 4.3 - Bibliothèque de Ressources

- [ ] Bibliothèque de ressources
- [ ] Vidéos éducatives
- [ ] Podcasts pour parents
- [ ] Système de recherche et filtres

### Tests v4.3
- [ ] Accéder à la bibliothèque de ressources
- [ ] Regarder une vidéo éducative
- [ ] Écouter un épisode de podcast
- [ ] Rechercher une ressource spécifique

---

## Version 4.4 - Partenariats Experts

- [ ] Interface partenaires experts
- [ ] Contenu validé par experts (pédiatres, psychologues)
- [ ] Badges de certification

### Tests v4.4
- [ ] Consulter du contenu validé par un expert
- [ ] Vérifier les badges de certification

---

## Version 4.5 - Internationalisation

- [ ] Traductions multilingues (anglais, espagnol)
- [ ] Sélecteur de langue
- [ ] Adaptation du contenu
- [ ] Ajouter au formulaire la possibilité de choisir son Pays, parmis ~190 pays dans le monde
- [ ] Adapter la base de données d'emails pour supporter des contenus multilingues avec disponibilité partielle selon la langue et la date

### Tests v4.5
- [ ] Changer la langue du site
- [ ] Vérifier la traduction complète d'une page

