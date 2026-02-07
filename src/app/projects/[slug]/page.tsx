import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectDetailClient from '@/app/projects/[slug]/ProjectDetailClient';
import { projects } from '@/constants/constants';
import { projectStructuredData } from '@/lib/structuredData';

export const revalidate = 60;

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) notFound();

  const jsonLd = JSON.stringify(projectStructuredData(project));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ProjectDetailClient project={project} slug={params.slug} />
    </>
  );
}
