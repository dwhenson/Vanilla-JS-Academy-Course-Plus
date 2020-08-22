// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	const app = document.querySelector("#app");
	const locationEndpoint = "https://ipapi.co/json/";
	const weatherEndpoint = "https://api.weatherbit.io/v2.0/current?";
	const weatherAPI = "c81e60446f394ac3b6efb4b5c187cafa";

	/* ==========  Functions  ========== */

	/**
	 * Render required information from an object to HTML
	 * @param   {Object}  weather  The weatherData object returned by getWeather
	 * @return  {String}           The HTML to render
	 */
	function renderHTML(weather) {
		app.innerHTML = `
			<img src="icons/${weather.weather.icon}.png" alt="${weather.weather.description}" />
			<h2>The weather in ${weather.city_name} is ${weather.weather.description.toLowerCase()} right now
			and it's ${weather.temp} &degC</h2>`;
	}

	/**
	 * Get fetch a users location and call the weatherbit API based on first values fetched
	 * @return  {Object}  The object returned by the weatherbit API fetch
	 */
	async function getWeather() {
		const locationResponse = await fetch(locationEndpoint);
		const locationData = await locationResponse.json();
		const weatherResponse = await fetch(`${weatherEndpoint}city=${locationData.city}&key=${weatherAPI}`);
		const weatherData = await weatherResponse.json();
		renderHTML(weatherData.data[0]);
	}

	/* ==========  Inits and Event Listeners  ========== */
	getWeather();
})();
