# Exercice RSVP

## Tâches

-[] Ajouter un invité
    - tester que l'utilisateur a bien saisi un nom
    - supprimer les espaces en début et fin de chaine
    - ajouter l'invité à la fin de la liste
    - vider le champ de saisie
-[] Supprimer un invité
    - Demander à l'utilisateur de confirmer la suppression
    - Afficher le nom de l'invité dans le message de confirmation
      `Retirer NOM_INVITE de la liste des invités ?`
-[] Confirmer la présence d'un invité
    - cocher la case à cocher `confirmé`
    - ajouter la classe CSS `responded` au `<li>` de l'invité.
    - faire l'inverse si on décoche la case à cocher `confirmé`
-[] Sauvegarder les modifications
    - Utiliser le **localStorage** pour sauvegarder la liste des invités
    - Documentations https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
-[] Masquer les invités qui n'ont pas confirmé 
    - Cacher les `<li>` des invités qui n'ont pas confirmé

## Tâches optionnelles
-[] Trier la liste des invités par ordre alphabétique croissant
    - Maintenir le tri lors de l'ajout d'un invité
-[] Modifier le nom d'un invité
    - Utiliser un `prompt` JavaScript pour modifier le nom de l'invité lorsqu'on double-clic sur le `<li>`


