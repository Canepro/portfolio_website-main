'use client';

import { motion } from 'framer-motion';

export default function HeroVisual() {
  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] md:h-[340px]">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_30%_20%,rgba(0,219,216,0.25),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(177,51,255,0.18),transparent_55%),radial-gradient(circle_at_50%_110%,rgba(244,103,55,0.18),transparent_55%)]" />

      <motion.div
        aria-hidden="true"
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[color:var(--color-accent)]/20 blur-2xl"
        animate={{ x: [0, 24, 0], y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-20 right-[-40px] h-72 w-72 rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-4 py-3 backdrop-blur">
        <div className="text-xs text-white/70">
          Focus: GitOps, Kubernetes ops, observability, and high-signal frontend.
        </div>
        <div className="hidden text-xs text-white/60 md:block">
          This site is the system. The projects are proof.
        </div>
      </div>
    </div>
  );
}
