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
  const shuffle = function (array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  function renderMonsters(array, element) {
    const suffledArray = shuffle(array.slice());
    element.innerHTML = `<div class="row">
    ${suffledArray
      .map(function (monster) {
        return `
      <div class="grid">
        <img src="images/${monster}.svg" alt="${monster}" width="" height="">
      </div>`;
      })
      .join('')}
      </div>`;
  }

  /* ==========  Inits and Event Listeners  ========== */

  renderMonsters(monsters, app);
})();
