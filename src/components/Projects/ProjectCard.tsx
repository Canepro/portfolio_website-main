import React from 'react';
import { ProjectCardProps } from '../../types/components';
import ProjectPreviewCard from './ProjectPreviewCard';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, priority = false }) => (
  <ProjectPreviewCard project={project} priority={priority} headingLevel={2} />
);
export default ProjectCard;
