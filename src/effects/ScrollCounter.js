import { number } from "../utils.js";

/** Animate numeric values once when they enter the viewport. */
export class ScrollCounter {
  constructor(options = {}) {
    this.options = { selector: "[data-scroll-counter]", duration: 900, ...options };
    this.elements = [...document.querySelectorAll(this.options.selector)];
    this.observer = null;
  }

  start() {
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        this.animate(entry.target);
        this.observer.unobserve(entry.target);
      }
    }, { threshold: 0.35 });
    this.elements.forEach(el => this.observer.observe(el));
    return this;
  }

  animate(element) {
    const to = number(element.dataset.scrollCounter, 0);
    const from = number(element.dataset.counterFrom, 0);
    const duration = Math.max(0, number(element.dataset.counterDuration, this.options.duration));
    const suffix = element.dataset.counterSuffix ?? "";
    const started = performance.now();
    const frame = now => {
      const t = duration === 0 ? 1 : Math.min(1, (now - started) / duration);
      const eased = 1 - (1 - t) ** 3;
      element.textContent = `${Math.round(from + (to - from) * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  destroy() { this.observer?.disconnect(); }
}
