import React from 'react';
import { LayoutProps } from '../types/components';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { Container } from './LayoutStyles';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <main>{children}</main> 
      <Footer />
    </Container>
  );
};
