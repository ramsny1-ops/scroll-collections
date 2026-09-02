import { clamp, number } from "../utils.js";

export class StickyFlip {
  constructor(options = {}) {
    this.options = { selector: "[data-sticky-flip]", ...options };
    this.items = [];
    this.update = this.update.bind(this);
  }

  start() {
    document.querySelectorAll(this.options.selector).forEach(section => {
      const target = section.querySelector("[data-flip-target]") || section.firstElementChild;
      if (!target) return;
      const turns = Math.max(0.25, number(section.dataset.flipTurns, 1));
      const hold = Math.max(1, number(section.dataset.flipHold, 2));
      section.style.minHeight = `${Math.max(180, hold * 100)}vh`;
      this.items.push({ section, target, turns });
    });
    addEventListener("scroll", this.update, { passive: true });
    addEventListener("resize", this.update, { passive: true });
    this.update();
    return this;
  }

  update() {
    for (const item of this.items) {
      const rect = item.section.getBoundingClientRect();
      const range = item.section.offsetHeight - innerHeight;
      const progress = range <= 0 ? 0 : clamp(-rect.top / range);
      const degrees = progress * item.turns * 360;
      item.target.style.setProperty("--flip-progress", String(progress));
      item.target.style.transform = `rotateY(${degrees}deg)`;
      item.target.dataset.flipSide = Math.cos(degrees * Math.PI / 180) >= 0 ? "front" : "back";
    }
  }

  destroy() {
    removeEventListener("scroll", this.update);
    removeEventListener("resize", this.update);
  }
}
