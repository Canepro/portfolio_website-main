import styled from 'styled-components';

export const ModernTechContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing?.xxl || '4rem'} ${props => props.theme.spacing?.lg || '2rem'};

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    padding: ${props => props.theme.spacing?.xl || '3rem'} ${props => props.theme.spacing?.md || '1.5rem'};
  }
`;

export const TechCategory = styled.div`
  margin-bottom: ${props => props.theme.spacing?.xxxl || '6rem'};

  &:last-child {
    margin-bottom: 0;
  }

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    margin-bottom: ${props => props.theme.spacing?.xxl || '4rem'};
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  background: ${props => props.theme.colors?.accentGradient || 'linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(200, 100%, 60%) 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${props => props.theme.spacing?.xl || '3rem'};
  text-align: center;

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    font-size: 1.5rem;
    margin-bottom: ${props => props.theme.spacing?.lg || '2rem'};
  }
`;

export const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing?.lg || '2rem'};

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${props => props.theme.spacing?.md || '1.5rem'};
  }

  @media ${props => props.theme.breakpoints?.sm || 'screen and (max-width: 640px)'} {
    grid-template-columns: 1fr;
  }
`;

export const TechCard = styled.div`
  background: ${props => props.theme.colors?.backgroundGlass || 'rgba(30, 30, 46, 0.8)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors?.borderLight || 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${props => props.theme.radius?.xl || '1rem'};
  padding: ${props => props.theme.spacing?.lg || '2rem'};
  text-align: center;
  transition: all ${props => props.theme.animations?.duration?.normal || '300ms'} ${props => props.theme.animations?.easing?.easeOut || 'ease-out'};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'}60;
    box-shadow: ${props => props.theme.shadows?.glow || '0 0 20px rgba(128, 0, 255, 0.3)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left ${props => props.theme.animations?.duration?.slow || '500ms'};
  }

  &:hover::before {
    left: 100%;
  }

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    padding: ${props => props.theme.spacing?.md || '1.5rem'};
  }
`;

export const TechIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing?.md || '1.5rem'};
  display: block;

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    font-size: 2.5rem;
    margin-bottom: ${props => props.theme.spacing?.sm || '1rem'};
  }
`;

export const TechName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors?.primary1 || '#ffffff'};
  margin-bottom: ${props => props.theme.spacing?.md || '1.5rem'};
  line-height: 1.3;

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    font-size: 1.1rem;
    margin-bottom: ${props => props.theme.spacing?.sm || '1rem'};
  }
`;

export const TechLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing?.sm || '1rem'};

  .percentage {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'};
    min-width: 40px;
    text-align: right;
  }
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: ${props => props.theme.colors?.background3 || 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${props => props.theme.radius?.full || '9999px'};
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.theme.colors?.accentGradient || 'linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(200, 100%, 60%) 100%)'};
  border-radius: ${props => props.theme.radius?.full || '9999px'};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
