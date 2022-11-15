/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     4.0
 * @since       2016-09-23
 */

const ulInvites = document.querySelector('#invites');


ulInvites.addEventListener('click', (e) => {
    let cible = e.target;

    if(cible.nodeName !== 'BUTTON') {
        return;
    }

    cible.parentNode.remove();
});