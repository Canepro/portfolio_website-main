// src/pages/projects/index.tsx

import React, { useState, useMemo } from 'react';
import { Layout } from '../../layout/Layout';
import projectsData from '../../data/projects';
import { projectCategories } from '../../constants/constants';
import ProjectCard from '../../components/Projects/ProjectCard';
import SEO from '../../components/SEO/SEO';
import { Project } from '../../types/project';
import {
  PageContainer,
  PageTitle,
  PageDescription,
  FilterContainer,
  SearchBar,
  CategoryFilter,
  CategoryButton,
  ProjectsGrid,
  NoResults
} from '../../styles/ProjectsPageStyles';

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

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Convert new project data to old format
  const projects: Project[] = projectsData.map(adaptProjectData);

  // Filter projects based on search and category
  const filteredProjects = useMemo((): Project[] => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <SEO
        title="All Projects - Vincent Mogah Portfolio"
        description="Explore Vincent Mogah's complete portfolio of DevOps, Cloud, and Frontend development projects. Filter by technology and category to find specific implementations."
        canonical="https://portfolio.canepro.me/projects"
        keywords="DevOps projects, Cloud projects, Frontend projects, React applications, Docker containers, Azure deployments, Portfolio projects"
      />
      <Layout>
        <PageContainer>
          <PageTitle>All Projects</PageTitle>
          <PageDescription>
            Explore my complete portfolio of projects spanning DevOps, Cloud, Frontend, and more.
          </PageDescription>

        <FilterContainer>
          <SearchBar
            type="text"
            placeholder="Search projects by name, technology, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
          
          <CategoryFilter>
            {projectCategories.map(category => (
              <CategoryButton
                key={category.value}
                active={selectedCategory === category.value}
                onClick={() => setSelectedCategory(category.value)}
                aria-pressed={selectedCategory === category.value}
              >
                {category.label}
                {category.value !== 'all' && (
                  <span>
                    ({projects.filter(p => p.category === category.value).length})
                  </span>
                )}
              </CategoryButton>
            ))}
          </CategoryFilter>
        </FilterContainer>

        {filteredProjects.length > 0 ? (
          <ProjectsGrid>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </ProjectsGrid>
        ) : (
          <NoResults>
            <h3>No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </NoResults>
        )}
        </PageContainer>
      </Layout>
    </>
  );
};

export default ProjectsPage;
