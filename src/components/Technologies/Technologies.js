// src/components/Technologies/Technologies.js

import React from 'react';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

// Import the local SVG icon components
import MicrosoftIcon from './icons/MicrosoftIcon';
import TerminalIcon from './icons/TerminalIcon';
import ReactIcon from './icons/ReactIcon';

const Technologies = () => (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Tech Stack</SectionTitle>
    <SectionText>
      My technical toolkit includes a variety of technologies for cloud, DevOps, and front-end development.
    </SectionText>
    <List>
      <ListItem>
        <picture>
          <MicrosoftIcon />
        </picture>
        <ListContainer>
          <ListTitle>Cloud & Architecture</ListTitle>
          <ListParagraph>Experience with Azure and AWS for building scalable and secure cloud infrastructure.</ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <TerminalIcon />
        </picture>
        <ListContainer>
          <ListTitle>DevOps & Containers</ListTitle>
          <ListParagraph>Proficient with Kubernetes, Docker, Podman, Terraform, and GitHub Actions.</ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <ReactIcon />
        </picture>
        <ListContainer>
          <ListTitle>Front-End & Languages</ListTitle>
          <ListParagraph>Skilled in Python, JavaScript, React, HTML5, and CSS3.</ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
    <SectionDivider colorAlt />
  </Section>
);

export default Technologies;