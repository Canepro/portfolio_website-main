// src/components/ThemeToggle/SimpleThemeToggle.js

import React, { useEffect, useState } from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const SimpleThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      document.body.classList.add('light-theme');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Don't render on server
  if (!mounted) return null;

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
};

export default SimpleThemeToggle;
