// src/components/Footer/Footer.js

import React from 'react';
import { AiFillGithub, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';
import { SocialIcons } from '../Header/HeaderStyles';
import { CompanyContainer, FooterWrapper, LinkColumn, LinkItem, LinkList, LinkTitle, Slogan, SocialContainer, SocialIconsContainer } from './FooterStyles';

const Footer = () => (
  <FooterWrapper>
    <LinkList>
      <LinkColumn>
        <LinkTitle>Email</LinkTitle>
        <LinkItem href="mailto:mogah.vincent@hotmail.com">mogah.vincent@hotmail.com</LinkItem>
      </LinkColumn>
      <LinkColumn>
        <LinkTitle>Rocket.Chat</LinkTitle>
        <LinkItem>@vincent.mogah</LinkItem>
      </LinkColumn>
    </LinkList>
    <SocialIconsContainer>
      <CompanyContainer>
        <Slogan>Constant and never-ending progress...</Slogan>
      </CompanyContainer>
      <SocialContainer>
        <SocialIcons href="https://github.com/Canepro"><AiFillGithub size="3rem" /></SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/vincent-mogah/"><AiFillLinkedin size="3rem" /></SocialIcons>
        <SocialIcons href="https://twitter.com/Canepro"><AiFillTwitterCircle size="3rem" /></SocialIcons>
      </SocialContainer>
    </SocialIconsContainer>
  </FooterWrapper>
);

export default Footer;