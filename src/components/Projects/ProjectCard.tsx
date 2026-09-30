import React from 'react';
import { ProjectCardProps } from '../../types/components';
import ProjectPreviewCard from './ProjectPreviewCard';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => (
  <ProjectPreviewCard project={project} priority={index === 0} headingLevel={2} />
);
export default ProjectCard;
