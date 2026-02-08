import type { Metadata } from 'next';

import ProjectsPageClient from '@/app/projects/ProjectsPageClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Explore Vincent Mogah's portfolio of DevOps, cloud, and frontend projects. Filter by technology and category.",
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
