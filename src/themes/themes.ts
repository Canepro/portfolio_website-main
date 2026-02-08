// src/themes/themes.js

const breakpoints = {
  sm: 'screen and (max-width: 640px)',
  md: 'screen and (max-width: 768px)',
  lg: 'screen and (max-width: 1024px)',
  xl: 'screen and (max-width: 1280px)',
};

const fonts = {
  title: 'var(--font-sans)',
  main: 'var(--font-sans)',
};

export const darkTheme = {
  fonts,
  breakpoints,
  colors: {
    primary1: 'hsl(204,23.8%,95.9%)',
    background1: '#0F1624',
    background2: 'hsl(232.7,27.3%,23.7%)',
    accent1: 'hsl(34.9,98.6%,72.9%)',
    button: 'hsl(205.1,100%,36.1%)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    card: 'rgba(255, 255, 255, 0.05)',
    cardHover: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.1)',
    gradient: 'linear-gradient(270deg, #0EA5E9 0%, #38BDF8 100%)',
    gradientSecondary: 'linear-gradient(270deg, #38BDF8 0%, #0EA5E9 100%)',
  },
};

export const lightTheme = {
  fonts,
  breakpoints,
  colors: {
    primary1: 'hsl(204,23.8%,15.9%)',
    background1: '#FFFFFF',
    background2: '#F7F8FA',
    accent1: 'hsl(34.9,98.6%,52.9%)',
    button: 'hsl(205.1,100%,46.1%)',
    text: '#0F1624',
    textSecondary: 'rgba(15, 22, 36, 0.75)',
    card: 'rgba(0, 0, 0, 0.03)',
    cardHover: 'rgba(0, 0, 0, 0.06)',
    border: 'rgba(0, 0, 0, 0.1)',
    gradient: 'linear-gradient(270deg, #0284C7 0%, #0EA5E9 100%)',
    gradientSecondary: 'linear-gradient(270deg, #0EA5E9 0%, #0284C7 100%)',
  },
};
