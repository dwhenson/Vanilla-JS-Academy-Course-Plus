// GOAL Modify the Word Count project to show the user what words they use most frequently, and how often they’re used.
//
// create object words, word:count
// loop through words array
// for each word check if already in object, if so count++
// else add word to object set count as 1
// render object to HTML - as table?
//

// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const text = document.querySelector('#text');
  const characterCount = document.querySelector('#character-count');
  const wordCount = document.querySelector('#word-count');
  const checkWords = document.querySelector('.checkWords');

  /* ==========  Functions  ========== */
  function countWords() {
    const words = text.value //
      .split(/[\n\r\s]+/g) //
      .filter(function (word) {
        return word.length > 0;
      });
    wordCount.textContent = words.length;
  }

  function countCommonWords() {
    const words = text.value //
      .split(/[\n\r\s]+/g) //
      .filter(function (word) {
        return word.length > 0;
      });

    const commonWords = {};
    words.forEach(function (key) {
      commonWords[key.toLowerCase()] = (commonWords[key.toLowerCase()] || 0) + 1;
    });

    const commonWordsArray = Object.entries(commonWords);
    for (const [word, count] of commonWordsArray) {
      console.log(`Word: ${word} Count: ${count}`);
    }
  }

  // CHECK why does a global variable increase every time?
  // CHECK what on earth is that function actually doing??
  // TODO work out how to render into the DOM!

  function countCharacters() {
    characterCount.textContent = text.value.length;
  }

  function inputHandler() {
    countCharacters();
    countWords();
  }

  function clickHandler() {
    countCommonWords();
  }

  /* ==========  Inits and Event Listeners  ========== */
  text.addEventListener('input', inputHandler);
  checkWords.addEventListener('click', clickHandler);
})();
