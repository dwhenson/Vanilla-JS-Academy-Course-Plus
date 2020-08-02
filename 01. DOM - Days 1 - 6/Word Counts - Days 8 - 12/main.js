// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  // <textarea> where the inputs are typed
  const text = document.querySelector('#text');
  // <span> to insert the character count
  const characterCount = document.querySelector('#character-count');
  // <span> to insert the word count
  const wordCount = document.querySelector('#word-count');
  // <section> to insert word frequency
  const results = document.querySelector('.results');
  // the variable that the array of complete words is assigned to
  let words; //

  /* ==========  Functions  ========== */
  /**
   * render values from array to HTML
   * @param  {object} element the element to insert values
   * @param  {array} array   the array of values to insert
   * @return {string}         the HTML to render
   */
  function renderCommonWords(element, array) {
    element.innerHTML = `The most commmon words you write are:
        ${array
          .map(function (word) {
            return `
          <p><strong>${word[0]}</strong>: ${word[1]} times</p>
         `;
          })
          .join('')}`;
  }

  /**
   * order nested arrays based on second value
   * @param  {string} a the last word typed
   * @param  {string} b the other words in the array
   * @return {array}   the reordered array
   */
  function rankWordCount(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    return a[1] > b[1] ? -1 : 1;
  }

  /**
   * count the number of times each word is written
   */
  function countCommonWords() {
    const count = {};
    words.forEach(function (word) {
      // add word to object and increment by one each time it is written
      count[word.toLowerCase()] = (count[word.toLowerCase()] || 0) + 1;
      console.log(count);
    });

    // convert object to array to enable sorting by values
    const countArray = Object.entries(count);
    // sort array by count of words (descending order)
    countArray.sort(rankWordCount);
    // render sorted array into HTML
    renderCommonWords(results, countArray);
  }

  /**
   * count the number of words in the <textarea>
   * @return {number} the number of words typed
   */
  function countWords() {
    wordCount.textContent = words.length;
  }

  /**
   * update the words variable with complete words
   * @return {array} an array of complete words (separated by spaces or returns)
   */
  function updateWords() {
    words = text.value //
      .split(/[\n\r\s]+/g) //
      .filter(function (word) {
        return word.length > 0;
      });
  }

  /**
   * the count of the number of characters typed
   * @return {number} the number of characters
   */
  function countCharacters() {
    characterCount.textContent = text.value.length;
  }

  function inputHandler() {
    countCharacters();
    updateWords();
    countWords();
    countCommonWords();
  }

  /* ==========  Inits and Event Listeners  ========== */
  text.addEventListener('input', inputHandler);
})();
