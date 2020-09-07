// Avoid global scope
const $ = (function () {
	/* ==========  Functions  ========== */
	/**
	 * converts nodeList to array
	 * @param   {object}  element  The HTML element to create a list of
	 * @return  {array}            The nodeList converted to an array
	 */
	function convertNodeList(elements) {
		return [...elements];
	}

	/**
	 * finds first matching element in array
	 * @param   {object}  element  The HTML element to match
	 * @return  {array}            The matching element
	 */
	function findFirst(elements) {
		return elements[0];
	}

	/*
  // The constructor object
    */

	const Constructor = function (element) {
		this.elements = document.querySelectorAll(element);
	};

	Constructor.prototype.createArray = function () {
		return convertNodeList(this.elements);
	};

	Constructor.prototype.findFirst = function () {
		return findFirst(this.elements);
	};

	return Constructor;
})();

const btn = new $("button");
console.log(btn.createArray());
console.log(btn.findFirst());
