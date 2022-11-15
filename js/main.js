/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     4.0
 * @since       2016-09-23
 *
 */
'use strict';

const ulInvites = document.querySelector('#invites');
const chkMasquer = document.querySelector('[name="masquer"]');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
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
    ulInvites.appendChild(liInvite);

    //Vide le champs de saisie du nom
    champInvite.value = '';

    // Sauvegarde les invités dans le local storage
    localStorage.setItem('invites', ulInvites.innerHTML);
});

ulInvites.addEventListener('click', (e) => {
    // Si pas un bouton => STOP
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    const li = e.target.parentNode;
    const nomInvite = li.querySelector('span').innerText;

    if (confirm(`Supprimer ${nomInvite} ?`)) {
        li.remove();
    }
});
// Ajouter la class .responded au LI si confirmé
ulInvites.addEventListener('change', (e) => {
    const chkConfirmer = e.target;
    // const liInvite = chkConfirmer.parentNode.parentNode;
    const liInvite = chkConfirmer.closest('LI');

    // Si case cochée
    if(chkConfirmer.checked) {
        // Ajoute la classe responded
        liInvite.classList.add('responded');
    } else {
        // Supprime la classe responded
        liInvite.classList.remove('responded');
    }
});

// Cache les invités qui n'ont pas confirmés
chkMasquer.addEventListener('change', (e) => {
    console.log(e.target);
    // Récupérer tous les <li>
    const tabInvites = ulInvites.children;
    // Parcours tous les invites
    for(let invite of tabInvites) {
        // Si case masquer cochée et invité PAS confirmé
        if( chkMasquer.checked && invite.classList.contains('responded') === false ) {
            invite.style.display = 'none';
        } else {
            invite.style.display = 'block';
        }
    }
});


// Si invités dans le LS, on les charges
if (localStorage.getItem('invites')) {
    ulInvites.innerHTML = localStorage.getItem('invites');
}
