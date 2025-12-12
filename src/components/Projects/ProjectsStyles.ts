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
