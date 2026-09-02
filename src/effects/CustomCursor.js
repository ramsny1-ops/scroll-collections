import { lerp, prefersReducedMotion } from "../utils.js";

export class CustomCursor {
  constructor(options = {}) {
    this.options = {
      selector: "[data-scroll-cursor]",
      followerSelector: "[data-scroll-cursor-follower]",
      interactive: "a, button, input, textarea, select, [data-cursor-hover]",
      lerp: 0.16,
      disabledOnTouch: true,
      ...options
    };
    this.cursor = document.querySelector(this.options.selector);
    this.follower = document.querySelector(this.options.followerSelector);
    this.pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    this.current = { ...this.pointer };
    this.raf = null;
    this.running = false;
    this.onMove = this.onMove.bind(this);
    this.animate = this.animate.bind(this);
    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
  }

  start() {
    if (!this.cursor || prefersReducedMotion()) return this;
    if (this.options.disabledOnTouch && matchMedia("(pointer: coarse)").matches) return this;
    document.documentElement.classList.add("sc-cursor-enabled");
    addEventListener("pointermove", this.onMove, { passive: true });
    document.addEventListener("pointerover", this.onOver);
    document.addEventListener("pointerout", this.onOut);
    this.running = true;
    this.animate();
    return this;
  }

  onMove(event) {
    this.pointer.x = event.clientX;
    this.pointer.y = event.clientY;
    this.cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }

  onOver(event) {
    if (event.target.closest(this.options.interactive)) {
      this.cursor?.classList.add("is-hovering");
      this.follower?.classList.add("is-hovering");
    }
  }

  onOut(event) {
    if (event.target.closest(this.options.interactive)) {
      this.cursor?.classList.remove("is-hovering");
      this.follower?.classList.remove("is-hovering");
    }
  }

  animate() {
    if (!this.running) return;
    this.current.x = lerp(this.current.x, this.pointer.x, this.options.lerp);
    this.current.y = lerp(this.current.y, this.pointer.y, this.options.lerp);
    if (this.follower) {
      this.follower.style.transform = `translate3d(${this.current.x}px, ${this.current.y}px, 0)`;
    }
    this.raf = requestAnimationFrame(this.animate);
  }

  destroy() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    removeEventListener("pointermove", this.onMove);
    document.removeEventListener("pointerover", this.onOver);
    document.removeEventListener("pointerout", this.onOut);
    document.documentElement.classList.remove("sc-cursor-enabled");
  }
}
