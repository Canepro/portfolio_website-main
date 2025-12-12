// src/components/Footer/Footer.tsx

import React from 'react';
import Link from 'next/link';
import { AiFillGithub, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';
import { SocialIcons } from '../Header/HeaderStyles';
import { FooterProps } from '../../types/components';
import {
  CompanyContainer,
  FooterWrapper,
  LinkColumn,
  LinkItem,
  LinkList,
  LinkTitle,
  Slogan,
  SocialContainer,
  SocialIconsContainer,
} from './FooterStyles';
import { Button } from '../ui/button';

const Footer: React.FC<FooterProps> = () => (
  <FooterWrapper>
    <LinkList>
      <LinkColumn>
        <LinkTitle>Get In Touch</LinkTitle>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginTop: '1rem',
            width: '220px',
          }}
        >
          <Button variant="outline" size="sm" asChild style={{ width: '100%' }}>
            <a href="mailto:mogah.vincent@hotmail.com">📧 Send Email</a>
          </Button>
          <Button variant="outline" size="sm" asChild style={{ width: '100%' }}>
            <a
              href="https://www.linkedin.com/in/vincent-mogah/"
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn
            </a>
          </Button>
        </div>
      </LinkColumn>
      <LinkColumn>
        <LinkTitle>Quick Links</LinkTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#projects">Projects</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#tech">Technologies</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#about">About</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </LinkColumn>
    </LinkList>
    <SocialIconsContainer>
      <CompanyContainer>
        <Slogan>Constant and never-ending progress...</Slogan>
      </CompanyContainer>
      <SocialContainer>
        <SocialIcons
          href="https://github.com/Canepro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <AiFillGithub size="3rem" aria-hidden="true" />
        </SocialIcons>
        <SocialIcons
          href="https://www.linkedin.com/in/vincent-mogah/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <AiFillLinkedin size="3rem" aria-hidden="true" />
        </SocialIcons>
        <SocialIcons
          href="https://twitter.com/Canepro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter profile"
        >
          <AiFillTwitterCircle size="3rem" aria-hidden="true" />
        </SocialIcons>
      </SocialContainer>
    </SocialIconsContainer>
  </FooterWrapper>
);

export default Footer;
