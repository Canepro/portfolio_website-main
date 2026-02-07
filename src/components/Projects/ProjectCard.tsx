import React from 'react';
import Link from 'next/link';
import { ProjectCardProps } from '../../types/components';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Github, ExternalLink, BarChart3 } from 'lucide-react';
import ProjectMedia from '../ProjectMedia/ProjectMedia';
import { safeExternalHref } from '@/lib/url';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const isGrafanaProject = project.slug === 'central-observability-hub-stack';
  const previewSrc = project.media || project.image;
  const projectHref = `/projects/${encodeURIComponent(project.slug)}`;
  const visitHref = safeExternalHref(project.visit);
  const sourceHref = safeExternalHref(project.source);
  const hasSeparateLiveDemo = Boolean(visitHref && sourceHref && visitHref !== sourceHref);

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      import('../../lib/analytics').then(({ analytics }) => {
        analytics.trackDemoAccess('dashboard', project.slug);
      });
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-lg">
      {/* Image Section */}
      <Link href={projectHref} className="relative block aspect-video overflow-hidden">
        <ProjectMedia
          src={previewSrc}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={index < 4}
          poster={project.image}
          fit="cover"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute left-3 top-3 flex gap-2">
          {project.featured && (
            <Badge
              variant="default"
              className="border-none bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Featured
            </Badge>
          )}
          {project.category && (
            <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm">
              {project.category}
            </Badge>
          )}
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={projectHref} className="group/title">
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover/title:text-[color:var(--color-accent)]">
            {project.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-3 text-sm text-[color:var(--color-text-secondary)]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs font-medium text-white/80"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs font-medium text-white/60">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Actions Footer */}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {isGrafanaProject ? (
            <>
              {visitHref && (
                <Button variant="accent" size="sm" className="w-full gap-2 sm:w-auto" asChild>
                  <a
                    href={visitHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDashboardClick}
                  >
                    <BarChart3 className="h-4 w-4" /> Open Grafana
                  </a>
                </Button>
              )}
              {sourceHref && (
                <Button variant="glass" size="sm" className="w-full gap-2 sm:w-auto" asChild>
                  <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> Code
                  </a>
                </Button>
              )}
            </>
          ) : (
            <>
              {hasSeparateLiveDemo && visitHref && (
                <Button variant="accent" size="sm" className="w-full gap-2 sm:w-auto" asChild>
                  <a href={visitHref} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
              {sourceHref && (
                <Button
                  variant={hasSeparateLiveDemo ? 'glass' : 'accent'}
                  size="sm"
                  className="w-full gap-2 sm:w-auto"
                  asChild
                >
                  <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    {visitHref && visitHref === sourceHref ? 'View Source' : 'Code'}
                  </a>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
