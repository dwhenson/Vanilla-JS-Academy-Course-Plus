// CHECK why does a global variable increase every time?
// CHECK what on earth is that function actually doing??

// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const text = document.querySelector('#text');
  const characterCount = document.querySelector('#character-count');
  const wordCount = document.querySelector('#word-count');
  const checkWords = document.querySelector('.checkWords');
  const results = document.querySelector('.results');

  /* ==========  Functions  ========== */
  function countWords() {
    const words = text.value //
      .split(/[\n\r\s]+/g) //
      .filter(function (word) {
        return word.length > 0;
      });
    wordCount.textContent = words.length;
  }

  function rankWordCount(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    return a[1] > b[1] ? -1 : 1;
  }

  function renderCommonWords(element, array) {
    element.innerHTML = `Your most commmon words are:
        ${array
          .map(function (word) {
            return `
          <p><strong>${word[0]}</strong> which you wrote ${word[1]} times</p>
         `;
          })
          .join('')}`;
  }

  function countCommonWords() {
    const words = text.value //
      .split(/[\n\r\s]+/g) //
      .filter(function (word) {
        return word.length > 0;
      });

    const count = {};
    words.forEach(function (word) {
      count[word] = (count[word] || 0) + 1;
    });

    const countArray = Object.entries(count);
    countArray.sort(rankWordCount);
    renderCommonWords(results, countArray);
  }

  function countCharacters() {
    characterCount.textContent = text.value.length;
  }

  function inputHandler() {
    countCharacters();
    countWords();
    clickHandler();
  }

  function clickHandler() {
    countCommonWords();
  }

  /* ==========  Inits and Event Listeners  ========== */
  text.addEventListener('input', inputHandler);
  // checkWords.addEventListener('click', clickHandler);
})();

function getTable(data) {
  let result = ['<table border=1>'];
  for (let row of data) {
    result.push('<tr>');
    for (let cell of row) {
      result.push(`<td>${cell}</td>`);
    }
    result.push('</tr>');
  }
  result.push('</table>');
  return result.join('\n');
}
