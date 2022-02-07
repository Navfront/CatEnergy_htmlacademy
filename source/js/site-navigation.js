const navigation = document.querySelector(".site-navigation");
const burger = navigation.querySelector(".button-burger");
const burgerIcon = burger.querySelector(".button-burger__icon");
const menu = navigation.querySelector(".site-navigation__list");

burger.addEventListener("click", () => {
  burgerIcon.classList.toggle("button-burger__icon--close");
  menu.classList.toggle("site-navigation__list--active");
  navigation.classList.toggle("site-navigation--closed");
});
