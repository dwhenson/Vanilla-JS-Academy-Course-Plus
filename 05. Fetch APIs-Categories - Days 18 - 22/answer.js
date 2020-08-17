/* ==========  variables  ========== */

const dropdown = document.querySelector('#topics');
const app = document.querySelector('#app');
const heading = document.querySelector('#heading');
const placeholder = document.querySelector('#placeholder');
const apiKey = `MzjNjEmTGPTcAbKdbZonokosBAmd42Xd`;
const placeholderText = `One moment please...loading your articles`;
const numberArticles = 5;
let endpoint;

/* ==========  functions  ========== */

/**
 * Adds placeholder text while fetch is working
 * @return {string} text displayed in target element
 */
function generatePlaceholder(text) {
	placeholder.textContent = text;
}

/**
 * Creates APIendpoint based on option selected
 * @param  {string} category 	Value from event target selected
 * @return {string}						Completed API endpoint
 */
function createEndpoint(topic) {
	endpoint = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=`;
	return endpoint;
}

/**
 * Creates header based on selected category
 * @param  {string} category Value from event target selected
 * @return {string}          HTML inserted into target element
 */
function generateHeading(topic) {
	return new Promise(function (resolve) {
		resolve(
			(heading.innerHTML = `Top ${numberArticles} Articles About ${topic}`)
		);
	});
}

/**
 * Converts response from an API to a JSON object
 * @param  {string} response 	Unprocessed response from request
 * @return {object} 					Response converted to JSON or rejected promise
 */
function convertJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

/**
 * Renders articles into DOM
 * @param  {string}	element		The element into articles will be inserted
 * @param  {array} 	articles 	The articles to render
 * @return {string} 					Articles 'mapped' out from array into HTML format
 */
function render(element, articles) {
	element.innerHTML = articles.results
		.slice(0, numberArticles)
		.map(function (article) {
			return `
			<article>
			<h3><a href="${article.url}">${article.title}</a></h3>
			<i>Published on ${article.published_date.slice(0, 10)}</i>
			<p>${article.abstract}
			<br><b>${article.byline}</b></p>
			</article>`;
		})
		.join('');
}

/**
 * Catch and present error if fetch request is not 'OK'
 */
function catchError(error) {
	app.innerHTML = `
		<p>I'm sorry we can't retrieve any suggestions at the moment.<br>
		<a href="https://www.nytimes.com">The New York Times</a> has some good ideas though</p>`;
}

/**
 * Run a fetch request, convert to JSON, and display on page
 * @param {string} Address of API being 'fetched'
 */
function fetchStories(APIendpoint) {
	fetch(APIendpoint + apiKey)
		.then(convertJSON) //
		.then((data) => {
			render(app, data);
		})
		.catch(catchError);
}

/* ==========  execution  ========== */

dropdown.addEventListener('change', (event) => {
	const topic = event.target.value;
	generatePlaceholder(placeholderText);
	createEndpoint(topic);
	Promise.all([fetchStories(endpoint), generateHeading(topic)]);
});
