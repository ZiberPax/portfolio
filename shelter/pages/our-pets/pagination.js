// Импорт всех питомцев из джончика
import petsJson from "../../json/pets.json" assert {type: "json"};

// Назначаю переменные
let popupWrapper = document.querySelector(`.popup_wr`);
let popup = document.querySelector(`.popup`);
let popupButton = document.querySelector(`.popup_close_but`);
let petSection = document.getElementById(`our-pets`);
let paginationWr = document.querySelector(`.pets-sct_wr_slider-wr_card-wr`);
let leftButtonLast = document.querySelector(
  `.pets-section_content_nav_button_pagination.left.last`
);
let leftButtonPrev = document.querySelector(
  `.pets-section_content_nav_button_pagination.left.prev`
);
let rightButtonLast = document.querySelector(
  `.pets-section_content_nav_button_pagination.right.last`
);
let rightButtonNext = document.querySelector(
  `.pets-section_content_nav_button_pagination.right.next`
);
let activeButton = document.querySelector(
  `.pets-section_content_nav_button_pagination.active`
);
let numOfPaginationPages = 5;
let numOfPaginationCards = 8;
let currentOpenPage = 0;
let petsAnimalsArr = [0, 1, 2, 3, 4, 5, 6, 7];
let petsAnimalsArrTablet = [0, 1, 2, 3, 4, 5];
let petsAnimalsArrMobile = [0, 1, 2];
let paginationArr = [];
let cardNumber = 0;

function showHidePopup() {
  document.body.classList.toggle(`menu-opened`);
  popupWrapper.classList.toggle(`active`);
  popupButton.classList.toggle(`active`);
  popup.classList.toggle(`active`);
}

