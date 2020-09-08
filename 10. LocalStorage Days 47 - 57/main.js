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
	function getStoredData() {
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
	getStoredData();
	form.addEventListener("input", inputHandler);
	button.addEventListener("click", submitHandler);
})();
