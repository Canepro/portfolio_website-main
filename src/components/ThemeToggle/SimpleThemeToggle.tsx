// src/components/ThemeToggle/SimpleThemeToggle.tsx

'use client';

import React, { useEffect, useState } from 'react';

const SimpleThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Use class-based theming:
    // - Tailwind/shadcn: `html.dark`
    // - Legacy CSS variables: `html.light-theme`
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme'); // 'dark' | 'light' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    root.classList.toggle('dark', shouldUseDark);
    root.classList.toggle('light-theme', !shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    const root = document.documentElement;
    root.classList.toggle('dark', nextIsDark);
    root.classList.toggle('light-theme', !nextIsDark);
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    setIsDark(nextIsDark);
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
      <span style={{ fontSize: 22, lineHeight: 1 }}>{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
};

export default SimpleThemeToggle;
