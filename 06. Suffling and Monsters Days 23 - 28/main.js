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
		'monster8',
		'monster9',
		'monster10',
		'monster11',
		'sock',
	];
	let count = 0;

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
		const shuffledArray = shuffle(array);
		element.innerHTML = `<div class="row">
      ${shuffledArray
				.map(function (monster, index) {
					return ` <div class="grid" aria-live="polite">
            <button data-monster-id=${index}>
              <img src="images/door.svg" alt="click the door" />
            </button>
          </div>`;
				})
				.join('')}
    </div>`;
	}

	/**
	 * Re-renders the initial html
	 * @param   {Event}  event  The event object
	 */
	function playAgain(event) {
		const play = event.target;
		if (!play.classList.contains('play-again')) return;
		renderMonsters(monsters, app);
		count = 0;
	}

	/**
	 * Renders the html when the sock is found
	 * @return  {string}  The html to render
	 */
	function lost() {
		app.innerHTML = `
      <h2>Sorry! You lost!</h2>
      <div>
        <iframe
          src="https://giphy.com/embed/13zUNhE9WZspMc"
          width="480"
          height="254"
          frameborder="0"
          class="giphy-embed"
          allowfullscreen
        ></iframe>
      </div>
      <button class="play-again">Play Again?</button>
    `;
	}

	/**
	 * Renders the html when the game is won
	 * @return  {String}  The html to render
	 */
	function won() {
		app.innerHTML = `
      <h2>Congratulations!</h2>
      <div>
        <iframe
          src="https://giphy.com/embed/A5GnAm1d9IhwI"
          width="480"
          height="480"
          frameborder="0"
          class="giphy-embed"
          allowfullscreen
        ></iframe>
      </div>
      <button class="play-again">Play Again?</button>
    `;
	}

	/**
	 * Handles click events
	 * @param   {Event}  event  The event object
	 */
	function clickHandler(event) {
		const monster = event.target.closest('[data-monster-id]');
		if (!monster) return;

		const id = monster.getAttribute('data-monster-id');
		if (monsters[id] === 'sock') {
			lost();
			return;
		}

		monster.parentElement.innerHTML = `
    <img src="images/${monsters[id]}.svg" alt="monster number ${id}">`;
		count += 1;
		if (count === monsters.length - 1) {
			won();
		}
	}
	/* ==========  Inits and Event Listeners  ========== */
	renderMonsters(monsters, app);
	app.addEventListener('click', clickHandler);
	app.addEventListener('click', playAgain);
})();
