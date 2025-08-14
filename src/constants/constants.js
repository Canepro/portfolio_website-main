// src/constants/constants.js

export const projects = [
  {
    title: 'Rocket.Chat Log Analyzer',
    description: "A tool designed to parse and analyze Rocket.Chat log files. It identifies common errors (like memory or LDAP issues) and provides actionable solutions to help administrators troubleshoot more efficiently.",
    image: '/images/rocketchat-analyzer.png',
    tags: ['Python', 'Regex', 'Log Parsing'],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/rocketchat-log-analyzer',
    visit: 'https://github.com/Canepro/rocketchat-log-analyzer', // Since no live site, this points to the repo
    id: 0,
  },
  {
    title: 'Personal Portfolio',
    description: "My personal portfolio website built with Next.js and styled-components to showcase my skills, experience, and projects in a modern, responsive design.",
    image: '/images/6.png',
    tags: ['Next.js', 'React', 'JavaScript'],
    category: 'Frontend',
    featured: true,
    source: 'https://github.com/Canepro/portfolio_website-main',
    visit: 'https://portfolio.canepro.me/',
    id: 1,
  },
  {
    title: 'Dockerized Portfolio App',
    description: 'Built a production-grade Docker image for my Next.js portfolio and ran it with an engine-agnostic Makefile (Podman/Docker).',
    image: '/images/docker-portfolio.png',
    tags: ['Docker', 'Podman', 'Next.js'],
    category: 'DevOps',
    featured: true,
    source: 'https://github.com/Canepro/portfolio_website-main/blob/main/Dockerfile',
    visit: 'https://github.com/Canepro/portfolio_website-main',
    id: 2
  },
  {
    title: 'CI Pipeline with GitHub Actions',
    description: 'Automated builds on every push/PR with caching and concurrency to keep the app production-ready.',
    image: '/images/gha-ci.png',
    tags: ['GitHub Actions', 'CI', 'YAML'],
    category: 'DevOps',
    featured: false,
    source: 'https://github.com/Canepro/portfolio_website-main/blob/main/.github/workflows/ci.yml',
    visit: 'https://github.com/Canepro/portfolio_website-main/actions',
    id: 3
  },
  {
    title: 'Terraform: Azure Hello Cloud',
    description: 'Provisioned an Azure Resource Group and Storage Account using Terraform to demonstrate Infrastructure as Code (IaC).',
    image: '/images/tf-azure.png',
    tags: ['Terraform', 'Azure', 'IaC'],
    category: 'Cloud',
    featured: false,
    source: 'https://github.com/Canepro/tf-hello-azure',
    visit: 'https://github.com/Canepro/tf-hello-azure',
    id: 4
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