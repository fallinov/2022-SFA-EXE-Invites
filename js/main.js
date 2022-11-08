/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     4.0
 * @since       2016-09-23
 *
 */
'use strict';

// Tableau stockant les invités
let tabInvites = [
    { nom: 'Roger', confirme: false },
    { nom: 'Novak', confirme: false },
    { nom: 'Rafa', confirme: true }
];
// <ul> où sont affichés les invités
const ulInvites = document.getElementById('invites');
// Case à cocher masquer invités pas confirmés
const cAcMasquer = document.querySelector('[name="masquer"]');

/**
 * Retourne la position de l'invité dans le tableau
 * @param nomInvite Nom de l'invité rechercher
 * @returns {number} index ou -1 si introuvable
 */
function getIndexInvite (nomInvite) {
    return tabInvites.findIndex(invite => invite.nom.toLowerCase() === nomInvite.toLowerCase());
}

/**
 * Fonction qui génère, affiche la lite des invités
 */
function afficheInvites() {
    // Vide la <ul>
    ulInvites.innerHTML = '';
    // Trie le tableau par nom A-Z
    tabInvites.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
    // Crée un <li> pour chaque invité
    for( let invite of tabInvites) {
        // Si on veut afficher que les
        if(cAcMasquer.checked && !invite.confirme) {
            continue;
        }
        // Création du nouvel invité <li>
        let liInvite = document.createElement('li');
        // Si l'invité à confirmé on ajoute la class 'responded'
        if (invite.confirme) {
            liInvite.classList.add('responded');
        }
        // contenu du <li>
        liInvite.innerHTML = `<span>${invite.nom}</span>
                              <label>
                                <input type="checkbox" ${invite.confirme ? 'checked' : ''}>
                                confirmé
                              </label>
                              <button>Supprimer</button>`;

        //Ajoute l'invite à la liste
        ulInvites.appendChild(liInvite);
    }
}

// Ajout d'un invité
document.querySelector('form').addEventListener('submit', (e) => {
    //Désactive l'envoi du formulaire
    e.preventDefault();
    //Récupère le nom de l'invité et supprime les espaces en début et fin de chaine.
    let champInvite = document.querySelector('input[name="name"]');
    let nomInvite = champInvite.value.trim();
    //Si nom vide
    if (!nomInvite) {
        alert('Entrez un nom pour l\'invité !');
        return;
    }
    // Ajoute l'invité dans le tableau des invités
    tabInvites.push({
        nom: nomInvite,
        confirme: false
    });
    // Ré-affiche, mets à jour la liste des invités
    afficheInvites();

    //Vide le champ de saisie du nom
    champInvite.value = '';
});

// Confirmation invité : Changement de l'état de la liste des invités ou de l'un de ses descendants
ulInvites.addEventListener('change', (e) => {
    //console.log('confirmerInvite : ', e.target.parentNode.parentNode);
    let checkBox = e.target; //Checkbox cliquée
    let liInvite = checkBox.parentNode.parentNode; //<li> qui contient la checkbox
    let nomInvite = liInvite.querySelector('span').textContent;
    // Recherche la position, index, de l'invité dans le tableau
    let index = getIndexInvite(nomInvite);
    // Inverse l'état de l'invité
    tabInvites[index].confirme = !tabInvites[index].confirme;
    // Ré-affiche la liste
    afficheInvites();
});

// Supprimer invité : Clic de la liste des invités ou de l'un de ses descendants
ulInvites.addEventListener('click', (e) => {
    //Si l'élément cliqué n'est pas le bouton 'Supprimer'
    if(e.target.nodeName !== 'BUTTON' || e.target.innerHTML !== 'Supprimer') {
        return;
    }

    // Récupère le <li> correspondant
    let liInvite = e.target.parentNode;
    // Récupère le nom de l'invité
    let nomInvite = liInvite.querySelector('span').textContent;
    //Demande une confirmation de la suppression de l'invité
    if (confirm(`Retirer ${nomInvite} de la liste des invités ?`)) {
        // Trouve la position, index, de l'invité dans le tableau
        let index = getIndexInvite(nomInvite);
        // Retire l'invité du tableau
        tabInvites.splice(index,1);
        // Ré-affiche la liste
        afficheInvites();
    }
});

// Sauvegarder la liste actuelle dans le localStorage du navigateurt : Clic du bouton enregistrer
document.querySelector('form button.save').addEventListener('click', () => {
    localStorage.setItem('invites', JSON.stringify(tabInvites));
    alert('Changements sauvegardés !');
});

// Changement de l'état de la case à cocher 'Masquer les invités qui n'ont pas confirmé'
cAcMasquer.addEventListener('change', () => afficheInvites());

// LocalStorage, si une sauvegarde existe, on la charge
if (localStorage.getItem('invites')) {
    tabInvites = JSON.parse(localStorage.getItem('invites'));
}

// Affiche pour la première fois la liste des invités
afficheInvites();