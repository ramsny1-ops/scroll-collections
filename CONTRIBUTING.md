# Contributing

Keep effects dependency-free and focused on one responsibility. New continuous effects should use `requestAnimationFrame` or an equivalent bounded update strategy. Avoid wheel hijacking and avoid forcing document scroll position unless the feature explicitly requires it.

Run `npm run check` and `npm test` before submitting changes.
