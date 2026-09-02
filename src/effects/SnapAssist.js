export class SnapAssist {
  constructor(options = {}) {
    this.options = { selector: "[data-scroll-snap]", delay: 120, ...options };
    this.container = document.querySelector(this.options.selector);
    this.timer = null;
    this.onScroll = this.onScroll.bind(this);
  }

  start() {
    if (!this.container) return this;
    this.container.style.scrollSnapType ||= "y proximity";
    [...this.container.children].forEach(child => child.style.scrollSnapAlign ||= "start");
    this.container.addEventListener("scroll", this.onScroll, { passive: true });
    return this;
  }

  onScroll() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.container?.dispatchEvent(new CustomEvent("scrollcollections:snapend")), this.options.delay);
  }

  destroy() {
    clearTimeout(this.timer);
    this.container?.removeEventListener("scroll", this.onScroll);
  }
}
