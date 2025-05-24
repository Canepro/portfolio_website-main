// Define common properties if any, or define themes completely separately
const commonBreakpoints = {
  sm: 'screen and (max-width: 640px)',
  md: 'screen and (max-width: 768px)',
  lg: 'screen and (max-width: 1024px)',
  xl: 'screen and (max-width: 1280px)',
};

const commonFonts = {
  title: "Space Grotesk, sans-serif",
  main: "Space Grotesk, sans-serif",
};

export const lightTheme = {
  fonts: commonFonts,
  colors: {
    primary1: "hsl(210, 40%, 98%)",
    background1: "#ffffff",
    accent1: "hsl(220, 90%, 50%)",
    button: "hsl(220, 90%, 50%)",
    background2: "hsl(220, 14%, 98%)",
    text: "#1a202c",
    accent2: "#EF4444",
  },
  breakpoints: commonBreakpoints,
};

export const darkTheme = {
  fonts: commonFonts,
  colors: {
    primary1: "hsl(210, 40%, 98%)",
    background1: "#0a0a0f",
    accent1: "hsl(220, 90%, 70%)",
    button: "hsl(220, 90%, 70%)",
    background2: "hsl(220, 19%, 12%)",
    text: "#f1f5f9",
    accent2: "#EF4444",
  },
  breakpoints: commonBreakpoints,
};
