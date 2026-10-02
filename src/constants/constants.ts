import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'Portable agent workflows',
    slug: 'codex-skills',
    description:
      'A public library of engineering procedures for coding agents: investigate from source, keep permissions explicit, and verify the result.',
    longDescription: `Coding agents need more than a task description when they operate on unfamiliar systems. They need the right investigation procedure, an explicit permission boundary, and a way to check their work.

I built codex-skills as a portable library of those procedures. The public source covers Kubernetes, GitOps, observability, CI investigation, and verification.

## Design decisions

- Package supporting scripts and references with procedures where needed.
- Use shared installation, sync, and drift checks across compatible agent surfaces.
- Detect drift between source and installed skills.
- Leave vendor-specific workflows with their installed integrations, and generic defaults with the runtime and repository.

## Evidence and limits

The repository includes the procedures, installation scripts, and drift checks. These are inspectable source artifacts; they are not a claim that every workflow has been measured across every agent or deployment.

[Read the source and installation instructions](https://github.com/Canepro/codex-skills).`,
    image: '',
    tags: ['Agent workflows', 'Verification', 'Kubernetes', 'GitOps', 'CI', 'Automation'],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/codex-skills',
    evidenceCaption:
      'Workflow illustration. The procedures and installation checks are available in the public repository.',
    year: 'Updated Sep 2026',
    id: 10,
  },
  {
    title: 'PipelineHealer',
    slug: 'pipelinehealer',
    description:
      'Diagnoses failed GitHub Actions and Jenkins runs. Opens a fix PR when the path is safe; otherwise files a reviewable issue.',
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
    deployment: {
      status: 'retired',
      note: 'The hosted demo has been retired. Source and recorded screenshots remain available.',
    },
    evidenceCaption:
      'Recorded PipelineHealer dashboard: run diagnostics and remediation state. This is not a live deployment.',
    id: 7,
  },
  {
    title: 'SignalForge',
    slug: 'signalforge',
    evidenceCaption:
      'Recorded SignalForge interface. The source documents artifact ingestion, finding comparison, and optional AI analysis.',
    description:
      'Collects infra snapshots and telemetry, ranks findings, and adds an optional AI summary for triage.',
    longDescription: `Infrastructure diagnostics for platform teams.

- Ingest and validate infra artifacts
- Rank findings for comparison across runs
- Optional AI pass for explanation and triage order
- Remediation stays out of scope for now`,
    image: '/images/signalforge-home-real.png',
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
      'Rocket.Chat app for log triage: guarded Loki queries, RBAC checks, and a separate web UI for deeper inspection.',
    longDescription: `Rocket.Chat app for log triage during incidents.

- \`/logs\` slash command with room and thread context
- Server-side Loki proxy with validation, rate limits, and redaction
- React web UI for filtering and row-level actions
- RBAC checks and request audit trail`,
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
    longDescription: `Hybrid-cloud GitOps control plane for the portfolio platform.

- Terraform provisions OCI Always Free infrastructure (OKE hub + K3s spoke)
- Argo CD reconciles platform and apps from Git (auto-sync, self-heal, prune)
- Helm and Kustomize split ops layers from application releases
- Centralized observability (Grafana, Loki, Tempo) deployed as code`,
    image: '/images/ArgoCD_set-up.png',
    tags: ['OCI', 'OKE', 'K3s', 'Terraform', 'ArgoCD', 'GitOps', 'Helm', 'Kustomize', 'LGTM'],
    category: 'Cloud',
    featured: false,
    source: 'https://github.com/Canepro/central-observability-hub-stack/tree/main/argocd',
    deployment: {
      status: 'retired',
      note: 'Historical deployment. The hosted environment has been retired; source and recorded evidence remain available.',
    },
    id: 5,
  },
  {
    title: 'Central Observability Hub (Terraform-provisioned OKE + ArgoCD-managed LGTM)',
    slug: 'central-observability-hub-stack',
    description:
      'Terraform-provisioned OKE hub running an ArgoCD-managed LGTM stack (Grafana/Loki/Tempo) with OTLP ingestion and durable storage backends.',
    longDescription: `Central observability hub on Oracle Kubernetes Engine (OKE), provisioned with Terraform and managed through Argo CD.

- Metrics: Prometheus
- Logs: Loki with object storage backend
- Traces: Tempo with object storage backend
- Ingestion: OpenTelemetry Collector (OTLP)
- Ingress: NGINX Ingress and cert-manager TLS
- Operations: Argo CD reconciliation for day-2 changes

The hosted Grafana deployment has been retired. The repository and screenshots document the build.`,
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
    featured: false,
    source: 'https://github.com/Canepro/central-observability-hub-stack',
    deployment: {
      status: 'retired',
      note: 'Historical deployment. The hosted environment has been retired; source and recorded evidence remain available.',
    },
    id: 4,
  },
  {
    title: 'Rocket.Chat on Kubernetes (AKS GitOps + TLS + Cost Controls)',
    slug: 'rocketchat-kubernetes-enterprise',
    description:
      'Rocket.Chat on AKS with Argo CD, Helm, TLS, external secrets, and scheduled scale-down windows.',
    longDescription: `Rocket.Chat on Kubernetes (sandbox, not a production SLO claim).

- Argo CD apps-of-apps / split app pattern
- Traefik ingress + cert-manager TLS
- Helm deploys, upgrades, and rollbacks
- External secrets (Key Vault-backed)
- Scheduled scale-down/scale-up for cost control

The hosted sandbox has been retired. Source and recorded evidence remain available.`,
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
    deployment: {
      status: 'retired',
      note: 'Historical deployment. The hosted environment has been retired; source and recorded evidence remain available.',
    },
    id: 0,
  },
  {
    title: 'Argo CD GitOps Migration (Rocket.Chat)',
    slug: 'rocketchat-microservices-migration',
    description:
      'Argo CD migration for Rocket.Chat: Helm releases and one-commit upgrades instead of static manifests.',
    longDescription: `GitOps migration for Rocket.Chat on Kubernetes.

- Static manifests replaced with Argo CD-managed Helm releases
- Existing MongoDB/NATS adopted in-cluster without downtime
- Upgraded Rocket.Chat v7.12.2 → v7.13.2 via a single version bump`,
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
    deployment: {
      status: 'retired',
      note: 'Historical deployment. The hosted environment has been retired; source and recorded evidence remain available.',
    },
    id: 6,
  },
  {
    title: 'Rocket.Chat Log Analyzer',
    slug: 'rocketchat-log-analyzer',
    description: 'Python tool that parses Rocket.Chat logs and groups errors by pattern.',
    longDescription: `Python log parser for Rocket.Chat deployments.

- Parses unstructured log lines into error categories
- Counts error frequency and exports summaries
- Dockerized for local runs`,
    image: '/images/rocketchat-analyzer.png',
    tags: ['Python', 'Flask', 'Automation', 'Data Analysis', 'Docker'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-log-analyzer',
    id: 1,
  },
  {
    title: 'Multi-Cloud Terraform Templates',
    slug: 'terraform-modules',
    description: 'Terraform modules for AWS and Azure baseline infrastructure.',
    longDescription: `Terraform modules for common AWS and Azure resources.

- AWS: VPC, EKS, RDS, ALB, Auto Scaling Groups
- Azure: VNet, AKS, Storage Accounts, Key Vault
- Remote state and locking patterns documented`,
    image: '/images/structure.png',
    tags: ['Terraform', 'AWS', 'Azure', 'IaC', 'CI/CD'],
    category: 'Cloud',
    featured: false,
    source: 'https://github.com/Canepro/MyTerraform_Templates',
    id: 2,
  },
  {
    title: 'E2E CI/CD Pipeline (Jenkins & EKS)',
    slug: 'jenkins-eks-cicd',
    description:
      'Jenkins pipeline that builds, tests, and deploys a Java service to EKS via Argo CD.',
    longDescription: `End-to-end Jenkins pipeline for a Maven microservice on EKS.

- Test and quality gates in Jenkins
- Docker image build and scan
- Terraform for cluster resources
- Argo CD sync for deployment`,
    image: '/images/grafana_k8s_dashboard.png',
    tags: ['Jenkins', 'AWS EKS', 'Docker', 'ArgoCD', 'Maven'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/maven-jenkins-cicd-docker-eks-project',
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

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export const certifications: Certification[] = [
  {
    name: 'ITIL 4 Foundation',
    issuer: 'PeopleCert',
    date: '',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: DevOps Engineer Expert',
    issuer: 'Microsoft',
    date: '17 Aug 2023',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals',
    issuer: 'Microsoft',
    date: '19 Feb 2026',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: '23 Dec 2021',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: '30 Sep 2021',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: Azure Administrator Associate',
    issuer: 'Microsoft',
    date: '27 Jan 2022',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'MS-100: Microsoft 365 Identity and Services',
    issuer: 'Microsoft',
    date: '2019',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
];
