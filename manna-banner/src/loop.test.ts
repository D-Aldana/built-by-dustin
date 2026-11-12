import { describe, expect, it } from "vitest";
import { FLAKES, LOOP_FRAMES, flakeAt, rotatePoint, settleAt, wave } from "./loop";

const W = 1024;
const H = 500;
const LAST = (LOOP_FRAMES - 1) / LOOP_FRAMES;
const STEP = 1 / LOOP_FRAMES;

describe("wave", () => {
  it("returns to its start value after a full loop for whole cycle counts", () => {
    for (const cycles of [1, 2, 3]) {
      expect(wave(1, cycles, 0.3)).toBeCloseTo(wave(0, cycles, 0.3), 10);
    }
  });
});

describe("manna flakes", () => {
  it("use whole-number cycle counts so the loop is seamless", () => {
    for (const f of FLAKES) {
      expect(Number.isInteger(f.cycles)).toBe(true);
      expect(Number.isInteger(f.swayCycles)).toBe(true);
    }
  });

  it("are deterministic across renders", () => {
    const a = FLAKES.map((f) => flakeAt(f, 0.37, W, H));
    const b = FLAKES.map((f) => flakeAt(f, 0.37, W, H));
    expect(a).toEqual(b);
  });

  it("move only a small step between the last frame and the first", () => {
    for (const f of FLAKES) {
      const end = flakeAt(f, LAST, W, H);
      const start = flakeAt(f, 0, W, H);
      const regular = flakeAt(f, STEP, W, H);

      // A flake wrapping from bottom to top jumps in y, but must be invisible at that moment.
      if (Math.abs(end.y - start.y) > H / 2) {
        expect(Math.min(end.opacity, start.opacity)).toBeLessThan(0.1);
        continue;
      }
      expect(Math.abs(end.x - start.x)).toBeLessThanOrEqual(
        Math.abs(regular.x - start.x) + 1,
      );
      expect(Math.abs(end.opacity - start.opacity)).toBeLessThan(0.1);
    }
  });

  it("are fully transparent at the top and bottom of their fall", () => {
    // Right side of the frame, away from the dimmed wordmark area.
    const f = { ...FLAKES[0], x: 0.9, offset: 0, cycles: 1 };
    expect(flakeAt(f, 0, W, H).opacity).toBeCloseTo(0, 10);
    expect(flakeAt(f, 0.5, W, H).opacity).toBeGreaterThan(0.3);
  });
});

describe("specks settling on the sprig", () => {
  it("are invisible and still at the loop wrap", () => {
    const start = settleAt(0, 0);
    const end = settleAt(LAST, 0);
    expect(start.opacity).toBe(0);
    expect(end.opacity).toBe(0);
    expect(Math.abs(end.dip)).toBeLessThan(0.01);
  });

  it("land, glint, then fade out", () => {
    expect(settleAt(0.2, 0).eased).toBeLessThan(1);
    expect(settleAt(0.5, 0).eased).toBe(1);
    expect(settleAt(0.53, 0).glint).toBeGreaterThan(0.9);
    expect(settleAt(0.95, 0).opacity).toBe(0);
  });

  it("make the leaf bounce only after landing, settling back to rest", () => {
    expect(settleAt(0.3, 0).dip).toBe(0);
    expect(Math.abs(settleAt(0.5, 0).dip)).toBeGreaterThan(0.1);
    expect(Math.abs(settleAt(0.99, 0).dip)).toBeLessThan(0.01);
  });

  it("is continuous over each speck's whole cycle", () => {
    for (let f = 1; f < LOOP_FRAMES; f++) {
      const a = settleAt((f - 1) / LOOP_FRAMES, 0.4);
      const b = settleAt(f / LOOP_FRAMES, 0.4);
      expect(Math.abs(a.opacity - b.opacity)).toBeLessThan(0.1);
      expect(Math.abs(a.dip - b.dip)).toBeLessThan(0.25);
    }
  });
});

describe("rotatePoint", () => {
  it("rotates around a pivot", () => {
    const [x, y] = rotatePoint([10, 0], [0, 0], 90);
    expect(x).toBeCloseTo(0, 10);
    expect(y).toBeCloseTo(10, 10);
  });
});
