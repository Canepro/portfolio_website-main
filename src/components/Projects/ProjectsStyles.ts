import styled from 'styled-components';

// Image styles handled via next/image inline style; retained for reference

export const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: stretch;
  padding: 2rem 0;
  place-items: stretch;
  column-gap: 2rem;
  row-gap: 2.5rem;
  @media ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
  }
`;

interface BlogCardProps {
  delay?: number;
}

export const BlogCard = styled.div<BlogCardProps>`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.35);
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.colors.cardHover};
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.5);
  }
  
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
`;

export const TitleContent = styled.div`
  text-align: center;
  z-index: 20;
  width: 100%;
`;

interface HeaderThreeProps {
  title?: string;
}

export const HeaderThree = styled.h3<HeaderThreeProps>`
  font-weight: 500;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.text};
  padding: .5rem 0;
  font-size: ${(props) => props.title ? '3rem' : '2rem'};
`;

export const Hr = styled.hr`
  width: 50px;
  height: 3px;
  margin: 20px auto;
  border: 0;
  background: ${({ theme }) => theme.colors.gradient};
`;

export const Intro = styled.div`
  width: 170px;
  margin: 0 auto;
  color: #dce3e7;
  font-family: 'Droid Serif', serif;
  font-size: 13px;
  font-style: italic;
  line-height: 18px;
`;

export const CardInfo = styled.p`
  width: 100%;
  padding: 0 32px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 2rem;
  line-height: 24px;
  /* Clamp to keep cards equal height */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 96px;
  text-align: justify;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding: .3rem;
  }
`;

export const UtilityList = styled.ul`
  list-style-type: none;
  padding: 0 1.5rem 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: auto; /* push to bottom for equal height cards */
`;

export const ExternalLinks = styled.a`
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.gradientSecondary};
  border-radius: 15px;
  transition: 0.3s ease;
  text-decoration: none;
  &:hover {
    transform: translateY(-2px);
  }
`;

export const TagList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
`;

export const Tag = styled.li`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

interface CategoryBadgeProps {
  featured?: boolean;
}

export const CategoryBadge = styled.span<CategoryBadgeProps>`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  background: ${props => props.featured 
    ? props.theme.colors.gradientSecondary 
    : 'rgba(0, 0, 0, 0.6)'};
  backdrop-filter: blur(4px);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SkeletonOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.18) 37%, rgba(255,255,255,0.08) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: 0 0; }
  }
`;

export const LiveDemoBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
`;

export const ButtonContainer = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: auto;
  flex-wrap: wrap;
`;

export const LiveChatButton = styled.a`
  background: linear-gradient(135deg, #00d2ff, #3a7bd5) !important;
  border: none !important;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #3a7bd5, #00d2ff) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(58, 123, 213, 0.3);
  }
`;

export const DashboardButton = styled.a`
  background: linear-gradient(135deg, #ff6b6b, #ee5a52) !important;
  color: white !important;
  border: none !important;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #ee5a52, #ff6b6b) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(238, 90, 82, 0.3);
  }
`;

export const ProjectLinkContainer = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
`;

export const StackContainer = styled.div`
  margin-top: auto;
`;

export const LiveDemoBadgeStyled = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid transparent;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #3a7bd5, #00d2ff);
    transform: translateY(-1px);
  }
`;
