import { ProgressBar } from "./effects/ProgressBar.js";
import { CustomCursor } from "./effects/CustomCursor.js";
import { Reveal } from "./effects/Reveal.js";
import { HorizontalScroll } from "./effects/HorizontalScroll.js";
import { StickyFlip } from "./effects/StickyFlip.js";
import { ScrollVelocity } from "./effects/ScrollVelocity.js";
import { SectionTracker } from "./effects/SectionTracker.js";
import { SnapAssist } from "./effects/SnapAssist.js";
import { ScrollTransform } from "./effects/ScrollTransform.js";
import { ScrollCounter } from "./effects/ScrollCounter.js";

/** Main orchestrator for the Scroll Collections library. */
export class ScrollCollections {
  constructor(options = {}) { this.options = options; this.instances = []; }

  start() {
    const effects = this.options.effects ?? {
      progress: true, cursor: true, reveal: true, horizontal: true,
      stickyFlip: true, velocity: true, sections: true, snap: true,
      transform: true, counter: true
    };
    const start = (enabled, Effect, config) => {
      if (!enabled) return;
      const instance = new Effect(config).start();
      this.instances.push(instance);
    };
    start(effects.progress, ProgressBar, this.options.progress);
    start(effects.cursor, CustomCursor, this.options.cursor);
    start(effects.reveal, Reveal, this.options.reveal);
    start(effects.horizontal, HorizontalScroll, this.options.horizontal);
    start(effects.stickyFlip, StickyFlip, this.options.stickyFlip);
    start(effects.velocity, ScrollVelocity, this.options.velocity);
    start(effects.sections, SectionTracker, this.options.sections);
    start(effects.snap, SnapAssist, this.options.snap);
    start(effects.transform, ScrollTransform, this.options.transform);
    start(effects.counter, ScrollCounter, this.options.counter);
    return this;
  }

  destroy() { this.instances.forEach(instance => instance.destroy?.()); this.instances = []; }
}
