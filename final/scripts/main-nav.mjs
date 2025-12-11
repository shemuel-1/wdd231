// ******************** NAVIGATION *********************

const navButton = document.getElementById("ham-button");
const navMenu = document.getElementById("navigation");

navButton.addEventListener("click", () => {
  navButton.classList.toggle("show");
  navMenu.classList.toggle("show");
});