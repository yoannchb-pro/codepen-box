const datas = [
  { name: "Legend 1", value: 0.1 },
  { name: "Legend 2", value: 0.25 },
  { name: "Legend 3", value: 0.2 },
  { name: "Legend 4", value: 0.25 },
  { name: "Legend 5", value: 0.2 },
];

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  const [h, s, l] = [rnd(0, 360), rnd(42, 98), rnd(38, 90)];
  return "hsl(" + h + "," + s + "%," + l + "%)";
}

const chartContainer = document.querySelector("#chart-container");
function generateLegend(name, degreeFrom, degreeTo) {
  const delta = degreeFrom + (degreeTo - degreeFrom) / 2;
  const angle = Math.PI / 2 - delta * (Math.PI / 180);
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  console.log(name, delta, x, y);
  const i = document.createElement("i");
  i.className = "legend-line";
  let direction = "";
  if (x > 0 && y > 0) {
    direction = "p-rt";
  } else if (x < 0 && y < 0) {
    direction = "p-lb";
  } else if (x < 0 && y > 0) {
    direction = "p-lt";
  }
  if (direction) i.classList.add(direction);
  i.style.top = `calc(${-y} * 6.25rem + 7.5rem)`;
  i.style.left = `calc(${x} * 6.25rem + 7.5rem)`;
  i.setAttribute("data-legend", name);
  chartContainer.appendChild(i);
}

const chart = document.querySelector("#chart");
function generateChart() {
  const CIRCLE_DEGREE = 360;
  let done = 0;
  let bg = "";
  for (const data of datas) {
    const degreeFrom = done * CIRCLE_DEGREE;
    const degreeTo = (done + data.value) * CIRCLE_DEGREE;
    generateLegend(data.name, degreeTo, degreeFrom);
    bg += `${randomColor()} ${degreeFrom}deg ${degreeTo}deg,`;
    done += data.value;
  }
  // We remove the last ","
  bg = bg.substring(0, bg.length - 1);
  chart.style.background = `conic-gradient(${bg})`;
}

generateChart();
