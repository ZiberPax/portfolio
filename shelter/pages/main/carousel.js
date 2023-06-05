// const leftButton = document.querySelector(".pets-sct_wr_slider-wr_btn-left");
// const rightButton = document.querySelector(".pets-sct_wr_slider-wr_btn-right");
// const carousel = document.querySelector(".pets-sct_wr_slider-wr_card-wr_carousel");
// const leftSide = document.querySelector(".leftside");
// const rightSide = document.querySelector(".rightside");

// const createCardTemplate = () => {
//   const card = document.createElement("div");
//   card.classList.add("card");
//   return card;
// }

// const moveLeft = () => {
//   carousel.classList.add("transition-left");
//   leftButton.removeEventListener("click", moveLeft);
//   rightButton.removeEventListener("click", moveRight);
// };

// const moveRight = () => {
//   carousel.classList.add("transition-right");
//   leftButton.removeEventListener("click", moveLeft);
//   rightButton.removeEventListener("click", moveRight);
// };

// leftButton.addEventListener("click", moveLeft);
// rightButton.addEventListener("click", moveRight);

// carousel.addEventListener("animationend", (animationEvent) => {
//   let actualSide;
//   if (animationEvent.animationName === "move-left") {
//     carousel.classList.remove("transition-left");
//     console.log(leftSide);
//     actualSide = leftSide;
//     document.querySelector(".active-side").innerHTML = leftSide.innerHTML;
//   } else {
//     carousel.classList.remove("transition-right");
//     actualSide = rightSide;
//     document.querySelector(".active-side").innerHTML = rightSide.innerHTML;
//   }
  
//   // changedItem.innerHTML = "";
//   // for (let i = 0; i < 3; i++) {
//   //   const card = createCardTemplate();
//   //   card.innerText = Math.floor(Math.random() * 8);
//   //   changedItem.appendChild(card);
//   // }
  
//   leftButton.addEventListener("click", moveLeft);
//   rightButton.addEventListener("click", moveRight);
// })