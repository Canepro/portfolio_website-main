// src/components/Projects/Projects.js

import React from 'react';
import Link from 'next/link';
import AnimatedProjectCard from './AnimatedProjectCard';
import { GridContainer } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { SectionText } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { projects } from '../../constants/constants';
import AnimatedSection from '../AnimatedSection/AnimatedSection';

const Projects = () => {
  // Only show featured projects on homepage
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  
  return (
    <Section nopadding id="projects">
      <AnimatedSection>
        <SectionDivider />
        <SectionTitle main>Featured Projects</SectionTitle>
        <SectionText>
          Showcasing my best work across DevOps, Cloud, and Frontend development
        </SectionText>
      </AnimatedSection>
      <GridContainer>
        {featuredProjects.map((project, index) => (
          <AnimatedProjectCard key={project.id} project={project} index={index} />
        ))}
      </GridContainer>
      <AnimatedSection delay={0.4}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Link href="/projects" passHref legacyBehavior>
            <Button as="a">View All Projects</Button>
          </Link>
        </div>
      </AnimatedSection>
    </Section>
  );
};

export default Projects;