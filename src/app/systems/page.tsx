import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  ExternalLink,
  GitBranch,
  Server,
  Waypoints,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { InsetLink } from '@/components/layout/InsetLink';
import { PageSection, PageShell } from '@/components/layout/PageShell';
import { SectionCard } from '@/components/layout/SectionCard';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { getAllBlogPostsMeta } from '@/lib/blog';
import { safeExternalHref } from '@/lib/url';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Systems',
  description:
    'Hub-and-spoke Kubernetes behind this site: OKE control plane, AKS workloads, Jenkins CI, LGTM observability.',
};

function NodeCard({
  icon,
  label,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        'min-w-0 rounded-xl border px-4 py-3',
        accent
          ? 'border-[color:var(--color-border)] bg-[color:var(--color-card-hover)]'
          : 'border-[color:var(--color-border)] bg-[color:var(--color-card-bg)]',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] text-[color:var(--color-text-secondary)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
            {label}
          </div>
          <div className="mt-1 text-xs leading-5 text-[color:var(--color-text-secondary)]">
            {sub}
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemsDiagram() {
  return (
    <SectionCard
      padding="md"
      hover={false}
      className="border-t-2 border-t-[color:var(--color-accent)]"
    >
      <SectionLabel>System map</SectionLabel>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--color-text-secondary)]">
        GitHub changes flow through Jenkins, workloads run on the AKS spoke, and telemetry lands in
        the OKE hub for shared observability.
      </p>

      <div className="mt-5 grid gap-3">
        <div className="hidden md:block">
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
            <NodeCard icon={<GitBranch className="h-5 w-5" />} label="GitHub" sub="main + PRs" />
            <div
              className="flex items-center justify-center text-[color:var(--color-text-secondary)]"
              aria-hidden="true"
            >
              <ArrowRight className="h-4 w-4" />
            </div>
            <NodeCard
              icon={<Waypoints className="h-5 w-5" />}
              label="Jenkins"
              sub="Controller on OKE, multibranch CI for PRs and main"
              accent
            />
            <div
              className="flex items-center justify-center text-[color:var(--color-text-secondary)]"
              aria-hidden="true"
            >
              <ArrowRight className="h-4 w-4" />
            </div>
            <NodeCard
              icon={<Server className="h-5 w-5" />}
              label="Build agents"
              sub="K8s pod agents; AKS agent for RBAC-constrained workloads"
            />
          </div>

          <div className="mt-3 grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
            <NodeCard
              icon={<Boxes className="h-5 w-5" />}
              label="AKS spoke"
              sub="Rocket.Chat workload + metrics/traces/logs exported"
            />
            <div className="flex shrink-0 flex-col items-center justify-center text-[color:var(--color-text-secondary)]">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <div className="mt-1 text-[10px] font-mono">OTLP</div>
            </div>
            <NodeCard
              icon={<BarChart3 className="h-5 w-5" />}
              label="OKE hub"
              sub="Argo CD + GrafanaLocal (LGTM) for centralized observability"
              accent
            />
          </div>
        </div>

        <div className="grid gap-3 md:hidden">
          <NodeCard
            icon={<GitBranch className="h-5 w-5" />}
            label="GitHub → Jenkins"
            sub="Multibranch CI on OKE"
            accent
          />
          <NodeCard
            icon={<Server className="h-5 w-5" />}
            label="Build agents"
            sub="K8s pod agents; AKS for RBAC-constrained workloads"
          />
          <NodeCard
            icon={<Boxes className="h-5 w-5" />}
            label="AKS spoke"
            sub="Rocket.Chat + metrics/traces/logs exported"
          />
          <NodeCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="OKE hub"
            sub="Argo CD + GrafanaLocal (LGTM)"
            accent
          />
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-[color:var(--color-text-secondary)]">
        Public endpoints may require login or be paused to save cost.
      </p>
    </SectionCard>
  );
}

