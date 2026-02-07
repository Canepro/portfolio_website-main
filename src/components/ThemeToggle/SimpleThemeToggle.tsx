// src/components/ThemeToggle/SimpleThemeToggle.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SimpleThemeToggleProps = {
  className?: string;
};

const SimpleThemeToggle: React.FC<SimpleThemeToggleProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Use class-based theming:
    // - Tailwind/shadcn: `html.dark`
    // - Legacy CSS variables: `html.light-theme`
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme'); // 'dark' | 'light' | null
    // Dark-first: if the user hasn't chosen, default to dark.
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : true;
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
    <Button
      type="button"
      variant="glass"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn('rounded-xl', className)}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default SimpleThemeToggle;
