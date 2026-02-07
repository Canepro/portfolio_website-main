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

  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">All Projects</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--color-text-secondary)] leading-7">
          Explore my complete portfolio of projects spanning DevOps, cloud, frontend, and more.
        </p>

        {liveOnly ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            Showing <span className="font-semibold text-white/85">live demos</span> only.{' '}
            <Link href="/projects" className="underline underline-offset-4 hover:text-white">
              Show all
            </Link>
            .
          </div>
        ) : null}

        <div className="mt-8 space-y-4">
          <Input
            type="text"
            placeholder="Search projects by name, technology, or description…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search projects"
            className="h-11"
          />

          <div className="flex flex-wrap gap-2">
            {projectCategories.map(category => {
              const isActive = selectedCategory === category.value;
              const count =
                category.value === 'all'
                  ? baseProjectsForCounts.length
                  : baseProjectsForCounts.filter(p => p.category === category.value).length;
              const isDisabled = count === 0;
              return (
                <Button
                  key={category.value}
                  type="button"
                  size="sm"
                  variant={isActive ? 'accent' : 'glass'}
                  className="gap-2"
                  onClick={() => setSelectedCategory(category.value)}
                  aria-pressed={isActive}
                  disabled={isDisabled}
                >
                  {category.label}
                  <span className={isActive ? 'text-black/70' : 'text-white/60'}>{count}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <div className="text-lg font-semibold text-white/85">No projects found</div>
            <p className="mt-2 text-sm text-white/60">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
