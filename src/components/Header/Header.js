import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';

import { Container, Div1, Div2, Div3, NavLink, SocialIcons, Span } from './HeaderStyles';

const Header = () =>  (
  <Container>
    <Div1>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', color:"white", marginBottom: '20px' }}>
        <DiCssdeck size="3rem" /> <Span>Personal Portfolio</Span>
      </Link>
    </Div1>
    <Div2>
      <li>
        <Link href="/" passHref legacyBehavior>
          <NavLink>Home</NavLink>
        </Link>
      </li>
      <li>
        <Link href="/projects" passHref legacyBehavior>
          <NavLink>Projects</NavLink>
        </Link>
      </li>
      <li>
        <NavLink href="/#tech">Technologies</NavLink>
      </li>        
      <li>
        <NavLink href="/#about">About</NavLink>
      </li>        
    </Div2>
      <Div3>
        <SocialIcons href="https://github.com/Canepro">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/vincent-mogah/">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://twitter.com/Canepro">
          <AiFillTwitterCircle size="3rem"/>
        </SocialIcons>
      </Div3>
    </Container>
);

export default Header;
