import petsJson from "../../json/pets.json" assert {type: "json"};

// Назначаю переменные
let animalCardsArr = Array.from(
  document.querySelector(`.active-side`).children
);
let popupWrapper = document.querySelector(`.popup_wr`);
let popup = document.querySelector(`.popup`);
let popupButton = document.querySelector(`.popup_close_but`);
let petSection = document.getElementById(`our-pets`);
let card1 = document.querySelector(
  `.active-side .pets-sct_wr_slider-wr_card-wr_card:nth-child(${1})`
);
let corouselArr = [0, 1, 2, 3, 4, 5, 6, 7],
  currentCorouselArr = [4, 0, 2],
  prevCorouselArr = [],
  acumArr = [];
let lastPressedCorouselBut;
// let needNewArr = true;

shuffle(corouselArr);

// Функция для перемешивания массива

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// navigateToSection ()

// Функция показывающая попап

// function showHidePopup() {
//   var navigateToSection = new Promise(function(resolve, reject) {
//     petSection.scrollIntoView({
//       behavior: auto
//     });
//     resolve();
//   })
//   navigateToSection.then( () =>
//   {setTimeout(() => {

//     console.log('fff');
//       document.body.classList.toggle(`menu-opened`);
//       popupWrapper.classList.toggle(`active`);
//       popupButton.classList.toggle(`active`);
//       popup.classList.toggle(`active`);
//     }, 400);}
//   )

// }

function showHidePopup() {
  document.body.classList.toggle(`menu-opened`);
  popupWrapper.classList.toggle(`active`);
  popupButton.classList.toggle(`active`);
  popup.classList.toggle(`active`);
}

// Функция заполняющая карточку

function fillPopup(num) {
  // let popupImage = document.querySelector(`.popup_window_img`);
  // console.log(`.${card.classList[0]} .popup_window_img`);
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
  // document.querySelector(`.popup_window_content_h3`).textContent = petsJson[num].name;
  // document.querySelector(`.popup_window_content_h3`).textContent = petsJson[num].name;
}

let cardNumber = 0;

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

// КАРУСЕЛЬ

const leftButton = document.querySelector(".pets-sct_wr_slider-wr_btn-left");
const rightButton = document.querySelector(".pets-sct_wr_slider-wr_btn-right");
const carousel = document.querySelector(
  ".pets-sct_wr_slider-wr_card-wr_carousel"
);
const leftSide = document.querySelector(".leftside");
const rightSide = document.querySelector(".rightside");

// создаем новую карточку
const createCardTemplate = (numberOfCard) => {
  // const newCard = document.querySelector(`.active-side .pets-sct_wr_slider-wr_card-wr_card:nth-child(${1})`).cloneNode(true);
  // скопировать готовую карточку не получится, придется делать с нуля

  // let newNumberCard = Math.floor(Math.random() * 8).toString();

  // создаем обертку для карты
  const newCard = document.createElement("div");
  newCard.classList.add("pets-sct_wr_slider-wr_card-wr_card");
  newCard.classList.add(numberOfCard);
  newCard.classList.add("pets-card");
  // создаем заголовок для карты
  let newH4 = document.createElement("h4");
  newH4.classList.add(`pets-sct_wr_slider-wr_card-wr_card_h4`);
  newH4.classList.add(`pets-card`);
  newH4.textContent = petsJson[numberOfCard].name;
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
  newImg.src = petsJson[numberOfCard].img;
  newH4.textContent = petsJson[numberOfCard].name;
  // собираем конструктор
  newImgWr.appendChild(newImg);
  newCard.appendChild(newImgWr);
  newCard.appendChild(newH4);
  newCard.appendChild(Button);
  return newCard;
};

const moveLeft = () => {
  if (lastPressedCorouselBut == "right") {
    // console.log("Выполнен вход в условие 'Если последняя клавиша = вправо'");
    document.querySelector(".leftside").innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate(prevCorouselArr[i]);
      acumArr.push(prevCorouselArr[i]);
      // console.log(document.querySelector(`.${newChangedSide} .pets-sct_wr_slider-wr_card-wr_card:nth-child(${i + 1})`));
      // document.querySelector(`.${newChangedSide} .pets-sct_wr_slider-wr_card-wr_card:nth-child(${i + 1}) .pets-sct_wr_slider-wr_card-wr_card_img-wr_img`).src = petsJson[newNumberCard].img;
      // заполняю карту актуальным контентом
      // console.log( document.querySelector(`.rightside .pets-sct_wr_slider-wr_card-wr_card:nth-child(${i + 1}) .pets-sct_wr_slider-wr_card-wr_card_img-wr_img`));
      // document.querySelector(`.rightside .pets-sct_wr_slider-wr_card-wr_card:nth-child(${i + 1}) .pets-sct_wr_slider-wr_card-wr_card_img-wr_img`).src = petsJson[newNumberCard].img;
      document.querySelector(".leftside").appendChild(card);
      if (i == 2) {
        shuffle(corouselArr);
      }
    }


    // if (acumArr.length > 3) {
    //   prevCorouselArr = currentCorouselArr;
    //   currentCorouselArr = acumArr.splice(0, 3);
    // }
    // needNewArr = false;
  } else {
    let newUnicArr = corouselArr.filter(
      (el) =>
        el !== currentCorouselArr[0] &&
        el !== currentCorouselArr[1] &&
        el !== currentCorouselArr[2]
    );
    document.querySelector(".leftside").innerHTML = "";
    for (let i = 0; i < 3; i++) {

      // console.log(`Создается новая карточка с номером ${newUnicArr[i]}`);
      const card = createCardTemplate(newUnicArr[i]);
      document.querySelector(".leftside").appendChild(card);
      if (i == 2) {
        shuffle(corouselArr);
      }
    }

  }
  carousel.classList.add("transition-left");
  leftButton.removeEventListener("click", moveLeft);
  rightButton.removeEventListener("click", moveRight);
  lastPressedCorouselBut = "left";
  // console.log(lastPressedCorouselBut);
};

