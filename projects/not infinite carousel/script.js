const slides = document.querySelectorAll(".slide");
const right = document.querySelector(".arrow-right");
const left = document.querySelector(".arrow-left");

let interval = null;
let index = 0;

function startSlide() {
  interval = setInterval(slidesHandler, 3000);
}

function slidesHandler() {
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  const actual = slides[index];

  slides.forEach((slide, i) => {
    slide.style.transition = "500ms ease";
    slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });

  ++index;
}

startSlide();
slidesHandler();

right.addEventListener("click", function () {
  clearInterval(interval);
  slidesHandler();
  startSlide();
});

left.addEventListener("click", function () {
  clearInterval(interval);
  index -= 2;
  slidesHandler();
  startSlide();
});
