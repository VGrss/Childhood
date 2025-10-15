# 🚀 Déploiement sur Vercel - Childhood.ink

## ✅ Prérequis

- ✅ Code poussé sur GitHub : https://github.com/VGrss/Childhood
- ✅ Tags v0.1.0 et v0.2.0 créés
- ✅ Site fonctionnel en local (http://localhost:5173)

## 📝 Étapes de Déploiement

### 1. Aller sur Vercel

Ouvrir https://vercel.com et se connecter avec GitHub

### 2. Créer un nouveau projet

1. Cliquer sur **"New Project"**
2. Chercher et sélectionner le repository **"VGrss/Childhood"**
3. Cliquer sur **"Import"**

### 3. Configurer le projet

**Framework Preset** : Remix  
**Root Directory** : `./` (par défaut)  
**Build Command** : `npm run build` (automatique)  
**Output Directory** : `build/client` (automatique)  
**Install Command** : `npm install` (automatique)

### 4. Ajouter les variables d'environnement

Cliquer sur **"Environment Variables"** et ajouter :

```
SUPABASE_URL = votre_url_supabase
SUPABASE_ANON_KEY = votre_anon_key
SUPABASE_SERVICE_ROLE_KEY = votre_service_role_key
```

**Note** : `RESEND_API_KEY` sera ajouté en v0.4

### 5. Déployer

1. Cliquer sur **"Deploy"**
2. Attendre 1-2 minutes
3. Le site sera déployé sur une URL type : `https://childhood-xxxxxxx.vercel.app`

### 6. Vérifier le déploiement

1. Cliquer sur **"Visit"** pour ouvrir le site
2. Vérifier que toutes les 6 sections s'affichent correctement
3. Tester sur mobile et desktop

## 🌐 Configurer le domaine childhood.ink (Optionnel)

### 1. Dans Vercel

1. Aller dans **Settings** > **Domains**
2. Cliquer sur **"Add"**
3. Entrer `childhood.ink`
4. Cliquer sur **"Add"**

### 2. Vercel vous donnera les DNS à configurer

Exemple :
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Configurer chez votre registrar

1. Aller chez votre registrar (OVH, Gandi, Namecheap, etc.)
2. Ajouter les enregistrements DNS fournis par Vercel
3. Attendre la propagation (quelques minutes à quelques heures)

## ✅ Vérifications Post-Déploiement

- [ ] Le site est accessible sur l'URL Vercel
- [ ] Toutes les sections s'affichent correctement
- [ ] Le design responsive fonctionne sur mobile
- [ ] Les meta tags SEO sont présents (vérifier le source HTML)
- [ ] Pas d'erreurs dans la console du navigateur

## 🔄 Déploiements Automatiques

Une fois configuré, chaque `git push origin main` déclenchera :

1. **GitHub Actions** - Tests et build
2. **Vercel** - Déploiement automatique
3. **Preview** - URL de prévisualisation
4. **Production** - Mise à jour automatique du site

## 📊 Résumé

```
Repository: https://github.com/VGrss/Childhood
Version: 0.2.0
Status: Ready for deployment

Framework: Remix 2.13.1
Build: npm run build
Output: build/client

Environment Variables Required:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
```

## 🎉 C'est terminé !

Une fois déployé, votre landing page Childhood.ink sera accessible publiquement !

**Prochaine version : 0.3 - Formulaire d'inscription**

