import styled from 'styled-components';

// Image styles handled via next/image inline style; retained for reference

export const GridContainer = styled.section`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
padding: 3rem;
place-items: center;
column-gap: 2rem;
row-gap: 3rem;
@media ${(props) => props.theme.breakpoints.sm} {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-bottom: 0;
}

`
export const BlogCard = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.35);
  text-align: center;
  width: 400px;
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


export const HeaderThree = styled.h3`
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
  padding: 0 50px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: 2rem;
  line-height: 24px;
  text-align: justify;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding:.3rem
  
}
`;


export const UtilityList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  margin: 2.5rem 0;
`;

export const ExternalLinks = styled.a`
color:#fff;
font-size: 1.6rem;
padding:1rem 1.5rem;
background: ${({ theme }) => theme.colors.gradientSecondary};
border-radius: 15px;
transition: 0.3s ease;
text-decoration: none;
&:hover{
  transform: translateY(-2px);
}
`;

export const TagList = styled.ul`
display: flex;
justify-content: space-around;
padding: 2rem;
`
export const Tag = styled.li`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 1.5rem;
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export const CategoryBadge = styled.span`
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