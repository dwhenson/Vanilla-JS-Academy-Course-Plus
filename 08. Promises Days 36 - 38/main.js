// GOAL build an app that gets a user’s location and displays their current weather information.

// STEPS
// 1. Use fetch to get a users location and set to a variable ---
// 2. Insert variable into second fetch and get weather
// 3. Render weather into html
// 3. Render temperature into html (convert to celsius?)
// 4. Render a nice large icon into html

// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	const app = document.querySelector("#app");
	const locationEndpoint = "https://ipapi.co/json/";
	const weatherEndpoint = "https://api.weatherbit.io/v2.0/current?";
	const weatherAPI = "c81e60446f394ac3b6efb4b5c187cafa";

	/* ==========  Functions  ========== */

	function renderHTML(weather) {
		app.innerHTML = `
			<img src="icons/${weather.weather.icon}.png" alt="${weather.weather.description}" />
			<h2>The weather in ${weather.city_name} is ${weather.weather.description.toLowerCase()} right now and it's
			${weather.temp} &degC</h2>`;
	}

	async function getWeather() {
		const locationResponse = await fetch(locationEndpoint);
		const locationData = await locationResponse.json();
		const weatherResponse = await fetch(`${weatherEndpoint}city=${locationData.city}&key=${weatherAPI}`);
		const weatherData = await weatherResponse.json();
		renderHTML(weatherData.data[0]);
		console.log(weatherData.data[0]);
	}

	/* ==========  Inits and Event Listeners  ========== */

	getWeather();
})();
