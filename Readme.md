# Document explicatif projet Développement Web

## Le sujet

L'objectif du site web que nous avons créé est de permettre d'enregistrer les différents jeux vidéos auxquels on a pu joué (ou on l'on veut jouer à l'avenir).
Il n'a pas pour but de fournir une liste exhaustive de tous les jeux vidéos existants, mais bien de stocker les informations concernant les jeux auxquels on a pu s'essayer et noter quelques informations à ce propos (nom, note, support, plateforme, commentaire, ...).

## Comment lancer l'appli

Tout d'abord, il est nécessaire d'installer les packages nodejs :
- `cd ./front && npm install`
- `cd ../api && npm install`

Mis à part le front, l'ensemble de l'application est dockerisé, il suffit de faire la commande `docker-compose -f .\docker-compose-nofront.yml up -d --build` et d'ensuite lancer le front `cd ./front && npm start`

Si il y a un problème avec le seeder, il est possible d'exécuter le seeder manuellement :
- Ouvrir un terminal dans le service : `docker-compose exec api bash`
- `cd /var/www`
- `node seed.js`

Voici les différentes urls :
- Front : `http://localhost:4200`
- Mongo : `http://localhost:27017`
- Mongo Express : `http://localhost:8082`
- Api : `http://localhost:3000`

## L'API

Parlons rapidement de l'API. Celle-ci a été développé en NodeJS.
Un soin a été apporté à la réalisation de celui-ci (usage des Formdata notamment et upload de fichier).

Un seeder est également disponible et crée quelques valeurs au démarrage de l'application.

## Le front

Le front est composé de trois fenêtre : 
- L'accueil : donne quelques infos
- Les listes : comporte les deux vues et des moyens de chercher, filtrer et trier
- Les statistiques : donnent quelques infos sur les quantités de jeux en fonction du status

### Quelques fonctionnalités
- [x] On peut ajouter un nouveau jeu
- [x] On peut éditer un jeu existant 
- [x] On peut supprimer un jeu
- [x] Les geux sont visionnables sous formes de liste ou de cartes
- [x] On peut voir le détail d'un jeu 
- [x] On utilise MongoDB comme base de données
- [x] Les principes REST ont été mis en pratique côté front et back
- [x] Application responsive et dockerisé
