// src/components/Projects/ProjectsStyles.ts
import styled from 'styled-components';

export const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: stretch;
  padding: 2rem 0;
  place-items: stretch;
  column-gap: 2rem;
  row-gap: 2.5rem;
  @media ${props => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${props => props.theme.breakpoints.md} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media ${props => props.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
  }
`;

export const SkeletonOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.08) 25%,
    rgba(255, 255, 255, 0.18) 37%,
    rgba(255, 255, 255, 0.08) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;
