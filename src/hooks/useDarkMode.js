// src/hooks/useDarkMode.js

import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('dark');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    
    // Check for system preference if no local theme
    if (!localTheme) {
      const prefersDark = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    } else {
      setTheme(localTheme);
    }
    
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};

export default useDarkMode;
