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

import { Badge } from '@/components/ui/badge';
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
        accent ? 'border-white/15 bg-white/[0.07]' : 'border-white/10 bg-black/20',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white/90">{label}</div>
          <div className="mt-1 text-xs leading-5 text-white/60">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function SystemsDiagram() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
          Hub-and-Spoke Map
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-white/15 bg-black/20 text-white/70">
            OKE hub
          </Badge>
          <Badge variant="outline" className="border-white/15 bg-black/20 text-white/70">
            AKS spoke
          </Badge>
          <Badge variant="outline" className="border-white/15 bg-black/20 text-white/70">
            Jenkins multibranch
          </Badge>
          <Badge variant="outline" className="border-white/15 bg-black/20 text-white/70">
            OTLP → LGTM
          </Badge>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <NodeCard icon={<GitBranch className="h-5 w-5" />} label="GitHub" sub="main + PRs" />
          <div className="flex items-center justify-center text-white/35" aria-hidden="true">
            <ArrowRight className="h-4 w-4" />
          </div>
          <NodeCard
            icon={<Waypoints className="h-5 w-5" />}
            label="Jenkins"
            sub="Controller on OKE, multibranch CI for PRs and main"
            accent
          />
          <div className="flex items-center justify-center text-white/35" aria-hidden="true">
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
          <div className="flex shrink-0 flex-col items-center justify-center text-white/35">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <div className="mt-1 text-[10px] font-mono text-white/45">OTLP</div>
          </div>
          <NodeCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="OKE Hub"
            sub="Argo CD + GrafanaLocal (LGTM) for centralized observability"
            accent
          />
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-white/55">
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

  return (
    <div className="px-6 py-10 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-white/70">Systems</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
              A 30-second map
            </h1>
            <p className="mt-5 text-[color:var(--color-text-secondary)] leading-7">
              The portfolio is backed by a hub-and-spoke Kubernetes setup: an OKE hub for GitOps and
              observability, and an AKS spoke for workloads and constrained build agents. This page
              is the high-level view; the case studies and writing cover the details.
            </p>

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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
                Live Endpoints
              </div>
              <div className="mt-4 grid gap-2">
                {endpoints.map(e => (
                  <a
                    key={e.label}
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/[0.06]"
                  >
                    <span className="font-semibold">{e.label}</span>
                    <span className="inline-flex items-center gap-2 text-white/55">
                      Open <ExternalLink className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-white/55">
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Repos</h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              The two anchor repos that explain most of this setup end-to-end.
            </p>

            <div className="mt-6 grid gap-3">
              {hubRepo ? (
                <a
                  href={hubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 hover:bg-white/[0.06]"
                >
                  <div className="text-sm font-semibold text-white/90">
                    central-observability-hub-stack
                  </div>
                  <div className="mt-2 text-sm text-white/65">
                    Terraform-provisioned OKE hub + Argo CD GitOps + LGTM (Grafana/Loki/Tempo).
                  </div>
                </a>
              ) : null}

              {spokeRepo ? (
                <a
                  href={spokeRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 hover:bg-white/[0.06]"
                >
                  <div className="text-sm font-semibold text-white/90">rocketchat-k8s</div>
                  <div className="mt-2 text-sm text-white/65">
                    Rocket.Chat on AKS with GitOps patterns, TLS, ops automation, and telemetry
                    exported to the hub.
                  </div>
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Related Writing</h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              Deeper notes: tradeoffs, constraints, and the boring details that matter.
            </p>

            <div className="mt-6 grid gap-3">
              {relatedPosts.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 hover:bg-white/[0.06]"
                >
                  <div className="text-sm font-semibold text-white/90">{p.title}</div>
                  {p.description ? (
                    <div className="mt-2 text-sm text-white/65">{p.description}</div>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(p.tags || []).slice(0, 4).map(t => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-mono text-white/60"
                      >
                        {t}
                      </span>
                    ))}
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
