// src/styles/ProjectsPageStyles.ts

import styled from 'styled-components';
import { CategoryButtonProps } from '../types/styled-components';

export const PageContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 48px 40px;

  @media ${(props) => props.theme.breakpoints.md} {
    padding: 60px 24px 40px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 40px 16px;
  }
`;

export const PageTitle = styled.h1`
  font-weight: 800;
  font-size: 65px;
  line-height: 72px;
  background: linear-gradient(121.57deg, #FFFFFF 18.77%, rgba(255, 255, 255, 0.66) 60.15%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 56px;
    line-height: 56px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 48px;
    line-height: 48px;
  }
`;

export const PageDescription = styled.p`
  max-width: 800px;
  font-size: 24px;
  line-height: 40px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 48px;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 20px;
    line-height: 32px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const FilterContainer = styled.div`
  margin-bottom: 48px;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 16px 24px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  margin-bottom: 24px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    border-color: ${(props) => props.theme.colors.primary1};
    box-shadow: 0 0 0 2px rgba(80, 78, 251, 0.1);
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 12px 16px;
    font-size: 16px;
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button<CategoryButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  background: ${(props) => props.active 
    ? 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)' 
    : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${(props) => props.active 
    ? 'transparent' 
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-size: 14px;
    opacity: 0.8;
  }

  &:hover {
    background: ${(props) => !props.active && 'rgba(255, 255, 255, 0.08)'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 32px;
  margin-top: 48px;

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 80px 20px;
  
  h3 {
    font-size: 32px;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.5);
  }
`;
