/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     4.0
 * @since       2016-09-23
 */

const ulInvites = document.querySelector('#invites');

/** Suppression d'un invité <li> */
ulInvites.addEventListener('click', (e) => {
    let cible = e.target;

    if(cible.nodeName !== 'BUTTON') {
        return;
    }

    cible.parentNode.remove();
});

/** Confirmation d'un invité */
ulInvites.addEventListener('change', (e) => {
    let chkInvite = e.target;
    let liInvite = e.target.parentNode.parentNode;
    // Si case cochée
    if (chkInvite.checked) {
        liInvite.classList.add('responded');
    } else {
        liInvite.classList.remove('responded');
    }
});