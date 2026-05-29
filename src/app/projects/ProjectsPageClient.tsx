'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { PageShell } from '@/components/layout/PageShell';
import { SectionCard } from '@/components/layout/SectionCard';
import { SectionLabel } from '@/components/layout/SectionLabel';
import ProjectCard from '@/components/Projects/ProjectCard';
import { projectCategories, projects } from '@/constants/constants';
import type { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function hasLiveDemo(project: Project): boolean {
  if (typeof project.visit !== 'string') return false;
  if (!/^https?:\/\//i.test(project.visit)) return false;
  if (/github\.com/i.test(project.visit)) return false;
  if (typeof project.source === 'string' && project.visit === project.source) return false;
  return true;
}

function readCategoryParam(value: string | null): string {
  if (!value) return 'all';
  return projectCategories.some(c => c.value === value) ? value : 'all';
}

export default function ProjectsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode');
  const liveOnly = mode === 'live';

  const [searchTerm, setSearchTerm] = useState(() => searchParams?.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState(() =>
    readCategoryParam(searchParams?.get('category') ?? null)
  );

  useEffect(() => {
    setSearchTerm(searchParams?.get('q') ?? '');
    setSelectedCategory(readCategoryParam(searchParams?.get('category') ?? null));
  }, [searchParams]);

  const syncUrl = (next: { q?: string; category?: string; live?: boolean }) => {
    const params = new URLSearchParams();
    const q = next.q ?? searchTerm;
    const category = next.category ?? selectedCategory;
    const live = next.live ?? liveOnly;

    if (live) params.set('mode', 'live');
    if (category !== 'all') params.set('category', category);
    if (q.trim()) params.set('q', q.trim());

    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : '/projects', { scroll: false });
  };

  const filteredProjects = useMemo((): Project[] => {
    return projects.filter(project => {
      const matchesLive = !liveOnly || hasLiveDemo(project);

      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

      return matchesLive && matchesSearch && matchesCategory;
    });
  }, [liveOnly, searchTerm, selectedCategory]);

  const baseProjectsForCounts = useMemo(() => {
    return liveOnly ? projects.filter(hasLiveDemo) : projects;
  }, [liveOnly]);

  const visibleCategories = useMemo(() => {
    return projectCategories.filter(category => {
      if (category.value === 'all') return true;
      return baseProjectsForCounts.some(project => project.category === category.value);
    });
  }, [baseProjectsForCounts]);

  const activeCategoryLabel =
    projectCategories.find(category => category.value === selectedCategory)?.label ??
    'All Projects';
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all';

  return (
    <PageShell
      eyebrow="Projects"
      title="All case studies"
      description="Case studies and builds across platform engineering, observability, automation, and frontend work."
    >
      {liveOnly ? (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <span className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-3 py-2">
            Showing{' '}
            <span className="font-semibold text-[color:var(--color-text-primary)]">live demos</span>{' '}
            only
          </span>
          <Link
            href="/projects"
            className="underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
          >
            Show all
          </Link>
        </div>
      ) : null}

      <SectionCard className="mt-8" padding="lg">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <label
              htmlFor="projects-search"
              className="text-sm font-medium text-[color:var(--color-text-secondary)]"
            >
              Search
            </label>
            <Input
              id="projects-search"
              type="text"
              placeholder="Search by project, stack, or problem space"
              value={searchTerm}
              onChange={e => {
                const q = e.target.value;
                setSearchTerm(q);
                syncUrl({ q });
              }}
              aria-label="Search projects"
              className="mt-3 h-11"
            />
            <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
              Filter by title, stack, or problem area.
            </p>
          </div>

          <div>
            <SectionLabel>Browse by category</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
              {visibleCategories.map(category => {
                const isActive = selectedCategory === category.value;
                const count =
                  category.value === 'all'
                    ? baseProjectsForCounts.length
                    : baseProjectsForCounts.filter(p => p.category === category.value).length;

                return (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category.value);
                      syncUrl({ category: category.value });
                    }}
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? 'text-sm font-semibold text-[color:var(--color-text-primary)] underline decoration-[color:var(--color-accent)] underline-offset-8'
                        : 'text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]'
                    }
                  >
                    {category.label} <span className="text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[color:var(--color-border)] pt-5 text-sm text-[color:var(--color-text-secondary)]">
          <span>
            <span className="font-semibold text-[color:var(--color-text-primary)]">
              {filteredProjects.length}
            </span>{' '}
            result{filteredProjects.length === 1 ? '' : 's'}
          </span>
          <span>Category: {activeCategoryLabel}</span>
          {searchTerm ? <span>Search: “{searchTerm}”</span> : null}
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto px-0 py-0 text-sm text-[color:var(--color-text-secondary)] hover:bg-transparent hover:text-[color:var(--color-text-primary)]"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                syncUrl({ q: '', category: 'all' });
              }}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      </SectionCard>

      {filteredProjects.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <SectionCard className="mt-10 text-center" padding="lg" hover={false}>
          <div className="text-lg font-semibold text-[color:var(--color-text-primary)]">
            No projects found
          </div>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] opacity-80">
            Try adjusting your search or filters.
          </p>
        </SectionCard>
      )}
    </PageShell>
  );
}
