// src/components/Projects/Projects.tsx

import React from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { GridContainer } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { SectionText } from '../../styles/GlobalComponents';
import { Button } from '../ui/button';
import projectsData from '../../data/projects';
import type { Project } from '../../types/project';

// Adapter function to convert new project structure to old component structure
const adaptProjectData = (newProject: typeof projectsData[0]): Project => ({
  id: parseInt(newProject.id.split('-').pop() || '0'),
  title: newProject.title,
  slug: newProject.id,
  description: newProject.short,
  longDescription: newProject.short,
  image: `/images/projects/${newProject.id}.png`, // Default image path
  tags: newProject.tech,
  category: newProject.tech.includes('Terraform') ? 'Cloud' :
            newProject.tech.includes('Docker') || newProject.tech.includes('Podman') ? 'DevOps' : 'Backend',
  featured: newProject.id === 'rocketchat-observability', // Feature the observability project
  source: newProject.repo,
  visit: newProject.demoUrl || newProject.repo,
  challenges: [],
  solutions: [],
  technologies: {}
});

const Projects: React.FC = () => {
  // Convert new project data to old format
  const projects: Project[] = projectsData.map(adaptProjectData);

  // Show up to 4 projects on homepage (prefer featured; backfill with others)
  const featured: Project[] = projects.filter(p => p.featured);
  const nonFeatured: Project[] = projects.filter(p => !p.featured);
  const featuredProjects: Project[] = [...featured.slice(0, 4)];
  if (featuredProjects.length < 4) {
    featuredProjects.push(...nonFeatured.slice(0, 4 - featuredProjects.length));
  }
  
  return (
    <Section id="projects" style={{ marginTop: '24px' } as React.CSSProperties}>
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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', marginBottom: '2rem' } as React.CSSProperties}>
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
