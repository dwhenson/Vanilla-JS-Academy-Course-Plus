// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	const toc = document.querySelector('#table-of-contents');
	const headers = Array.from(document.querySelectorAll('h2, h3, h4'));

	/* ==========  Functions  ========== */

	/**
	 * Creates an id based on an element's textContent
	 * @param   {Object}  item  The element requiring an id
	 * @return  {String}        The text of the id to insert
	 */
	function createId(item) {
		return item.textContent
			.toLowerCase()
			.replace(/[^\w]/g, '-')
			.replace(/-(-)*/g, '-');
	}

	/**
	 * Checks if items in array have an id, and assigns one if not
	 * @param   {Array}  array	The array of elements to check ids on
	 * @return  {Object}				The element with an existing or added id
	 */
	function checkId(array) {
		array.map(function (item) {
			return item.id ? item : (item.id = createId(item));
		});
	}

	/**
	 * Render the TOC html to the page
	 * @param   {Object}  element  The element to insert the HTML
	 * @param   {Array}  	array    The array of headings to insert
	 * @return  {String}           The HTML to render
	 */
	function render(element, array) {
		checkId(array);
		element.innerHTML = `
    <ul class="toc">
    ${array
			.map(function (item) {
				return `<li>
					<a href="#${item.id}" class="${item.tagName.toLowerCase()}">
					${item.textContent}</a>
				</li>`;
			})
			.join('')}
    </ul>`;
	}

	/* ==========  Inits and Event Listeners  ========== */
	render(toc, headers);
})();
