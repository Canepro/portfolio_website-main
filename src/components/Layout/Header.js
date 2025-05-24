import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme, scrolled }) => 
    scrolled 
      ? `${theme.colors.background2}ee` 
      : `${theme.colors.background1}00`
  };
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${({ theme, scrolled }) => 
    scrolled 
      ? `1px solid ${theme.colors.accent1}33` 
      : 'none'
  };
  padding: 15px 0;
  z-index: 100;
  transition: all 0.3s ease;
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
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent1}, ${({ theme }) => theme.colors.button});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 35px;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.background2}ee;
    backdrop-filter: blur(10px);
    padding: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.accent1}33;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer; /* Add cursor pointer */
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent1};
    transform: translateY(-1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent1};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.background1};
  border: 2px solid ${({ theme }) => theme.colors.accent1}66;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent1};
    transform: rotate(180deg);
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMobileOpen(false); // Close mobile menu after clicking
  };

  return (
    <HeaderBar scrolled={scrolled}>
      <Container>
        <Logo onClick={() => scrollToSection('home')}>VM</Logo>
        
        <Nav isOpen={mobileOpen}>
          <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
          <NavLink onClick={() => scrollToSection('technologies')}>Tech Stack</NavLink>
          <NavLink onClick={() => scrollToSection('projects')}>Projects</NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
          <NavLink 
            href="https://www.linkedin.com/in/vincent-mogah/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </NavLink>
          <ThemeToggleButton onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggleButton>
        </Nav>
        
        <MobileToggle onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '✕' : '☰'}
        </MobileToggle>
      </Container>
    </HeaderBar>
  );
};

export default Header;
