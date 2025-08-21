export type Project = {
  id: string;
  title: string;
  tagline: string;
  short: string;
  tech: string[];
  quickStart: string[];
  repo: string;
  demoUrl?: string;
  badges?: { alt: string; img: string; href?: string }[];
  featuredScreenshot?: string;
};

const projects: Project[] = [
  {
    id: 'rocketchat-local-dev',
    title: 'Rocket.Chat — Local Dev Stack',
    tagline: 'One-command local Rocket.Chat environment (Docker/Podman, Traefik, MongoDB, Redis).',
    short:
      'Engine-agnostic local development stack for Rocket.Chat with ready scripts, health checks, and Traefik file provider (no docker.sock).',
    tech: ['Docker/Podman', 'Traefik', 'MongoDB', 'Redis', 'Bash'],
    quickStart: [
      'git clone https://github.com/Canepro/rocketchat-local-dev.git',
      'cd rocketchat-local-dev',
      'cp .env.example .env',
      './up.sh',
      'Open Rocket.Chat at http://localhost:8080'
    ],
    repo: 'https://github.com/Canepro/rocketchat-local-dev',
    badges: [
      {
        alt: 'compose-lint',
        img: 'https://github.com/Canepro/rocketchat-local-dev/actions/workflows/compose-lint.yml/badge.svg',
        href: 'https://github.com/Canepro/rocketchat-local-dev/actions'
      }
    ]
  },
  {
    id: 'rocketchat-observability',
    title: 'Rocket.Chat — Observability Stack',
    tagline: 'End-to-end observability demo with Prometheus & Grafana for Rocket.Chat.',
    short:
      'Turnkey demo environment with preconfigured Grafana dashboards, exporters, and a one-command demo flow for reproducible observability tests.',
    tech: ['Prometheus', 'Grafana', 'Traefik', 'Docker/Podman'],
    quickStart: [
      'git clone --depth 1 https://github.com/Canepro/rocketchat-observability.git',
      'cd rocketchat-observability',
      'cp env.example .env',
      'make demo-up',
      'Open Grafana at http://localhost/grafana'
    ],
    repo: 'https://github.com/Canepro/rocketchat-observability',
    badges: [
      {
        alt: 'compose-lint',
        img: 'https://github.com/Canepro/rocketchat-observability/actions/workflows/compose-lint.yml/badge.svg',
        href: 'https://github.com/Canepro/rocketchat-observability/actions'
      }
    ]
  },
  {
    id: 'tf-hello-azure',
    title: 'Terraform — Hello Azure',
    tagline: 'Minimal Terraform example for Azure with secure defaults and optional CI.',
    short:
      'Example Terraform for Resource Group + Storage Account, with optional backend and GitHub Actions for safe CI checks.',
    tech: ['Terraform', 'Azure CLI', 'GitHub Actions'],
    quickStart: [
      'az login',
      'terraform init',
      'terraform plan -var="resource_group_name=rg-hello-azure" -var="storage_account_name=sthello1234"',
      'terraform apply -auto-approve ...'
    ],
    repo: 'https://github.com/Canepro/tf-hello-azure'
  }
];

export default projects;
