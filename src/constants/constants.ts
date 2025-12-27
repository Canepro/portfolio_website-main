import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'Hybrid-Cloud GitOps Control Plane (Terraform + ArgoCD)',
    slug: 'hybrid-cloud-gitops-control-plane',
    description:
      'Dual-cluster “hub-and-spoke” architecture: Terraform provisions OCI OKE + K3s, while ArgoCD reconciles observability and application state from a single Git repository.',
    longDescription: `A hybrid-cloud GitOps control plane that demonstrates full-stack platform ownership:
    
    - Terraform provisions OCI Always Free infrastructure (OKE hub + K3s spoke)
    - ArgoCD manages application lifecycle across clusters from Git
    - Helm/Kustomize used to keep “ops” and “apps” cleanly separated`,
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
      'Terraform-provisioned OKE hub running an ArgoCD-managed LGTM stack (Grafana/Loki/Tempo). Live demo: Grafana (authentication required).',
    longDescription: `A centralized observability hub deployed on Oracle Kubernetes Engine (OKE) to unify monitoring across multiple environments, with a Terraform + ArgoCD workflow.
    
    Focus areas:
    - Metrics: Prometheus
    - Logs: Loki (object storage backend)
    - Traces: Tempo (object storage backend)
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
    title: 'Rocket.Chat Kubernetes Ops Sandbox (Helm + TLS + Recovery Drills)',
    slug: 'rocketchat-kubernetes-enterprise',
    description:
      'A hands-on Kubernetes operations lab: Helm deploy/upgrade/rollback, ingress + TLS, probes, and realistic troubleshooting (best-effort sandbox availability).',
    longDescription: `A sandbox Rocket.Chat deployment on Kubernetes used to practice real-world operational workflows (not presented as a production SLO/uptime claim).
    
    Focus areas:
    - Ingress routing and TLS via cert-manager
    - Helm-based deployments and upgrades
    - Resource sizing, health checks, and failure recovery drills
    
    Best-effort sandbox URL (may be unavailable): https://k8.canepro.me`,
    image: '/images/new_dashboard&rocketchatGif.gif',
    tags: [
      'Kubernetes',
      'Helm',
      'NGINX Ingress',
      'cert-manager',
      'MongoDB',
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
    title: 'ArgoCD Multi-Source GitOps Migration (Rocket.Chat)',
    slug: 'rocketchat-microservices-migration',
    description:
      'ArgoCD Multi-Source migration with measurable wins: deleted 10,355 lines of YAML and enabled “one-commit” upgrades (v7.12.2 → v7.13.2) via Helm.',
    longDescription: `A high-signal GitOps migration focused on repeatability and safe upgrades:
    
    - Migrated from static manifests to ArgoCD Multi-Source
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
  { year: 2015, text: 'Started my career in IT technical support.' },
  { year: 2019, text: 'Advanced to a Tier 2 Technical Support Engineer role.' },
  { year: 2020, text: 'Promoted to Technical Lead, managing and mentoring teams.' },
  { year: 2021, text: 'Began my professional journey into DevOps and cloud engineering.' },
  { year: 2022, text: 'Expanded my expertise into Front-End Development with React.' },
  { year: 2023, text: 'Deepened my skills in cloud-native technologies and automation.' },
  { year: 2024, text: 'Focused on container orchestration with Kubernetes and advanced IaC.' },
  { year: 2025, text: 'Currently expanding my skills in AI-driven DevOps and security.' },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export const certifications: Certification[] = [
  {
    name: 'Microsoft Certified: DevOps Engineer Expert',
    issuer: 'Microsoft',
    date: 'Aug 2023',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: Azure Administrator Associate',
    issuer: 'Microsoft',
    date: 'Dec 2022',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Nov 2021',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'ITIL 4 Foundation Certificate',
    issuer: 'PeopleCert',
    date: 'Apr 2025 (Expires)',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: 'Dec 2021',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
  {
    name: 'freeCodeCamp: Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'Feb 2022',
    link: 'https://www.linkedin.com/in/vincent-mogah/details/certifications/',
  },
];
