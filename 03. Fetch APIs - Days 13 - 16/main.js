// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const button = document.querySelector('button');
  const results = document.querySelector('.outputs');
  const search = document.querySelector('#search');

  /* ==========  Functions  ========== */
  function displayGifs(data) {
    results.innerHTML = data
      .map((source) => `<img src="${source.images.downsized.url}" alt="">`)
      .join('');
    search.value = '';
    search.focus();
  }

  function renderError() {
    results.textContent = 'Sorry we messed up';
  }

  function fetchGifs() {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=uEcLu0Uc8xF59YqRLBcDvIOmVwl019nS&q=${search.value}&limit=25&offset=0&rating=g&lang=en`;
    console.log(endpoint);
    fetch(endpoint)
      .then(function (response) {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then(function (data) {
        displayGifs(data.data);
      })
      .catch(function (err) {
        renderError();
        console.warn(err);
      });
  }

  /* ==========  Inits and Event Listeners  ========== */

  // search.addEventListener('input', generateSearch);
  button.addEventListener('click', fetchGifs);
})();
