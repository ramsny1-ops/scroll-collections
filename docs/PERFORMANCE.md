# Performance Notes

## Continuous work

`ScrollTransform`, `HorizontalScroll`, `StickyFlip` and `ScrollVelocity` perform continuous visual updates. Keep the number of continuously animated elements reasonable.

## Transform ownership

Avoid multiple independent effects writing `element.style.transform` on the same element. Use nested wrappers.

## Browser rendering

Prefer transform and opacity. Avoid repeatedly changing width, height, top or left during scrolling when a transform can express the same visual result.

## IntersectionObserver

Reveal and counter effects are observer-driven. They avoid polling every element on every scroll event.

## Passive listeners

Document scroll listeners are registered as passive because they do not call `preventDefault()`.

## Reduced motion

The demo stylesheet disables reveal transitions when the operating system requests reduced motion. Production sites should extend the same approach to custom transforms where necessary.
