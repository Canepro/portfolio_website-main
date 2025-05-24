export default {
  // Modern typography scale
  fonts: {
    title: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    main: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "JetBrains Mono, 'Fira Code', Monaco, 'Cascadia Code', monospace"
  },
  
  // Modern color palette with better contrast and accessibility
  colors: {
    // Primary colors
    primary1: "hsl(220, 13%, 91%)",      // Light text
    primary2: "hsl(220, 14%, 75%)",      // Muted text
    primary3: "hsl(220, 13%, 45%)",      // Subtle text
    
    // Backgrounds with glassmorphism support
    background1: "hsl(220, 26%, 6%)",     // Dark primary
    background2: "hsl(220, 26%, 9%)",     // Dark secondary
    background3: "hsl(220, 20%, 12%)",    // Card background
    backgroundGlass: "rgba(30, 30, 46, 0.8)", // Glassmorphism
    
    // Accent colors - Modern gradient ready
    accent1: "hsl(280, 100%, 70%)",       // Purple accent
    accent2: "hsl(200, 100%, 60%)",       // Blue accent
    accentGradient: "linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(200, 100%, 60%) 100%)",
    
    // Interactive states
    button: "hsl(280, 100%, 65%)",
    buttonHover: "hsl(280, 100%, 75%)",
    buttonActive: "hsl(280, 100%, 55%)",
    
    // Status colors
    success: "hsl(120, 60%, 50%)",
    warning: "hsl(45, 100%, 60%)",
    error: "hsl(0, 70%, 60%)",
    
    // Borders and shadows
    border: "hsl(220, 20%, 20%)",
    borderLight: "hsl(220, 15%, 25%)",
    shadow: "rgba(0, 0, 0, 0.5)",
    shadowGlow: "rgba(128, 0, 255, 0.3)",
  },
  
  // Enhanced breakpoints with container queries support
  breakpoints: {
    xs: 'screen and (max-width: 480px)',
    sm: 'screen and (max-width: 640px)',
    md: 'screen and (max-width: 768px)',
    lg: 'screen and (max-width: 1024px)',
    xl: 'screen and (max-width: 1280px)',
    xxl: 'screen and (max-width: 1536px)',
    // Container breakpoints
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    }
  },
  
  // Spacing scale (based on 8px grid)
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    xxl: '4rem',    // 64px
    xxxl: '6rem',   // 96px
  },
  
  // Border radius scale
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    xxl: '1.5rem',   // 24px
    full: '9999px',
  },
  
  // Animation tokens
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
    },
    easing: {
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    }
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Shadows scale for depth
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(128, 0, 255, 0.3)',
    glowLarge: '0 0 40px rgba(128, 0, 255, 0.2)',
  }
}