// Функция заполняющая карточку
function fillPopup(num) {
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
  if (popup.classList.contains(`active`)) {
    // проверка есть ли класс с карточкой в таргете, если да - не закрываем попап, если нет - не закрываем
    if (el.classList.contains(`close_popup`)) {
      showHidePopup();
    }
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

document.addEventListener(`click`, (event) => {
  let currentCard = event.target;
  if (currentCard.classList.contains(`pets-card`)) {
    while (
      !currentCard.classList.contains(`pets-sct_wr_slider-wr_card-wr_card`)
    ) {
      currentCard = currentCard.parentElement;
    }
    showHidePopup();
    fillPopup(currentCard.classList[1]);
  }
});

// Функция для перемешивания массива
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Функция отслеживающая ширину экрана
function checkWidth() {
  if (window.innerWidth > 1279) {
    numOfPaginationPages = 5;
    numOfPaginationCards = 8;
    return objectsArrDesctop;
  }
  if (window.innerWidth < 1279 && window.innerWidth > 768) {
    numOfPaginationPages = 7;
    numOfPaginationCards = 6;
    return objectsArrTablet;
  }
  if (window.innerWidth < 768) {
    numOfPaginationPages = 15;
    numOfPaginationCards = 3;
    return objectsArrMobile;
  }
}

// создаем новую карточку
const createCardTemplate = (card) => {
  // создаем обертку для карты
  const newCard = document.createElement("div");
  newCard.classList.add("pets-sct_wr_slider-wr_card-wr_card");
  newCard.classList.add(card[`number`]);
  newCard.classList.add("pets-card");
  // создаем заголовок для карты
  let newH4 = document.createElement("h4");
  newH4.classList.add(`pets-sct_wr_slider-wr_card-wr_card_h4`);
  newH4.classList.add(`pets-card`);
  newH4.textContent = card.name;
  // создаем обертку для картинки на карте
  let newImgWr = document.createElement("div");
  newImgWr.classList.add(`pets-sct_wr_slider-wr_card-wr_card_img-wr`);
  newImgWr.classList.add(`pets-card`);
  // создаем картинку для ообертки
  let newImg = document.createElement("img");
  newImg.classList.add(`pets-sct_wr_slider-wr_card-wr_card_img-wr_img`);
  newImg.classList.add(`pets-card`);
  // создаем картинку для ообертки
  let Button = document.createElement("button");
  Button.classList.add(`pets-sct_wr_slider-wr_card-wr_card_btn`);
  Button.classList.add(`pets-card`);
  Button.textContent = `Lear more`;
  // присуждаем компонентам актуальные номера для джейсончика
  newImg.src = card.img;
  newH4.textContent = card.name;
  // собираем конструктор
  newImgWr.appendChild(newImg);
  newCard.appendChild(newImgWr);
  newCard.appendChild(newH4);
  newCard.appendChild(Button);
  return newCard;
};

// Фукнция, которая мешает все карточки в массиве и сам массив
function shufflePRO(arr) {
  shuffle(arr);
  for (let i = 0; i < arr.length; i++) {
    shuffle(arr[i]);
  }
}

// Создаю функцию, которая будет замешивать 48 карточек для страниц
let objectsArr = [];
let objectsArrDesctop = [];
let objectsArrTablet = [];
let objectsArrMobile = [];
function createPaginationArr() {
  for (let i = 0; i < 6; i++) {
    // shuffle(petsAnimalsArr);
    paginationArr = [...paginationArr, ...petsAnimalsArr];
  }
  paginationArr.forEach((element) => {
    objectsArr.push(petsJson[element]);
  });
  for (let i = 0; i < 6; i++) {
    let copyObjectArr = objectsArr.slice(0);
    objectsArrDesctop.push(copyObjectArr.splice(i * 8, 8));
  }
  for (let i = 0; i < 8; i++) {
    let copyObjectArr = objectsArr.slice(0);
    objectsArrTablet.push(copyObjectArr.splice(i * 6, 6));
  }
  for (let i = 0; i < 16; i++) {
    let copyObjectArr = objectsArr.slice(0);
    objectsArrMobile.push(copyObjectArr.splice(i * 3, 3));
  }
  shufflePRO(objectsArrDesctop)
  shufflePRO(objectsArrTablet)
  shufflePRO(objectsArrDesctop)
  return objectsArr;
}

// Создаю функцию для заполнения страницы
function fillPaginationPage(numOfPage) {
  paginationWr.innerHTML = "";
  let copyOfPaginationArr = objectsArr.slice(0);
  let currentPageArr = checkWidth();
  for (let i = 0; i < numOfPaginationCards; i++) {
    let newCard = createCardTemplate(currentPageArr[currentOpenPage][i]);
    paginationWr.appendChild(newCard);
  }
}

// Запуск логики страницы
createPaginationArr();
fillPaginationPage(currentOpenPage);

// Обработчик события нажатия на кнопку NEXT
rightButtonNext.addEventListener(`click`, () => {
  checkWidth();
  if (currentOpenPage < numOfPaginationPages) {
    currentOpenPage++;
    fillPaginationPage(currentOpenPage);
    leftButtonLast.classList.remove(`unactive`);
    leftButtonPrev.classList.remove(`unactive`);
    leftButtonLast.disabled = false;
    leftButtonPrev.disabled = false;
  }
  if (currentOpenPage == numOfPaginationPages) {
    rightButtonLast.disabled = true;
    rightButtonNext.disabled = true;
    rightButtonLast.classList.add(`unactive`);
    rightButtonNext.classList.add(`unactive`);
  }
  activeButton.textContent = currentOpenPage + 1;
});

// Обработчик события нажатия на кнопку PREV
leftButtonPrev.addEventListener(`click`, () => {
  checkWidth();
  if (currentOpenPage > 0) {
    currentOpenPage--;
    fillPaginationPage(currentOpenPage);
    rightButtonLast.classList.remove(`unactive`);
    rightButtonNext.classList.remove(`unactive`);
    rightButtonLast.disabled = false;
    rightButtonNext.disabled = false;
  }
  if (currentOpenPage == 0) {
    leftButtonLast.disabled = true;
    leftButtonPrev.disabled = true;
    leftButtonLast.classList.add(`unactive`);
    leftButtonPrev.classList.add(`unactive`);
  }
  activeButton.textContent = currentOpenPage + 1;
});

// Обработчик события нажатия на кнопку RIGHT LAST
rightButtonLast.addEventListener(`click`, () => {
  checkWidth();
  currentOpenPage = numOfPaginationPages;
  fillPaginationPage(currentOpenPage);
  rightButtonLast.disabled = true;
  rightButtonNext.disabled = true;
  rightButtonLast.classList.add(`unactive`);
  rightButtonNext.classList.add(`unactive`);
  if (leftButtonLast.classList.contains(`unactive`)) {
    leftButtonLast.classList.remove(`unactive`);
    leftButtonPrev.classList.remove(`unactive`);
    leftButtonLast.disabled = false;
    leftButtonPrev.disabled = false;
  }
  activeButton.textContent = currentOpenPage + 1;
});

// Обработчик события нажатия на кнопку LEFT LAST
leftButtonLast.addEventListener(`click`, () => {
  checkWidth();
  currentOpenPage = 0;
  fillPaginationPage(currentOpenPage);
  leftButtonLast.disabled = true;
  leftButtonPrev.disabled = true;
  leftButtonLast.classList.add(`unactive`);
  leftButtonPrev.classList.add(`unactive`);
  if (leftButtonLast.classList.contains(`unactive`)) {
    rightButtonLast.classList.remove(`unactive`);
    rightButtonNext.classList.remove(`unactive`);
    rightButtonLast.disabled = false;
    rightButtonNext.disabled = false;
  }
  activeButton.textContent = currentOpenPage + 1;
});

window.addEventListener("resize", (e) => {
  if (window.innerWidth > 1279) {
    numOfPaginationPages = 5;
    numOfPaginationCards = 8;
    if (currentOpenPage > 5) {
      currentOpenPage = 5;
      activeButton.textContent = currentOpenPage + 1;
    }
    if (
      document.querySelector(`.pets-sct_wr_slider-wr_card-wr`).children.length <
      8
    ) {
      fillPaginationPage(currentOpenPage);
    }
  }
  if (window.innerWidth < 1279 && window.innerWidth > 768) {
    numOfPaginationPages = 7;
    numOfPaginationCards = 6;
    if (currentOpenPage > 7) {
      currentOpenPage = 7;
      activeButton.textContent = currentOpenPage + 1;
    }
    if (currentOpenPage == 5) {
      if (rightButtonNext.classList.contains(`unactive`)) {
        rightButtonLast.classList.remove(`unactive`);
        rightButtonNext.classList.remove(`unactive`);
        rightButtonLast.disabled = false;
        rightButtonNext.disabled = false;
      }
    }
    if (
      document.querySelector(`.pets-sct_wr_slider-wr_card-wr`).children.length <
      6
    ) {
      fillPaginationPage(currentOpenPage);
    }
  }
  if (window.innerWidth < 768) {
    numOfPaginationPages = 15;
    numOfPaginationCards = 3;
    if (currentOpenPage == 7) {
      if (rightButtonNext.classList.contains(`unactive`)) {
        rightButtonLast.classList.remove(`unactive`);
        rightButtonNext.classList.remove(`unactive`);
        rightButtonLast.disabled = false;
        rightButtonNext.disabled = false;
      }
    }
  }
});
