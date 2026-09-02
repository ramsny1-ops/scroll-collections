/** Clamp a number into a range. */
export const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

/** Linear interpolation. */
export const lerp = (start, end, progress) => start + (end - start) * progress;

/** Map a number from one range to another. */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  if (inMax === inMin) return outMin;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
};

/** Parse a finite number or return a fallback. */
export const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

/** Resolve selectors/elements/collections into an array of Elements. */
export const resolveElements = (input, root = document) => {
  if (!input) return [];
  if (typeof input === "string") return [...root.querySelectorAll(input)];
  if (input instanceof Element) return [input];
  if (Array.isArray(input)) return input.filter(item => item instanceof Element);
  if (input instanceof NodeList || input instanceof HTMLCollection) return [...input];
  return [];
};

/** Returns true when reduced motion is preferred. */
export const prefersReducedMotion = () =>
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
