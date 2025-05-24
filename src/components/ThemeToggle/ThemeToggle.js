import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.primary1};
  border: 2px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
  &:focus {
    outline: none;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </ToggleButton>
  );
};

export default ThemeToggle;
