/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     4.0
 * @since       2016-09-23
 *
 */
'use strict';

// Récupération des éléments HTML
let listeInvites = document.getElementById('invites');

/**
 * Fonction qui ajoute un invité à la liste des invités
 * @param e Event Object
 */
function ajouterInvite(e) {

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

    /** Création du nouvel invité <li> **/
    let liInvite = document.createElement('li');

    liInvite.innerHTML = `<span>${nomInvite}</span>
                          <label><input type="checkbox"> confirmé</label>
                          <button>Supprimer</button>`;

    //Ajoute l'invite à la liste
    listeInvites.appendChild(liInvite);

    //Vide le champs de saisie du nom
    champInvite.value = '';
}

/**
 * Supprime un invité de la liste
 * @param e événement JS
 */
function supprimerInvite(e) {
    //https://codepen.io/fallinov/pen/dZMbjL?editors=0011

    //Si l'élément cliqué est le bouton supprimer
    if(e.target.nodeName === 'BUTTON' && e.target.innerHTML === 'Supprimer') {

        let liInvite = e.target.closest('LI');
        let nomInvite = liInvite.querySelector('span').textContent;

        //Demande une confirmation de la suppression de l'invité
        if (confirm(`Retirer ${nomInvite} de la liste des invités ?`)) {
            liInvite.remove();
        }
    }
}

/**
 * Confirme ou annule l'inscirption d'un invité
 * @param e événement JS
 */
function confirmerInvite(e) {
    //console.log('confirmerInvite : ', e.target.parentNode.parentNode);
    let checkBox = e.target; //Checkbox cliquée
    // type="checkbox" if(e.target.nodeName === 'BUTTON' && e.target.innerHTML === 'Supprimer') {
    let liInvite = checkBox.closest('LI'); //<li> qui contient la checkbox

    //Si on coche la checkbox
    if (checkBox.checked) {
        // Pour LS
        checkBox.setAttribute('checked', ''); //On ajoute l'attribut 'checked' à la checkbox
        liInvite.classList.add('responded'); //On ajoute la classe CSS responded au <li>
    } else { //Sinon on décoche
        // // Pour LS
        checkBox.removeAttribute('checked'); //Supprime l'attribut 'checked'
        liInvite.classList.remove('responded');; //Supprimer la classe CSS responded
    }

    // Si on "décoche" l'invité et que le filtre masquer est actif
    // on cache le li immédiatement
    if (checkBox.checked === false && document.querySelector('[name="masquer"]').checked) {
        liInvite.style.display = 'none';
    }
}

/**
 * Si le filtre (checkbox) "masquer les invités" est actif, cache les invités qui n'ont pas confirmé
 * @param e événment JS
 */
function masquerInvites(e) {

    let invites = listeInvites.children;

    for(let i=0; i<invites.length; i++) {
        //Si filtre masquer est actif et invité pas confirmé > on le cache
        if (e.target.checked && invites[i].querySelector('[type="checkbox"]').checked === false) {
            invites[i].style.display = 'none';
        } else {
            invites[i].style.display = '';
        }
    }

    /* Même chose avec forEach
    invites.forEach((ele) => {
        //Si masquer actif et invité pas confirmé
        if (e.target.checked && ele.querySelector('[type="checkbox"]').checked === false) {
            ele.style.display = 'none';
        } else {
            ele.style.display = '';
        }
    });
    */
}

/**
 * Sauvegard le contenu HTML de la liste dans le localstorage
 */
function enregistrer () {
    localStorage.setItem('invites', listeInvites.innerHTML);
    alert('Changements sauvegardés !');
}

/** Gestion des événments de la page **/
//Envoi du formulaire
document.querySelector('form').addEventListener('submit', ajouterInvite);

//Confirmation invité : Changement de l'état de la liste des invités ou de l'un de ses descendants
listeInvites.addEventListener('change', confirmerInvite);

//Supprimer invité : Clic de la liste des invités ou de l'un de ses descendants
listeInvites.addEventListener('click', supprimerInvite);

//Sauvegarder la liste actuelle dans le localStorage du navigateurt : Clic du bouton enregistrer
document.querySelector('form button.save').addEventListener('click', enregistrer);

//Changement de l'état de la case à cocher 'Masquer les invités qui n'ont pas confirmé'
document.querySelector('[name="masquer"]').addEventListener('change', masquerInvites);

/* Gestion du local storage, sauvegarde locale des données de la page */
//Si une sauvegarde existe, on la charge
if (localStorage.getItem('invites')) {
    listeInvites.innerHTML = localStorage.getItem('invites');
}