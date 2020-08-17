// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const button = document.querySelector('button');
  const results = document.querySelector('.outputs');
  const searchTerm = document.querySelector('.searchTerm');
  const search = document.querySelector('#search');

  /* ==========  Functions  ========== */

  /**
   * render the fetched data to the HTML
   * @param  {array} data the array of GIFs fetch from the endpoint
   * @return {string}      the HTML to render
   */
  function displayGifs(data) {
    searchTerm.innerHTML = `<h2>Results for <em>${search.value}</em>`;
    results.innerHTML = data
      .map(
        (source) => `
        <a href="${source.url}">
        <img src="${source.images.downsized.url}" alt="${source.title}">
        </a>`
      )
      .join('');
    search.value = '';
    search.focus();
  }

  /**
   * render error to the HTML
   */
  function renderError() {
    searchTerm.innerHTML = `<h2>You searched for <em>${search.value}</em>. But we messed up. Sorry.</h2>
      <div style="width:100%;height:0;padding-bottom:82%;position:relative;"><iframe src="https://giphy.com/embed/RFDXes97gboYg" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/angeles-bachcaps-bearfighting-RFDXes97gboYg">via GIPHY</a></p>`;
  }

  /**
   * fetch the data from the endpoint, based on search parameters
   */
  function fetchGifs() {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=uEcLu0Uc8xF59YqRLBcDvIOmVwl019nS&q=${search.value}&limit=25&offset=0&rating=g&lang=en`;
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

  search.focus();
  button.addEventListener('click', fetchGifs);
})();
