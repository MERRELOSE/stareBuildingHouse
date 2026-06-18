# stareBuildingHouse

Projet Laravel — stareBuildingHouse

Résumé
Ce dépôt contient une application Laravel (back-end PHP) avec un front-end basé sur Vite. Il s'agit du code source d'une application web (API + interface) développée avec Laravel. Le dépôt inclut la configuration, les assets front-end, la configuration de la base de données et des scripts de démarrage.

Prérequis
- PHP 8.1+ (vérifier la version requise dans composer.json)
- Composer
- Node.js 16+ (ou version compatible avec Vite)
- npm (ou yarn)
- Base de données (MySQL, MariaDB, PostgreSQL — via .env)
- Extensions PHP recommandées : pdo, mbstring, openssl, tokenizer, xml, ctype, json, bcmath (selon stack Laravel)

Fichiers et structure importants
- app/ — logique applicative Laravel (controllers, models, services)
- bootstrap/ — bootstrap framework
- config/ — fichiers de configuration
- database/ — migrations et seeders
- public/ — point d'entrée web (index.php, assets compilés)
- resources/ — vues, assets frontend (SASS/JS), templates
- routes/ — routes web/api
- storage/ — fichiers générés (logs, caches, uploads)
- tests/ — tests PHPUnit
- .env.example — variables d'environnement d'exemple

Installation (développement)
1. Cloner le dépôt
   git clone https://github.com/MERRELOSE/stareBuildingHouse.git
   cd stareBuildingHouse

2. Installer les dépendances PHP
   composer install

3. Installer les dépendances Node et builder les assets
   npm install
   # ou `yarn`
   npm run dev
   # pour build production : npm run build

4. Copier le fichier d'environnement et générer la clé d'application
   cp .env.example .env
   php artisan key:generate

5. Configurer la base de données dans .env (DATABASE_URL / DB_*), puis exécuter :
   php artisan migrate --seed

6. Lancer le serveur de développement Laravel
   php artisan serve
   # et laisser vite dev tourner pour le front-end si nécessaire

Tests
- Lancer les tests PHPUnit :
  ./vendor/bin/phpunit

Déploiement
- Compiler les assets pour production :
  npm run build
- Déployer le dossier `public/` via votre serveur (Nginx/Apache) et configurez la variable APP_ENV et la base de données.
- Exécuter les migrations en production : php artisan migrate --force

Sécurité & bonnes pratiques
- Ne comitez jamais le fichier .env avec des secrets.
- Protégez la clé APP_KEY et les informations de la DB.
- Limitez les permissions d'écriture sur le dossier storage/ et bootstrap/cache/.

Dépannage
- Vérifiez les logs dans storage/logs/ pour diagnostiquer les erreurs.
- Si Vite ne compile pas, vérifiez la version de Node et les logs npm.

Contributions
- Ouvrez une issue pour discuter d'un changement.
- Créez une branche feature/xxxx et soumettez une PR.

Licence
Aucune licence spécifiée dans le dépôt. Ajoutez un fichier LICENSE si vous souhaitez choisir une licence (ex. MIT).

Contact
Pour toute question sur le code, ouvrez une issue ou contactez l'auteur du dépôt.
