const previous = document.querySelectorAll(".back, .timer > p");
const next = document.querySelectorAll(".front, .next p");
const animation = document.querySelector(".animated");

animation.addEventListener("animationiteration", function () {
  const count = parseInt(next[0].textContent);
  previous.forEach((e) => (e.textContent = count));
  next.forEach((e) => (e.textContent = count == 0 ? 9 : count - 1));
});
