// avoid global scope
(function () {
  /* ==========  Variables  ========== */

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
  const buttonSingle = new Button('#buttonSingle', {
    data: {
      hidden: true,
      type: 'buttonSingle',
    },
    template(props) {
      return renderButtonHTML(props);
    },
  });

  const buttonDouble = new Button('#buttonDouble', {
    data: {
      hidden: true,
      type: 'buttonDouble',
    },
    template(props) {
      return renderButtonHTML(props);
    },
  });

  /* ==========  Functions  ========== */

  const buttons = [buttonSingle, buttonDouble];
  let targetButton;

  function clickHandler(event) {
    buttons.forEach((button) => {
      if (button.data.type === event.target.parentElement.id) {
        targetButton = button;
      }
    });

    if (!event.target.matches('[data-toggle-password]')) return;
    const passwords = Array.from(
      document.querySelectorAll(
        event.target.getAttribute('data-toggle-password')
      )
    );
    passwords.forEach((password) => {
      targetButton.data.hidden //
        ? (password.type = 'text')
        : (password.type = 'password');
    });
    changeButtonState();
    targetButton.render();
  }

  function changeButtonState() {
    return targetButton.data.hidden //
      ? (targetButton.data.hidden = false)
      : (targetButton.data.hidden = true);
  }

  function renderButtonHTML(props) {
    return props.hidden
      ? ` <button type="button" aria-live="polite" data-toggle-password="#password">Show Password</button>`
      : ` <button type="button" aria-live="polite" data-toggle-password="#password">Hide Password</button>`;
  }

  /* ==========  Inits and Event Listeners  ========== */

  buttonSingle.render();
  buttonDouble.render();
  document.addEventListener('click', clickHandler);
})();
