const slides = Array.from(document.querySelectorAll(".slide")).map((el, x) => ({
  el,
  x,
}));
const right = document.querySelector(".arrow-right");
const left = document.querySelector(".arrow-left");

let interval = null;
let animationEnd = true;

function startSlide() {
  interval = setInterval(slidesHandler, 3000);
}

function slidesHandler(delta = -1) {
  if (animationEnd) {
    const last = slides[slides.length - 1];
    const first = slides[0];

    if (first.x === 0 && delta === 1) {
      const slide = slides.pop();
      slide.x = first.x - 1;
      slide.el.style.transition = "none";
      slide.el.style.transform = `translateX(${slide.x * 100}%)`;
      slides.unshift(slide);
    }

    for (const slide of slides) {
      slide.x += delta;
      //a set tiemout to wait the transition above is finished
      setTimeout(() => {
        slide.el.style.transition = "500ms ease";
        slide.el.style.transform = `translateX(${slide.x * 100}%)`;
      }, 1);
    }

    if (last.x === 0 && delta === -1) {
      setTimeout(() => {
        const slide = slides.shift();
        slide.x = last.x + 1;
        slide.el.style.transition = "none";
        slide.el.style.transform = `translateX(${slide.x * 100}%)`;
        slides.push(slide);
      }, 500);
    }

    animationEnd = false;
    setTimeout(() => (animationEnd = true), 500);
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
