import styled from 'styled-components';
import { motion } from 'framer-motion';

const shimmer = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

export const ModernButton = styled(motion.button)`
  ${shimmer}
  
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: ${props => props.theme.radius?.lg || '0.75rem'};
  padding: ${props => props.theme.spacing?.md || '1.5rem'} ${props => props.theme.spacing?.xl || '3rem'};
  font-family: ${props => props.theme.fonts?.main || 'Inter, sans-serif'};
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  transition: all ${props => props.theme.animations?.duration?.normal || '300ms'} ${props => props.theme.animations?.easing?.easeOut || 'ease-out'};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing?.sm || '1rem'};
  min-width: 160px;
  
  /* Primary button styles */
  ${props => props.primary && `
    background: ${props.theme.colors?.accentGradient || 'linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(200, 100%, 60%) 100%)'};
    color: ${props.theme.colors?.primary1 || '#ffffff'};
    box-shadow: ${props.theme.shadows?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows?.glowLarge || '0 0 40px rgba(128, 0, 255, 0.2)'};
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  /* Secondary button styles */
  ${props => props.secondary && `
    background: transparent;
    color: ${props.theme.colors?.primary1 || '#ffffff'};
    border: 2px solid ${props.theme.colors?.borderLight || 'rgba(255, 255, 255, 0.2)'};
    backdrop-filter: blur(10px);
    
    &:hover {
      background: ${props.theme.colors?.backgroundGlass || 'rgba(30, 30, 46, 0.8)'};
      border-color: ${props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows?.glow || '0 0 20px rgba(128, 0, 255, 0.3)'};
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  /* Shimmer effect on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  /* Focus styles for accessibility */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'}40;
  }
  
  /* Disabled styles */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  
  /* Responsive styles */
  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    padding: ${props => props.theme.spacing?.sm || '1rem'} ${props => props.theme.spacing?.lg || '2rem'};
    font-size: 0.9rem;
    min-width: 140px;
  }
  
  @media ${props => props.theme.breakpoints?.sm || 'screen and (max-width: 640px)'} {
    width: 100%;
    padding: ${props => props.theme.spacing?.md || '1.5rem'};
    font-size: 0.875rem;
  }
`;

export default ModernButton;