export default function SystemsPage() {
  const hubRepo = safeExternalHref('https://github.com/Canepro/central-observability-hub-stack');
  const spokeRepo = safeExternalHref('https://github.com/Canepro/rocketchat-k8s');

  const endpoints = [
    { label: 'Jenkins', href: safeExternalHref('https://jenkins.canepro.me') },
    { label: 'Grafana', href: safeExternalHref('https://grafana.canepro.me') },
    { label: 'Argo CD', href: safeExternalHref('https://argocd.canepro.me') },
    { label: 'Rocket.Chat (sandbox)', href: safeExternalHref('https://k8.canepro.me') },
  ].filter((e): e is { label: string; href: string } => Boolean(e.href));

  const relatedPosts = (() => {
    const all = getAllBlogPostsMeta();
    const prefer = new Set(['gitops', 'kubernetes', 'observability', 'jenkins', 'ci/cd', 'argo']);
    const ranked = all
      .map(p => {
        const tags = (p.tags || []).map(t => t.toLowerCase());
        const score = tags.reduce((acc, t) => (prefer.has(t) ? acc + 1 : acc), 0);
        return { p, score };
      })
      .sort((a, b) => b.score - a.score);
    const picks = ranked
      .filter(x => x.score > 0)
      .slice(0, 3)
      .map(x => x.p);
    return picks.length ? picks : all.slice(0, 3);
  })();

  const systemFacts = [
    { label: 'Control plane', value: 'OKE hub for Argo CD, Jenkins, and LGTM' },
    { label: 'Workload path', value: 'AKS spoke for app runtime and constrained build work' },
    { label: 'Telemetry', value: 'Metrics, logs, and traces forwarded into the hub' },
  ];

  return (
    <PageShell
      eyebrow="Systems"
      title="How the portfolio runs"
      description="OKE runs Argo CD, Jenkins, and the LGTM stack. AKS runs app workloads and some build agents. Project pages and blog posts cover the specifics."
    >
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <ul className="grid gap-2 text-sm text-[color:var(--color-text-secondary)]">
            {systemFacts.map(item => (
              <li key={item.label}>
                <span className="font-medium text-[color:var(--color-text-primary)]">
                  {item.label}:
                </span>{' '}
                {item.value}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="accent" size="lg" className="h-11" asChild>
              <Link href="/projects">View case studies</Link>
            </Button>
            <Button variant="glass" size="lg" className="h-11" asChild>
              <Link href="/blog">Read blog</Link>
            </Button>
          </div>
        </div>

        <SectionCard padding="md">
          <SectionLabel>Where to go next</SectionLabel>
          <div className="mt-3 grid gap-3">
            <InsetLink
              href="/projects"
              title="/projects"
              description="Case studies with architecture, tradeoffs, and outcomes."
            />
            <InsetLink
              href="/blog"
              title="/blog"
              description="Rollout notes and things that broke along the way."
            />
          </div>

          <div className="mt-5 border-t border-[color:var(--color-border)] pt-5">
            <SectionLabel>Live endpoints</SectionLabel>
            <div className="mt-3 grid gap-2">
              {endpoints.map(e => (
                <a
                  key={e.label}
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3 text-sm text-[color:var(--color-text-primary)] transition-colors hover:bg-[color:var(--color-card-hover)]"
                >
                  <span className="font-semibold">{e.label}</span>
                  <span className="inline-flex items-center gap-2 text-[color:var(--color-text-secondary)]">
                    Open <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-[color:var(--color-text-secondary)]">
            Some services require authentication or may be paused to control cost.
          </p>
        </SectionCard>
      </div>

      <PageSection spacing="default" className="max-w-none px-0">
        <SystemsDiagram />
      </PageSection>

      <PageSection spacing="default" className="max-w-none px-0">
        <div className="grid gap-4 md:grid-cols-2">
          <SectionCard padding="lg">
            <SectionLabel>Anchor repos</SectionLabel>
            <p className="mt-2 text-[color:var(--color-text-secondary)] leading-7">
              Two repos cover most of the platform.
            </p>
            <div className="mt-6 grid gap-3">
              {hubRepo ? (
                <InsetLink
                  href={hubRepo}
                  external
                  title="central-observability-hub-stack"
                  description="Terraform-provisioned OKE hub + Argo CD GitOps + LGTM (Grafana/Loki/Tempo)."
                />
              ) : null}
              {spokeRepo ? (
                <InsetLink
                  href={spokeRepo}
                  external
                  title="rocketchat-k8s"
                  description="Rocket.Chat on AKS with GitOps patterns, TLS, ops automation, and telemetry exported to the hub."
                />
              ) : null}
            </div>
          </SectionCard>

          <SectionCard padding="lg">
            <SectionLabel>Related writing</SectionLabel>
            <p className="mt-2 text-[color:var(--color-text-secondary)] leading-7">
              Posts tagged for this setup.
            </p>
            <div className="mt-6 grid gap-3">
              {relatedPosts.map(p => (
                <InsetLink
                  key={p.slug}
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  title={p.title}
                  description={p.description}
                  trailing={
                    p.tags && p.tags.length ? (
                      <div className="mt-3 text-xs text-[color:var(--color-text-secondary)]">
                        {p.tags.slice(0, 4).join(' · ')}
                      </div>
                    ) : undefined
                  }
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </PageSection>
    </PageShell>
  );
}
