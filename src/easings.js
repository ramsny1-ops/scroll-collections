export const easings = Object.freeze({
  linear: t => t,
  easeIn: t => t * t,
  easeOut: t => 1 - (1 - t) ** 2,
  easeInOut: t => t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2,
  smooth: t => t * t * (3 - 2 * t),
  smoother: t => t * t * t * (t * (t * 6 - 15) + 10),
  spring: t => 1 - Math.cos(t * Math.PI * 4) * Math.exp(-t * 6)
});
