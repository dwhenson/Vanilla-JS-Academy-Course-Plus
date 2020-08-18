// TODO
// If the user finds the sock before they’ve found all of the monsters, display a message letting them know they lost.
// If they find all of the monsters, display a message letting them know they’ve won. Either way, show a button that they can click to play again.

// STEPS
// Create variable to count the number of times the clickHandler has been run
// If count === monsters.length -1 then keep going
// If count === monsters.length run a you won function
// If image === sock run a you lost function
// You lost function - show a model with a funny cartoon and button to play again
// You won function - show a model with a celebration and button to play again

// avoid global scope

(function () {
  /* ==========  Variables  ========== */
  const app = document.querySelector('#app');
  const monsters = [
    'monster1',
    'monster2',
    'monster3',
    'monster4',
    'monster5',
    'monster6',
    'monster7',
    'monster8',
    'monster9',
    'monster10',
    'monster11',
    'sock',
  ];

  /* ==========  Functions  ========== */

  /**
   * Shuffles the items in an array
   * @param   {Array}  array  The array to shuffle
   * @return  {Array}         The shuffled array
   */
  const shuffle = function (array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0)
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    return array;
  };

  /**
   * Renders the items from an array to HTML
   * @param   {Array}  array    The array of items to render
   * @param   {Object}  element  The html element to insert items
   * @return  {String}           The html
   */
  function renderMonsters(array, element) {
    const suffledArray = shuffle(array);
    element.innerHTML = html`<div class="row">
      ${suffledArray
        .map(function (monster, index) {
          return html` <div class="grid" aria-live="polite">
            <button data-monster-id=${index}>
              <img src="images/door.svg" alt="click the door" />
            </button>
          </div>`;
        })
        .join('')}
    </div>`;
  }

  /**
   * Handles click events
   * @param   {Event}  event  The event object
   */
  function clickHandler(event) {
    const monster = event.target.closest('[data-monster-id]');
    if (!monster) return;
    const id = monster.getAttribute('data-monster-id');
    monster.parentElement.innerHTML = `
		<img src="images/${monsters[id]}.svg" alt="monster number ${id}">`;
  }

  /* ==========  Inits and Event Listeners  ========== */
  renderMonsters(monsters, app);
  app.addEventListener('click', clickHandler);
})();
