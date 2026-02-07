'use client';

import { motion, useReducedMotion } from 'framer-motion';
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
        // min-w-0 is critical: CSS grid items default to min-width:auto and can overflow/clipped.
        'relative min-w-0 rounded-2xl border px-3 py-2 shadow-sm backdrop-blur',
        accent
          ? 'border-white/15 bg-white/[0.07]'
          : 'border-white/10 bg-black/20 hover:bg-white/[0.06]',
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-white/90">{label}</div>
          <div className="truncate text-[10px] font-mono text-white/55">{sub}</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      data-hero-visual
      className="relative h-[240px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] md:h-full md:min-h-[440px]"
    >
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_30%_20%,rgba(0,219,216,0.18),transparent_60%),radial-gradient(circle_at_75%_55%,rgba(255,255,255,0.05),transparent_65%),radial-gradient(circle_at_50%_110%,rgba(0,219,216,0.06),transparent_70%)]" />

      <motion.div
        aria-hidden="true"
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[color:var(--color-accent)]/20 blur-2xl"
        animate={shouldReduceMotion ? undefined : { x: [0, 24, 0], y: [0, 12, 0] }}
        transition={
          shouldReduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-20 right-[-40px] h-72 w-72 rounded-full bg-white/10 blur-3xl"
        animate={shouldReduceMotion ? undefined : { x: [0, -18, 0], y: [0, -10, 0] }}
        transition={
          shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div className="relative flex h-full flex-col p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-white/55">
            Systems Snapshot
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-mono text-white/55">
              Netlify: deploy previews
            </span>
            <span className="text-[10px] font-mono text-white/45">gitops · ci · k8s · obs</span>
          </div>
        </div>

        <div className="mt-4 flex-1">
          <div className="hidden h-full items-center md:flex">
            <div className="relative grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
              <Node label="GitHub" sub="main + PRs" icon={<GitBranch className="h-4 w-4" />} />
              <div className="flex shrink-0 items-center justify-center text-white/35">
                <ArrowRight className="h-4 w-4" />
              </div>
              <Node
                label="Jenkins"
                sub="multibranch (controller: OKE)"
                icon={<Waypoints className="h-4 w-4" />}
                accent
              />
              <div className="flex shrink-0 items-center justify-center text-white/35">
                <ArrowRight className="h-4 w-4" />
              </div>
              <Node
                label="Build Agents"
                sub="AKS agent (RBAC constrained)"
                icon={<Server className="h-4 w-4" />}
              />

              <div className="col-span-5 mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <Node
                  label="AKS Spoke"
                  sub="Rocket.Chat + metrics → hub"
                  icon={<Boxes className="h-4 w-4" />}
                />
                <div className="flex shrink-0 flex-col items-center justify-center text-white/35">
                  <ArrowRight className="h-4 w-4" />
                  <div className="mt-1 text-[10px] font-mono text-white/45">OTLP</div>
                </div>
                <Node
                  label="OKE Hub"
                  sub="ArgoCD + GrafanaLocal"
                  icon={<BarChart3 className="h-4 w-4" />}
                  accent
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            <Node
              label="GitHub → Jenkins (OKE)"
              sub="multibranch CI + gated builds"
              icon={<GitBranch className="h-4 w-4" />}
              accent
            />
            <Node
              label="Kubernetes (Agents + Clusters)"
              sub="OKE + AKS (build + run)"
              icon={<Boxes className="h-4 w-4" />}
            />
            <Node
              label="Deploy Previews"
              sub="Netlify (PR preview URLs)"
              icon={<Waypoints className="h-4 w-4" />}
            />
            <Node
              label="Observability"
              sub="Grafana / LGTM demos"
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-4 py-3 backdrop-blur">
        <div className="text-xs text-white/70">
          This portfolio is a working system, not a slide.
        </div>
        <div className="hidden text-xs text-white/60 md:block">
          Projects show outcomes. Writing shows thinking.
        </div>
      </div>
    </div>
  );
}
