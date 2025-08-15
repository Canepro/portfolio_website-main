export default {
  // Temp fonts
  fonts: {
    title: "Space Grotesk, sans-serif",
    main: "Space Grotesk, sans-serif"
  },
  // Colors now use CSS variables that change with theme
  colors: {
    primary1: "var(--color-text-primary)",
    background1: "var(--color-bg-primary)",
    background2: "var(--color-bg-secondary)",
    accent1: "var(--color-accent)",
    button: "var(--color-accent)",
    text: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    card: "var(--color-card-bg)",
    cardHover: "var(--color-card-hover)",
    border: "var(--color-border)",
    gradient: "var(--gradient-primary)",
    gradientSecondary: "var(--gradient-secondary)",
  },
  // Breakpoints for responsive design
  breakpoints: {
    sm: 'screen and (max-width: 640px)',
    md: 'screen and (max-width: 768px)',
    lg: 'screen and (max-width: 1024px)',
    xl: 'screen and (max-width: 1280px)'
  },
}
