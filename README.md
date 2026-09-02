# Scroll Collections

A dependency-free ES2023 collection of scroll interactions for modern websites.

The project is intentionally modular. You can initialize the entire collection with one class or import only the effect you need.

## Included effects

1. Custom Cursor
   - instant cursor dot
   - eased follower ring
   - hover expansion for links and controls
   - disabled automatically for coarse pointers

2. Page Progress
   - fixed progress bar
   - numeric percentage output
   - CSS custom property `--scroll-progress`

3. Reveal
   - IntersectionObserver-powered entrances
   - replayable or once-only animation
   - user-controlled CSS classes

4. Horizontal Scroll Section
   - normal vertical wheel movement
   - sticky viewport
   - left/right track movement
   - responsive distance recalculation

5. Sticky Flip
   - sticky reading stage
   - configurable scroll hold distance
   - configurable number of turns
   - front/back markup support

6. Scroll Velocity
   - calculates current scroll momentum
   - writes `--scroll-velocity`
   - useful for skew, stretch, shape movement and kinetic typography

7. Section Tracker
   - identifies the active content section
   - adds an active class
   - dispatches a section-change event

8. Snap Assist
   - optional native CSS scroll snapping helper
   - emits an event when local scrolling settles

9. Scroll Transform
   - translate X/Y
   - scale
   - rotation
   - opacity
   - per-element values via data attributes

10. Scroll Counter
   - runs when a value enters the viewport
   - configurable start, target, duration and suffix

## Quick start

```html
<script type="module">
  import { ScrollCollections } from "./src/index.js";

  const scroll = new ScrollCollections();
  scroll.start();
</script>
```

Only effects with matching markup do visible work.

## Start selected effects only

```js
import { ScrollCollections } from "./src/index.js";

const scroll = new ScrollCollections({
  effects: {
    progress: true,
    cursor: false,
    reveal: true,
    horizontal: true,
    stickyFlip: false,
    velocity: true,
    sections: true,
    snap: false,
    transform: true,
    counter: true
  }
});

scroll.start();
```

## Page progress

```html
<div class="progress-shell">
  <div data-scroll-progress></div>
</div>

<span data-scroll-percentage>0%</span>
```

```js
import { ProgressBar } from "./src/index.js";
new ProgressBar().start();
```

The effect also exposes a CSS variable:

```css
html {
  --scroll-progress: 0;
}
```

## Custom cursor

```html
<div class="cursor-dot" data-scroll-cursor></div>
<div class="cursor-ring" data-scroll-cursor-follower></div>
```

```js
import { CustomCursor } from "./src/index.js";

new CustomCursor({
  lerp: 0.18,
  interactive: "a, button, [data-cursor-hover]"
}).start();
```

The library does not force a visual design. You style the cursor yourself.

## Reveal animation

```html
<article data-scroll-reveal>
  I appear when I enter the viewport.
</article>
```

```js
import { Reveal } from "./src/index.js";
new Reveal({ once: true }).start();
```

The default active class is `is-visible`.

```css
[data-scroll-reveal] {
  opacity: 0;
  transform: translateY(40px);
  transition: 700ms ease;
}

[data-scroll-reveal].is-visible {
  opacity: 1;
  transform: none;
}
```

## Horizontal storytelling

```html
<section data-horizontal-scroll>
  <div class="sticky">
    <div data-horizontal-track>
      <article>One</article>
      <article>Two</article>
      <article>Three</article>
    </div>
  </div>
</section>
```

Recommended CSS:

```css
[data-horizontal-scroll] {
  position: relative;
  overflow: clip;
}

.sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

[data-horizontal-track] {
  display: flex;
  width: max-content;
  will-change: transform;
}
```

Do not attach a `wheel` listener to force horizontal movement. `HorizontalScroll` derives horizontal motion from normal document scroll progress.

## Sticky flip that remains readable

```html
<section
  data-sticky-flip
  data-flip-turns="1.5"
  data-flip-hold="3">

  <div class="sticky-wrapper">
    <div data-flip-target>
      <div class="front">Front content</div>
      <div class="back">Back content</div>
    </div>
  </div>
</section>
```

`data-flip-hold="3"` creates approximately three viewport-heights of scroll room. The card can remain sticky inside that space while the library rotates it according to progress.

## Scroll mapped animation

```html
<h2
  data-scroll-animate
  data-from-x="-140"
  data-to-x="140"
  data-from-y="80"
  data-to-y="-40"
  data-from-scale="0.85"
  data-to-scale="1.1"
  data-from-rotate="-8"
  data-to-rotate="8"
  data-from-opacity="0.25"
  data-to-opacity="1">
  Animated heading
</h2>
```

```js
import { ScrollTransform } from "./src/index.js";
new ScrollTransform().start();
```

## Velocity-reactive CSS

```css
.title {
  transform: skewY(calc(var(--scroll-velocity) * 0.08deg));
}

.circle {
  transform: translateY(calc(var(--scroll-velocity) * 2px));
}
```

```js
import { ScrollVelocity } from "./src/index.js";
new ScrollVelocity().start();
```

## Counter

```html
<strong
  data-scroll-counter="98"
  data-counter-from="0"
  data-counter-duration="1200"
  data-counter-suffix="%">
  0%
</strong>
```

## Events

Reveal event:

```js
element.addEventListener("scrollcollections:reveal", () => {
  console.log("element revealed");
});
```

Active section event:

```js
document.addEventListener("scrollcollections:sectionchange", event => {
  console.log(event.detail.element);
});
```

Snap end event:

```js
container.addEventListener("scrollcollections:snapend", () => {
  console.log("local scroll settled");
});
```

## Performance design

The library uses `IntersectionObserver` for visibility-driven effects and `requestAnimationFrame` for continuous visual calculations. Continuous handlers are passive where appropriate. Most movement is applied through transforms rather than layout properties.

For very large pages, import only the effects you use instead of booting the full orchestrator.

## Accessibility

Custom cursor visuals are disabled when a coarse pointer is detected. The demos preserve native links and buttons. Reveal CSS includes a reduced-motion fallback. Do not use motion as the only way to communicate important information.

## Examples

Open `examples/index.html` for the collection showcase.

Five focused examples are included:

- `01-cursor-progress.html`
- `02-reveal-elements.html`
- `03-horizontal-sections.html`
- `04-sticky-flip.html`
- `05-full-story.html`

## Development

```bash
npm run serve
```

Then open:

```text
http://localhost:8080/examples/
```

Run checks:

```bash
npm run check
npm test
```

## License

MIT
