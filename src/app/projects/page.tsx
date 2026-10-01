import type { Metadata } from 'next';
import { Suspense } from 'react';

import ProjectsPageClient from '@/app/projects/ProjectsPageClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Agent workflows, CI remediation, infrastructure diagnostics, and platform case studies.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Work',
    description:
      'Agent workflows, CI remediation, infrastructure diagnostics, and platform case studies.',
    url: '/projects',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Work',
    description:
      'Agent workflows, CI remediation, infrastructure diagnostics, and platform case studies.',
    images: [],
  },
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageClient />
    </Suspense>
  );
}
