import test from "node:test";
import assert from "node:assert/strict";
import { clamp, lerp, mapRange, number } from "../src/utils.js";

test("clamp limits values", () => {
  assert.equal(clamp(-5), 0);
  assert.equal(clamp(0.5), 0.5);
  assert.equal(clamp(5), 1);
});

test("lerp interpolates", () => {
  assert.equal(lerp(0, 100, 0.25), 25);
});

test("mapRange maps ranges", () => {
  assert.equal(mapRange(5, 0, 10, 0, 100), 50);
});

test("number returns fallback for non-finite input", () => {
  assert.equal(number("12", 0), 12);
  assert.equal(number("bad", 7), 7);
});
