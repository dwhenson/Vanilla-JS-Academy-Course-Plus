// GOAL modify our weather app script to convert it into a plugin.
// Pass in their own selector to render the weather into.
// Decide whether to show temperatures in Fahrenheit of Celsius.
// Change what message is shown (ex. It's currently {temperature} and {conditions} in {location}).
// Enable or disable the icon for the weather conditions.
// STEPS:
// 1) Remove IIFE and replace with function (options)
// 2) Create an object of default options for user choices
// 3) Use Object.assign to merge user choices into default
// 4) Add options object and key value pairs for choices to function call
// 5) Replace hard coded text with new variables from object (e.g. message text, degrees etc)

// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	// fixed parameters
	const weatherApiKey = "c81e60446f394ac3b6efb4b5c187cafa";
	const locationEndpoint = "https://ipapi.co/json/";
	const weatherEndpoint = "https://api.weatherbit.io/v2.0/current?";
	const app = document.querySelector("#app");

	/* ==========  Functions  ========== */

	/**
	 * Handle any errors during the fetches
	 * @param   {Object}  error  The type of error
	 * @return  {String}         The error message to render
	 */
	function handleError(error) {
		console.log(error);
		app.innerHTML = `<h2>We're sorry. Something went wrong fetching your weather information.</h2>`;
	}

	function includeIcon(settings, weatherData) {
		return settings.icon ? `<img src="icons/${weatherData.weather.icon}.png" alt=""/>` : ``;
	}

	/**
	 * Render required information from an object to HTML
	 * @param   {Object}  weather  The weatherData object returned by getWeather
	 * @return  {String}           The HTML to render
	 */
	function renderHTML(settings, weatherData) {
		app.innerHTML = `
			 <div>${includeIcon(settings, weatherData)}</div>`;
	}

	function weatherPlugin(options, weatherData) {
		// default options
		const defaults = {
			message: "It is currently {{temp}} degrees {{units}} with {{conditions}} in {{city}}",
			units: "celsius",
			icon: true,
			error: "Sorry, we can't get the weather for you right now",
		};
		const settings = Object.assign(defaults, options);
		renderHTML(settings, weatherData);
	}

	/**
	 * Get fetch a users location and call the weatherbit API based on first values fetched
	 * @return  {Object}  The object returned by the weatherbit API fetch
	 */
	async function getWeather(options) {
		const locationResponse = await fetch(locationEndpoint);
		const locationData = await locationResponse.json();
		const weatherResponse = await fetch(`${weatherEndpoint}city=${locationData.city}&key=${weatherApiKey}`);
		const weatherData = await weatherResponse.json();
		weatherPlugin(options, weatherData.data[0]);
	}

	getWeather({ icon: true }).catch(handleError);
	// Avoid global scope
})();
