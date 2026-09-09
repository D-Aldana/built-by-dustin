export const breakpoints = {
  mobile: "@media (max-width: 1024px)",
  tablet: "@media (min-width: 641px) and (max-width: 1024px)",
  desktop: "@media (min-width: 1025px)",
}

export const layout = {
  maxWidth: "1200px",
  gutter: "2rem",
  gutterMobile: "1.25rem",
}

/* One measure and one gutter for every top-level section, so content aligns
   down the page instead of each section setting its own edge. */
export const container = `
  width: 100%;
  max-width: ${layout.maxWidth};
  margin-inline: auto;
  padding-inline: ${layout.gutter};

  ${breakpoints.mobile} {
    padding-inline: ${layout.gutterMobile};
  }
`

/* Four steps, so a card never has to invent its own corner. */
export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  pill: "999px",
}

/* Cards separate from the ground by value, not by shadow, so these stay low
   and are spent only on the few things that genuinely float. */
export const elevation = {
  none: "none",
  low: "0 1px 2px rgba(0, 0, 0, 0.16)",
  mid: "0 2px 4px rgba(0, 0, 0, 0.14), 0 10px 24px rgba(0, 0, 0, 0.16)",
  high: "0 4px 8px rgba(0, 0, 0, 0.16), 0 18px 40px rgba(0, 0, 0, 0.20)",
}

/* The page is lit once, warmly, from above — low sun over the field. Both
   stops sit at tiny alphas, which is what keeps it from banding the way a
   two-colour gradient does. Used on the hero and the blog pages so the whole
   site shares one light source. */
export const duskWash = `
  radial-gradient(
      120% 75% at 50% -8%,
      rgba(221, 161, 94, 0.16) 0%,
      rgba(221, 161, 94, 0.06) 34%,
      rgba(221, 161, 94, 0) 66%
    ),
    radial-gradient(
      95% 60% at 86% 2%,
      rgba(154, 173, 106, 0.1) 0%,
      rgba(154, 173, 106, 0) 62%
    )
`

export const theme = {
  light: {
    fontSize: "16px",

    // Surface ladder: page, card, nested card.
    background: "#FEFAE0",
    surface: "#F6F1D2",
    surfaceRaised: "#EFE8C2",

    // Text ladder, warm rather than pure black.
    foreground: "#2C3A1C",
    primaryText: "#3B4A26",
    textMuted: "#5A6840",
    textSubtle: "#6E7C52",

    // Hairlines. `line` divides, `lineStrong` bounds a card.
    line: "rgba(44, 58, 28, 0.12)",
    lineStrong: "rgba(44, 58, 28, 0.2)",

    secondaryText: "#FEFAE0",
    card: "#F6F1D2",
    cardForeground: "#2C3A1C",
    popover: "#FEFAE0",
    popoverForeground: "#283618",
    primary: "#606C38",
    primaryForeground: "#FEFAE0",
    secondary: "#DDA15E",
    secondaryForeground: "#283618",
    muted: "#EFE8C2",
    mutedForeground: "#5A6840",
    accent: "#BC6C25",
    accentForeground: "#FEFAE0",
    destructive: "#B03049",
    destructiveForeground: "#ffffff",
    border: "rgba(44, 58, 28, 0.2)",
    input: "transparent",
    inputBackground: "#F6F1D2",
    switchBackground: "#cbced4",
    fontWeightMedium: 500,
    fontWeightNormal: 400,
    ring: "#BC6C25",

    radius: radius.md,

    // Field colours
    olive: "#606C38",
    oliveText: "#5A6840",
    oliveSurface: "#606C38",
    forest: "#283618",
    cream: "#FEFAE0",
    chalk: "#2C3A1C",
    bronze: "#B47635",
    bronzeLight: "#C98A46",
    rust: "#A85A1E",

    // Icon colours
    github: "#7A5C3E",
    linkedin: "#0A66C2",
    instagram: "#C13584",
  },

  dark: {
    fontSize: "16px",

    /* Surface ladder. Each step is roughly 1.2:1 above the last — enough to
       read as a lift under flat light, quiet enough that no shadow is needed
       to sell it. */
    background: "#283618",
    surface: "#334420",
    surfaceRaised: "#3A4D26",

    /* Cream at #FEFAE0 hits ~15:1 on this ground, which reads as glare over a
       whole page. #EFEAD2 still clears AAA at 10.6:1 and stops shimmering. */
    foreground: "#EFEAD2",
    primaryText: "#EFEAD2",
    textMuted: "#B9BE9E",
    textSubtle: "#99A578",

    line: "rgba(239, 234, 210, 0.12)",
    lineStrong: "rgba(239, 234, 210, 0.2)",

    secondaryText: "#606C38",
    card: "#334420",
    cardForeground: "#EFEAD2",
    popover: "#334420",
    popoverForeground: "#EFEAD2",
    primary: "#606C38",
    primaryForeground: "#EFEAD2",
    secondary: "#DDA15E",
    secondaryForeground: "#283618",
    muted: "#3A4D26",
    mutedForeground: "#B9BE9E",
    accent: "#DDA15E",
    accentForeground: "#283618",
    destructive: "#8C4A2F",
    destructiveForeground: "#F2C4A8",
    border: "rgba(239, 234, 210, 0.2)",
    input: "rgba(239, 234, 210, 0.06)",
    ring: "#DDA15E",
    fontWeightMedium: 500,
    fontWeightNormal: 400,

    radius: radius.md,

    // Field colours
    olive: "#7A8A4F",
    oliveText: "#99A578",
    oliveSurface: "#3A4D26",
    forest: "#283618",
    cream: "#FEFAE0",
    chalk: "#EFEAD2",
    bronze: "#DDA15E",
    bronzeLight: "#E8B87A",
    /* softened from #d4823e: two warm tones this close were reading as one
       muddy accent, so bronze owns the UI and clay-rust stays illustration */
    rust: "#C4763F",

    // Icon colours
    github: "#E8CDB4",
    linkedin: "#4A9BE0",
    instagram: "#D46FA8",
  },
}

export default theme
