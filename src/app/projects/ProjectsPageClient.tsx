'use client';

import React, { useMemo, useState } from 'react';

import ProjectCard from '@/components/Projects/ProjectCard';
import { projectCategories, projects } from '@/constants/constants';
import type { Project } from '@/types/project';
import {
  CategoryButton,
  CategoryFilter,
  FilterContainer,
  NoResults,
  PageContainer,
  PageDescription,
  PageTitle,
  ProjectsGrid,
  SearchBar,
} from '@/styles/ProjectsPageStyles';

export default function ProjectsPageClient() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = useMemo((): Project[] => {
    return projects.filter(project => {
      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
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
          onChange={e => setSearchTerm(e.target.value)}
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
                <span>({projects.filter(p => p.category === category.value).length})</span>
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
  );
}
