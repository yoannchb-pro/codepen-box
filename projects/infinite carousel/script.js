const slides = Array.from(document.querySelectorAll(".slide")).map((el, x) => ({
  el,
  x,
}));
const right = document.querySelector(".arrow-right");
const left = document.querySelector(".arrow-left");

let interval = null;

function startSlide() {
  interval = setInterval(slidesHandler, 3000);
}

function slidesHandler(delta = -1) {
  slides.forEach((slide) => {
    slide.x += delta;
    slide.el.style.transition = "500ms ease";
    if (slide.x === 0) slide.el.style.zIndex = 998;
    else slide.el.style.zIndex = 1;
    slide.el.style.transform = `translateX(${slide.x * 100}%)`;
  });

  if (slides[slides.length - 1].x === 0) {
    const slide = slides.shift();
    slide.x = 1;
    slide.el.style.transition = "none";
    slide.el.style.transform = "translateX(100%)";
    slides.push(slide);
  }

  if (slides[0].x === 0) {
    const slide = slides.pop();
    slide.x = -1;
    slide.el.style.transition = "none";
    slide.el.style.transform = "translateX(-100%)";
    slides.unshift(slide);
  }
}

startSlide();
slidesHandler();

right.addEventListener("click", function () {
  clearInterval(interval);
  slidesHandler(-1);
  startSlide();
});

left.addEventListener("click", function () {
  clearInterval(interval);
  slidesHandler(1);
  startSlide();
});
