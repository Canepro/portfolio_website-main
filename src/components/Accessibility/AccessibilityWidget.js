import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const WidgetContainer = styled.div`
  position: fixed;
  top: 50%;
  right: ${props => props.isOpen ? '0' : '-250px'};
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.background2};
  border: 2px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 15px 0 0 15px;
  padding: 20px;
  width: 280px;
  z-index: 1002;
  transition: right 0.3s ease;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.2);
`;

const ToggleButton = styled.button`
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.accent1};
  color: white;
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 15px 10px;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.background1};
    outline-offset: 2px;
  }
`;

const WidgetTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const ControlGroup = styled.div`
  margin-bottom: 20px;
`;

const ControlLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  font-weight: 600;
`;

const ControlButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.colors.background1};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.accent1}66;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent1}22;
    border-color: ${({ theme }) => theme.colors.accent1};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent1};
    outline-offset: 2px;
  }
`;

const Slider = styled.input`
  width: 100%;
  margin: 10px 0;
`;

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const { theme, toggleTheme } = useTheme();

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const reduceMotiom = () => {
    document.body.classList.toggle('reduce-motion');
  };

  return (
    <WidgetContainer isOpen={isOpen}>
      <ToggleButton 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle accessibility widget"
        aria-expanded={isOpen}
      >
        ♿
      </ToggleButton>
      
      {isOpen && (
        <>
          <WidgetTitle>Accessibility Options</WidgetTitle>
          
          <ControlGroup>
            <ControlLabel>Font Size</ControlLabel>
            <ControlButton onClick={increaseFontSize}>
              Increase Font Size (A+)
            </ControlButton>
            <ControlButton onClick={decreaseFontSize}>
              Decrease Font Size (A-)
            </ControlButton>
            <ControlButton onClick={resetFontSize}>
              Reset Font Size
            </ControlButton>
          </ControlGroup>
          
          <ControlGroup>
            <ControlLabel>Display Options</ControlLabel>
            <ControlButton onClick={toggleTheme}>
              Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </ControlButton>
            <ControlButton onClick={toggleHighContrast}>
              High Contrast Mode
            </ControlButton>
            <ControlButton onClick={reduceMotiom}>
              Reduce Animations
            </ControlButton>
          </ControlGroup>
        </>
      )}
    </WidgetContainer>
  );
};

export default AccessibilityWidget;
