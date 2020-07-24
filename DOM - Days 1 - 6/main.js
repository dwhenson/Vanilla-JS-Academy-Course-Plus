// avoid global scope
(function () {
  /* ==========  Constructor  ========== */

  const Button = function (selector, options) {
    this.element = document.querySelector(selector);
    this.data = options.data;
    this.template = options.template;
  };

  Button.prototype.render = function () {
    this.element.innerHTML = this.template(this.data);
  };

  /* ==========  Button Instance  ========== */
  const button = new Button('#button-state', {
    data: {
      hidden: true,
    },
    template(props) {
      return renderButtonHTML(props);
    },
  });

  /* ==========  Functions  ========== */
  function clickHandler(event) {
    if (!event.target.matches('[data-toggle-password]')) return;
    const passwords = Array.from(
      document.querySelectorAll(
        event.target.getAttribute('data-toggle-password')
      )
    );
    passwords.forEach((password) => {
      button.data.hidden //
        ? (password.type = 'text')
        : (password.type = 'password');
    });
    changeButtonState();
    button.render();
  }

  function changeButtonState() {
    return button.data.hidden //
      ? (button.data.hidden = false)
      : (button.data.hidden = true);
  }

  function renderButtonHTML(props) {
    return props.hidden
      ? ` <button type="button" aria-live="polite" data-toggle-password="#password">Show Password</button>`
      : ` <button type="button" aria-live="polite" data-toggle-password="#password">Hide Password</button>`;
    changeButtonState();
  }

  /* ==========  Inits and Event Listeners  ========== */

  button.render();
  document.addEventListener('click', clickHandler);
})();
