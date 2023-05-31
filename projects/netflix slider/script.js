const container = document.querySelector("[data-slide]");
const before = document.querySelector(".before");
const after = document.querySelector(".after");

const data = [];
const sliderSpeed = 4;

const imgs = [
  "https://cdn11.neko-sama.xyz/2/226mhyBWAID.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/2166F0mUh7qP.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/536fXSTSZN.jpg?20230315",
  "https://cdn10.neko-sama.xyz/2/f880d0d6a01ba52fcfe6475defc13e0f.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/231a16Y7xZO.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/1970mlVFIm5y.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/1118kLTQZVZ8.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/1896LHUJBbu3.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/1971coXfbS9V.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/2396mIR2fbzo.jpg?20230315",
  "https://cdn10.neko-sama.xyz/2/19702ce80aa823cd508f85c0034a7e97.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/603ankzpVLh.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/1176xOD4MBw6.jpg?20230315",
  "https://cdn10.neko-sama.xyz/2/1074cf6dee6fd3a453ea3fa9d190a430.jpg?20230315",
  "https://cdn11.neko-sama.xyz/2/2816cZ61ri6x.jpg?20230315",
];

for (let i = 0; i < imgs.length; ++i) {
  const div = document.createElement("div");
  div.className = "movie";
  div.style.backgroundImage = `url("${imgs[i]}")`;
  container.appendChild(div);
  data.push({ y: i, element: div });
  container.appendChild(div);
}

let animationEnd = false;

data[0].element.addEventListener("transitionend", () => (animationEnd = true));

function display() {
  for (const el of data) {
    requestAnimationFrame(() => {
      el.element.style.transition = "0.7s ease";
      el.element.style.transform = `translateX(calc(${el.y * 100}% + ${
        el.y
      }rem))`;
    });
  }
}

function move(delta) {
  animationEnd = false;

  while (data[0].y < 0) {
    const back = data.shift();
    back.y = data.at(-1).y + 1;
    back.element.style.transition = "none";
    back.element.style.transform = `translateX(calc(${back.y * 100}% + ${
      back.y
    }rem))`;
    data.push(back);
  }

  while (data[0].y + delta >= 0) {
    const back = data.pop();
    back.y = data[0].y - 1;
    back.element.style.transition = "none";
    back.element.style.transform = `translateX(calc(${back.y * 100}% + ${
      back.y
    }rem))`;
    data.unshift(back);
  }

  for (const el of data) {
    el.y += delta;
    display();
  }
}

before.addEventListener("click", function () {
  if (animationEnd) move(sliderSpeed);
});

after.addEventListener("click", function () {
  if (animationEnd) move(-sliderSpeed);
});

after.addEventListener(
  "click",
  function () {
    before.style.display = "flex";
  },
  { once: true }
);

//phone slider
const position = {
  x: 0,
  last: 0,
  touchstart: null,
};
let finalPosition = null;

container.addEventListener(
  "touchstart",
  (event) => (position.touchstart = event.touches[0].clientX),
  false
);
container.addEventListener("touchmove", handleTouchMove, false);
container.addEventListener(
  "touchend",
  () => {
    position.last = finalPosition;
    position.touchstart = null;
  },
  false
);

// Calcule le déplacement horizontal et applique la transformation au container
function handleTouchMove(event) {
  if (!position.touchstart) return;

  const x = event.touches[0].clientX;
  position.x = position.touchstart - x;

  finalPosition = Math.max(position.last + position.x, 0);
  //16 = le margin (1rem = 16px ici)
  finalPosition = Math.min(
    finalPosition,
    data.length * data[0].element.offsetWidth +
      data.length * 16 -
      document.body.offsetWidth
  );

  for (const el of data) {
    el.element.style.transition = "none";
    el.element.style.transform = `translateX(calc(${el.y * 100}% + ${
      el.y
    }rem - ${finalPosition}px))`;
  }

  event.preventDefault();
}

display();
