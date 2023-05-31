const typer = document.querySelector("[data-typer]");

const text = typer.dataset.typer;
const char = '<span class="char">|</span>';

let index = -1;

function handler() {
  typer.innerHTML = text.slice(0, ++index) + char;
  if (index <= text.length) setTimeout(handler, 100);
}

setInterval(() => {
  index = -1;
  handler();
}, 5000);

handler();
