// GOAL: When creating your table of contents, if the heading doesn’t have an ID to link to, create one and assign it to the heading.

// STEPS

// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const toc = document.querySelector('#table-of-contents');
  const headers = Array.from(document.querySelectorAll('h2'));

  /* ==========  Functions  ========== */
  /**
   * Render the TOC html to the page
   * @param   {Object}  element  The element to insert the HTML
   * @param   {Array}  	array    The array of headings to insert
   * @return  {String}           The HTML to render
   */
  function render(element, array) {
    element.innerHTML = `
    <ol>
    ${array
      .map(function (item) {
        return ` <li><a href="#${item.id}">${item.textContent}</a></li> `;
      })
      .join('')}
  </ol>`;
  }

  /* ==========  Inits and Event Listeners  ========== */
  render(toc, headers);
})();
