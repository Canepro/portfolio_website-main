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
    primary1: "hsl(204,23.8%,95.9%)", // Light grey
    background1: "#FFFFFF",           // White
    accent1: "hsl(34.9,98.6%,72.9%)", // Orange
    button: "hsl(205.1,100%,36.1%)", // Blue
    background2: "hsl(0,0%,90%)",   // Light grey for secondary background
    text: "#0F1624",                  // Dark text
  },
  breakpoints: commonBreakpoints,
};

export const darkTheme = {
  fonts: commonFonts,
  colors: {
    primary1: "hsl(204,23.8%,95.9%)", // Light grey (can be same or different)
    background1: "#0F1624",           // Dark blue/black
    accent1: "hsl(34.9,98.6%,72.9%)", // Orange (can be same or different)
    button: "hsl(205.1,100%,36.1%)", // Blue (can be same or different)
    background2: "hsl(232.7,27.3%,23.7%)", // Darker blue/grey
    text: "#FFFFFF",                  // Light text
  },
  breakpoints: commonBreakpoints,
};
