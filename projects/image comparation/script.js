const container = document.querySelector(".container");
const overwrite = document.querySelector(".overwrite");
const move = document.querySelector(".move");
const rect = overwrite.getBoundingClientRect();

let mousePressed = false;

move.addEventListener("mousedown", function () {
  mousePressed = true;
});

document.addEventListener("mouseup", function () {
  mousePressed = false;
});

document.body.addEventListener("mousemove", function (event) {
  if (mousePressed) {
    const x = event.clientX - rect.left;
    const position = Math.max(Math.min(x, container.offsetWidth), 0) + "px";
    overwrite.style.width = position;
    move.style.left = position;
  }
});
