# Procédure de Release Simplifiée

## 🚀 Release en 2 Étapes

### 1. Versioning

```bash
# Incrémenter la version (major.minor.patch)
npm version minor # ou major/patch selon le type de changement
```

### 2. Déploiement GitHub et Documentation

Repository: https://github.com/VGrss/Childhook

```bash
# Commiter et pousser vers GitHub
git add .
git commit -m "Release v$(npm pkg get version | tr -d '"')"
git push origin main
git push origin --tags
```

## 📝 Mise à Jour Documentation

- Ajouter l'entrée dans `version-history.md`
- Mettre à jour `product-specs.md` si nouvelles fonctionnalités
- Mettre à jour `versions.json` avec la nouvelle version
- Vérifier que `manifest.json` est à jour

