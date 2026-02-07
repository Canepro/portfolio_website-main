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
  LinkList,
  LinkTitle,
  Slogan,
  SocialContainer,
  SocialIconsContainer,
} from './FooterStyles';
import { Button } from '../ui/button';
import { Mail, Linkedin } from 'lucide-react';

const Footer: React.FC<FooterProps> = () => (
  <FooterWrapper>
    <LinkList>
      <LinkColumn>
        <LinkTitle>Get In Touch</LinkTitle>
        <div className="flex flex-col gap-3 mt-4 w-[220px]">
          <Button variant="glass" size="sm" className="w-full gap-2" asChild>
            <a href="mailto:mogah.vincent@hotmail.com">
              <Mail className="h-4 w-4" /> Send Email
            </a>
          </Button>
          <Button variant="glass" size="sm" className="w-full gap-2" asChild>
            <a
              href="https://www.linkedin.com/in/vincent-mogah/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </Button>
        </div>
      </LinkColumn>
      <LinkColumn>
        <LinkTitle>Quick Links</LinkTitle>
        <div className="flex flex-col gap-2 mt-4">
          <Button variant="ghost" size="sm" className="justify-start px-2" asChild>
            <Link href="/#projects">Projects</Link>
          </Button>
          <Button variant="ghost" size="sm" className="justify-start px-2" asChild>
            <Link href="/#tech">Technologies</Link>
          </Button>
          <Button variant="ghost" size="sm" className="justify-start px-2" asChild>
            <Link href="/#about">About</Link>
          </Button>
          <Button variant="ghost" size="sm" className="justify-start px-2" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button variant="ghost" size="sm" className="justify-start px-2" asChild>
            <Link href="/blog">Blog</Link>
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
