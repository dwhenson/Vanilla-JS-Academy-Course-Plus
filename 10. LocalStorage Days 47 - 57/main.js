// GOAL
// As the user types, the value of a form field should automatically be saved.
// When the page is reloaded or opened back up, the form should be repopulated with the user’s saved data.

// STEPS
// 1. When a key is pressed, get the value from the textArea
// event.listener for input on textArea (use closest form to check?)
// on input, get event target, save as key and value to save as value
// 2. Save the value to localStorage
// save value as a variable, add to localStorage with prefix as key
// 3. On page reload call the get localStorage method
// simple init function?

// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	const form = document.querySelector("#save-me");

	/* ==========  Functions  ========== */
	function inputHandler(event) {
		if (!event.target.closest("#save-me")) return;
		localStorage.setItem(event.target.name, event.target.value);
	}

	/* ==========  Inits and Event Listeners  ========== */
	form.addEventListener("input", inputHandler);
})();
