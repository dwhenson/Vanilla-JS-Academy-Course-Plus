// avoid global scope
(function(){
/* ==========  Variables  ========== */
const app = document.querySelector('#app');
let endpoint;
const apiKey = `MzjNjEmTGPTcAbKdbZonokosBAmd42Xd`;
const dropdown = document.querySelector('#topics');
const placeholder = document.querySelector('#placeholder');
const heading = document.querySelector('#heading');
let topic;

/* ==========  Functions  ========== */

/**
 * creates a placeholder text while the articles are being fetched
 * @return {string} text rendered to the HTML
 */
function generatePlaceholder () {
  placeholder.innerHTML = `<p><em>Hang on we're fetching your reading...</em></p>`
}

/**
 * renders the fetched array into HTML
 * @param  {array} articles The array fetched with fetchStories
 * @return {strong}         The HTML to render
 */
function renderStories (articles) {
  heading.innerHTML = `<h2>Here's the top five stories on ${topic.replace(/-/g, ' ')}</h2>`
  app.innerHTML = articles
  .slice(0, 4)
  .map (function (article){
    return `<h2><a href="${article.url}">${article.title}</a></h2>
        <p>${article.abstract}</p>
        ${article.multimedia[0]
        ? `<figure><img
          src="${article.multimedia[0].url}"
          alt=""
          height=""
          width="${420}">
          <figcaption>${article.multimedia[0].caption}</figcaption>
        </figure>`
        : ''}`}).join('');
  }

/**
 * creates a completed endpoint based on the topic selected
 * @return {string} the endpoint for the fetch method
 */
  function createEndpoint() {
    endpoint = `https://api.nytimes.com/svc/topstories/v2/${topic.replace(/-/g, '')}.json?api-key=`;
    return endpoint;
  }

  function renderError() {
    app.innerHTML = `
      <p>Sorry we messed up</p><p>You can <a href="https://www.nytimes.com">read the NYT</a> instead though</p>`
  }

/**
 * fetches the data from the NYT, checks and passes to renderStories
 * @return {array} The array fetched from the NYT
 */
function fetchStories () {
  fetch(endpoint + apiKey)
    .then(function (response) {
      return response.ok ? response.json() : Promise.reject(response);
      })
      .then(function (data) {
        renderStories(data.results);
      })
      .catch(function (err) {
        console.warn(err)
        renderError();
      });
}

/* ==========  Inits and Event Listeners  ========== */
dropdown.addEventListener('change', (event) => {
  topic = event.target.value;
  generatePlaceholder();
  createEndpoint(event);
  fetchStories()
});

})()