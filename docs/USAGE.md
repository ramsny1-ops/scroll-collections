# Usage Guide

## Choose the cheapest effect that solves the problem

Use `Reveal` when the only question is whether an element has entered the viewport. Do not use a continuous scroll transform for simple entrance animation.

Use `ScrollTransform` when the effect must change continuously as the visitor scrolls.

Use `ScrollVelocity` when the visual should react to speed rather than absolute document position.

Use `HorizontalScroll` for narrative sequences that need a wide track while preserving natural page scrolling.

Use `StickyFlip` when an object needs additional reading time before the document continues.

## Combining effects

Effects are independent, so one element can participate in more than one system. Avoid attaching two systems that both write the `transform` property to the exact same element. Instead, use nested wrappers.

Example:

```html
<div data-scroll-reveal>
  <div data-scroll-animate data-from-x="-100" data-to-x="100">
    Content
  </div>
</div>
```

The outer wrapper owns reveal state. The inner wrapper owns continuous transform state.

## Complex elements

A target can contain complete UI structures. The library does not inspect or rebuild its child DOM.

```html
<article data-scroll-reveal>
  <header>
    <span>Analytics</span>
    <button type="button">Details</button>
  </header>
  <strong data-scroll-counter="84" data-counter-suffix="%">0%</strong>
  <p>Conversion completion</p>
</article>
```

## SVG and shapes

Apply scroll data attributes to an SVG wrapper or to HTML wrappers around individual shapes. When animating SVG primitives directly, prefer CSS transforms with an explicit `transform-box` and `transform-origin`.

## Text

Whole headings work directly. For per-word or per-letter effects, split the text in your application and attach data attributes to the generated spans. Scroll Collections intentionally does not mutate text content automatically.
