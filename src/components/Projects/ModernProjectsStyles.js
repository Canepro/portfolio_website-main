import styled from 'styled-components';

export const ModernGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing?.xl || '3rem'};
  margin: ${props => props.theme.spacing?.xxl || '4rem'} 0;
  padding: 0 ${props => props.theme.spacing?.lg || '2rem'};

  @media ${props => props.theme.breakpoints?.lg || 'screen and (max-width: 1024px)'} {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${props => props.theme.spacing?.lg || '2rem'};
  }

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing?.lg || '2rem'};
    padding: 0 ${props => props.theme.spacing?.md || '1.5rem'};
  }
`;

export const ModernProjectCard = styled.div`
  background: ${props => props.theme.colors?.backgroundGlass || 'rgba(30, 30, 46, 0.8)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors?.borderLight || 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${props => props.theme.radius?.xl || '1rem'};
  overflow: hidden;
  transition: all ${props => props.theme.animations?.duration?.normal || '300ms'} ${props => props.theme.animations?.easing?.easeOut || 'ease-out'};
  position: relative;
  
  &:hover {
    border-color: ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'}40;
    box-shadow: ${props => props.theme.shadows?.glowLarge || '0 0 40px rgba(128, 0, 255, 0.2)'};
  }

  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    margin-bottom: ${props => props.theme.spacing?.lg || '2rem'};
  }
`;

export const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  @media ${props => props.theme.breakpoints?.md || 'screen and (max-width: 768px)'} {
    height: 180px;
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${props => props.theme.animations?.duration?.normal || '300ms'} ${props => props.theme.animations?.easing?.easeOut || 'ease-out'};
  
  ${ModernProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'}E6, 
    ${props => props.theme.colors?.accent2 || 'hsl(200, 100%, 60%)'}E6
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${props => props.theme.animations?.duration?.normal || '300ms'} ${props => props.theme.animations?.easing?.easeOut || 'ease-out'};
`;

export const ProjectContent = styled.div`
  padding: ${props => props.theme.spacing?.lg || '2rem'};
`;

export const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors?.primary1 || '#ffffff'};
  margin-bottom: ${props => props.theme.spacing?.sm || '1rem'};
  line-height: 1.3;
`;

export const ProjectDescription = styled.p`
  color: ${props => props.theme.colors?.primary2 || 'rgba(255, 255, 255, 0.8)'};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing?.lg || '2rem'};
  font-size: 0.95rem;
`;

export const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing?.xs || '0.5rem'};
  margin-bottom: ${props => props.theme.spacing?.lg || '2rem'};
`;

export const ProjectTag = styled.span`
  background: ${props => props.theme.colors?.background3 || 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'};
  padding: ${props => props.theme.spacing?.xs || '0.5rem'} ${props => props.theme.spacing?.sm || '1rem'};
  border-radius: ${props => props.theme.radius?.full || '9999px'};
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'}40;
  transition: all ${props => props.theme.animations?.duration?.fast || '150ms'} ${props => props.theme.animations?.easing?.easeOut || 'ease-out'};
  
  &:hover {
    background: ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'}20;
    transform: translateY(-2px);
  }
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing?.md || '1.5rem'};
  align-items: center;
`;

export const ProjectLink = styled.a`
  background: ${props => props.secondary ? 'transparent' : props.theme.colors?.primary1 || '#ffffff'};
  color: ${props => props.secondary ? props.theme.colors?.primary1 || '#ffffff' : props.theme.colors?.background1 || '#000000'};
  padding: ${props => props.theme.spacing?.sm || '1rem'} ${props => props.theme.spacing?.lg || '2rem'};
  border-radius: ${props => props.theme.radius?.lg || '0.75rem'};
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  border: ${props => props.secondary ? `2px solid ${props.theme.colors?.primary1 || '#ffffff'}` : 'none'};
  transition: all ${props => props.theme.animations?.duration?.normal || '300ms'} ${props => props.theme.animations?.easing?.easeOut || 'ease-out'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
  }
`;

export const ProjectStats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing?.lg || '2rem'};
  padding-top: ${props => props.theme.spacing?.md || '1.5rem'};
  border-top: 1px solid ${props => props.theme.colors?.borderLight || 'rgba(255, 255, 255, 0.1)'};
`;

export const ProjectStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .value {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${props => props.theme.colors?.accent1 || 'hsl(280, 100%, 70%)'};
    margin-bottom: ${props => props.theme.spacing?.xs || '0.5rem'};
  }
  
  .label {
    font-size: 0.8rem;
    color: ${props => props.theme.colors?.primary3 || 'rgba(255, 255, 255, 0.6)'};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;
