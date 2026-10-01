import { Project } from './project';

export interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  className?: string;
}
