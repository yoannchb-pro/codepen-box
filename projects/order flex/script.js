const list = document.querySelector("ul");
const child = document.querySelector("ul").querySelectorAll("li");
const size = child.length;

function updateOrder(el, or, inc) {
  child.forEach((e) => {
    const order = getComputedStyle(e).getPropertyValue("order");
    const parsedOrder = parseInt(order);
    if (e != el && order == or) {
      e.style.setProperty("--order", parsedOrder + inc);
    }
  });
}

function handleUp(e) {
  const parent = e.target.closest("li");
  const order = getComputedStyle(parent).getPropertyValue("order");
  const parsedOrder = parseInt(order);
  if (parsedOrder > 1) {
    parent.style.setProperty("--order", parsedOrder - 1);
    updateOrder(parent, parsedOrder - 1, 1);
  }
}

function handleDown(e) {
  const parent = e.target.closest("li");
  const order = getComputedStyle(parent).getPropertyValue("order");
  const parsedOrder = parseInt(order);
  if (parsedOrder < size) {
    parent.style.setProperty("--order", parsedOrder + 1);
    updateOrder(parent, parsedOrder + 1, -1);
  }
}

child.forEach((e) => {
  e.querySelector(".up").addEventListener("click", handleUp);
  e.querySelector(".down").addEventListener("click", handleDown);
});
