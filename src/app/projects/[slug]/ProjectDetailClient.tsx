'use client';

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import ProjectMedia from '@/components/ProjectMedia/ProjectMedia';
import { ContentSection } from '@/components/layout/ContentSection';
import { PageShell } from '@/components/layout/PageShell';
import { SectionCard } from '@/components/layout/SectionCard';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Button } from '@/components/ui/button';
import { projectDetails } from '@/constants/projectDetails';
import { proseClasses } from '@/lib/prose';
import { safeExternalHref } from '@/lib/url';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

export default function ProjectDetailClient({ project, slug }: { project: Project; slug: string }) {
  const details = projectDetails[slug] || {};

  useEffect(() => {
    import('@/lib/analytics')
      .then(({ analytics }) => {
        analytics.trackProjectView(project.slug, project.title);
      })
      .catch(() => {});
  }, [project.slug, project.title]);

  const fullProject = { ...project, ...details };
  const heroSrc = (fullProject as Project).media || project.media || project.image;
  const heroFit =
    heroSrc.toLowerCase().endsWith('.gif') ||
    heroSrc.toLowerCase().endsWith('.mp4') ||
    heroSrc.toLowerCase().endsWith('.webm')
      ? 'contain'
      : 'cover';
  const visitHref = safeExternalHref(project.visit);
  const sourceHref = safeExternalHref(project.source);
  const meta = [project.category, project.featured ? 'Featured' : null].filter(Boolean).join(' · ');

  return (
    <PageShell
      width="narrow"
      back={{ href: '/projects', label: 'Back to projects' }}
      title={project.title}
      meta={
        meta ? (
          <p className="text-sm text-[color:var(--color-text-secondary)]">{meta}</p>
        ) : undefined
      }
    >
      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-[color:var(--color-border)] border-t-2 border-t-[color:var(--color-accent)] bg-[color:var(--color-card-bg)]">
        <ProjectMedia
          src={heroSrc}
          alt={project.title}
          fill
          priority
          poster={project.image}
          fit={heroFit}
          className="h-full w-full"
        />
      </div>

      {project.tags.length ? (
        <p className="mt-4 text-sm text-[color:var(--color-text-secondary)]">
          {project.tags.join(' · ')}
        </p>
      ) : null}

      <div className="mt-12 space-y-12">
        <ContentSection title="Overview">
          <div className={cn('max-w-3xl', proseClasses)}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {fullProject.longDescription || project.description}
            </ReactMarkdown>
          </div>
        </ContentSection>

        {fullProject.impact ? (
          <SectionCard padding="lg">
            <SectionLabel>Impact</SectionLabel>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-secondary)] md:text-base">
              {fullProject.impact}
            </p>
          </SectionCard>
        ) : null}

        {fullProject.challenges && fullProject.solutions ? (
          <ContentSection title="Challenges and solutions">
            <div className="grid gap-4 md:grid-cols-2">
              <SectionCard hover={false}>
                <h3 className="text-lg font-semibold tracking-tight">Challenges</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[color:var(--color-text-secondary)]">
                  {fullProject.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard hover={false}>
                <h3 className="text-lg font-semibold tracking-tight">Solutions</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[color:var(--color-text-secondary)]">
                  {fullProject.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </ContentSection>
        ) : null}

        {fullProject.technologies ? (
          <ContentSection title="Technology stack">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(fullProject.technologies).map(([category, techs]) => (
                <SectionCard key={category} hover={false}>
                  <SectionLabel>{category}</SectionLabel>
                  <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                    {techs.join(' · ')}
                  </p>
                </SectionCard>
              ))}
            </div>
          </ContentSection>
        ) : null}

        <div className="flex flex-wrap gap-3 border-t border-[color:var(--color-border)] pt-8">
          {visitHref ? (
            <Button variant="accent" asChild>
              <a href={visitHref} target="_blank" rel="noopener noreferrer">
                View live project
              </a>
            </Button>
          ) : null}
          {sourceHref ? (
            <Button variant="glass" asChild>
              <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                View source code
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}
