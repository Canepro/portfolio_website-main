import React from 'react';
import Link from 'next/link';
import { ProjectCardProps } from '../../types/components';
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
  const showLiveDemo = Boolean(visitHref && (!sourceHref || visitHref !== sourceHref));
  const meta = [project.category, project.featured ? 'Featured' : null].filter(Boolean).join(' · ');

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      import('../../lib/analytics').then(({ analytics }) => {
        analytics.trackDemoAccess('dashboard', project.slug);
      });
    }
  };

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] text-[color:var(--color-text-primary)] transition-colors hover:bg-[color:var(--color-card-hover)]">
      <Link href={projectHref} className="relative block aspect-video overflow-hidden">
        <ProjectMedia
          src={previewSrc}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={index < 4}
          poster={project.image}
          fit="cover"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {meta ? <p className="text-xs text-[color:var(--color-text-secondary)]">{meta}</p> : null}

        <Link href={projectHref}>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{project.title}</h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[color:var(--color-text-secondary)]">
          {project.description}
        </p>

        {project.tags.length ? (
          <p className="mt-3 text-xs text-[color:var(--color-text-secondary)]">
            {project.tags.slice(0, 4).join(' · ')}
            {project.tags.length > 4 ? ` · +${project.tags.length - 4}` : ''}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
          <Button variant="accent" size="sm" className="min-w-[10rem] justify-center" asChild>
            <Link href={projectHref}>Read case study</Link>
          </Button>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {isGrafanaProject ? (
              <>
                {visitHref ? (
                  <a
                    href={visitHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDashboardClick}
                    className="inline-flex items-center gap-1 text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
                  >
                    <BarChart3 className="h-4 w-4" /> Open Grafana
                  </a>
                ) : null}
                {sourceHref ? (
                  <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-1 text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]">
                      <Github className="h-4 w-4" /> Code
                    </span>
                  </a>
                ) : null}
              </>
            ) : (
              <>
                {showLiveDemo && visitHref ? (
                  <a href={visitHref} target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-1 text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]">
                      <ExternalLink className="h-4 w-4" /> Live demo
                    </span>
                  </a>
                ) : null}
                {sourceHref ? (
                  <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-1 text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]">
                      <Github className="h-4 w-4" />
                      {visitHref && visitHref === sourceHref ? 'Source' : 'Code'}
                    </span>
                  </a>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
