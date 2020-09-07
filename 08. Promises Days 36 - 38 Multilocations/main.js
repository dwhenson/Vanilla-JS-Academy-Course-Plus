// Avoid global scope
// (function () {
/* ==========  Variables  ========== */
const weatherApiKey = "c81e60446f394ac3b6efb4b5c187cafa";
const weatherEndpoint = "https://api.weatherbit.io/v2.0/current?";
const app = document.querySelector("#app");
const savedLocations = "savedLocations";
const defaults = {
	message: "It is {{temp}} &degC with {{conditions}} in {{city}} right now.",
	icon: true,
	error: "Sorry, we can't get the weather for you right now",
	locations: [],
};
const cites = localStorage.getItem(savedLocations) ? localStorage.getItem(savedLocations).split(",") : [];

/* ==========  Functions  ========== */
/**
 * Handles any errors during the fetches
 * @param   {Object}  error  The type of error
 * @return  {String}         The error message to render
 */
function handleError(error) {
	app.innerHTML = `<h2>We're sorry. Something went wrong fetching your weather information.</h2>`;
	console.error(error);
}

/**
 * Loads checked boxes from localStorage
 */
function loadCheckedBoxes() {
	const checkboxes = [...document.querySelectorAll("input")];
	let existing = localStorage.getItem(savedLocations);
	existing = existing ? existing.split(",") : "";
	checkboxes.forEach((element) => {
		if (existing.includes(element.id)) {
			element.checked = true;
		}
	});
}

/**
 *
 * Removes location from localStorage when checkbox unchecked
 * @param   {Object}  location  The event.target object
 */
function removeData(location) {
	let existing = localStorage.getItem(savedLocations);
	existing = existing ? existing.split(",") : [];
	const index = existing.indexOf(location.id);
	if (index > -1) {
		existing.splice(index, 1);
	}
	localStorage.setItem(savedLocations, existing.toString());
}

/**
 * Adds location to localStorage when checkbox checked
 * @param   {Object}  location  The event.target object
 */
function saveData(location) {
	let existing = localStorage.getItem(savedLocations);
	existing = existing ? existing.split(",") : [];
	existing.push(location.id);
	localStorage.setItem(savedLocations, existing.toString());
}

/**
 * Handles any changes to the checkbox states
 * @param   {Object}  event  The event object
 */
function changeHandler(event) {
	if (!event.target.type === "checkbox") return;
	if (event.target.checked) {
		saveData(event.target);
	} else {
		removeData(event.target);
	}
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
 * Renders required information from an object to HTML
 * @param   {Object}  weather  The weatherData object returned by getWeather
 * @return  {String}           The HTML to render
 */
function renderHTML(options, weatherData) {
	const settings = Object.assign(defaults, options);

	app.innerHTML += `
		<section>
			<div>${includeIcon(settings, weatherData)}</div>
			<h2>${updateMessage(settings, weatherData)}</h2>
				<label>
					<input type="checkbox" name="checkbox" id="${weatherData.city_name}"/>
					Save ${weatherData.city_name} for next time
				</label>
		</section>`;
}

/**
 * Fetches a users location and calls the weatherbit API based on first values fetched
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
				loadCheckedBoxes();
			})
			.catch(function () {
				handleError();
			});
	});
}

/**
 * Adds new city from user input and combines values in localStorage
 * @param   {Event}  event  The event object
 */
function addCity(event) {
	if (!event.target.tagName === "INPUT") return;
	if (event.code === "Enter" || event.code === "Tab") {
		const newCity = document.querySelector("#city");
		const cities = localStorage.getItem(savedLocations) ? localStorage.getItem(savedLocations).split(",") : [];
		cities.push(newCity.value);
		getWeather({ locations: cities });
		app.innerHTML = "";
		newCity.value = "";
	}
}

/* ==========  Inits and Event Listeners  ========== */

// Render any locations from localStorage
getWeather({ locations: cites });

// Render any locations added through the input
document.addEventListener("keydown", addCity);

// Handles any changes to the checkboxes states
document.addEventListener("change", changeHandler);
// Close void global scope
// })();
