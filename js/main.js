/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     4.0
 * @since       2016-09-23
 */

const ulInvites = document.querySelector('#invites');
const chkMasquer = document.querySelector('[name="masquer"]');
const btEnregistrer = document.querySelector('button.save');
console.log(btEnregistrer);

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
        chkInvite.setAttribute('checked','checked');
        liInvite.classList.add('responded');
    } else {
        chkInvite.removeAttribute('checked');
        liInvite.classList.remove('responded');
    }
});

/** Afficher uniquement les invités qui ont confirmés */
chkMasquer.addEventListener('change', () => {
    const tabInvites = ulInvites.querySelectorAll('li');

    for(let invite of tabInvites) {
        // Si afficher que confirmés et le li n'a PAS la classe .responded
        if(chkMasquer.checked && !invite.classList.contains('responded')) {
            // Cache l'élément
            invite.style.display = 'none';
        } else {
            invite.style.display = 'block';
        }
    }
})

/** Sauvegarder dans LS */
btEnregistrer.addEventListener('click', () =>{
    localStorage.setItem('invites', ulInvites.innerHTML);
});


ulInvites.innerHTML = localStorage.getItem('invites');