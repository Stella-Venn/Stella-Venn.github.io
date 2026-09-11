/* =============================================================================
   birb.js — Secret Pet Bird Easter Egg
   Personal Website of Stella Venn

   PURPOSE: The dove icon button in the sidebar footer opens a riddle.
   Answer it correctly and a little pet bird (github.com/IdreesInc/Pocket-Bird,
   MPL-2.0) starts roaming the page permanently.

   HOW IT WORKS:
   - Click the sidebar bird button (data-bird-trigger) to open the riddle modal.
   - Correct answer -> unlock is saved in localStorage and the bird script loads.
   - On every future page load, an unlocked visitor gets the bird automatically.

   TO CHANGE THE RIDDLE OR ANSWER: edit RIDDLE_TEXT and ANSWERS below.
============================================================================= */

(function () {

  function printConsoleEgg() {
    console.log(String.raw`
   __
o-''|\_____/)
 \_/|_)          )
    \     __    /
     (_/    (_/
`);
    console.log('%cYou found the bird.', 'font-weight:bold;font-size:14px;color:#466d44;');
    console.log('%cThere\'s a real one hiding in the sidebar — solve the riddle.', 'color:#3d4449;');
  }
  printConsoleEgg();

  const STORAGE_KEY = 'pocketBirdUnlocked';
  const BIRD_SCRIPT_URL = 'https://cdn.jsdelivr.net/gh/IdreesInc/Pocket-Bird@main/dist/web/birb.embed.js';

  const RIDDLE_TEXT = `I observed variations in barnacles, pigeons, and finches alike,
    tracing how traits pass down the family line. I noted how humans breed dogs
    for the traits they like, and realized nature selects by a similar design.
    Who am I?`;
  const ANSWERS = ['darwin', 'charles darwin'];

  function isUnlocked() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function unlock() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      /* localStorage unavailable — bird just won't persist across visits */
    }
  }

  function lock() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage unavailable */
    }
  }

  function loadBird() {
    if (document.querySelector('script[data-pocket-bird]')) return;
    const script = document.createElement('script');
    script.src = BIRD_SCRIPT_URL;
    script.setAttribute('data-pocket-bird', 'true');
    document.body.appendChild(script);
  }

  function renderToggle() {
    if (document.querySelector('[data-bird-toggle]')) return;

    const trigger = document.querySelector('[data-bird-trigger]');
    if (!trigger) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'button icon solid fa-times';
    toggle.setAttribute('data-bird-toggle', 'true');
    toggle.textContent = 'Turn off bird';

    toggle.addEventListener('click', () => {
      lock();
      location.reload();
    });

    trigger.parentNode.insertBefore(toggle, trigger.nextSibling);
  }

  function closeModal(modal) {
    modal.remove();
    document.removeEventListener('keydown', onKeydown);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.birb-modal');
      if (modal) closeModal(modal);
    }
  }

  function openRiddle() {
    if (document.querySelector('.birb-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'birb-modal';
    modal.innerHTML = `
      <div class="birb-modal__backdrop" data-birb-close></div>
      <div class="birb-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="birb-modal-title">
        <button type="button" class="birb-modal__close" data-birb-close aria-label="Close">&times;</button>
        <h2 id="birb-modal-title" class="birb-modal__title">A Riddle</h2>
        <p class="birb-modal__riddle">${RIDDLE_TEXT}</p>
        <form class="birb-modal__form" data-birb-form>
          <input type="text" class="birb-modal__input" data-birb-input
                 placeholder="Your answer" autocomplete="off" autofocus>
          <button type="submit" class="button">Answer</button>
        </form>
        <p class="birb-modal__feedback" data-birb-feedback aria-live="polite"></p>
      </div>`;

    document.body.appendChild(modal);
    document.addEventListener('keydown', onKeydown);

    modal.querySelectorAll('[data-birb-close]').forEach(el => {
      el.addEventListener('click', () => closeModal(modal));
    });

    const form = modal.querySelector('[data-birb-form]');
    const input = modal.querySelector('[data-birb-input]');
    const feedback = modal.querySelector('[data-birb-feedback]');
    const riddle = modal.querySelector('.birb-modal__riddle');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const guess = input.value.trim().toLowerCase();

      if (ANSWERS.includes(guess)) {
        unlock();
        loadBird();
        renderToggle();
        riddle.textContent = 'Correct! Say hello to your new friend!';
        form.hidden = true;
        feedback.textContent = '';
        setTimeout(() => closeModal(modal), 1800);
      } else {
        feedback.textContent = 'Not quite — try again.';
        input.select();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (isUnlocked()) {
      loadBird();
      renderToggle();
    }

    // Sidebar is injected dynamically by site-nav.js, so delegate the click
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-bird-trigger]')) {
        openRiddle();
      }
    });
  });

})();
