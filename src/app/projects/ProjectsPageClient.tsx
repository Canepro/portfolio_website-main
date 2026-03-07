'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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

export default function ProjectsPageClient() {
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode');
  const liveOnly = mode === 'live';

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">All Projects</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--color-text-secondary)] leading-7">
          Case studies and technical builds across platform engineering, observability, automation,
          and frontend delivery.
        </p>

        {liveOnly ? (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
            <span className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-3 py-2">
              Showing{' '}
              <span className="font-semibold text-[color:var(--color-text-primary)]">
                live demos
              </span>{' '}
              only.
            </span>
            <Link
              href="/projects"
              className="underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
            >
              Show all
            </Link>
          </div>
        ) : null}

        <div className="mt-8 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <label
                htmlFor="projects-search"
                className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80"
              >
                Search
              </label>
              <Input
                id="projects-search"
                type="text"
                placeholder="Search by project, stack, or problem space"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Search projects"
                className="mt-3 h-11"
              />
              <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
                Use this to jump straight to a tool, platform, or problem domain.
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
                Browse by category
              </div>
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
                      onClick={() => setSelectedCategory(category.value)}
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
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-8 text-center">
            <div className="text-lg font-semibold text-[color:var(--color-text-primary)]">
              No projects found
            </div>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] opacity-80">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
