// src/components/ThemeToggle/ThemeToggle.js

import React from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { ToggleButton, ToggleContainer } from './ThemeToggleStyles';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  
  return (
    <ToggleContainer>
      <ToggleButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      >
        <BsSunFill className={`sun ${isLight ? 'visible' : ''}`} />
        <BsMoonFill className={`moon ${!isLight ? 'visible' : ''}`} />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
