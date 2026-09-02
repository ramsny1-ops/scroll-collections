# API Reference

## ScrollCollections

Central orchestrator.

### constructor(options)

Accepts per-effect options and an optional `effects` enable/disable map.

### start()

Starts enabled effects and returns the instance.

### destroy()

Destroys all child effect instances and removes listeners when supported.

## ProgressBar

Options:

- `selector`: progress bar elements. Default `[data-scroll-progress]`
- `textSelector`: numeric output. Default `[data-scroll-percentage]`
- `axis`: `x` or `y`
- `variable`: CSS property name. Default `--scroll-progress`

Methods: `start()`, `update()`, `destroy()`.

## CustomCursor

Options:

- `selector`
- `followerSelector`
- `interactive`
- `lerp`
- `disabledOnTouch`

Methods: `start()`, `destroy()`.

## Reveal

Options:

- `selector`
- `rootMargin`
- `threshold`
- `once`
- `activeClass`

Methods: `start()`, `destroy()`.

## HorizontalScroll

Options:

- `selector`
- `trackSelector`

Methods: `start()`, `onScroll()`, `destroy()`.

Each horizontal section receives `--horizontal-progress`.

## StickyFlip

Markup attributes:

- `data-flip-turns`
- `data-flip-hold`
- `data-flip-target`

The target receives `--flip-progress` and `data-flip-side`.

## ScrollVelocity

Options:

- `variable`
- `smoothing`
- `max`

Writes the current smoothed velocity to `--scroll-velocity`.

## SectionTracker

Options:

- `selector`
- `activeClass`
- `threshold`

Writes the active section identifier to `document.documentElement.dataset.activeScrollSection` and dispatches `scrollcollections:sectionchange`.

## SnapAssist

Options:

- `selector`
- `delay`

Applies native `scroll-snap-type: y proximity` when not already defined.

## ScrollTransform

Recognized data attributes:

- `data-from-x`
- `data-to-x`
- `data-from-y`
- `data-to-y`
- `data-from-scale`
- `data-to-scale`
- `data-from-rotate`
- `data-to-rotate`
- `data-from-opacity`
- `data-to-opacity`

Every target receives `--element-scroll-progress`.

## ScrollCounter

Attributes:

- `data-scroll-counter`: target value
- `data-counter-from`
- `data-counter-duration`
- `data-counter-suffix`
