import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Styled Components
const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  
  ${({ isScrolled, theme, isDark }) => isScrolled && `
    background: ${isDark 
      ? 'rgba(15, 23, 42, 0.9)' 
      : 'rgba(255, 255, 255, 0.9)'
    };
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${isDark 
      ? 'rgba(148, 163, 184, 0.1)' 
      : 'rgba(15, 23, 42, 0.1)'
    };
    box-shadow: 0 4px 20px ${isDark 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(0, 0, 0, 0.1)'
    };
  `}

  @media ${({ theme }) => theme.breakpoints?.sm || '(max-width: 768px)'} {
    padding: 1rem;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  background: ${({ theme }) => 
    theme.colors?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media ${({ theme }) => theme.breakpoints?.md || '(max-width: 1024px)'} {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme, isDark }) => 
    isDark 
      ? theme.colors?.text?.primary || '#f8fafc'
      : theme.colors?.text?.primary || '#1e293b'
  };
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.primary || '#3b82f6'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => 
      theme.colors?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme, isDark }) => 
    isDark 
      ? theme.colors?.text?.primary || '#f8fafc'
      : theme.colors?.text?.primary || '#1e293b'
  };

  @media ${({ theme }) => theme.breakpoints?.md || '(max-width: 1024px)'} {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(15, 23, 42, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)'
  };
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(148, 163, 184, 0.1)' 
      : 'rgba(15, 23, 42, 0.1)'
  };
  padding: 1rem;
`;

const MobileLink = styled(motion.a)`
  display: block;
  padding: 1rem;
  color: ${({ theme, isDark }) => 
    isDark 
      ? theme.colors?.text?.primary || '#f8fafc'
      : theme.colors?.text?.primary || '#1e293b'
  };
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, isDark }) => 
      isDark 
        ? 'rgba(59, 130, 246, 0.1)' 
        : 'rgba(59, 130, 246, 0.05)'
    };
    color: ${({ theme }) => theme.colors?.primary || '#3b82f6'};
  }
`;

const CTAButton = styled(motion.button)`
  background: ${({ theme }) => 
    theme.colors?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  @media ${({ theme }) => theme.breakpoints?.md || '(max-width: 1024px)'} {
    display: none;
  }
`;

// Animation variants
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const mobileMenuVariants = {
  hidden: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { duration: 0.3 }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const ModernNavigation = () => {
  const { theme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <NavContainer
      variants={navVariants}
      initial="hidden"
      animate="visible"
      isScrolled={isScrolled}
      theme={theme}
      isDark={isDark}
    >
      <NavContent>
        <Logo
          theme={theme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('#home')}
        >
          Portfolio
        </Logo>

        <NavLinks theme={theme}>
          {navItems.map((item, index) => (
            <NavLink
              key={item.label}
              theme={theme}
              isDark={isDark}
              onClick={() => scrollToSection(item.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <CTAButton
          theme={theme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('#contact')}
        >
          Get In Touch
        </CTAButton>

        <MobileMenuButton
          theme={theme}
          isDark={isDark}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 12h18m-9-9v18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </MobileMenuButton>
      </NavContent>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            theme={theme}
            isDark={isDark}
          >
            {navItems.map((item, index) => (
              <MobileLink
                key={item.label}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                theme={theme}
                isDark={isDark}
                onClick={() => scrollToSection(item.href)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </MobileLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default ModernNavigation;
