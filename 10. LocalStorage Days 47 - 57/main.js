// GOAL
// Modify our form saver script to store all of the fields as a single entry in localStorage.

// STEPS
// 1. Set up prefix variable and create empty object
// 2. Change input handler to add key:value pair to object (get object, parse and then add)
// 3. Update loadData to i) check if object exists ii) if so, parse then loop and add data, otherwise create empty object
// 4. Edit clearData to remove entire object

// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	const form = document.querySelector("#save-me");
	const button = document.querySelector("button");

	/* ==========  Functions  ========== */
	/**
	 * Save user inputted data to local storage
	 * @param   {event}  event  The event object
	 */
	function inputHandler(event) {
		if (!event.target.closest("#save-me")) return;
		localStorage.setItem(event.target.name, event.target.value);
	}

	/**
	 * Get user data from local storage
	 */
	function loadData() {
		const fields = [...document.querySelectorAll("input", "textArea")];
		fields.forEach((field) => {
			const data = localStorage.getItem(field.name);
			if (!data) return;
			field.value = data;
		});
	}

	/**
	 * Clear user data from local storage
	 */
	function clearData() {
		const fields = [...document.querySelectorAll("input", "textArea")];
		fields.forEach((field) => {
			localStorage.removeItem(field.name);
		});
	}

	/**
	 * Handle the click event
	 */
	function submitHandler() {
		clearData();
	}
	/* ==========  Inits and Event Listeners  ========== */
	loadData();
	form.addEventListener("input", inputHandler);
	button.addEventListener("click", submitHandler);
})();
