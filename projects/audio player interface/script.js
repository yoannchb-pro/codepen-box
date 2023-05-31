const menu = document.querySelector(".menu");
const section = document.querySelector("section");
const settings = document.querySelector(".settings");

function settingsHandler() {
  section.classList.toggle("active");
}

menu.addEventListener("click", settingsHandler);
settings.addEventListener("click", settingsHandler);
