import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme Context
const ThemeContext = createContext();

// Theme Provider Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Extended themes with dark mode support
export const themes = {
  light: {
    // Colors
    colors: {
      primary: '#0070f3',
      secondary: '#7928ca',
      accent: '#ff0080',
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9',
        glass: 'rgba(255, 255, 255, 0.1)',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        accent: '#0070f3',
        inverted: '#ffffff',
      },
      border: '#e2e8f0',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      gradient: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    },
    
    // Typography
    fonts: {
      main: 'Space Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      title: 'Space Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      code: 'Fira Code, Monaco, Consolas, monospace',
    },
    
    // Glassmorphism
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    },

    // Breakpoints
    breakpoints: {
      xs: 'screen and (max-width: 480px)',
      sm: 'screen and (max-width: 640px)',
      md: 'screen and (max-width: 768px)',
      lg: 'screen and (max-width: 1024px)',
      xl: 'screen and (max-width: 1280px)',
      xxl: 'screen and (max-width: 1536px)'
    },

    // Animations
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
  },
  
  dark: {
    // Colors  
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
        glass: 'rgba(15, 23, 42, 0.1)',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        accent: '#3b82f6',
        inverted: '#0f172a',
      },
      border: '#475569',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      gradient: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    },
    
    // Typography
    fonts: {
      main: 'Space Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      title: 'Space Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      code: 'Fira Code, Monaco, Consolas, monospace',
    },
    
    // Glassmorphism for dark mode
    glass: {
      background: 'rgba(15, 23, 42, 0.1)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
    },

    // Breakpoints
    breakpoints: {
      xs: 'screen and (max-width: 480px)',
      sm: 'screen and (max-width: 640px)',
      md: 'screen and (max-width: 768px)',
      lg: 'screen and (max-width: 1024px)',
      xl: 'screen and (max-width: 1280px)',
      xxl: 'screen and (max-width: 1536px)'
    },

    // Animations
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
  }
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    setIsDark(newTheme === 'dark');
  };

  const theme = themes[currentTheme];

  const value = {
    theme,
    isDark,
    currentTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
