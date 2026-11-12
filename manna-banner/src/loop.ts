import { random } from "remotion";

export const LOOP_FRAMES = 240;
export const TAU = Math.PI * 2;

// Every motion is a whole number of cycles per loop, so t = 1 matches t = 0.
export const wave = (t: number, cycles: number, phase = 0) =>
  Math.sin(TAU * (t * cycles + phase));

export type Flake = {
  x: number;
  size: number;
  cycles: number;
  offset: number;
  swayCycles: number;
  swayAmp: number;
  phase: number;
  depth: number;
};

export const FLAKES: Flake[] = Array.from({ length: 46 }, (_, i) => {
  const depth = random(`depth-${i}`);
  return {
    x: random(`x-${i}`),
    size: 2 + depth * 3.6,
    cycles: depth > 0.55 ? 2 : 1,
    offset: random(`offset-${i}`),
    swayCycles: 1 + Math.floor(random(`sway-${i}`) * 3),
    swayAmp: 6 + random(`amp-${i}`) * 16,
    phase: random(`phase-${i}`),
    depth,
  };
});

export const flakeAt = (f: Flake, t: number, width: number, height: number) => {
  const progress = (t * f.cycles + f.offset) % 1;
  const y = progress * (height + 40) - 20;
  const x = f.x * width + f.swayAmp * wave(t, f.swayCycles, f.phase);
  // Zero at both ends of the fall, so the wrap from bottom to top is invisible.
  const fade = Math.sin(Math.PI * progress);
  // Keep the wordmark area quieter.
  const overText = x < 480 && y > 110 && y < 380 ? 0.45 : 1;
  const twinkle = 0.75 + 0.25 * wave(t, 3, f.phase);
  const opacity =
    Math.min(1, fade * 1.4) * twinkle * overText * (0.55 + f.depth * 0.45);
  return { x, y, opacity };
};

const FALL_END = 0.42;
const REST_END = 0.78;
const FADE_END = 0.92;

// One speck's life within the loop: fall, land, glint, fade. Invisible at the wrap.
export const settleAt = (t: number, phase: number) => {
  const local = (t + phase) % 1;
  const fall = Math.min(1, local / FALL_END);
  const eased = 1 - (1 - fall) ** 2;
  const opacity =
    local < 0.06
      ? local / 0.06
      : local < REST_END
        ? 1
        : local < FADE_END
          ? 1 - (local - REST_END) / (FADE_END - REST_END)
          : 0;
  const since = local - FALL_END;
  const glint = since > 0 && since < 0.22 ? Math.sin((Math.PI * since) / 0.22) : 0;
  // Damped bounce the leaf makes when the speck lands.
  const dip = since > 0 ? Math.exp(-since * 12) * Math.sin(since * TAU * 4) : 0;
  return { eased, opacity, glint, dip };
};

export const rotatePoint = (
  [x, y]: readonly [number, number],
  [cx, cy]: readonly [number, number],
  deg: number,
): [number, number] => {
  const r = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return [cx + dx * Math.cos(r) - dy * Math.sin(r), cy + dx * Math.sin(r) + dy * Math.cos(r)];
};
