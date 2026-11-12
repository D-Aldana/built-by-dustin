import { Composition, AbsoluteFill, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { FLAKES, LOOP_FRAMES, TAU, flakeAt, rotatePoint, settleAt, wave } from "./loop";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";

const { fontFamily: cormorant } = loadCormorant("normal", {
  weights: ["500"],
  subsets: ["latin"],
});
const { fontFamily: cormorantItalic } = loadCormorant("italic", {
  weights: ["400"],
  subsets: ["latin"],
});

const COLORS = {
  bgTop: "#FFFCF5",
  bgBottom: "#EFE5D3",
  ink: "#3A2E25",
  muted: "#7A7069",
  accent: "#B8977E",
  sprig: "#9A7442",
  sprigLight: "#E6C994",
};

const LEAVES = [
  { d: "M33.27 -47.51A48.67 48.67 0 0 1 27.69 -111.27A48.67 48.67 0 0 1 33.27 -47.51Z", base: [33.27, -47.51], phase: 0, land: [29.9, -85.8], settle: 0 },
  { d: "M50.47 -72.09A44.88 44.88 0 0 1 108.43 -87.61A44.88 44.88 0 0 1 50.47 -72.09Z", base: [50.47, -72.09], phase: 0.18, land: [85.2, -81.4], settle: 0.4 },
  { d: "M66.53 -95.02A42.58 42.58 0 0 1 61.65 -150.81A42.58 42.58 0 0 1 66.53 -95.02Z", base: [66.53, -95.02], phase: 0.36, land: [63.6, -128.5], settle: 0.2 },
  { d: "M78.29 -111.81A43.73 43.73 0 0 1 111.56 -159.33A43.73 43.73 0 0 1 78.29 -111.81Z", base: [78.29, -111.81], phase: 0.52, land: [98.2, -140.3], settle: 0.6 },
] as const;

const OLIVE_PIVOT = [19.5, -27.8] as const;
const OLIVE_LAND = [49, -22] as const;
const OLIVE_SETTLE = 0.8;
// Top of the frame in the sprig's own coordinates.
const SKY_Y = -215;

const Background: React.FC<{ t: number }> = ({ t }) => {
  const breathe = 0.5 + 0.5 * wave(t, 1, -0.25);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgTop} 0%, #FAF3E6 55%, ${COLORS.bgBottom} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 75% at 78% -10%, rgba(255,246,222,${0.75 + breathe * 0.25}) 0%, rgba(255,240,210,0) 70%)`,
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: -200,
            left: 560 + i * 120,
            width: 70 + i * 30,
            height: 900,
            transform: "rotate(24deg)",
            transformOrigin: "top center",
            background:
              "linear-gradient(180deg, rgba(255,250,236,0.9) 0%, rgba(255,250,236,0) 75%)",
            filter: "blur(18px)",
            opacity: 0.35 + 0.25 * wave(t, 1, i * 0.33),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const Manna: React.FC<{ t: number; width: number; height: number }> = ({ t, width, height }) => {
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="flake">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FBEBCB" />
          <stop offset="65%" stopColor="#D6B47E" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#C9A46A" stopOpacity={0} />
        </radialGradient>
      </defs>
      {FLAKES.map((f, i) => {
        const { x, y, opacity } = flakeAt(f, t, width, height);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={f.size * 2.2}
            fill="url(#flake)"
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
};

const Sprig: React.FC<{ t: number }> = ({ t }) => {
  const sway = 3.2 * wave(t, 1) + 1 * wave(t, 2, 0.1);
  const oliveSettle = settleAt(t, OLIVE_SETTLE);
  const oliveSwing = 13 * wave(t, 1, -0.12) + 3 * wave(t, 2, 0.05) + 10 * oliveSettle.dip;
  // Two passes per loop; the band sits off the sprig at both ends of each pass.
  const sheen = ((t * 2) % 1) * 2.4 - 0.7;

  const leaves = LEAVES.map((leaf) => {
    const settle = settleAt(t, leaf.settle);
    const flutter =
      8 * wave(t, 1, leaf.phase) + 3 * wave(t, 3, leaf.phase + 0.2) + 7 * settle.dip;
    return { ...leaf, settle, flutter, landAt: rotatePoint(leaf.land, leaf.base, flutter) };
  });

  const specks = [
    ...leaves.map((l) => ({ settle: l.settle, landAt: l.landAt })),
    { settle: oliveSettle, landAt: rotatePoint(OLIVE_LAND, OLIVE_PIVOT, oliveSwing) },
  ].map(({ settle, landAt }) => {
    const [lx, ly] = rotatePoint(landAt, [0, 0], sway);
    return {
      ...settle,
      x: lx + 6 * (1 - settle.eased) * wave(t, 2),
      y: SKY_Y + (ly - SKY_Y) * settle.eased,
    };
  });

  return (
    <svg
      viewBox="-12 -168 136 180"
      style={{ position: "absolute", left: 650, top: 70, width: 256, height: 339, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="sheen" gradientUnits="userSpaceOnUse" x1="-10" y1="5" x2="115" y2="-160">
          <stop offset={sheen - 0.22} stopColor={COLORS.sprig} />
          <stop offset={sheen} stopColor={COLORS.sprigLight} />
          <stop offset={sheen + 0.22} stopColor={COLORS.sprig} />
        </linearGradient>
        <radialGradient id="settled">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FFF3D6" />
          <stop offset="100%" stopColor="#F2D9A8" stopOpacity={0} />
        </radialGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#6B4E2A" floodOpacity="0.12" />
        </filter>
      </defs>
      <g transform={`rotate(${sway} 0 0)`} fill="url(#sheen)" filter="url(#shadow)">
        <path d="M3.69 2.58L89.72 -120.29A4.5 4.5 0 0 0 82.35 -125.45L-3.69 -2.58A4.5 4.5 0 0 0 3.69 2.58Z" />
        {leaves.map((leaf, i) => (
          <path
            key={i}
            d={leaf.d}
            transform={`rotate(${leaf.flutter} ${leaf.base[0]} ${leaf.base[1]})`}
          />
        ))}
        <g transform={`rotate(${oliveSwing} ${OLIVE_PIVOT[0]} ${OLIVE_PIVOT[1]})`}>
          <path d="M18.13 -24.63L35.6 -17.22A3.5 3.5 0 0 0 38.34 -23.66L20.87 -31.07A3.5 3.5 0 0 0 18.13 -24.63Z" />
          <path d="M54.76 -26.46A12.5 16.5 -67 0 1 65.07 -8.51A12.5 16.5 -67 0 1 44.99 -3.45A12.5 16.5 -67 0 1 34.69 -21.4A12.5 16.5 -67 0 1 54.76 -26.46Z" />
        </g>
      </g>
      {specks.map((s, i) => {
        const r = 6 * s.glint;
        return (
          <g key={i} opacity={s.opacity}>
            <circle cx={s.x} cy={s.y} r={2.6 + 1.6 * s.glint} fill="url(#settled)" />
            {s.glint > 0 && (
              <path
                d={`M${s.x} ${s.y - r}Q${s.x} ${s.y} ${s.x + r} ${s.y}Q${s.x} ${s.y} ${s.x} ${s.y + r}Q${s.x} ${s.y} ${s.x - r} ${s.y}Q${s.x} ${s.y} ${s.x} ${s.y - r}Z`}
                fill="#FFF8E7"
                opacity={0.9 * s.glint}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

const TITLE = "Manna".split("");
const TAGLINE = "A quiet place to rest".split(" ");

const Wordmark: React.FC<{ t: number }> = ({ t }) => {
  const shimmer = (t % 1) * 160 - 30;
  const lineWidth = 56 + 20 * (0.5 + 0.5 * wave(t, 1, -0.25));
  return (
    <div style={{ position: "absolute", left: 98, top: 138 }}>
      <div
        style={{
          display: "flex",
          fontFamily: cormorant,
          fontWeight: 500,
          fontSize: 112,
          lineHeight: 1,
          letterSpacing: 4,
        }}
      >
        {TITLE.map((letter, i) => {
          // A warm glow travels across the letters once per loop.
          const glow = Math.max(0, Math.cos(TAU * (t - 0.15 - i * 0.07))) ** 6;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translateY(${-3 * wave(t, 1, -i * 0.09)}px)`,
                color: interpolateColors(glow, [0, 1], [COLORS.ink, "#7A5A34"]),
                textShadow: `0 0 ${22 * glow}px rgba(222, 178, 108, ${0.6 * glow})`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 30,
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, ${COLORS.accent} ${shimmer - 30}%, #F3E2C4 ${shimmer}%, ${COLORS.accent} ${shimmer + 30}%)`,
        }}
      />
      <div
        style={{
          marginTop: 26,
          display: "flex",
          gap: 9,
          fontFamily: cormorantItalic,
          fontStyle: "italic",
          fontSize: 34,
          color: COLORS.muted,
        }}
      >
        {TAGLINE.map((word, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: 0.7 + 0.3 * (0.5 + 0.5 * wave(t, 1, 0.1 - i * 0.08)),
              transform: `translateY(${-1.5 * wave(t, 1, 0.35 - i * 0.08)}px)`,
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export const MannaBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = (frame % durationInFrames) / durationInFrames;

  return (
    <AbsoluteFill>
      <Background t={t} />
      <Manna t={t} width={width} height={height} />
      <Wordmark t={t} />
      <Sprig t={t} />
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="MannaBanner"
      component={MannaBanner}
      durationInFrames={LOOP_FRAMES}
      fps={30}
      width={1024}
      height={500}
    />
  );
};
