// TypeScript interfaces for page props

export interface GitHubStats {
  followers: number;
  stars: number;
  repos: number;
}

export interface HomePageProps {
  githubStats: GitHubStats;
}

export interface ProjectsPageProps {
  projects: Project[];
}

export interface ProjectDetailPageProps {
  project: Project;
  projectDetail?: ProjectDetail;
}

// Re-export types from project.d.ts for convenience
import { Project, ProjectDetail } from './project';
export { Project, ProjectDetail };
