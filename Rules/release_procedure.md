# Procédure de Release

Repository: https://github.com/VGrss/Childhood

## 🚀 Release en 3 Étapes

### 1. Versioning

```bash
# Incrémenter la version (major.minor.patch)
npm version minor # ou major/patch selon le type de changement
```

### 2. Documentation

- Ajouter l'entrée dans `Rules/version_history.md` (description concise, max 5-7 points)
- Mettre à jour `Rules/product_specs.md` si nouvelles fonctionnalités
- Vérifier que `manifest.json` est à jour

### 3. Git & GitHub

```bash
# Commiter et pousser vers GitHub
git add .
git commit -m "Release v$(npm pkg get version | tr -d '"')"
git push origin main
git push origin --tags
```

## 🔐 Authentification GitHub

### Option 1 : HTTPS (avec Personal Access Token)
1. Générer un token : https://github.com/settings/tokens
2. Permissions : cocher `repo`
3. Utiliser le token comme mot de passe lors du push

### Option 2 : SSH
```bash
git remote set-url origin git@github.com:VGrss/Childhood.git
```

## ✅ Vérifications Post-Release

- [ ] Code visible sur GitHub
- [ ] Tag visible dans les releases
- [ ] README.md s'affiche correctement
- [ ] Déploiement Vercel automatique déclenché (si configuré)

## 🚀 Déploiement Vercel

### Configuration initiale (première fois)
1. Aller sur https://vercel.com et se connecter avec GitHub
2. "New Project" → Importer "VGrss/Childhood"
3. Configuration auto-détectée (Remix, npm run build, build/client)
4. Ajouter variables d'environnement : `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy

**Note** : `vercel.json` est configuré pour Remix (buildCommand, regions)

### Déploiements suivants
Automatiques : `git push origin main` → Vercel redéploie

### En cas d'erreur
- Vérifier que `vercel.json` est simple (buildCommand, installCommand, regions uniquement)
- Laisser Vercel auto-détecter le framework Remix
- Vérifier les variables d'environnement dans Vercel dashboard

## 📦 Release GitHub (Optionnel)

1. Aller sur https://github.com/VGrss/Childhood/releases
2. "Create a new release"
3. Choisir le tag
4. Ajouter titre et description des changements

