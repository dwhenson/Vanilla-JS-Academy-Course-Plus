// Avoid global scope
(function () {
	/* ==========  Variables  ========== */
	const toc = document.querySelector('#table-of-contents');
	const headers = Array.from(document.querySelectorAll('h2'));

	/* ==========  Functions  ========== */

	function createId(item) {
		return item.textContent
			.toLowerCase()
			.replace(/[^\w]/g, '-')
			.replace(/-(-)*/g, '-');
	}

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
    <ol>
    ${array
			.map(function (item) {
				return ` <li>
        <a href="#${item.id}">${item.textContent}</a>
        </li>`;
			})
			.join('')}
    </ol>`;
	}

	/* ==========  Inits and Event Listeners  ========== */
	render(toc, headers);
})();
