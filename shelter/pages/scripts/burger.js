let burgerMenu = document.querySelector(`.burger_menu`);
let burgerMenuWR = document.querySelector(`.burger_menu_wr`);
let burgerButton = document.querySelector(`.burger-wr`);
let copyMenu = document.querySelector(`.header_ul`).cloneNode(true);
document.querySelector(`.burger_menu`).appendChild(copyMenu);
let ulElements = Array.from(
  document.querySelector(`.burger_menu .header_ul`).children
);

ulElements.forEach((el) => {
  el.addEventListener(`click`, () => {
    burgerOnOff();
  });
});

// Функция для тогла активного класса бургера
function burgerOnOff() {
  burgerButton.classList.toggle(`active`);
  burgerMenu.classList.toggle(`active`);
  burgerMenuWR.classList.toggle(`active`);
  document.body.classList.toggle(`menu-opened`);
}

// Клик на кнопку
burgerButton.addEventListener(`click`, function () {
  burgerOnOff();
});

// Закрытие вне меню
document.addEventListener(`click`, (el) => {
  el = el.target
  if (burgerMenu.classList.contains(`active`) && !el.classList.contains(`burger-wr`) && !el.classList.contains(`burger_line`)) {
    while (!el.classList.contains(`burger_menu`)) {
      el = el.parentElement;
      if (!el) {
        burgerOnOff();
        break;
      }
    }
  }
});
