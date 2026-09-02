import { clamp, lerp, number } from "../utils.js";

/**
 * Maps an element's travel through the viewport to transform and opacity values.
 * Configure with data-scroll-animate plus data-from-x, data-to-x, data-from-y,
 * data-to-y, data-from-scale, data-to-scale, data-from-rotate and data-to-rotate.
 */
export class ScrollTransform {
  constructor(options = {}) {
    this.options = { selector: "[data-scroll-animate]", ...options };
    this.items = [];
    this.raf = null;
    this.pending = false;
    this.request = this.request.bind(this);
    this.update = this.update.bind(this);
  }

  start() {
    this.items = [...document.querySelectorAll(this.options.selector)].map(element => ({
      element,
      fromX: number(element.dataset.fromX, 0), toX: number(element.dataset.toX, 0),
      fromY: number(element.dataset.fromY, 40), toY: number(element.dataset.toY, -40),
      fromScale: number(element.dataset.fromScale, 1), toScale: number(element.dataset.toScale, 1),
      fromRotate: number(element.dataset.fromRotate, 0), toRotate: number(element.dataset.toRotate, 0),
      fromOpacity: number(element.dataset.fromOpacity, 1), toOpacity: number(element.dataset.toOpacity, 1)
    }));
    addEventListener("scroll", this.request, { passive: true });
    addEventListener("resize", this.request, { passive: true });
    this.request();
    return this;
  }

  request() {
    if (this.pending) return;
    this.pending = true;
    this.raf = requestAnimationFrame(this.update);
  }

  update() {
    this.pending = false;
    for (const item of this.items) {
      const rect = item.element.getBoundingClientRect();
      const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
      const x = lerp(item.fromX, item.toX, progress);
      const y = lerp(item.fromY, item.toY, progress);
      const scale = lerp(item.fromScale, item.toScale, progress);
      const rotate = lerp(item.fromRotate, item.toRotate, progress);
      const opacity = clamp(lerp(item.fromOpacity, item.toOpacity, progress));
      item.element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      item.element.style.opacity = String(opacity);
      item.element.style.setProperty("--element-scroll-progress", String(progress));
    }
  }

  destroy() {
    removeEventListener("scroll", this.request);
    removeEventListener("resize", this.request);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
