import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'Enterprise Kubernetes Chat Platform',
    slug: 'rocketchat-kubernetes-enterprise',
    description:
      'Production-grade Rocket.Chat deployment on Azure (AKS) with 99.7% uptime SLO. Features advanced observability using Prometheus/Grafana and auto-healing MongoDB clusters.',
    longDescription: `An enterprise-grade communications platform deployed on Azure Kubernetes Service (AKS). This project demonstrates advanced DevOps practices including:
    - High-Availability architecture with multi-replica MongoDB
    - Automated SSL/TLS certificate management
    - Zero-downtime rolling updates
    - Comprehensive observability stack (Prometheus, Grafana, Loki)
    - GitOps-based deployment workflows`,
    image: '/images/new_dashboard&rocketchatGif.gif',
    tags: ['Kubernetes', 'Azure AKS', 'Helm', 'Grafana', 'Prometheus', 'MongoDB'],
    category: 'Cloud',
    featured: true,
    source: 'https://github.com/Canepro/rocketchat-k8s-deployment',
    visit: 'https://chat.canepro.me',
    id: 0,
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
    image: '/images/log-analysis-dashboard.png',
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
    - Azure: VNet, AKS, Storage Accounts, Key Vault
    - Automated state management and locking
    - Compliance-as-Code integration`,
    image: '/images/structure.png',
    tags: ['Terraform', 'AWS', 'Azure', 'IaC', 'CI/CD'],
    category: 'Cloud',
    featured: true,
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
    image: '/images/grafana-dashboard.png',
    tags: ['Jenkins', 'AWS EKS', 'Docker', 'ArgoCD', 'Maven'],
    category: 'DevOps',
    featured: true,
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
