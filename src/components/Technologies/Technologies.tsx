// src/components/Technologies/Technologies.tsx

import React from 'react';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

// Import the local SVG icon components
import MicrosoftIcon from './icons/MicrosoftIcon';
import TerminalIcon from './icons/TerminalIcon';
import ReactIcon from './icons/ReactIcon';
import GitIcon from './icons/GitIcon';

const Technologies: React.FC = () => (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Tech Stack</SectionTitle>
    <SectionText>
      My technical toolkit includes a variety of technologies for cloud, DevOps, and front-end
      development.
    </SectionText>
    <List>
      <ListItem>
        <picture>
          <MicrosoftIcon />
        </picture>
        <ListContainer>
          <ListTitle>Cloud & Architecture</ListTitle>
          <ListParagraph>
            Experience with Azure and AWS for building scalable and secure cloud infrastructure.
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <TerminalIcon />
        </picture>
        <ListContainer>
          <ListTitle>DevOps & Containers</ListTitle>
          <ListParagraph>
            Proficient with Kubernetes, Docker, Podman, GitHub Actions, and production-minded
            operational workflows.
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <GitIcon />
        </picture>
        <ListContainer>
          <ListTitle>GitOps & IaC</ListTitle>
          <ListParagraph>
            ArgoCD: GitOps Continuous Delivery for multi-cluster Kubernetes orchestration.
            Terraform: Infrastructure as Code for provisioning OCI Always Free cloud resources and
            OKE clusters.
          </ListParagraph>
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
