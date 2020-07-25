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

  /* ==========  Functions  ========== */

  function changeButtonState() {
    return buttonSingle.data.hidden //
      ? (buttonSingle.data.hidden = false)
      : (buttonSingle.data.hidden = true);
  }

  function clickHandler(event) {
    if (!event.target.matches('[data-toggle-password]')) return;
    const passwords = Array.from(
      document.querySelectorAll(
        event.target.getAttribute('data-toggle-password')
      )
    );
    passwords.forEach((password) => {
      buttonSingle.data.hidden //
        ? (password.type = 'text')
        : (password.type = 'password');
    });
    changeButtonState();
    buttonSingle.render();
  }

  function renderButtonHTML(props) {
    return props.hidden
      ? ` <button type="button" aria-live="polite" data-toggle-password="#password">Show Password</button>`
      : ` <button type="button" aria-live="polite" data-toggle-password="#password">Hide Password</button>`;
  }

  /* ==========  Button Instance  ========== */
  const buttonSingle = new Button('#button-single', {
    data: {
      hidden: true,
    },
    template(props) {
      return renderButtonHTML(props);
    },
  });
  /* ==========  Inits and Event Listeners  ========== */

  buttonSingle.render();
  document.addEventListener('click', clickHandler);
})();
