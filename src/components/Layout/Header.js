import React from 'react';
import styled from 'styled-components';

const HeaderBar = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.colors.background2};
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent1}22;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 1.7rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent1};
  text-decoration: none;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.accent1};
  }
`;

const Header = () => (
  <HeaderBar>
    <Container>
      <Logo href="/">Vincent Mogah</Logo>
      <Nav>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#technologies">Technologies</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
        <NavLink href="https://www.linkedin.com/in/vincent-mogah/" target="_blank" rel="noopener noreferrer">LinkedIn</NavLink>
      </Nav>
    </Container>
  </HeaderBar>
);

export default Header;
