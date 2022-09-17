## 👽🤖 Installation
❗😱 vhost :  `{{{projectSlug}}}{{{vhost}}}`

```php
cd www/
git clone {{{readmeProjectGithubUrl}}} {{{projectSlug}}}
cd {{{projectSlug}}}
npm i
```

Déplacer le fichier `config/install.sh` à la racine du projet

```php
sh install.sh
```

## 🔐 Accès (Local, Preprod, Prod) :
- user: `{{{adminUserName}}}`, pass: `{{{adminUserPassword}}}`

## 🦄 NPM
- `npm i` installation des dependances
- `npm run start` lance watch + scss
- `npm run scss`  node-sass => scss compilation
- `npm run watch` browser-sync => watch *.php, *.css, *.js files

## 🦉 WP CLI
migrations, export/import BDD, synchronisation fichiers

## 🕹️ Réglages Plesk Déploiement auto
Plesk/github webhooks, déploiement automatique

```cmd
rm -rf README.md
rm -rf readme.html
rm -rf license.txt
rm -rf *.json
rm -rf wp-cli.yml
rm -rf config
```
