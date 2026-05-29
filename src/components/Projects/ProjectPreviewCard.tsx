'use client';

import Link from 'next/link';

import ProjectMedia from '@/components/ProjectMedia/ProjectMedia';
import { Button } from '@/components/ui/button';
import { safeExternalHref } from '@/lib/url';
import type { Project } from '@/types/project';
import { cn } from '@/lib/utils';

type ProjectPreviewCardProps = {
  project: Project;
  priority?: boolean;
  className?: string;
};

export default function ProjectPreviewCard({
  project,
  priority = false,
  className,
}: ProjectPreviewCardProps) {
  const previewSrc = project.media || project.image;
  const projectHref = `/projects/${encodeURIComponent(project.slug)}`;
  const visitHref = safeExternalHref(project.visit);
  const meta = [project.category, project.featured ? 'Featured' : null].filter(Boolean).join(' · ');

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] transition-colors hover:bg-[color:var(--color-card-hover)]',
        className
      )}
    >
      <Link href={projectHref} className="relative block aspect-video overflow-hidden">
        <ProjectMedia
          src={previewSrc}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={priority}
          poster={project.image}
          fit="cover"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        {meta ? <p className="text-xs text-[color:var(--color-text-secondary)]">{meta}</p> : null}

        <Link href={projectHref}>
          <h3 className="mt-2 text-lg font-semibold tracking-tight md:text-xl">{project.title}</h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[color:var(--color-text-secondary)]">
          {project.description}
        </p>

        {project.tags.length ? (
          <p className="mt-3 text-xs text-[color:var(--color-text-secondary)]">
            {project.tags.slice(0, 4).join(' · ')}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <Button variant="accent" size="sm" asChild>
            <Link href={projectHref}>Case study</Link>
          </Button>
          {visitHref ? (
            <a
              href={visitHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
