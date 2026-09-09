'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('#service').value = link.dataset.service; });
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const message = String(data.get('message')).trim();
  const status = document.querySelector('#form-status');
  status.hidden = false;
  if (!name || !message) {
    status.textContent = 'Vyplňte prosím své jméno a krátce popište, s čím potřebujete pomoct.';
    return;
  }
  const subject = 'Poptávka spolupráce — ' + data.get('service');
  const body = 'Dobrý den,\n\n' + message + '\n\nOblast: ' + data.get('service') + '\nJméno: ' + name + '\nFirma: ' + (String(data.get('company')).trim() || 'Neuvedeno') + '\nE-mail: ' + data.get('email');
  status.textContent = 'Poptávka je připravená. Dokončete odeslání ve své e-mailové aplikaci. Pokud se neotevřela, napište na info@cold-and-close.com. Zpráva se z tohoto webu sama neodesílá.';
  window.location.href = 'mailto:info@cold-and-close.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
