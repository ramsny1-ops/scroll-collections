export class Reveal {
  constructor(options = {}) {
    this.options = {
      selector: "[data-scroll-reveal]",
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
      once: true,
      activeClass: "is-visible",
      ...options
    };
    this.elements = [...document.querySelectorAll(this.options.selector)];
    this.observer = null;
  }

  start() {
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(this.options.activeClass);
          entry.target.dispatchEvent(new CustomEvent("scrollcollections:reveal"));
          if (this.options.once) this.observer.unobserve(entry.target);
        } else if (!this.options.once) {
          entry.target.classList.remove(this.options.activeClass);
        }
      }
    }, { rootMargin: this.options.rootMargin, threshold: this.options.threshold });
    this.elements.forEach(el => this.observer.observe(el));
    return this;
  }

  destroy() {
    this.observer?.disconnect();
  }
}
