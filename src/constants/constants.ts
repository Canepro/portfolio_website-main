import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: '🚀 Enterprise Kubernetes Chat Platform',
    slug: 'rocketchat-kubernetes-enterprise',
    description: 'Production-ready Rocket.Chat deployment on Azure Kubernetes Service with comprehensive monitoring, high availability, and 99.7% uptime SLO.',
    longDescription: `Enterprise-grade Rocket.Chat deployment showcasing advanced Kubernetes and DevOps practices on Azure Kubernetes Service.`,
    image: '/images/new_dashboard&rocketchatGif.gif',
    tags: ['Kubernetes', 'Azure AKS', 'Prometheus', 'Grafana', 'MongoDB', 'Loki', 'Helm'],
    category: 'Cloud',
    featured: true,
    source: 'https://github.com/Canepro/rocketchat-k8s-deployment',
    visit: 'https://chat.canepro.me',
    challenges: [
      'Designing high-availability architecture with multi-replica MongoDB cluster',
      'Implementing comprehensive observability with 28-panel Grafana dashboard',
      'Achieving 99.7% uptime SLO while optimizing costs by 20%',
      'Managing complex Kubernetes networking and security policies'
    ],
    solutions: [
      'Deployed multi-replica MongoDB cluster with automated failover',
      'Built 28-panel monitoring dashboard with desired vs actual state tracking',
      'Implemented SSL/TLS, RBAC, network policies, and secret management',
      'Created comprehensive troubleshooting documentation with real-world case studies'
    ],
    impact: 'Achieved 99.7% uptime with 20% cost reduction while managing 55+ Kubernetes pods and 1,238+ metrics',
    technologies: {
      'Orchestration': ['Kubernetes', 'Azure AKS', 'Helm'],
      'Monitoring': ['Prometheus', 'Grafana', 'Loki', 'Alertmanager'],
      'Database': ['MongoDB Cluster', 'Redis'],
      'Security': ['SSL/TLS', 'RBAC', 'Network Policies'],
      'Application': ['Rocket.Chat', 'Node.js']
    },
    id: 0
  },
  {
    title: 'Rocket.Chat — Observability Stack',
    slug: 'rocketchat-observability',
    description: 'Complete Rocket.Chat observability demo with Prometheus, Grafana, exporters, and Traefik.',
    longDescription: `Complete observability demo for Rocket.Chat with Prometheus, Grafana, exporters, and Traefik routing.`,
    image: '/images/chat-observability.png',
    tags: ['Rocket.Chat', 'Prometheus', 'Grafana', 'Traefik', 'MongoDB'],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/rocketchat-observability',
    visit: 'https://github.com/Canepro/rocketchat-observability',
    challenges: [
      'Configuring Traefik for automatic SSL certificate management',
      'Setting up Prometheus exporters for MongoDB and Rocket.Chat',
      'Creating custom Grafana dashboards for real-time monitoring',
      'Implementing rootless Podman containers for security'
    ],
    solutions: [
      "Used Traefik with Let's Encrypt for automatic HTTPS",
      'Deployed node-exporter and mongodb-exporter for comprehensive metrics',
      'Built custom dashboards showing user activity, message flow, and system health',
      'Configured Podman in rootless mode with proper UID/GID mapping'
    ],
    impact: 'Reduced incident response time by 60% through proactive monitoring and alerting',
    technologies: {
      'Container Orchestration': ['Podman', 'Podman Compose'],
      'Monitoring': ['Prometheus', 'Grafana', 'Alertmanager'],
      'Networking': ["Traefik", "Let's Encrypt"],
      'Database': ['MongoDB', 'Redis'],
      'Application': ['Rocket.Chat', 'Node.js']
    },
    id: 1
  },
  {
    title: 'Dockerized Portfolio App',
    slug: 'dockerized-portfolio',
    description: 'Built a production-grade Docker image for my Next.js portfolio site with a multi-stage build and an engine-agnostic Makefile supporting both Podman and Docker.',
    image: '/images/6.png',
    tags: ['Docker', 'Podman', 'Next.js'],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/portfolio_website-main/blob/main/Dockerfile',
    visit: 'https://portfolio.canepro.me/',
    id: 2
  },
  {
    title: 'CI Pipeline with GitHub Actions',
    slug: 'ci-pipeline-github',
    description: 'Implemented a CI workflow to build the portfolio on every push/PR, ensuring it remains production-ready and preventing build errors from reaching production.',
    image: '/images/4.jpg',
    tags: ['GitHub Actions', 'CI', 'YAML'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/portfolio_website-main/blob/main/.github/workflows/ci.yml',
    visit: 'https://github.com/Canepro/portfolio_website-main/actions',
    id: 3
  },
  {
    title: 'Terraform: Azure Hello Cloud',
    slug: 'terraform-azure',
    description: 'Minimal Terraform example that provisions an Azure Resource Group and Storage Account.',
    image: '/images/tf-azure.png',
    tags: ['Terraform', 'Azure', 'IaC', 'Storage Account'],
    category: 'Cloud',
    featured: true,
    source: 'https://github.com/Canepro/tf-hello-azure',
    visit: 'https://github.com/Canepro/tf-hello-azure',
    id: 4
  },
  {
    title: 'Rocket.Chat Local Development Stack',
    slug: 'rocketchat-local-dev',
    description: 'Local Rocket.Chat stack with MongoDB, Redis, and Traefik via one-command script (Docker/Podman).',
    image: '/images/rocketchat-homepage.png',
    tags: ['Docker Compose', 'Podman', 'MongoDB', 'Redis', 'Traefik'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-local-dev',
    visit: 'https://github.com/Canepro/rocketchat-local-dev',
    id: 5
  },
  {
    title: 'Rocket.Chat Troubleshooting Tool',
    slug: 'rocketchat-troubleshooting',
    description: 'Created scripts and automation tools to parse, analyze, and visualize Rocket.Chat logs for faster troubleshooting and root cause analysis.',
    image: '/images/2.png',
    tags: ['PowerShell', 'Python', 'Automation', 'Logs'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-log-analyzer',
    visit: 'https://github.com/Canepro/rocketchat-log-analyzer',
    id: 6
  },
  {
    title: 'Rocket.Chat Log Analysis Web App',
    slug: 'log-analysis-dashboard',
    description: 'Developed a Python-based web dashboard for real-time log analysis, providing error trends, message flow metrics, and filtering capabilities.',
    image: '/images/grafana-dashboard.png',
    tags: ['Python', 'Flask', 'JavaScript', 'Charts.js'],
    category: 'Backend',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-log-dashboard',
    visit: 'https://github.com/Canepro/rocketchat-log-dashboard',
    id: 7
  }
];

export type ProjectCategoryValue = 'all' | 'DevOps' | 'Frontend' | 'Cloud' | 'Backend';

export const projectCategories: Array<{ value: ProjectCategoryValue; label: string }> = [
  { value: 'all', label: 'All Projects' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Cloud', label: 'Cloud' },
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

export interface Certification { name: string; issuer: string; date: string; link: string }

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


