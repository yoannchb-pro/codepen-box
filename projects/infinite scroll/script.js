const div = document.querySelectorAll(".infinite");
let id = 0;

class InfiniteScroll {
  constructor(el) {
    this.$el = el;
    this.$direction = parseInt(el.dataset.direction);
    this.$angleDirection = this.$direction;
    this.$angle = 0;
    this.$list = [];

    for (let i = 0; i < 4; ++i) {
      const ch = this.createElement();
      this.$list.push({ el: ch, top: 0 });
      el.appendChild(ch);
    }

    this.init();
  }

  createElement() {
    id++;
    const el = document.createElement("div");
    el.className = "img";
    el.style.backgroundImage = `url('https://picsum.photos/600/300?random=${id}')`;
    return el;
  }

  init() {
    document.body.addEventListener("wheel", (event) => this.moove(event));
  }

  moove(event) {
    const delta = (event.deltaY / 5) * this.$direction;

    //infinite when go down
    const first = this.$list[0].el.getBoundingClientRect();
    if (first.top + delta >= -200) {
      const el = this.$list.pop();
      el.el.remove();

      let newTop = 0;
      for (const element of this.$list) {
        element.top -= first.height;
        newTop = element.top;
      }

      const ch = this.createElement();
      this.$el.prepend(ch);
      this.$list.unshift({ el: ch, top: newTop });
    }

    //infinite when go up
    const last = this.$list[this.$list.length - 1].el.getBoundingClientRect();
    if (last.top + delta < window.innerHeight + 100) {
      const el = this.$list.shift();
      el.el.remove();

      let newTop = 0;
      for (const element of this.$list) {
        element.top += first.height;
        newTop = element.top;
      }

      const ch = this.createElement();
      this.$el.appendChild(ch);
      this.$list.push({ el: ch, top: newTop });
    }

    //scroll effect
    for (const element of this.$list) {
      element.top += delta;
      element.el.style.transform = `translateY(${element.top}px)`;
    }

    //rotate
    this.$angle += this.$angleDirection / 10;
    this.$el.style.transform = `rotate(${this.$angle}deg)`;

    if (Math.abs(this.$angle) > 2) {
      this.$angleDirection *= -1;
    }
  }
}

div.forEach((e) => {
  new InfiniteScroll(e);
});
