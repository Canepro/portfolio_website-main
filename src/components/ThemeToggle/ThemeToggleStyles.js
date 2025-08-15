// src/components/ThemeToggle/ThemeToggleStyles.js

import styled from 'styled-components';

export const ToggleContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;

  @media ${(props) => props.theme.breakpoints.sm} {
    bottom: 1rem;
    right: 1rem;
  }
`;

export const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.35);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    position: absolute;
    font-size: 24px;
    transition: all 0.3s ease;
    
    &.sun {
      color: #FDB813;
      opacity: 0;
      transform: rotate(180deg) scale(0);
    }
    
    &.moon {
      color: #fff;
      opacity: 0;
      transform: rotate(-180deg) scale(0);
    }
    
    &.visible {
      opacity: 1;
      transform: rotate(0) scale(1);
    }
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 48px;
    height: 48px;
    
    svg {
      font-size: 20px;
    }
  }
`;
