// GOAL Allow users to save locations between visits

// STEPS
// 1) Save checkbox checked to localStorage
// 2) Add a check so that item is not added if it exists in localStorage already
// 3) Remove duplicates from array before looping
// 4) Bonus points: expire localStorage after a set period?

// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	// fixed parameters
	const weatherApiKey = "c81e60446f394ac3b6efb4b5c187cafa";
	const weatherEndpoint = "https://api.weatherbit.io/v2.0/current?";
	const app = document.querySelector("#app");
	const savedLocations = "savedLocations";
	const defaults = {
		message: "It is currently {{temp}} &degC with {{conditions}} in {{city}} right now.",
		icon: true,
		error: "Sorry, we can't get the weather for you right now",
		locations: [],
	};

	/* ==========  Functions  ========== */
	/**
	 * Handle any errors during the fetches
	 * @param   {Object}  error  The type of error
	 * @return  {String}         The error message to render
	 */
	function handleError(error) {
		app.innerHTML = `<h2>We're sorry. Something went wrong fetching your weather information.</h2>`;
		console.error(error);
	}

	function loadData() {
		const checkboxes = [...document.querySelectorAll("input")];
		let existing = localStorage.getItem(savedLocations);
		existing = existing ? existing.split(",") : "";
		checkboxes.forEach((element) => {
			if (existing.includes(element.id)) {
				element.checked = true;
			}
		});
	}

	function removeData(location) {
		let existing = localStorage.getItem(savedLocations);
		existing = existing ? existing.split(",") : [];
		const index = existing.indexOf(location.id);
		if (index > -1) {
			existing.splice(index, 1);
		}
		localStorage.setItem(savedLocations, existing.toString());
	}

	function saveData(location) {
		let existing = localStorage.getItem(savedLocations);
		existing = existing ? existing.split(",") : [];
		existing.push(location.id);
		localStorage.setItem(savedLocations, existing.toString());
	}

	function saveLocation(event) {
		if (!event.target.type === "checkbox") return;
		event.target.checked ? saveData(event.target) : removeData(event.target);
	}

	/**
	 * Updates the message rendered in HTML by Weather plugin function
	 * @param   {Object}  settings     The options passed in by the user when called
	 * @param   {Object}  weatherData  The data returned from the API call
	 * @return  {String}               The update message to render (with updated parameters)
	 */
	function updateMessage(settings, weatherData) {
		return settings.message
			.replace("{{temp}}", weatherData.temp)
			.replace("{{conditions}}", weatherData.weather.description.toLowerCase())
			.replace("{{city}}", weatherData.city_name);
	}

	/**
	 * Enables the icon to be shown or not
	 * @param   {Object}  settings     The options passed in by the user when called
	 * @param   {Object}  weatherData  The data returned from the API call
	 * @return  {String}               The update message to render (with updated parameters)
	 */
	function includeIcon(settings, weatherData) {
		return settings.icon ? `<img src="icons/${weatherData.weather.icon}.png" alt=""/>` : ``;
	}

	/**
	 * Render required information from an object to HTML
	 * @param   {Object}  weather  The weatherData object returned by getWeather
	 * @return  {String}           The HTML to render
	 */
	function renderHTML(options, weatherData) {
		const settings = Object.assign(defaults, options);

		if (app.previousElementSibling.className === "intro") {
			app.previousElementSibling.remove();
		}

		app.innerHTML += `
			<div>${includeIcon(settings, weatherData)}</div>
			<h2>${updateMessage(settings, weatherData)}</h2>
				<label>
					<input type="checkbox" name="checkbox" id="${weatherData.city_name}"/>
					Save ${weatherData.city_name} for next time
				</label>`;
	}

	/**
	 * Get fetch a users location and call the weatherbit API based on first values fetched
	 * @return  {Object}  The object returned by the weatherbit ajax call
	 */
	function getWeather(options) {
		options.locations.forEach((city) => {
			fetch(`${weatherEndpoint}city=${city}&key=${weatherApiKey}`)
				.then(function (response) {
					return response.ok ? response.json() : Promise.reject(response);
				})
				.then(function (weatherData) {
					renderHTML(options, weatherData.data[0]);
				})
				.then(function () {
					loadData();
				})
				.catch(function () {
					handleError();
				});
			loadData();
		});
	}

	const newCities = ["London"];
	const savedCities = localStorage.getItem(savedLocations);
	const cites = savedCities ? [...newCities, ...savedCities.split(",")] : newCities;

	getWeather({ locations: cites });
	document.addEventListener("change", saveLocation);
	// Close void global scope
})();
