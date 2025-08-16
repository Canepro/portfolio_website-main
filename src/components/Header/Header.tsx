import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';
import { HeaderProps } from '../../types/components';

import { Container, Div1, Div2, Div3, NavLink, SocialIcons, Span, MobileMenuButton, MobileMenuOverlay, MobileMenuPanel, MobileMenuList, MobileMenuItem, MobileNavLink } from './HeaderStyles';

const Header: React.FC<HeaderProps> = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    if (menuOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    closeMenu();
  }, [closeMenu]);

  const handlePanelClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Container>
      <Div1>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', color:"white", marginBottom: '20px' }} onClick={closeMenu}>
          <DiCssdeck size="3rem" aria-hidden="true" /> <Span>Personal Portfolio</Span>
        </Link>
      </Div1>
      <Div2>
        <li>
          <Link href="/" passHref legacyBehavior>
            <NavLink onClick={closeMenu}>Home</NavLink>
          </Link>
        </li>
        <li>
          <Link href="/projects" passHref legacyBehavior>
            <NavLink onClick={closeMenu}>Projects</NavLink>
          </Link>
        </li>
        <li>
          <Link href="/contact" passHref legacyBehavior>
            <NavLink onClick={closeMenu}>Contact</NavLink>
          </Link>
        </li>
        <li>
          <NavLink href="/#tech" onClick={closeMenu}>Technologies</NavLink>
        </li>        
        <li>
          <NavLink href="/#about" onClick={closeMenu}>About</NavLink>
        </li>        
      </Div2>
      <Div3>
        <MobileMenuButton
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </MobileMenuButton>
        <SocialIcons href="https://github.com/Canepro" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
          <AiFillGithub size="3rem" aria-hidden="true" />
        </SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/vincent-mogah/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
          <AiFillLinkedin size="3rem" aria-hidden="true" />
        </SocialIcons>
        <SocialIcons href="https://twitter.com/Canepro" target="_blank" rel="noopener noreferrer" aria-label="Twitter profile">
          <AiFillTwitterCircle size="3rem" aria-hidden="true"/>
        </SocialIcons>
      </Div3>

      {/* Mobile overlay */}
      <MobileMenuOverlay open={menuOpen} onClick={handleOverlayClick}>
        <MobileMenuPanel id="mobile-menu" role="dialog" aria-modal="true" open={menuOpen} onClick={handlePanelClick}>
          <MobileMenuList>
            <MobileMenuItem>
              <Link href="/" passHref legacyBehavior>
                <MobileNavLink onClick={closeMenu}>Home</MobileNavLink>
              </Link>
            </MobileMenuItem>
            <MobileMenuItem>
              <Link href="/projects" passHref legacyBehavior>
                <MobileNavLink onClick={closeMenu}>Projects</MobileNavLink>
              </Link>
            </MobileMenuItem>
            <MobileMenuItem>
              <Link href="/contact" passHref legacyBehavior>
                <MobileNavLink onClick={closeMenu}>Contact</MobileNavLink>
              </Link>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileNavLink href="/#tech" onClick={closeMenu}>Technologies</MobileNavLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileNavLink href="/#about" onClick={closeMenu}>About</MobileNavLink>
            </MobileMenuItem>
          </MobileMenuList>
        </MobileMenuPanel>
      </MobileMenuOverlay>
    </Container>
  );
};

export default Header;