const moveRight = () => {
  if (lastPressedCorouselBut == "left") {
    // console.log("Выполнен вход в условие 'Если последняя клавиша = влево'");
    // console.log("------------------");
    document.querySelector(".rightside").innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate(prevCorouselArr[i]);
      acumArr.push(prevCorouselArr[i]);
      document.querySelector(".rightside").appendChild(card);
      if (i == 2) {
        shuffle(corouselArr);
      }
    }
    // needNewArr = false;
  } else {
    let newUnicArr = corouselArr.filter(
      (el) =>
        el !== currentCorouselArr[0] &&
        el !== currentCorouselArr[1] &&
        el !== currentCorouselArr[2]
    );
    document.querySelector(".rightside").innerHTML = "";
    for (let i = 0; i < 3; i++) {
      // console.log(`Создается новая карточка с номером ${newUnicArr[i]}`);
      const card = createCardTemplate(newUnicArr[i]);
      document.querySelector(".rightside").appendChild(card);
      if (i == 2) {
        shuffle(corouselArr);
      }
    }
  }
  carousel.classList.add("transition-right");
  leftButton.removeEventListener("click", moveLeft);
  rightButton.removeEventListener("click", moveRight);
  lastPressedCorouselBut = "right";
  // console.log(lastPressedCorouselBut);
};

leftButton.addEventListener("click", moveLeft);
rightButton.addEventListener("click", moveRight);

carousel.addEventListener("animationend", (animationEvent) => {
  let newChangedSide;
  if (animationEvent.animationName === "move-left") {
    carousel.classList.remove("transition-left");
    // console.log(leftSide);
    newChangedSide = leftSide;
    document.querySelector(".active-side").innerHTML = leftSide.innerHTML;
  } else {
    carousel.classList.remove("transition-right");
    newChangedSide = rightSide;
    document.querySelector(".active-side").innerHTML = rightSide.innerHTML;
  }

  // card1 = document.querySelector(
  //   `.active-side .pets-sct_wr_slider-wr_card-wr_card:nth-child(${1})`
  // );
  // for (let i = 0; i < 3; i++) {
  // document.querySelector(".active-side").removeChild(document.querySelector(`.active-side .pets-sct_wr_slider-wr_card-wr_card:nth-child(${4})`));
  // const card = createCardTemplate();
  // const newNumberCard = Math.floor(Math.random() * 8).toString();
  // const actualNumberCard = card.classList[1];
  // card.classList.replace(actualNumberCard, newNumberCard)

  // заполняю карту актуальным контентом
  // document.querySelector(`.rightside .pets-sct_wr_slider-wr_card-wr_card:nth-child(${i + 1}) .pets-sct_wr_slider-wr_card-wr_card_img-wr_img`).src = petsJson[newNumberCard].img;
  // newChangedSide.appendChild(card);
  // }
  // if (needNewArr) {
    // console.log("Выполнен вход в цикл конца анимации");
    // newChangedSide.innerHTML = "";
    // for (let i = 0; i < 3; i++) {
    //   console.log(`Создается новая карточка с номером ${corouselArr[i]}`);
    //   const card = createCardTemplate(corouselArr[i]);
    //   newChangedSide.appendChild(card);
    //   if (i == 2) {
    //     shuffle(corouselArr);
    //   }
    // }
    // for (let i = 1; i < 4; i++) {
    //   currentCorouselArr.push(
    //     +document.querySelector(
    //       `.active-side .pets-sct_wr_slider-wr_card-wr_card:nth-child(${i})`
    //     ).classList[1]
    //   );
    // }
    // console.log(currentCorouselArr);
    // prevCorouselArr = currentCorouselArr.splice(0, 3);
    // console.log(`В прошлой карусели были карты ${prevCorouselArr}`);
    // console.log(`Сейчас в массиве лежат карты ${currentCorouselArr}`);
  // }
  for (let i = 1; i < 4; i++) {
    currentCorouselArr.push(
      +document.querySelector(
        `.active-side .pets-sct_wr_slider-wr_card-wr_card:nth-child(${i})`
      ).classList[1]
    );
  }
  // console.log("---------------------------");
  // console.log("Анимация завершена");
  // console.log(currentCorouselArr);
  prevCorouselArr = currentCorouselArr.splice(0, 3);
  // console.log(`В прошлой карусели были карты ${prevCorouselArr}`);
  // console.log(`Сейчас в массиве лежат карты ${currentCorouselArr}`);
  // if (!needNewArr) {
  //   needNewArr = true;
  // }

  leftButton.addEventListener("click", moveLeft);
  rightButton.addEventListener("click", moveRight);
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
    cardNumber = currentCard.classList[1];
    fillPopup(cardNumber);
  }
});

// Когда страница загрузилась нужно поменять карточку слева и справа

function changeCardsOnStart() {
  document.querySelector(".rightside").innerHTML = "";
  document.querySelector(".leftside").innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate(corouselArr[i]);
    document.querySelector(".rightside").appendChild(card);
    if (i == 2) {
      shuffle(corouselArr);
    }
  }
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate(corouselArr[i]);
    document.querySelector(".leftside").appendChild(card);
    if (i == 2) {
      shuffle(corouselArr);
    }
  }
}

changeCardsOnStart();
