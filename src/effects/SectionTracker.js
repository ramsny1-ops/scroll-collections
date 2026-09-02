export class SectionTracker {
  constructor(options = {}) {
    this.options = {
      selector: "[data-scroll-section]",
      activeClass: "is-active",
      threshold: 0.55,
      ...options
    };
    this.elements = [...document.querySelectorAll(this.options.selector)];
    this.observer = null;
  }

  start() {
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        entry.target.classList.toggle(this.options.activeClass, entry.isIntersecting);
        if (entry.isIntersecting) {
          document.documentElement.dataset.activeScrollSection = entry.target.id || entry.target.dataset.scrollSection || "";
          document.dispatchEvent(new CustomEvent("scrollcollections:sectionchange", { detail: { element: entry.target } }));
        }
      }
    }, { threshold: this.options.threshold });
    this.elements.forEach(el => this.observer.observe(el));
    return this;
  }

  destroy() { this.observer?.disconnect(); }
}
