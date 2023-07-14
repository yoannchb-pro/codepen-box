const btn = document.querySelector("button");

const btnPos = btn.getBoundingClientRect();
const btnY = btnPos.top + btnPos.height / 2;
const btnX = btnPos.left + btnPos.width / 2;

const radiusDetection = 150;
const radius = 50;

function applyTranslationWithAnimation(translation) {
  btn.animate([{ transform: translation }], {
    duration: 1000,
    fill: "forwards",
    easing: "ease-in-out",
  });
}

document.addEventListener("mousemove", (event) => {
  const [x, y] = [event.pageX, event.pageY];
  const [dx, dy] = [x - btnX, y - btnY];
  const mouseRadius = Math.sqrt(dx * dx + dy * dy);
  if (mouseRadius <= radiusDetection) {
    const hypp = Math.sqrt(dx * dx + dy * dy);
    const tx = hypp === 0 ? 0 : dx / hypp;
    const ty = hypp === 0 ? 0 : dy / hypp;
    const computedRadius = radius * (hypp / radiusDetection);
    const translation = `translate(${tx * computedRadius}px, ${
      ty * computedRadius
    }px)`;
    applyTranslationWithAnimation(translation);
  } else {
    applyTranslationWithAnimation("none");
  }
});
