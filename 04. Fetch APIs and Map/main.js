// avoid global scope
(function(){
/* ==========  Variables  ========== */
const app = document.querySelector('#app');
const endpoint = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=';
const apiKey = 'IVkW1nLsL3ufkeo8FjJrw6oXLUo7qZ62';

/* ==========  Functions  ========== */


function renderError() {
  app.innerHTML = `
    <p>Sorry we messed up</p><p>You can <a href="https://www.nytimes.com">read the NYT</a> instead though</p>`
}

function renderStories (articles) {
  app.innerHTML = articles.map (function (story){
    return `
    <h2><a href="${story.url}">${story.title}</a></h2>
      <h3>${story.byline}</h3>
      <p>${story.abstract}</p>
      ${
      story.media[0]
      ? `<figure>
        <img
        src="${story.media[0]['media-metadata'][2].url}"
        alt=""
        height="${294}"
        width="${440}">
          <figcaption>
          ${story.media[0].caption}
          </figcaption>
      </figure>`
      : ''
      }  `}).join('');
  }


function fetchStories () {
  fetch(endpoint + apiKey)
    .then(function (response) {
      return response.ok ? response.json() : Promise.reject(response);
      })
      .then(function (data) {
        renderStories(data.results);;
      })
      .catch(function () {
        renderError();
      });
}

/* ==========  Inits and Event Listeners  ========== */
 fetchStories();

})()