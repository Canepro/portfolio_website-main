import type { Project } from '../types/project';

export const projects: Project[] = [
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
