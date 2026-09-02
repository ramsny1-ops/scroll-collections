import { clamp } from "../utils.js";

export class HorizontalScroll {
  constructor(options = {}) {
    this.options = {
      selector: "[data-horizontal-scroll]",
      trackSelector: "[data-horizontal-track]",
      ...options
    };
    this.items = [];
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  start() {
    document.querySelectorAll(this.options.selector).forEach(section => {
      const track = section.querySelector(this.options.trackSelector);
      if (!track) return;
      const item = { section, track, distance: 0 };
      this.items.push(item);
      this.measure(item);
    });
    addEventListener("scroll", this.onScroll, { passive: true });
    addEventListener("resize", this.onResize, { passive: true });
    this.onScroll();
    return this;
  }

  measure(item) {
    item.distance = Math.max(0, item.track.scrollWidth - innerWidth);
    item.section.style.setProperty("--horizontal-distance", `${item.distance}px`);
    item.section.style.height = `${innerHeight + item.distance}px`;
  }

  onResize() {
    this.items.forEach(item => this.measure(item));
    this.onScroll();
  }

  onScroll() {
    for (const item of this.items) {
      const rect = item.section.getBoundingClientRect();
      const usable = item.section.offsetHeight - innerHeight;
      const progress = usable <= 0 ? 0 : clamp(-rect.top / usable);
      item.track.style.transform = `translate3d(${-item.distance * progress}px, 0, 0)`;
      item.section.style.setProperty("--horizontal-progress", String(progress));
    }
  }

  destroy() {
    removeEventListener("scroll", this.onScroll);
    removeEventListener("resize", this.onResize);
  }
}
