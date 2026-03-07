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
import { getAllBlogPostsMeta } from '@/lib/blog';
import { safeExternalHref } from '@/lib/url';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Systems',
  description:
    'A skimmable map of the systems behind this portfolio: OKE hub, AKS spoke, Jenkins multibranch CI, and OTLP telemetry into LGTM.',
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
        'min-w-0 rounded-2xl border px-4 py-3 shadow-sm backdrop-blur',
        accent
          ? 'border-[color:var(--color-border)] bg-[color:var(--color-card-hover)]'
          : 'border-[color:var(--color-border)] bg-[color:var(--color-card-bg)]',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] text-[color:var(--color-text-secondary)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-[color:var(--color-text-primary)]">
            {label}
          </div>
          <div className="mt-1 text-xs leading-5 text-[color:var(--color-text-secondary)] opacity-80">
            {sub}
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemsDiagram() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-5 md:p-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
          System map
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--color-text-secondary)]">
          GitHub changes flow through Jenkins, workloads run on the AKS spoke, and telemetry lands
          in the OKE hub for shared observability.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <NodeCard icon={<GitBranch className="h-5 w-5" />} label="GitHub" sub="main + PRs" />
          <div
            className="flex items-center justify-center text-[color:var(--color-text-secondary)] opacity-50"
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
            className="flex items-center justify-center text-[color:var(--color-text-secondary)] opacity-50"
            aria-hidden="true"
          >
            <ArrowRight className="h-4 w-4" />
          </div>
          <NodeCard
            icon={<Server className="h-5 w-5" />}
            label="Build Agents"
            sub="K8s pod agents; AKS agent used for RBAC-constrained workloads"
          />
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <NodeCard
            icon={<Boxes className="h-5 w-5" />}
            label="AKS Spoke"
            sub="Rocket.Chat workload + metrics/traces/logs exported"
          />
          <div className="flex shrink-0 flex-col items-center justify-center text-[color:var(--color-text-secondary)] opacity-50">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <div className="mt-1 text-[10px] font-mono text-[color:var(--color-text-secondary)] opacity-70">
              OTLP
            </div>
          </div>
          <NodeCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="OKE Hub"
            sub="Argo CD + GrafanaLocal (LGTM) for centralized observability"
            accent
          />
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-[color:var(--color-text-secondary)] opacity-80">
        This is a working demo system. Public endpoints may be gated or best-effort.
      </p>
    </div>
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
    {
      label: 'Control plane',
      value: 'OKE hub for Argo CD, Jenkins, and LGTM',
    },
    {
      label: 'Workload path',
      value: 'AKS spoke for app runtime and constrained build work',
    },
    {
      label: 'Telemetry',
      value: 'Metrics, logs, and traces forwarded into the hub',
    },
  ];

  return (
    <div className="px-6 py-10 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-[color:var(--color-text-secondary)]">
              Systems
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
              How the portfolio runs
            </h1>
            <p className="mt-5 text-[color:var(--color-text-secondary)] leading-7">
              The site is backed by a hub-and-spoke Kubernetes setup: OKE hosts the shared control
              plane and observability stack, while AKS carries workloads and constrained build
              agents. This page is the orientation layer; the project pages and posts carry the
              implementation detail.
            </p>

            <ul className="mt-6 grid gap-2 text-sm text-[color:var(--color-text-secondary)]">
              {systemFacts.map(item => (
                <li key={item.label} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                  <span>
                    <span className="font-semibold text-[color:var(--color-text-primary)]">
                      {item.label}:
                    </span>{' '}
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="accent" size="lg" className="h-11" asChild>
                <Link href="/projects">View Case Studies</Link>
              </Button>
              <Button variant="glass" size="lg" className="h-11" asChild>
                <Link href="/blog">Read Writing</Link>
              </Button>
            </div>
          </div>

          <div className="w-full max-w-xl">
            <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
                Start here
              </div>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3">
                  <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                    Systems page
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                    The quick map of how GitOps, CI, runtime, and observability connect.
                  </div>
                </div>
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3">
                  <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                    Projects
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                    Use the case studies for concrete outcomes, tradeoffs, and implementation
                    detail.
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-[color:var(--color-border)] pt-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
                  Live endpoints
                </div>
                <div className="mt-4 grid gap-2">
                  {endpoints.map(e => (
                    <a
                      key={e.label}
                      href={e.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-4 py-3 text-sm text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-card-hover)]"
                    >
                      <span className="font-semibold">{e.label}</span>
                      <span className="inline-flex items-center gap-2 text-[color:var(--color-text-secondary)] opacity-80">
                        Open <ExternalLink className="h-4 w-4" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-[color:var(--color-text-secondary)] opacity-80">
                Some services require authentication or may be paused to control cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <SystemsDiagram />
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Anchor repos</h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              These are the two repositories that explain most of the platform end-to-end.
            </p>

            <div className="mt-6 grid gap-3">
              {hubRepo ? (
                <a
                  href={hubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-5 hover:bg-[color:var(--color-card-hover)]"
                >
                  <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                    central-observability-hub-stack
                  </div>
                  <div className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                    Terraform-provisioned OKE hub + Argo CD GitOps + LGTM (Grafana/Loki/Tempo).
                  </div>
                </a>
              ) : null}

              {spokeRepo ? (
                <a
                  href={spokeRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-5 hover:bg-[color:var(--color-card-hover)]"
                >
                  <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                    rocketchat-k8s
                  </div>
                  <div className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                    Rocket.Chat on AKS with GitOps patterns, TLS, ops automation, and telemetry
                    exported to the hub.
                  </div>
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Related writing</h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              Use these posts for tradeoffs, constraints, and rollout detail.
            </p>

            <div className="mt-6 grid gap-3">
              {relatedPosts.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-5 hover:bg-[color:var(--color-card-hover)]"
                >
                  <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                    {p.title}
                  </div>
                  {p.description ? (
                    <div className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                      {p.description}
                    </div>
                  ) : null}
                  <div className="mt-3 text-xs text-[color:var(--color-text-secondary)] opacity-80">
                    {(p.tags || []).slice(0, 4).join(' · ')}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
