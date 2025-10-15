# Configuration MCP - Childhood.ink

Guide d'installation des serveurs MCP (Model Context Protocol) pour Vercel, Supabase et Namecheap.

## 📋 Prérequis

- Python 3.10+ (pour Supabase MCP)
- Node.js 20+ (pour Namecheap MCP)
- pipx installé : `brew install pipx` (macOS)
- Cursor IDE

## 🚀 Installation des Serveurs MCP

### 1. Vercel MCP

Vercel propose un serveur MCP officiel accessible via HTTPS.

**Aucune installation nécessaire** - Le serveur est hébergé par Vercel.

**Configuration** :
- Endpoint officiel : `https://mcp.vercel.com`
- Endpoint spécifique au projet : `https://mcp.vercel.com/<teamSlug>/<projectSlug>`

**Variables d'environnement requises** :
```bash
VERCEL_TOKEN=your_vercel_token_here
```

Pour obtenir votre token :
1. Aller sur https://vercel.com/account/tokens
2. Créer un nouveau token
3. Copier le token

### 2. Supabase MCP

Serveur MCP Python pour gérer votre base de données Supabase.

**Installation** :
```bash
# Installer pipx si pas déjà fait
brew install pipx
pipx ensurepath

# Installer le serveur MCP Supabase
pipx install supabase-mcp-server
```

**Variables d'environnement requises** :
```bash
SUPABASE_PROJECT_REF=your_project_ref
SUPABASE_DB_PASSWORD=your_database_password
SUPABASE_REGION=eu-west-1  # ou votre région
```

Pour obtenir ces informations :
1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet
3. Settings > Database > Connection string
4. Le project ref est dans l'URL (après `/project/`)

**Lancer le serveur** :
```bash
supabase-mcp-server
```

### 3. Namecheap MCP

Serveur MCP Node.js pour gérer vos domaines Namecheap.

**Installation** :
```bash
# Cloner le repository
cd ~/
git clone https://github.com/deployTo-Dev/mcp-namecheap-registrar.git
cd mcp-namecheap-registrar

# Installer les dépendances
npm install

# Build le projet
npm run build
```

**Variables d'environnement requises** :
```bash
NAMECHEAP_API_USER=your_username
NAMECHEAP_API_KEY=your_api_key
NAMECHEAP_USERNAME=your_username
NAMECHEAP_CLIENT_IP=your_whitelisted_ip
```

Pour obtenir votre API key :
1. Aller sur https://ap.www.namecheap.com/settings/tools/apiaccess/
2. Activer l'API Access
3. Whitelister votre IP
4. Copier l'API key

## ⚙️ Configuration Cursor

Le fichier de configuration MCP se trouve dans `~/.cursor/mcp_config.json` ou dans les settings de Cursor.

**Fichier de configuration complet** :

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com",
      "env": {
        "VERCEL_TOKEN": "your_vercel_token"
      }
    },
    "supabase": {
      "command": "supabase-mcp-server",
      "env": {
        "SUPABASE_PROJECT_REF": "xxxxxxxxxxxxx",
        "SUPABASE_DB_PASSWORD": "your_password",
        "SUPABASE_REGION": "eu-west-1"
      }
    },
    "namecheap": {
      "command": "node",
      "args": [
        "/Users/victorgross/mcp-namecheap-registrar/dist/index.js"
      ],
      "env": {
        "NAMECHEAP_API_USER": "your_username",
        "NAMECHEAP_API_KEY": "your_api_key",
        "NAMECHEAP_USERNAME": "your_username",
        "NAMECHEAP_CLIENT_IP": "your_ip"
      }
    }
  }
}
```

## 📝 Configuration via Cursor Settings

Alternative : Configurer via l'interface Cursor :

1. Ouvrir Cursor
2. `Cmd/Ctrl + ,` pour ouvrir les Settings
3. Chercher "MCP" ou "Model Context Protocol"
4. Ajouter les serveurs un par un avec leurs configurations

## ✅ Vérification

Pour vérifier que les serveurs MCP sont correctement configurés :

1. Ouvrir Cursor
2. Dans le chat, taper `@` pour voir les serveurs MCP disponibles
3. Vous devriez voir :
   - `@vercel`
   - `@supabase`
   - `@namecheap`

## 🔧 Utilisation

### Exemples avec Vercel
```
@vercel list my projects
@vercel deploy to production
@vercel check deployment status
```

### Exemples avec Supabase
```
@supabase show all tables
@supabase create a new table for users
@supabase run this query: SELECT * FROM users
```

### Exemples avec Namecheap
```
@namecheap list my domains
@namecheap check domain availability
@namecheap update DNS records for childhood.ink
```

## 🐛 Dépannage

### Vercel MCP ne fonctionne pas
- Vérifier que le token Vercel est valide
- Vérifier que vous avez accès aux projets
- Essayer l'URL spécifique au projet

### Supabase MCP ne démarre pas
- Vérifier que pipx est installé : `pipx --version`
- Vérifier les variables d'environnement
- Vérifier que le project ref est correct
- Tester la connexion : `supabase-mcp-server --help`

### Namecheap MCP erreur
- Vérifier que Node.js est installé : `node --version`
- Vérifier que l'IP est whitelistée sur Namecheap
- Vérifier l'API key et username
- Check les logs : voir le fichier de log du serveur

## 📚 Ressources

- **Vercel MCP** : https://vercel.com/docs/mcp/vercel-mcp
- **Supabase MCP** : https://github.com/alexander-zuev/supabase-mcp-server
- **Namecheap MCP** : https://github.com/deployTo-Dev/mcp-namecheap-registrar
- **MCP Protocol** : https://modelcontextprotocol.io

## 🔐 Sécurité

**Important** :
- Ne jamais committer les tokens et API keys
- Utiliser des variables d'environnement
- Restreindre les permissions des tokens au minimum nécessaire
- Whitelister uniquement votre IP pour Namecheap
- Activer la confirmation humaine pour les actions sensibles

## 📅 Dernière mise à jour

15 octobre 2025 - Version 0.1

