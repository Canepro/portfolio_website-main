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
    background1: "#FFFFFF",
    accent1: "hsl(220, 90%, 56%)", // Better blue
    button: "hsl(220, 90%, 56%)",
    background2: "hsl(220, 14%, 96%)", // Softer grey
    text: "#1a202c",
  },
  breakpoints: commonBreakpoints,
};

export const darkTheme = {
  fonts: commonFonts,
  colors: {
    primary1: "hsl(210, 40%, 98%)",
    background1: "#0f172a", // Richer dark blue
    accent1: "hsl(220, 90%, 70%)", // Brighter for dark mode
    button: "hsl(220, 90%, 70%)",
    background2: "hsl(220, 19%, 18%)", // Better contrast
    text: "#f1f5f9",
  },
  breakpoints: commonBreakpoints,
};
