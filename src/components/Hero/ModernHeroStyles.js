import styled, { keyframes } from 'styled-components';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.05); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing?.xl || '3rem'} ${props => props.theme.spacing?.lg || '2rem'};
  overflow: hidden;
  
  @media ${(props) => props.theme.breakpoints.md} {
    min-height: 90vh;
    padding: ${props => props.theme.spacing?.lg || '2rem'} ${props => props.theme.spacing?.md || '1.5rem'};
  }
`;

export const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: ${props => props.theme.zIndex?.base || 0};
`;

export const GradientOrb = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${props => props.theme.colors?.accentGradient || 'linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(200, 100%, 60%) 100%)'};
  filter: blur(60px);
  opacity: 0.3;
  animation: ${pulse} 4s ease-in-out infinite;
  
  @media ${(props) => props.theme.breakpoints.md} {
    width: 200px;
    height: 200px;
    filter: blur(40px);
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndex?.base + 1 || 1};
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${props => props.theme.spacing?.xl || '3rem'};
  align-items: center;
  
  @media ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing?.lg || '2rem'};
    text-align: center;
  }
`;

export const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts?.title || 'Inter, sans-serif'};
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 ${props => props.theme.spacing?.md || '1.5rem'} 0;
  
  .gradient-text {
    background: ${props => props.theme.colors?.accentGradient || 'linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(200, 100%, 60%) 100%)'};
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientShift} 3s ease infinite;
  }
  
  .subtitle {
    color: ${props => props.theme.colors?.primary2 || 'hsl(220, 14%, 75%)'};
    font-size: clamp(1.2rem, 4vw, 2rem);
    font-weight: 400;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transform: translateX(-100%);
      animation: ${shimmer} 2s infinite;
    }
  }
`;

export const HeroSubtitle = styled.h2`
  font-family: ${props => props.theme.fonts?.main || 'Inter, sans-serif'};
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 400;
  color: ${props => props.theme.colors?.primary2 || 'hsl(220, 14%, 75%)'};
  margin: 0 0 ${props => props.theme.spacing?.lg || '2rem'} 0;
  line-height: 1.4;
`;

export const HeroDescription = styled.div`
  font-family: ${props => props.theme.fonts?.main || 'Inter, sans-serif'};
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  line-height: 1.6;
  color: ${props => props.theme.colors?.primary3 || 'hsl(220, 13%, 45%)'};
  margin: 0 0 ${props => props.theme.spacing?.xl || '3rem'} 0;
  max-width: 600px;
  
  p {
    margin: 0 0 ${props => props.theme.spacing?.md || '1.5rem'} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing?.md || '1.5rem'};
  flex-wrap: wrap;
  
  @media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
    align-items: center;
  }
`;

export const FloatingCard = styled.div`
  position: relative;
  background: ${props => props.theme.colors?.backgroundGlass || 'rgba(30, 30, 46, 0.8)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors?.borderLight || 'hsl(220, 15%, 25%)'};
  border-radius: ${props => props.theme.radius?.xl || '1rem'};
  padding: ${props => props.theme.spacing?.xl || '3rem'};
  box-shadow: ${props => props.theme.shadows?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
  animation: ${float} 6s ease-in-out infinite;
  transition: all ${props => props.theme.animations?.duration.normal || '300ms'} ${props => props.theme.animations?.easing.ease || 'ease'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors?.accentGradient || 'linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(200, 100%, 60%) 100%)'};
    border-radius: inherit;
    padding: 1px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    -webkit-mask-composite: source-out;
    opacity: 0.6;
  }
  
  h3 {
    font-family: ${props => props.theme.fonts?.title || 'Inter, sans-serif'};
    font-size: 1.25rem;
    font-weight: 600;
    color: ${props => props.theme.colors?.primary1 || 'hsl(220, 13%, 91%)'};
    margin: 0 0 ${props => props.theme.spacing?.lg || '2rem'} 0;
    text-align: center;
  }
  
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.theme.spacing?.md || '1.5rem'};
    text-align: center;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing?.xs || '0.5rem'};
  }
  
  .number {
    font-family: ${props => props.theme.fonts?.title || 'Inter, sans-serif'};
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'};
  }
  
  .label {
    font-size: 0.875rem;
    color: ${props => props.theme.colors?.primary3 || 'hsl(220, 13%, 45%)'};
    font-weight: 500;
  }
  
  @media ${(props) => props.theme.breakpoints.lg} {
    margin-top: ${props => props.theme.spacing?.xl || '3rem'};
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media ${(props) => props.theme.breakpoints.sm} {
    .stats {
      grid-template-columns: 1fr;
      gap: ${props => props.theme.spacing?.lg || '2rem'};
    }
  }
`;
