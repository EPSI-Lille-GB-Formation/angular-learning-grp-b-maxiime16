# Projet Bibli-Tech

## a rappel commandes:
- ng serve bibliotech
- ng generate guard|service|component <name> bibliotech --project  --skip-tests

## Users tests:
- maxime.devillepoix@exemple.com | max123
- enzo.desousa@exemple.com | enz123

## Choses a faire:
### Les livres
- ✅ Créer, modifier, supprimer, trier et consulter (CRUD)
- 🅾️ Seul l’auteur d’un livre doit pouvoir modifier et supprimer un livre
- 🅾️ Un utilisateur administrateur doit pouvoir gérer l’ensemble des livres
- 🅾️ Seul un utilisateur authentifié peut consulter un livre
- ✅ Tout le monde doit pouvoir afficher la liste des livres
- ✅ La date de modification doit automatiquement être mise à jour

### Les pages
- 🔄 Un auteur doit pouvoir créer, modifier, supprimer et consulter une page
- ✅ Un livre est constitué d’une ou plusieurs pages
- 🅾️ Un administrateur peut gérer l’ensemble des pages d’un livre

### Les catégories
- ✅ Un auteur peut sélectionner plusieurs catégories pour son livre
- 🔄 Seul un administrateur est capable de gérer les catégories disponibles (CRUD)

### Les utilisateurs
- 🅾️ Un utilisateur doit pouvoir modifier ses informations
- 🅾️ Un administrateur doit pouvoir gérer l’ensemble des utilisateurs (CRUD)
- 🅾️ Seuls deux rôles sont possibles : user / admin

### Authentification
- 🅾️ Couple email et mot de passe
- 🅾️ Le mot de passe doit obligatoirement respecter les règles de sécurité

- ✅|🅾️|🔄