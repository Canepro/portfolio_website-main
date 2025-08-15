// src/components/Projects/Projects.js

import React from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { GridContainer } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { SectionText } from '../../styles/GlobalComponents';
import { Button } from '../ui/button';
import { projects } from '../../constants/constants';

const Projects = () => {
  // Show up to 4 projects on homepage (prefer featured; backfill with others)
  const featured = projects.filter(p => p.featured);
  const nonFeatured = projects.filter(p => !p.featured);
  const featuredProjects = [...featured.slice(0, 2)];
  if (featuredProjects.length < 2) {
    featuredProjects.push(...nonFeatured.slice(0, 2 - featuredProjects.length));
  }
  
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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
        <Button size="lg" variant="outline" asChild>
          <Link href="/projects">
            View All Projects →
          </Link>
        </Button>
      </div>
    </Section>
  );
};

export default Projects;