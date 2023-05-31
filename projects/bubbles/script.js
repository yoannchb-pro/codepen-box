const container = document.querySelector(".container");

const bubles = [];

//bubles config
const config = {
  amount: 5,
  size: 150,
  speed: 2,
};

function createBuble() {
  const el = document.createElement("div");
  el.className = "buble";
  el.style.width = config.size + "px";
  el.style.height = config.size + "px";
  bubles.push({
    vx: Math.random() > 0.5 ? -config.speed : config.speed,
    vy: Math.random() > 0.5 ? config.speed : -config.speed,
    x: Math.floor(Math.random() * (window.innerWidth - config.size)),
    y: Math.floor(Math.random() * (window.innerHeight - config.size)),
    el,
  });
}

(function () {
  for (let i = 0; i < config.amount; ++i) {
    createBuble();
  }

  function updatePosition(buble) {
    buble.el.style.top = buble.y + "px";
    buble.el.style.left = buble.x + "px";
  }

  for (const buble of bubles) {
    updatePosition(buble);
    container.appendChild(buble.el);
  }

  function handler() {
    for (const buble of bubles) {
      buble.x += buble.vx;
      buble.y += buble.vy;
      if (buble.x < 0 || buble.x > window.innerWidth - config.size)
        buble.vx *= -1;
      if (buble.y < 0 || buble.y > window.innerHeight - config.size)
        buble.vy *= -1;
      updatePosition(buble);
    }

    window.requestAnimationFrame(handler);
  }

  handler();
})();
