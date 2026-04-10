import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'PipelineHealer',
    slug: 'pipelinehealer',
    description:
      'Policy-aware remediation control plane for failed pipelines: diagnose root causes, open safe fix PRs when deterministic, and fall back to auditable issues when risk is unclear.',
    longDescription: `OSS-first remediation platform for software-delivery pipelines.

- Ingests failed runs from GitHub Actions and a signed Jenkins bridge
- Normalizes failure context into reviewable diagnostics
- Applies controlled remediation with policy gates and audit trails
- Supports local, container, Kubernetes, and Azure deployment paths`,
    image: '/images/pipelinehealer-dashboard-current.png',
    tags: [
      'Python',
      'FastAPI',
      'React',
      'GitHub Actions',
      'Jenkins',
      'Azure Container Apps',
      'PostgreSQL',
      'Automation',
    ],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/pipelinehealer',
    visit: 'https://ca-canepro-ph-frontend.kinddune-53ac219d.eastus2.azurecontainerapps.io',
    id: 7,
  },
  {
    title: 'SignalForge',
    slug: 'signalforge',
    description:
      'Evidence-first infrastructure diagnostics for production teams. Produces deterministic findings and operator-ready AI explanation for prioritization.',
    longDescription: `Operator-first infrastructure diagnostics for platform reliability.

- Ingests infrastructure evidence artifacts with strong validation
- Produces deterministic findings for comparison and replay
- Adds one constrained AI pass for explanation and triage prioritization
- Keeps remediation out of scope while trust boundaries are established`,
    image: '/images/rocketchat-logs-viewer-web-ui.png',
    tags: ['Python', 'React', 'TypeScript', 'Observability', 'OpenTelemetry', 'LLM'],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/signalforge',
    id: 9,
  },
  {
    title: 'Rocket.Chat Logs Viewer App',
    slug: 'rocketchat-app-logs-viewer',
    description:
      'Rocket.Chat-native logs workflow that restores fast, private incident triage with guarded Loki queries, RBAC-aware actions, and a focused deep-inspection web UI.',
    longDescription: `Rocket.Chat workflow layer for production log triage.

- Slash-first operator flow with room and thread context
- Server-side Loki query proxy with validation, rate limits, and redaction
- Chat-native sharing actions plus a separate React web UI for deeper inspection
- Designed to complement observability platforms, not replace them`,
    image: '/images/rocketchat-logs-viewer-web-ui.png',
    tags: ['Rocket.Chat', 'TypeScript', 'Node.js', 'React', 'Vite', 'Tailwind', 'Loki', 'RBAC'],
    category: 'Backend',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-app-logs-viewer',
    id: 8,
  },
  {
    title: 'Hybrid Cloud GitOps Control Plane (Terraform + ArgoCD)',
    slug: 'hybrid-cloud-gitops-control-plane',
    description:
      'Hub-and-spoke GitOps platform: Terraform provisions OCI OKE (hub) and a spoke cluster, while Argo CD continuously reconciles platform + apps from Git.',
    longDescription: `A hybrid-cloud GitOps control plane that demonstrates full-stack platform ownership:
    
    - Terraform provisions OCI Always Free infrastructure (OKE hub + K3s spoke)
    - ArgoCD manages application lifecycle across clusters from Git (auto-sync, self-heal, prune)
    - Helm/Kustomize used to keep “ops” and “apps” cleanly separated
    - Centralized observability (Grafana/Loki/Tempo) deployed and managed as code`,
    image: '/images/ArgoCD_set-up.png',
    tags: ['OCI', 'OKE', 'K3s', 'Terraform', 'ArgoCD', 'GitOps', 'Helm', 'Kustomize', 'LGTM'],
    category: 'Cloud',
    featured: false,
    source: 'https://github.com/Canepro/central-observability-hub-stack/tree/main/argocd',
    visit: 'https://argocd.canepro.me',
    id: 5,
  },
  {
    title: 'Central Observability Hub (Terraform-provisioned OKE + ArgoCD-managed LGTM)',
    slug: 'central-observability-hub-stack',
    description:
      'Terraform-provisioned OKE hub running an ArgoCD-managed LGTM stack (Grafana/Loki/Tempo) with OTLP ingestion and durable storage backends.',
    longDescription: `A centralized observability hub deployed on Oracle Kubernetes Engine (OKE) to unify monitoring across multiple environments, with a Terraform + ArgoCD workflow.
    
    Focus areas:
    - Metrics: Prometheus
    - Logs: Loki (object storage backend)
    - Traces: Tempo (object storage backend)
    - Traces ingestion: OpenTelemetry Collector (OTLP)
    - Secure ingress: NGINX Ingress + cert-manager TLS
    - GitOps: ArgoCD reconciliation for day-2 operations
    
    Note: Grafana access requires authentication (access available on request).`,
    image: '/images/grafana_k8s_dashboard.png',
    tags: [
      'Kubernetes',
      'OKE',
      'Grafana',
      'Prometheus',
      'Loki',
      'Tempo',
      'NGINX Ingress',
      'cert-manager',
      'Terraform',
      'ArgoCD',
    ],
    category: 'Cloud',
    featured: true,
    source: 'https://github.com/Canepro/central-observability-hub-stack',
    visit: 'https://grafana.canepro.me',
    id: 4,
  },
  {
    title: 'Rocket.Chat on Kubernetes (AKS GitOps + TLS + Cost Controls)',
    slug: 'rocketchat-kubernetes-enterprise',
    description:
      'Production-minded Rocket.Chat platform on AKS managed with Argo CD: Helm releases, TLS, external secrets, and ops automation (best-effort sandbox availability).',
    longDescription: `A Rocket.Chat platform deployment on Kubernetes that emphasizes production patterns and day-2 operations (not presented as a production SLO/uptime claim).
    
    Focus areas:
    - GitOps deployments via Argo CD (apps-of-apps / split app pattern)
    - Ingress routing and TLS via Traefik + cert-manager
    - Helm-based deployments, upgrades, and repeatable rollbacks
    - External secrets pattern (Key Vault-backed) and safer config management
    - Cost controls via scheduled scale-down/scale-up windows
    - Resource sizing, health checks, and failure recovery drills
    
    Best-effort sandbox URL (may be unavailable): https://k8.canepro.me`,
    image: '/images/new_dashboard&rocketchatGif.gif',
    tags: [
      'Kubernetes',
      'Helm',
      'AKS',
      'ArgoCD',
      'Traefik',
      'cert-manager',
      'MongoDB',
      'NATS',
      'External Secrets',
      'Prometheus',
      'Grafana',
    ],
    category: 'Cloud',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-k8s',
    visit: 'https://k8.canepro.me',
    id: 0,
  },
  {
    title: 'Argo CD GitOps Migration (Rocket.Chat)',
    slug: 'rocketchat-microservices-migration',
    description:
      'Argo CD GitOps migration enabling repeatable “one-commit” upgrades via Helm and safer day-2 operations.',
    longDescription: `A high-signal GitOps migration focused on repeatability and safe upgrades:
    
    - Migrated from static manifests to ArgoCD-managed, Git-driven deploys
    - Adopted existing in-cluster resources (MongoDB/NATS) without downtime
    - Upgraded Rocket.Chat v7.12.2 → v7.13.2 with a single version bump`,
    image: '/images/argocd-multisource.webp',
    media: '/images/argocd-multisource.mp4',
    tags: [
      'ArgoCD',
      'GitOps',
      'Helm',
      'Kubernetes',
      'Prometheus',
      'OpenTelemetry',
      'MongoDB',
      'NATS',
    ],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/central-observability-hub-stack/tree/main/argocd',
    visit: 'https://argocd.canepro.me',
    id: 6,
  },
  {
    title: 'Rocket.Chat Log Analyzer',
    slug: 'rocketchat-log-analyzer',
    description:
      'Python-based automation tool for parsing and visualizing complex application logs. Reduced incident response time by 60% through automated pattern recognition.',
    longDescription: `A specialized tool designed to solve complex debugging challenges in distributed systems. It automatically parses unstructured log data to identify critical error patterns, performance bottlenecks, and security anomalies.
    
    Key features include:
    - Real-time log ingestion and parsing
    - Automated error classification
    - Interactive visualization dashboard
    - Export capabilities for post-mortem analysis`,
    image: '/images/rocketchat-analyzer.png',
    tags: ['Python', 'Flask', 'Automation', 'Data Analysis', 'Docker'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-log-analyzer',
    visit: 'https://github.com/Canepro/rocketchat-log-analyzer',
    id: 1,
  },
  {
    title: 'Multi-Cloud Terraform Templates',
    slug: 'terraform-modules',
    description:
      'Production-ready Infrastructure as Code (IaC) library for AWS and Azure. Modular templates for rapid, secure, and compliant cloud infrastructure provisioning.',
    longDescription: `A comprehensive library of reusable Terraform modules designed for enterprise-scale infrastructure provisioning. These templates enforce security best practices and standardization across multi-cloud environments.
    
    Includes modules for:
    - AWS: VPC, EKS, RDS, ALB, Auto Scaling Groups
    - Azure: VNet, managed Kubernetes, Storage Accounts, Key Vault
    - Automated state management and locking
    - Compliance-as-Code integration`,
    image: '/images/structure.png',
    tags: ['Terraform', 'AWS', 'Azure', 'IaC', 'CI/CD'],
    category: 'Cloud',
    featured: false,
    source: 'https://github.com/Canepro/MyTerraform_Templates',
    visit: 'https://github.com/Canepro/MyTerraform_Templates',
    id: 2,
  },
  {
    title: 'E2E CI/CD Pipeline (Jenkins & EKS)',
    slug: 'jenkins-eks-cicd',
    description:
      'Full-stack DevOps pipeline demonstration automating the build, test, and deployment of microservices to Amazon EKS using Jenkins and ArgoCD.',
    longDescription: `A complete End-to-End CI/CD implementation showcasing modern software delivery practices. This project automates the entire lifecycle from code commit to production deployment.
    
    Pipeline stages:
    - Automated testing and code quality checks
    - Docker container image building and scanning
    - Infrastructure provisioning via Terraform
    - GitOps-based deployment to EKS using ArgoCD
    - Automated rollback capabilities`,
    image: '/images/grafana_k8s_dashboard.png',
    tags: ['Jenkins', 'AWS EKS', 'Docker', 'ArgoCD', 'Maven'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/maven-jenkins-cicd-docker-eks-project',
    visit: 'https://github.com/Canepro/maven-jenkins-cicd-docker-eks-project',
    id: 3,
  },
];

export type ProjectCategoryValue = 'all' | 'DevOps' | 'Frontend' | 'Cloud' | 'Backend';

export const projectCategories: Array<{ value: ProjectCategoryValue; label: string }> = [
  { value: 'all', label: 'All Projects' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
];

export const TimeLineData: Array<{ year: number; text: string }> = [
  { year: 2011, text: 'IT Manager and ICT Trainer (education environment).' },
  { year: 2015, text: 'IT Operations Engineer, focused on monitoring, stability, and runbooks.' },
  {
    year: 2019,
    text: 'Cloud Engineer supporting Azure infrastructure, Azure AD, and Microsoft 365.',
  },
  {
    year: 2020,
    text: 'Technical Lead for Cloud Engineering with a reliability and automation focus.',
  },
  {
    year: 2022,
    text: 'Senior Tech Analyst supporting Kubernetes/Docker deployments on Azure and AWS.',
  },
  {
    year: 2024,
    text: 'Microsoft Engineer owning identity and access escalations across Entra ID and M365.',
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export const certifications: Certification[] = [
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: 'Issued (see LinkedIn)',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'Issued (see LinkedIn)',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'freeCodeCamp.org Responsive Web Design Certification',
    issuer: 'freeCodeCamp',
    date: 'Issued (see LinkedIn)',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'ITIL 4 Foundation Certificate in IT Service Management',
    issuer: 'PeopleCert',
    date: 'Issued (see LinkedIn)',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
];
