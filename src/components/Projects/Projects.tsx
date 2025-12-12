// src/components/Projects/Projects.tsx

import React from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { GridContainer } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { SectionText } from '../../styles/GlobalComponents';
import { Button } from '../ui/button';
import { projects } from '../../constants/constants';
import type { Project } from '../../types/project';

const Projects: React.FC = () => {
  // Show up to 4 projects on homepage (prefer featured; backfill with others)
  const featured: Project[] = projects.filter(p => p.featured);
  const nonFeatured: Project[] = projects.filter(p => !p.featured);
  const featuredProjects: Project[] = [...featured.slice(0, 4)];
  if (featuredProjects.length < 4) {
    featuredProjects.push(...nonFeatured.slice(0, 4 - featuredProjects.length));
  }

  return (
    <Section id="projects" style={{ marginTop: '24px' }}>
      <SectionDivider divider />
      <SectionTitle main>Featured Projects</SectionTitle>
      <SectionText>
        Showcasing my best work across DevOps, Cloud, and Frontend development
      </SectionText>
      <GridContainer>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </GridContainer>
      <div className="flex justify-center mt-12 mb-8">
        <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" asChild>
          <Link href="/projects">View All Projects →</Link>
        </Button>
      </div>
    </Section>
  );
};

export default Projects;
