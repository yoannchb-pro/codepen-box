const slides = Array.from(document.querySelectorAll(".slide")).map((el, x) => ({
  el,
  x,
  index: x,
}));
const pins = document.querySelector(".pin-container");
const right = document.querySelector(".arrow-right");
const left = document.querySelector(".arrow-left");

for (const slide of slides) {
  const pin = document.createElement("div");
  pins.appendChild(pin);
}

const allPins = pins.querySelectorAll("div");

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

    allPins.forEach((pin, index) => {
      const actual = slides.find((e) => e.index === index);
      if (actual.x === 0) {
        pin.style.background = "#00000060";
      } else {
        pin.style.background = null;
      }
    });

    if (last.x === 0 && (delta === -1 || delta === 0)) {
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

allPins.forEach((pin, index) => {
  pin.addEventListener("click", function () {
    if (animationEnd) {
      clearInterval(interval);
      const actual = slides.find((e) => e.index === index);

      slides.forEach((slide) => {
        slide.x -= actual.x;
      });

      slidesHandler(0);
      startSlide();
    }
  });
});
