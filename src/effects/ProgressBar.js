import { clamp } from "../utils.js";

/** Global document progress bar and percentage text updater. */
export class ProgressBar {
  constructor(options = {}) {
    this.options = {
      selector: "[data-scroll-progress]",
      textSelector: "[data-scroll-percentage]",
      axis: "x",
      variable: "--scroll-progress",
      ...options
    };
    this.elements = [...document.querySelectorAll(this.options.selector)];
    this.textElements = [...document.querySelectorAll(this.options.textSelector)];
    this.update = this.update.bind(this);
  }

  start() {
    addEventListener("scroll", this.update, { passive: true });
    addEventListener("resize", this.update, { passive: true });
    this.update();
    return this;
  }

  update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max <= 0 ? 1 : clamp(scrollY / max);
    const value = Math.round(progress * 100);
    document.documentElement.style.setProperty(this.options.variable, String(progress));
    for (const el of this.elements) {
      const percent = `${(progress * 100).toFixed(2)}%`;
      if (this.options.axis === "y") el.style.height = percent;
      else el.style.width = percent;
      el.setAttribute("aria-valuenow", String(value));
    }
    for (const el of this.textElements) el.textContent = `${value}%`;
  }

  destroy() {
    removeEventListener("scroll", this.update);
    removeEventListener("resize", this.update);
  }
}
