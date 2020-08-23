// Avoid global scope
(function () {
	/**
	 * Gets weather based on user location and renders to index.html
	 * @param  {object} options Options included by caller to overwrite defaults
	 * @return {string}         HTML elements and text contents
	 */
	function getWeatherRender(options) {
		/* ==========  Variables  ========== */

		// default options
		const defaults = {
			api: null,
			element: "#app",
			message: "It is currently {{temp}} degrees {{units}} with {{conditions}} in {{city}}",
			units: "celsius",
			icon: "yes",
			error: "Sorry, we can't get the weather for you right now",
		};

		// combines options object into defaults object and overwrites as needed
		const settings = Object.assign(defaults, options);

		// API call information
		const locationEndpoint = "https://ipapi.co/json/";
		const weatherEndpoint = "https://api.weatherbit.io/v2.0/current?";
		// select element to insert final HTML into
		const app = document.querySelector(settings.element);

		/* ==========  Functions  ========== */

		/* ----  Render html and associated helper functions  ---- */

		/**
		 * Sanitize and encode all HTML in a user-submitted string
		 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
		 * @param  {String} string  The user-submitted string
		 * @return {String} string  The sanitized string
		 */
		function sanitizeHTML(string) {
			const temp = document.createElement("div");
			temp.textContent = string;
			return temp.innerHTML;
		}

		/**
		 * Checks what temp units are passed and displays correct symbol
		 * @return {string} C or F
		 */
		function checkUnits() {
			return settings.units === "celsius" ? "Celsius" : "Fahrenheit";
		}

		/**
		 * Checks if user wants an icon and renders accordingly
		 * @param  {array} weather The weather array retried from API call
		 * @return {string}        An img tag with or without icon src completed
		 */
		function includeIcon(weather) {
			return settings.icon === "yes" ? `<img src="icons/${sanitizeHTML(weather.weather.icon)}.png" alt=""/>` : `<img>`;
		}

		/**
		 * Overwrites the message according to user inputs provided
		 * @param  {object} weather  The formated response from the weather API call
		 * @param  {object} location The formated response from the location call
		 */
		function updateMesssage(weather, location) {
			return settings.message
				.replace("{{temp}}", sanitizeHTML(weather.temp))
				.replace("{{units}}", checkUnits())
				.replace(
					"{{conditions}}", //
					sanitizeHTML(weather.weather.description).toLowerCase()
				)
				.replace("{{city}}", location.city);
		}

		/**
		 * Render the contents to HTML
		 * @param  {string} element The element content is being inserted into
		 * @param  {object} location The formated response from the location call
		 * @param  {object} weather The formated response from the weather API call
		 */
		function render(element, location, weather) {
			element.innerHTML = `
      <h2>${updateMesssage(weather, location)}</h2>
      <div id="flex">
        ${includeIcon(weather)}
     </div>`;
		}

		/* ----  API call and associated helper functions  ---- */

		/**
		 * Converts response from an API to a JSON object
		 * @param  {string} response  Unprocessed response from request
		 * @return {object}           Response converted to JSON or rejected promise
		 */
		function convertJSON(response) {
			return response.ok ? response.json() : Promise.reject(response);
		}

		/**
		 * Catch and present error if fetch request is not 'OK'
		 */
		function catchError(error) {
			app.innerHTML = settings.error;
			console.warn(error);
		}

		/**
		 * Fetches user location based on IP address, passes that into weather API and gets the current weather
		 */
		function updateWeather() {
			let location;
			fetch(locationEndpoint)
				.then(convertJSON)
				.then((data) => {
					location = data;
					return fetch(`${weatherEndpoint}city=${location.city}&${settings.units}&key=${settings.api}`);
				})
				.then(convertJSON)
				.then((data) => {
					render(app, location, data.data[0]);
				})
				.catch(catchError);
		}

		/**
		 * Checks if API is present and calls updateWeather
		 * @param  {string} api The API key
		 */
		function checkAPI(api) {
			if (!api) {
				alert("Please add an API key");
			} else updateWeather();
		}

		checkAPI(settings.api);
	}

	/* ----  End getWeatherRender function  ---- */

	/* ==========  Execution  ========== */

	getWeatherRender({
		api: "c81e60446f394ac3b6efb4b5c187cafa",
		// message: '{{temp}} {{conditions}} {{city}}',
		// units: fahrenheit,
		// units: celsius
		// icon: 'yes'
		// icon: 'no'
	});

	// close avoid global scope
})();
