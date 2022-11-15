/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     4.0
 * @since       2016-09-23
 *
 */
'use strict';

const ulInvites = document.querySelector('#invites');
console.log(ulInvites);

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