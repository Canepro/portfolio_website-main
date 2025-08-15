import styled from 'styled-components';

export const LeftSection = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  max-width: 1040px;
  padding-right: 0;
  position: relative;
  z-index: 1; /* keep content above background animation */
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;

export const HeroTitle = styled.h1`
  font-weight: 800;
  font-size: 80px;
  line-height: 88px;
  width: 100%;
  max-width: 100%;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.25rem;
  padding: 40px 0 8px;
  letter-spacing: -0.5px;

  @media ${props => props.theme.breakpoints.md}{
    font-size: 64px;
    line-height: 72px;
    margin-bottom: 12px;
    padding: 40px 0 12px;
  }

  @media ${props => props.theme.breakpoints.sm}{
    font-size: 40px;
    line-height: 46px;
    margin-bottom: 8px;
    padding: 16px 0 8px;
    max-width: 100%;
  }
`;

export const GradientName = styled.span`
  /* Neutral, fully-opaque gradient to avoid reduced emphasis */
  background: linear-gradient(180deg, #e5e7eb 0%, #737373 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  white-space: nowrap; /* keep the full name on one line */
  word-break: keep-all;
  overflow-wrap: normal;
`;

export const ModernButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(59, 130, 246, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  @media ${props => props.theme.breakpoints.md} {
    padding: 14px 28px;
    font-size: 16px;
  }

  @media ${props => props.theme.breakpoints.sm} {
    padding: 12px 24px;
    font-size: 14px;
  }
`;

export const BackgroundGraphics = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  opacity: 0.15; /* slightly more visible */
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 20%;
    right: 10%;
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    transform: rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 60%;
    right: 20%;
    width: 150px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
    transform: rotate(-30deg);
  }

  @media ${props => props.theme.breakpoints.md} {
    width: 40%;
    
    &::before {
      width: 150px;
      right: 5%;
    }
    
    &::after {
      width: 100px;
      right: 15%;
    }
  }

  @media ${props => props.theme.breakpoints.sm} {
    display: none;
  }
`;

export const HeroColumn = styled.div`
  max-width: 768px; /* ~max-w-3xl to avoid name wrapping */
`;

