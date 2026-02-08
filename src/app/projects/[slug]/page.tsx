import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectDetailClient from '@/app/projects/[slug]/ProjectDetailClient';
import { projects } from '@/constants/constants';
import { projectStructuredData } from '@/lib/structuredData';

export const revalidate = 60;

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

type ParamsPromise = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const jsonLd = JSON.stringify(projectStructuredData(project));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ProjectDetailClient project={project} slug={slug} />
    </>
  );
}
