import { clamp, lerp } from "../utils.js";

export class ScrollVelocity {
  constructor(options = {}) {
    this.options = {
      variable: "--scroll-velocity",
      smoothing: 0.12,
      max: 60,
      ...options
    };
    this.lastY = scrollY;
    this.target = 0;
    this.current = 0;
    this.raf = null;
    this.running = false;
    this.onScroll = this.onScroll.bind(this);
    this.animate = this.animate.bind(this);
  }

  start() {
    this.running = true;
    addEventListener("scroll", this.onScroll, { passive: true });
    this.animate();
    return this;
  }

  onScroll() {
    const delta = scrollY - this.lastY;
    this.lastY = scrollY;
    this.target = clamp(delta, -this.options.max, this.options.max);
  }

  animate() {
    if (!this.running) return;
    this.current = lerp(this.current, this.target, this.options.smoothing);
    this.target *= 0.88;
    document.documentElement.style.setProperty(this.options.variable, this.current.toFixed(3));
    this.raf = requestAnimationFrame(this.animate);
  }

  destroy() {
    this.running = false;
    removeEventListener("scroll", this.onScroll);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
