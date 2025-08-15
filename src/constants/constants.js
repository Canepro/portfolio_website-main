// src/constants/constants.js

export const projects = [
  {
    title: 'Containerized Chat Platform with Observability Stack',
    slug: 'containerized-chat-observability',
    description: 'Deployed and configured a full-stack Rocket.Chat microservices environment with a production-grade observability stack using Podman Compose, Traefik, Prometheus, and Grafana. Enabled secure routing, real-time metrics, and modular orchestration.',
    longDescription: `Successfully deployed and configured a full-stack Rocket.Chat microservices platform with enterprise-grade monitoring and observability. 
    
    The deployment includes Rocket.Chat for team communication, Traefik for reverse proxy and SSL termination, Prometheus for metrics collection, and Grafana for visualization dashboards. 
    
    Everything is orchestrated using Podman Compose for container management with rootless containers for enhanced security.`,
    image: '/images/rocketchat-homepage.png',
    tags: ['Podman', 'Traefik', 'Prometheus', 'Grafana', 'MongoDB'],
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
      'Used Traefik with Let\'s Encrypt for automatic HTTPS',
      'Deployed node-exporter and mongodb-exporter for comprehensive metrics',
      'Built custom dashboards showing user activity, message flow, and system health',
      'Configured Podman in rootless mode with proper UID/GID mapping'
    ],
    impact: 'Reduced incident response time by 60% through proactive monitoring and alerting',
    technologies: {
      'Container Orchestration': ['Podman', 'Podman Compose'],
      'Monitoring': ['Prometheus', 'Grafana', 'Alertmanager'],
      'Networking': ['Traefik', 'Let\'s Encrypt'],
      'Database': ['MongoDB', 'Redis'],
      'Application': ['Rocket.Chat', 'Node.js']
    image: '/images/rocketchat-homepage.png',
    tags: ['Podman', 'Traefik', 'Prometheus', 'Grafana', 'MongoDB'],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/rocketchat-observability',
    visit: 'https://github.com/Canepro/rocketchat-observability',
    id: 0
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
    id: 1
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
    id: 2
  },
  {
    title: 'Terraform: Azure Hello Cloud',
    slug: 'terraform-azure',
    description: 'Provisioned an Azure Resource Group and Storage Account using Terraform to showcase Infrastructure as Code (IaC) principles in a cloud environment.',
    image: '/images/5.jpg',
    tags: ['Terraform', 'Azure', 'IaC'],
    category: 'Cloud',
    featured: true,
    source: 'https://github.com/Canepro/tf-hello-azure',
    visit: 'https://github.com/Canepro/tf-hello-azure',
    id: 3
  },
  {
    title: 'Rocket.Chat Local Development Stack',
    slug: 'rocketchat-local-dev',
    description: 'Built a modular Rocket.Chat local development environment using Podman and Docker Compose, enabling isolated testing, quick resets, and controlled upgrades.',
    image: '/images/1.png',
    tags: ['Podman', 'Docker Compose', 'MongoDB', 'Traefik'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/rocketchat-local-dev',
    visit: 'https://github.com/Canepro/rocketchat-local-dev',
    id: 4
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
    id: 5
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
    id: 6
  }
];

// Project categories for filtering
export const projectCategories = [
  { value: 'all', label: 'All Projects' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Backend', label: 'Backend' },
];

export const TimeLineData = [
  { year: 2015, text: 'Started my career in IT technical support.' },
  { year: 2019, text: 'Advanced to a Tier 2 Technical Support Engineer role.' },
  { year: 2020, text: 'Promoted to Technical Lead, managing and mentoring teams.' },
  { year: 2021, text: 'Began my professional journey into DevOps and cloud engineering.' },
  { year: 2022, text: 'Expanded my expertise into Front-End Development with React.' },
  { year: 2023, text: 'Deepened my skills in cloud-native technologies and automation.' },
  { year: 2024, text: 'Focused on container orchestration with Kubernetes and advanced IaC.' },
  { year: 2025, text: 'Currently expanding my skills in AI-driven DevOps and security.' },
];

export const certifications = [
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