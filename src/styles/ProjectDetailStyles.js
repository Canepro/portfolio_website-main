// src/styles/ProjectDetailStyles.js

import styled from 'styled-components';

export const ProjectDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 48px 40px;

  @media ${(props) => props.theme.breakpoints.md} {
    padding: 60px 24px 40px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 40px 16px;
  }
`;

export const BackButton = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.theme.colors.primary1};
  font-size: 18px;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(-4px);
    color: ${(props) => props.theme.colors.accent1};
  }
`;

export const ProjectHero = styled.div`
  margin-bottom: 48px;
`;

export const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  background: ${({ theme }) => theme.colors.card};

  @media ${(props) => props.theme.breakpoints.sm} {
    height: 250px;
  }
`;

export const ProjectTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 40px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px;
  }
`;

export const ProjectMeta = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  background: ${props => props.featured 
    ? 'linear-gradient(270deg, #F46737 0%, #945DD6 100%)' 
    : props.category === 'DevOps' 
      ? 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)'
      : props.category === 'Cloud'
        ? 'linear-gradient(270deg, #F46737 0%, #FFC837 100%)'
        : props.category === 'Backend'
          ? 'linear-gradient(270deg, #13ADC7 0%, #6978D1 100%)'
          : 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)'};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary1};
  margin-bottom: 24px;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 24px;
  }
`;

export const Description = styled.div`
  font-size: 18px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.75);
  white-space: pre-line;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 16px;
    line-height: 28px;
  }
`;

export const ChallengeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: 1fr;
  }
`;

export const ChallengeCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;

  h3 {
    font-size: 24px;
    margin-bottom: 16px;
    color: ${(props) => props.theme.colors.primary1};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    position: relative;
    padding-left: 24px;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.75);
    line-height: 24px;

    &:before {
      content: '▸';
      position: absolute;
      left: 0;
      color: ${(props) => props.theme.colors.accent1};
    }
  }
`;

export const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
`;

export const TechCategory = styled.div`
  h4 {
    font-size: 20px;
    color: ${(props) => props.theme.colors.primary1};
    margin-bottom: 12px;
  }
`;

export const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TechItem = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;

  @media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
  }
`;

export const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: ${props => props.primary 
    ? 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)' 
    : 'transparent'};
  border: 2px solid ${props => props.primary 
    ? 'transparent' 
    : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    ${props => !props.primary && `
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.5);
    `}
  }
`;

export const ImpactBox = styled.div`
  background: linear-gradient(135deg, rgba(0, 219, 216, 0.1) 0%, rgba(177, 51, 255, 0.1) 100%);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  margin: 32px 0;

  h3 {
    font-size: 24px;
    color: ${(props) => props.theme.colors.primary1};
    margin-bottom: 12px;
  }

  p {
    font-size: 18px;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;
