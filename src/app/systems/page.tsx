import Link from 'next/link';
import type { Metadata } from 'next';

import { PageShell, PageSection } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { projects } from '@/constants/constants';
import { getAllBlogPostsMeta } from '@/lib/blog';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Platform archive',
  description:
    'Historical Kubernetes, GitOps, and observability deployments, with source and recorded evidence. The hosted environments have been retired.',
  alternates: { canonical: '/systems' },
  openGraph: {
    title: 'Platform archive',
    description: 'Historical platform deployments, source, and recorded evidence.',
    url: '/systems',
  },
  twitter: {
    title: 'Platform archive',
    description: 'Historical platform deployments, source, and recorded evidence.',
  },
};

export default function SystemsPage() {
  const historical = projects.filter(
    p => p.deployment?.status === 'retired' && p.category === 'Cloud'
  );
  const posts = getAllBlogPostsMeta()
    .filter(p => p.tags?.some(t => /^(gitops|argocd|jenkins|aks|migration)$/i.test(t)))
    .slice(0, 3);
  const stages = [
    ['01', 'Provision', 'Terraform provisioned the OCI hub and workload environments.'],
    [
      '02',
      'Build and reconcile',
      'Jenkins built changes; Argo CD reconciled application and platform configuration from Git.',
    ],
    [
      '03',
      'Run workloads',
      'AKS and K3s supplied the workload environments described in the individual case studies.',
    ],
    [
      '04',
      'Observe',
      'The OKE hub collected metrics, logs, and traces through the LGTM stack and OpenTelemetry.',
    ],
  ];

  return (
    <PageShell
      title="Platform archive"
      description="Earlier Kubernetes, GitOps, and observability work. These hosted environments have been retired. The source, diagrams, and recorded screenshots remain useful engineering evidence."
    >
      <PageSection>
        <SectionHeader title="How the deployments worked" />
        <ol className="mt-8 grid gap-8 border-y border-[color:var(--color-border)] py-8 md:grid-cols-2">
          {stages.map(([number, title, description]) => (
            <li key={number} className="flex gap-5">
              <span className="font-mono text-sm text-[color:var(--color-text-secondary)]">
                {number}
              </span>
              <div>
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-2 max-w-lg leading-7 text-[color:var(--color-text-secondary)]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-6 text-[color:var(--color-text-secondary)]">
          This is a summary of historical deployments, not a map of the current portfolio hosting.
          Individual case studies describe each topology and its limits.
        </p>
      </PageSection>
      <PageSection>
        <SectionHeader title="Recorded case studies" />
        <div className="mt-8 divide-y divide-[color:var(--color-border)]">
          {historical.map(p => (
            <article key={p.slug} className="grid gap-3 py-6 md:grid-cols-[1fr_1.2fr]">
              <h3 className="text-xl font-medium">
                <Link
                  href={`/projects/${encodeURIComponent(p.slug)}`}
                  className="underline underline-offset-4"
                >
                  {p.title}
                </Link>
              </h3>
              <p className="leading-7 text-[color:var(--color-text-secondary)]">{p.description}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection>
        <SectionHeader title="Notes from the work" />
        <ul className="mt-8 space-y-5">
          {posts.map(p => (
            <li key={p.slug}>
              <Link
                href={`/blog/${encodeURIComponent(p.slug)}`}
                className="text-lg underline underline-offset-4"
              >
                {p.title}
              </Link>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                {p.date} · Implementation notes
              </p>
            </li>
          ))}
        </ul>
      </PageSection>
    </PageShell>
  );
}
