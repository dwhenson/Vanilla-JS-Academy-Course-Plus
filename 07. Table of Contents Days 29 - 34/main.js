// GOAL: When creating your table of contents, if the heading doesn’t have an ID to link to, create one and assign it to the heading.

// STEPS
// Create function that checks if id is there, and if not gets the textContent and converts to lower case and kebab case (i.e. replaced space with a -)

// avoid global scope
(function () {
	/* ==========  Variables  ========== */
	const toc = document.querySelector('#table-of-contents');
	const headers = Array.from(document.querySelectorAll('h2'));

	/* ==========  Functions  ========== */

	function createId(item) {
		return item.textContent.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
	}

	function checkId(array) {
		array.forEach((item) => {
			if (item.id) return;
			item.innerHTML = `<h2 id=${createId(item)}>${item.textContent}</h2>`;
		});
	}

	/**
	 * Render the TOC html to the page
	 * @param   {Object}  element  The element to insert the HTML
	 * @param   {Array}  	array    The array of headings to insert
	 * @return  {String}           The HTML to render
	 */
	function render(element, array) {
		checkId(headers);
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
