const header = document.querySelector("header");
const btn = document.querySelector("#mobile-btn");

btn.addEventListener("click", function () {
  header.classList.toggle("active");
});
