import petsJson from "../../json/pets.json" assert {type: "json"};

// Назначаю переменные
let animalCardsArr = Array.from(
  document.querySelector(`.pets-sct_wr_slider-wr_card-wr`).children
);
let popupWrapper = document.querySelector(`.popup_wr`);
let popup = document.querySelector(`.popup`);
let popupButton = document.querySelector(`.popup_close_but`);
let petSection = document.getElementById(`our-pets`);
let cardNumber = 0;
function showHidePopup() {
  document.body.classList.toggle(`menu-opened`);
  popupWrapper.classList.toggle(`active`);
  popupButton.classList.toggle(`active`);
  popup.classList.toggle(`active`);
}

// Функция заполняющая карточку
function fillPopup(card, num) {
  document.querySelector(`.popup_window_img`).src = petsJson[num].img;
  document.querySelector(`.popup_window_content_h3`).textContent =
    petsJson[num].name;
  document.querySelector(
    `.popup_window_content_h4`
  ).textContent = `${petsJson[num].type} - ${petsJson[num].breed}`;
  document.querySelector(`.popup_window_content_h5`).textContent =
    petsJson[num].description;
  document.querySelector(
    `.popup_window_content_ul_li:nth-child(${1}) .popup_window_content_ul_li_title_content`
  ).textContent = ` ${petsJson[num].age}`;
  document.querySelector(
    `.popup_window_content_ul_li:nth-child(${2}) .popup_window_content_ul_li_title_content`
  ).textContent = ` ${petsJson[num].inoculations.join(", ")}`;
  document.querySelector(
    `.popup_window_content_ul_li:nth-child(${3}) .popup_window_content_ul_li_title_content`
  ).textContent = ` ${petsJson[num].diseases.join(", ")}`;
  document.querySelector(
    `.popup_window_content_ul_li:nth-child(${4}) .popup_window_content_ul_li_title_content`
  ).textContent = ` ${petsJson[num].parasites.join(", ")}`;
}

// Закрытие вне меню
document.addEventListener(`click`, (el) => {
  el = el.target;
  if (el.classList.contains(`close_popup`)) {
    showHidePopup();
  }
  if (popup.classList.contains(`active`)) {
    // проверка есть ли класс с карточкой в таргете, если да - не закрываем попап, если нет - не закрываем
    while (
      !el.classList.contains(`popup`) &&
      !el.classList.contains(`pets-sct_wr_slider-wr_card-wr_card`)
    ) {
      el = el.parentElement;
      if (!el) {
        showHidePopup();
        break;
      }
    }
  }
});

// Обработчик клика на карточку
animalCardsArr.forEach((el) => {
  el.addEventListener(`click`, () => {
    showHidePopup();
    cardNumber = el.classList[1];
    // Нажатие на карточку
    console.log(el);
    fillPopup(el, cardNumber);
    if (el.classList.contains(`pets-card`)) {
      cardNumber = el.classList[1];
      fillPopup(el, cardNumber);
    }
  });
});
