import type { Metadata } from 'next';
import { Suspense } from 'react';

import ProjectsPageClient from '@/app/projects/ProjectsPageClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'DevOps, cloud, and frontend project case studies.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageClient />
    </Suspense>
  );
}
