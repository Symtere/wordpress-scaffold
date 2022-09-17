## 👾 (0) - Required

-  Environnement local + [TODO création projet](https://github.com/Symtere/wordpress-blank-theme)
-  [WP CLI]
- ❗🤬 **Avoir 1 Token Github** pour [Composer] (Laragon => `C:\laragon\bin\composer`)
-  [Node js](https://nodejs.org/en/) (Laragon => `C:\laragon\bin\nodejs`)
-  [Gitbash](https://gitforwindows.org/) (Laragon => `C:\laragon\bin\git`)

## 🚀 (1) - New project (installation)

### 1.1/ Téléchargement et configuration de wordpress + installation des plugins

```php
cd www/
git clone git@github.com:Symtere/wordpress-scaffold.git
cd my-project-name
npm i
npm run scaffold // 1) New project
```

- A la fin de l'installation, redémarrer Apache (Laragon => recharger).
- Les fichiers suivants avec les informations saisies depuis le terminal ont été générés : [.htaccess](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/htaccess.txt), [robots.txt](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/robots.txt), composer.json, [package.json](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/package.json), [gitignore.txt](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/gitignore.txt), [README.md](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/readme.txt)
- Le starter thème a été installé (https://github.com/Symtere/wordpress-blank-theme)
- Régler la structure des permaliens sur `/%post_id%/%postname%/`


### 1.2/ Ajout de la nouvelle remote Github du projet

Suppression du dossier /.git actuellement relié à `wordpress-scaffold.git` et ajout de la nouvelle remote.

```php
sh scaffold/git/init.sh
```

En cas d'échec, on peut lancer ces commandes

```php
rm -rf ./.git
git init
git remote add origin git@github.com:Symtere/`new-project`.git
```

## 💫 (2) - Add migrations (scripts `sh`)

### 2.1/ Ajout des commandes de migrations

```php
cd www/new-project // root project
npm run scaffold // 2) Add migrations
```

Export/Import BDD - Synchronisation fichiers

## 💪 (3) - Add RGPD pages (HTML back office)

### 3.1/ Mise à jour et création des pages RGPD

```php
cd www/new-project // root project
npm run scaffold // 3) Add RGPD pages
```

Génération des pages RGPD suivantes dans le back office de wordpress avec le titre du site et l'url du site

-  **create** => [Mentions légales](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/rgpd/mentions-legales.html), [Les cookies](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/rgpd/les-cookies.html), [Demande de données personnelles](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/rgpd/demande-de-donnee-personnelles.html)
-  **update or create** => [Politique de confidentialité](https://github.com/Symtere/wordpress-scaffold/blob/main/scaffold/tpl/rgpd/politique-de-confidentialite.html)
