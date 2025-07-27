// src/components/Technologies/Technologies.js

import React from 'react';
// Corrected imports are below
import { DiReact, DiTerminal, DiMicrosoft } from 'react-icons/di';
import { SiAws, SiKubernetes, SiDocker, SiPodman, SiTerraform, SiGithubactions, SiPython, SiJavascript, SiGit, SiHtml5, SiCss3 } from 'react-icons/si';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

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
          {/* Using the standard Microsoft icon as a reliable replacement for Azure */}
          <DiMicrosoft size="3rem" />
        </picture>
        <ListContainer>
          <ListTitle>Cloud & Architecture</ListTitle>
          <ListParagraph>Experience with Azure and AWS for building scalable and secure cloud infrastructure.</ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <DiTerminal size="3rem" />
        </picture>
        <ListContainer>
          <ListTitle>DevOps & Containers</ListTitle>
          <ListParagraph>Proficient with Kubernetes, Docker, Podman, Terraform, and GitHub Actions.</ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <DiReact size="3rem" />
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