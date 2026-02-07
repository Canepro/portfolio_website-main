export type Skill = {
  name: string;
  notes?: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Platform + Kubernetes',
    description: 'Clusters, workloads, ingress, TLS, and day-2 ops that hold up under change.',
    skills: [
      { name: 'Kubernetes' },
      { name: 'Helm' },
      { name: 'Kustomize' },
      { name: 'Ingress / TLS' },
      { name: 'cert-manager' },
      { name: 'Traefik' },
      { name: 'NGINX Ingress' },
      { name: 'Argo CD' },
      { name: 'GitOps (auto-sync, self-heal, prune)' },
      { name: 'Troubleshooting drills' },
    ],
  },
  {
    title: 'IaC + Cloud',
    description: 'Repeatable infrastructure with clean boundaries between ops and apps.',
    skills: [
      { name: 'Terraform' },
      { name: 'Terraform automation schedules' },
      { name: 'OCI (OKE)' },
      { name: 'AWS' },
      { name: 'Azure' },
      { name: 'Networking basics' },
      { name: 'Secrets / config' },
    ],
  },
  {
    title: 'Delivery + CI/CD',
    description: 'Pipelines, quality gates, and release hygiene that keep shipping boring.',
    skills: [
      { name: 'Jenkins (Multibranch Pipelines)' },
      { name: 'GitHub Actions' },
      { name: 'Azure Pipelines' },
      { name: 'Docker' },
      { name: 'Artifact promotion' },
      { name: 'Static analysis + security gates' },
    ],
  },
  {
    title: 'Observability',
    description: 'Metrics, logs, traces, and practical dashboards that answer questions fast.',
    skills: [
      { name: 'Grafana' },
      { name: 'Prometheus' },
      { name: 'Prometheus remote_write' },
      { name: 'Loki' },
      { name: 'Tempo' },
      { name: 'OpenTelemetry Collector' },
      { name: 'OTLP' },
      { name: 'RUM (Grafana Faro)' },
    ],
  },
  {
    title: 'Frontend Engineering',
    description: 'Modern UI, performance, and product-minded polish.',
    skills: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'styled-components' },
      { name: 'Accessibility' },
    ],
  },
];
