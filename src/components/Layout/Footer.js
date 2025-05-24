import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.background2};
  border-top: 2px solid ${({ theme }) => theme.colors.accent1}22;
  padding: 30px 0 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text}cc;
  font-size: 1rem;
  margin-top: 60px;
`;

const Footer = () => (
  <FooterBar>
    &copy; {new Date().getFullYear()} Vincent Mogah &mdash; DevOps/Cloud Engineer. All rights reserved.
  </FooterBar>
);

export default Footer;
