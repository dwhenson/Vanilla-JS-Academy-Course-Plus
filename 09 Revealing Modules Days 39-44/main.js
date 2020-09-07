// Avoid global scope
const ex = (function () {
	/* ==========  Variables  ========== */

	/* ==========  Functions  ========== */

	// holds public methods
	const methods = {};

	/**
	 * converts nodelist to array
	 * @param   {object}  element  The HTML element to create a list of
	 * @return  {array}            The nodelist converted to an array
	 */
	function convertNodelist(element) {
		return [...document.querySelectorAll(element)];
	}

	/**
	 * finds first matching element in array
	 * @param   {object}  element  The HTML element to match
	 * @return  {array}            The matching element
	 */
	function findMatching(element) {
		return document.querySelector(element);
	}

	/*
  // Methods
    */

	methods.convert = function (element) {
		return convertNodelist(element);
	};

	methods.matches = function (element) {
		return findMatching(element);
	};

	return methods;
})();
