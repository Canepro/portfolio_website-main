import { ArrowRight, BarChart3, Boxes, GitBranch, Server, Waypoints } from 'lucide-react';

function Node({
  label,
  sub,
  icon,
  accent,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        'relative min-w-0 rounded-xl border px-3 py-2',
        accent
          ? 'border-[color:var(--color-border)] bg-[color:var(--color-card-hover)]'
          : 'border-[color:var(--color-border)] bg-[color:var(--color-card-bg)]',
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] text-[color:var(--color-text-secondary)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-[color:var(--color-text-primary)]">
            {label}
          </div>
          <div className="truncate text-[11px] text-[color:var(--color-text-secondary)]">{sub}</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div
      data-hero-visual
      className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-[color:var(--color-border)] border-t-2 border-t-[color:var(--color-accent)] bg-[color:var(--color-card-bg)] md:h-full md:min-h-[420px]"
    >
      <div className="relative flex h-full flex-col p-5 md:p-6">
        <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">
          How this site is built
        </p>

        <div className="mt-4 flex-1">
          <div className="hidden h-full items-center md:flex">
            <div className="relative grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
              <Node label="GitHub" sub="main + PRs" icon={<GitBranch className="h-4 w-4" />} />
              <div className="flex shrink-0 items-center justify-center text-[color:var(--color-text-secondary)]">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
              <Node
                label="Jenkins"
                sub="multibranch on OKE"
                icon={<Waypoints className="h-4 w-4" />}
                accent
              />
              <div className="flex shrink-0 items-center justify-center text-[color:var(--color-text-secondary)]">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
              <Node
                label="Build agents"
                sub="AKS, RBAC constrained"
                icon={<Server className="h-4 w-4" />}
              />

              <div className="col-span-5 mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <Node
                  label="AKS spoke"
                  sub="Rocket.Chat + metrics"
                  icon={<Boxes className="h-4 w-4" />}
                />
                <div className="flex shrink-0 flex-col items-center justify-center text-[color:var(--color-text-secondary)]">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  <div className="mt-1 text-[10px] font-mono">OTLP</div>
                </div>
                <Node
                  label="OKE hub"
                  sub="Argo CD + Grafana"
                  icon={<BarChart3 className="h-4 w-4" />}
                  accent
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            <Node
              label="GitHub → Jenkins"
              sub="multibranch CI on OKE"
              icon={<GitBranch className="h-4 w-4" />}
              accent
            />
            <Node
              label="Kubernetes"
              sub="OKE hub + AKS spoke"
              icon={<Boxes className="h-4 w-4" />}
            />
            <Node
              label="Deploy previews"
              sub="Netlify PR URLs"
              icon={<Waypoints className="h-4 w-4" />}
            />
            <Node
              label="Observability"
              sub="Grafana / LGTM"
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3">
        <p className="text-xs text-[color:var(--color-text-secondary)]">
          Netlify deploys production. Jenkins runs CI. Details on{' '}
          <span className="text-[color:var(--color-text-primary)]">/systems</span>.
        </p>
      </div>
    </div>
  );
}
