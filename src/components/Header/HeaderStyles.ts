import { IoIosArrowDropdown } from 'react-icons/io';
import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background: rgba(15, 22, 36, 0.6);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2rem;
  padding: 1rem 1.5rem;
  padding-top: 1.25rem;
  will-change: backdrop-filter;

  @media ${(props) => props.theme.breakpoints.sm} {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 60px);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
  }
`;

export const Span = styled.span`
  font-size: 2rem;
`;

export const Div1 = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: row;
  align-content: center;
  @media ${(props) => props.theme.breakpoints.sm} {
    grid-area: 1 / 1 / 2 / 3;
  }
`;

export const Div2 = styled.div`
  grid-area: 1 / 2 / 2 / 4;
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  @media ${(props) => props.theme.breakpoints.sm} {
    grid-area: 2 / 2 / 3 / 5;
    gap: 0.75rem;
    display: none; /* Hide desktop nav on small screens */
  }
`;

export const Div3 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media ${(props) => props.theme.breakpoints.sm} {
    align-items: center;
    grid-area: 1 / 4 / 2 / 6;
  }
`;

// Navigation Links
export const NavLink = styled.a`
  font-size: 1.8rem;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.9);
  transition: 0.4s ease;
  &:hover {
    color: #fff;
    opacity: 1;
    cursor: pointer;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 0.5rem;
    font-size: 1.6rem;
  }
`;

// DropDown Contact
export const ContactDropDown = styled.button`
  border: none;
  display: flex;
  position: relative;
  background: none;
  font-size: 1.7rem;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  transition: 0.3s ease;

  &:focus {
    outline: none;
  }
  &:hover {
    color: #fff;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 0.4rem 0;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    padding: 0;
  }
`;

interface NavProductsIconProps {
  isOpen?: boolean;
}

export const NavProductsIcon = styled(IoIosArrowDropdown)<NavProductsIconProps>`
  margin-left: 8px;
  display: flex;
  align-self: center;
  transition: 0.3s ease;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '.75')};
  transform: ${({ isOpen }) => (isOpen ? 'scaleY(-1)' : 'scaleY(1)')};

  &:hover {
    opacity: 1;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    margin: 2px 0 0 2px;
    width: 15px;
  }
`;

// Social Icons 
export const SocialIcons = styled.a`
  transition: 0.3s ease;
  color: white;
  border-radius: 50px;
  padding: 8px;
  &:hover {
    background-color: #212d45;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

// Mobile navigation
export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(20, 27, 44, 0.6);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(26, 34, 54, 0.75);
    border-color: rgba(255,255,255,0.25);
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    display: inline-flex;
  }
`;

interface MobileMenuProps {
  open: boolean;
}

export const MobileMenuOverlay = styled.div<MobileMenuProps>`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(2px);
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const MobileMenuPanel = styled.div<MobileMenuProps>`
  position: absolute;
  top: 72px;
  right: 16px;
  width: 84vw;
  max-width: 320px;
  border-radius: 12px;
  background: rgba(15, 22, 36, 0.92);
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.08);
  transform-origin: top right;
  transform: ${({ open }) => (open ? 'scale(1)' : 'scale(0.96)')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: transform 0.18s ease, opacity 0.18s ease;
  overflow: hidden;
`;

export const MobileMenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
`;

export const MobileMenuItem = styled.li`
  margin: 2px 0;
`;

export const MobileNavLink = styled.a`
  display: block;
  width: 100%;
  padding: 12px 14px;
  font-size: 1.6rem;
  color: rgba(255,255,255,0.95);
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: rgba(255,255,255,0.06);
    transform: translateY(-1px);
  }
`;
