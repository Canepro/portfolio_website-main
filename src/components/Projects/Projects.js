// src/components/Projects/Projects.js

import React from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { GridContainer } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { SectionText } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { projects } from '../../constants/constants';

const Projects = () => {
  // Only show featured projects on homepage
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  
  return (
    <Section nopadding id="projects">
      <SectionDivider />
      <SectionTitle main>Featured Projects</SectionTitle>
      <SectionText>
        Showcasing my best work across DevOps, Cloud, and Frontend development
      </SectionText>
      <GridContainer>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </GridContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <Link href="/projects" passHref legacyBehavior>
          <Button as="a">View All Projects</Button>
        </Link>
      </div>
    </Section>
  );
};

export default Projects;