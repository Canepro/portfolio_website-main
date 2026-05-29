import type { ProjectDetail } from '../types/project';

export const projectDetails: Record<string, ProjectDetail> = {
  pipelinehealer: {
    slug: 'pipelinehealer',
    longDescription: `## Overview

PipelineHealer handles failed GitHub Actions and Jenkins runs.

1. Ingest the failure from the provider.
2. Normalize it into diagnostics.
3. Open a fix PR when policy allows it.
4. File a structured issue when auto-edit is not safe.

## Stack and deployment

- GitHub Actions plus a signed Jenkins bridge
- Policy gates, repo allowlists, remediation modes, audit trail
- Local, Docker/Podman, Helm/Kubernetes, Azure Container Apps

## Links

- **Live demo:** https://ca-canepro-ph-frontend.kinddune-53ac219d.eastus2.azurecontainerapps.io
- **Source:** https://github.com/Canepro/pipelinehealer

Auto-fix runs only when the failure maps to a known safe change. Everything else becomes a reviewable issue with run context attached.`,
    challenges: [
      'Reducing failed-pipeline triage without auto-editing repos on ambiguous failures',
      'Supporting GitHub Actions and Jenkins with one shared diagnosis and policy core',
      'Explaining remediation decisions clearly enough to accept or reject quickly',
      'Keeping deployment portable across local, containers, Kubernetes, and Azure',
    ],
    solutions: [
      'Shared remediation core with provider-specific ingress for GitHub Actions and Jenkins',
      'Policy gates, remediation modes, and allowlists on every auto-fix path',
      'Run context stored as explicit diagnostics and auditable artifacts',
      'Documented deploy paths for Azure Container Apps and Helm/Kubernetes',
    ],
    impact:
      'Diagnosis pipeline, policy gates, Azure Container Apps deployment, and fix PRs tied to real CI runs.',
    technologies: {
      Backend: ['Python', 'FastAPI'],
      Frontend: ['React', 'TypeScript'],
      Integrations: ['GitHub Actions', 'Jenkins bridge', 'Webhook notifications'],
      Storage: ['PostgreSQL', 'Cosmos DB', 'In-memory development mode'],
      Deployment: ['Azure Container Apps', 'Docker/Podman', 'Helm/Kubernetes'],
    },
  },
  signalforge: {
    slug: 'signalforge',
    longDescription: `## Overview

SignalForge collects infra snapshots and telemetry, ranks findings, and adds an optional AI summary for triage.

1. Ingest artifacts from observability and platform systems.
2. Normalize them into comparable findings.
3. Run one AI pass for explanation and prioritization.
4. Leave remediation out of scope until the safety model is defined.

## Screenshots

![SignalForge run detail with ranked priorities, findings, and analysis metadata](/images/signalforge-run-real.png)

![SignalForge compare view showing finding drift between two runs](/images/signalforge-compare-real.png)

## Design choices

- Structured findings come first; model output is secondary.
- Artifacts are normalized before any AI enrichment.
- A human approves any follow-up action.

## Source

- **Repository:** https://github.com/Canepro/signalforge`,
    challenges: [
      'Turning messy telemetry into comparable findings without extra noise',
      'Making findings readable enough to act on quickly',
      'Keeping model output in a narrow, reviewable role',
      'Keeping diagnostics separate from remediation until the safety model is defined',
    ],
    solutions: [
      'Strict ingest and normalisation before any AI enrichment',
      'Structured findings stored separately from LLM explanation and ranking',
      'One optional AI pass with explicit trust boundaries',
      'Humans approve any follow-up action',
    ],
    impact:
      'Reproducible infra findings with a separate AI explanation pass. Humans approve any action.',
    technologies: {
      Backend: ['Python'],
      Frontend: ['React', 'TypeScript'],
      AI: ['LLM (constrained pass)'],
      Observability: ['OpenTelemetry'],
      Platform: ['OTLP ingestion', 'Structured diagnostics artifacts'],
    },
  },
  'rocketchat-app-logs-viewer': {
    slug: 'rocketchat-app-logs-viewer',
    longDescription: `## Overview

Rocket.Chat app for log triage during incidents.

- **Loki/Grafana** stay the observability backend
- **\`/logs\`** slash command with room and thread context
- Query logic runs through a **server-side guarded proxy**

## Features

- \`/logs\` slash command with room and thread context
- Private app API endpoints for query, audit, actions, saved views, and targets
- RBAC checks and request audit trail
- React web UI for filtering and row-level actions
- Validation, rate limits, selector enforcement, and redaction

## Workflow

- Triage starts in chat
- Longer reads move to the web UI when needed
- Shared snapshots stay scoped to the room or thread

## Source

- **Repository:** https://github.com/Canepro/rocketchat-app-logs-viewer`,
    challenges: [
      'Restoring fast log access after Rocket.Chat removed in-app log visibility',
      'Blocking direct client-side Loki queries and permission bypasses',
      'Handling large result sets without cloning a full observability UI',
      'Keeping in-chat sharing scoped and traceable',
    ],
    solutions: [
      'Slash command carries room and thread context into triage actions',
      'Server-side Loki proxy with RBAC checks, validation, bounds, and audit logging',
      'React web UI with virtualization for longer reads',
      'Snapshot-backed share flows scoped to the room or thread',
    ],
    impact: 'Guarded Loki queries inside Rocket.Chat, plus a web UI for longer log reads.',
    technologies: {
      Backend: ['TypeScript', 'Node.js', 'Rocket.Chat Apps-Engine'],
      Frontend: ['React', 'Vite', 'Tailwind'],
      Observability: ['Loki'],
      Security: ['RBAC', 'Rate limiting', 'Audit trail', 'Redaction'],
      Packaging: ['Bun', 'Private app packaging', 'Optional same-origin deployment'],
    },
  },
  'hybrid-cloud-gitops-control-plane': {
    slug: 'hybrid-cloud-gitops-control-plane',
    longDescription: `## Overview

Hub-and-spoke GitOps: **OCI OKE (hub)** manages a **remote K3s cluster (spoke)** from one Git repository.

- **Terraform** provisions OCI resources and cluster primitives
- **Argo CD** reconciles application and observability state from Git

## Always Free constraints

Runs the LGTM stack (Loki, Grafana, Tempo, Mimir) within an OCI Always Free **200GB storage** budget.

- Persistent volumes only where state matters
- Ephemeral \`emptyDir\` for transient components such as Alertmanager

## Multi-cluster GitOps

- Argo CD on the OKE hub manages the remote K3s spoke
- One Git repository for infra, ops, and apps
- Argo CD Multi-Source splits \`ops/\` from app charts and manifests

## Links

- **Argo CD UI**: https://argocd.canepro.me *(authentication required)*
- **Source**: https://github.com/Canepro/central-observability-hub-stack/tree/main/argocd

## Cost and recovery

- Egress tracker aligned to a **10TB/month** limit via PromQL queries
- Stateful workloads (MongoDB/NATS) use Retain policies; \`ops/\` Kustomize app adopted by Argo CD

![Hybrid Cloud GitOps Architecture showing Terraform provisioning OCI OKE and ArgoCD managing K3s Rocket.Chat deployments](/images/infra-flow.svg)
`,
    challenges: [
      'Operating within Always Free constraints without overselling uptime or capacity',
      'Keeping a clear separation between “infra”, “ops”, and “apps” while still using one repo',
      'Managing a remote K3s cluster safely from a central ArgoCD control plane',
      'Avoiding storage surprises by explicitly budgeting PV usage and ephemeral state',
    ],
    solutions: [
      'Terraform-managed OCI lifecycle for reproducible cluster creation and change control',
      'ArgoCD reconciliation as the single source of truth for application + observability state',
      'Adopted ArgoCD Multi-Source to keep ops/app boundaries clean and upgrades predictable',
      'Cost-control instrumentation (egress tracking) and Retain policies for stateful recovery',
    ],
    impact:
      'Terraform + Argo CD across OKE and K3s, with Always Free storage budgeting and multi-source app layout.',
    technologies: {
      Kubernetes: ['OCI OKE', 'K3s', 'Helm', 'Kustomize'],
      GitOps: ['ArgoCD', 'ArgoCD Multi-Source'],
      IaC: ['Terraform'],
      Observability: ['Grafana', 'Loki', 'Tempo', 'Mimir'],
      Operations: ['PromQL cost signals', 'Retain policies'],
    },
  },
  'central-observability-hub-stack': {
    slug: 'central-observability-hub-stack',
    longDescription: `## Overview

Centralized observability hub deployed on **Oracle Kubernetes Engine (OKE)** to aggregate **metrics, logs, and traces** from multiple environments into one place.

## Live Demo (Grafana)

- **Grafana**: https://grafana.canepro.me (**authentication required**)
- Access can be provided **on request**.

## Stack

- **Grafana** (dashboards / exploration)
- **Prometheus** (metrics collection + alerting patterns)
- **Loki** (log aggregation)
- **Tempo** (distributed tracing)
- **Alertmanager** (alert routing)
- **NGINX Ingress** + **cert-manager** (TLS + ingress routing)

## Security notes

- **TLS** terminated at ingress using cert-manager (Let's Encrypt).
- **Ingestion endpoints** protected with **Basic Auth** (no anonymous remote-write / push endpoints).
- Internal services remain **ClusterIP** unless explicitly exposed through authenticated ingress.

## Storage

- Object storage for Loki/Tempo persistence (OCI Object Storage / S3-compatible backend)

## SRE notes

- One hub aggregates telemetry from multiple clusters
- Metrics, logs, and traces correlate in one place
- Ingestion endpoints require auth; internal services stay ClusterIP unless exposed through ingress
`,
    challenges: [
      'Designing a single hub to aggregate telemetry from multiple clusters/environments safely',
      'Exposing ingestion endpoints publicly without allowing anonymous writes',
      'Balancing cost constraints (free tier budget) with operational reliability',
      'Choosing storage patterns that scale beyond local PVCs for logs and traces',
      'Operating the stack with reproducible change control (Terraform + ArgoCD) rather than manual drift',
    ],
    solutions: [
      'Deployed Grafana/Prometheus/Loki/Tempo on OKE with NGINX Ingress and cert-manager TLS',
      'Implemented Basic Auth for ingestion endpoints to prevent unauthenticated writes',
      'Kept internal components as ClusterIP and only exposed required ingress routes',
      'Backed Loki/Tempo with object storage for durable, scalable persistence',
      'Used Terraform for OCI/OKE lifecycle and ArgoCD for continuous reconciliation of the observability stack',
    ],
    impact:
      'Grafana/Loki/Tempo hub on OKE with authenticated ingestion, object storage, and Terraform + Argo CD deploy.',
    technologies: {
      Kubernetes: ['OKE', 'NGINX Ingress', 'cert-manager', 'Helm'],
      Observability: ['Grafana', 'Prometheus', 'Loki', 'Tempo', 'Alertmanager'],
      Security: ['TLS', 'Basic Auth', 'ClusterIP services'],
      Storage: ['OCI Object Storage (S3-compatible)'],
    },
  },
  'rocketchat-kubernetes-enterprise': {
    slug: 'rocketchat-kubernetes-enterprise',
    longDescription: `## Overview

Sandbox Rocket.Chat deployment on Kubernetes designed for hands-on platform operations and SRE-style troubleshooting workflows.

## Source

- Repo: https://github.com/Canepro/rocketchat-k8s

## Sandbox access (best effort)

- https://k8.canepro.me *(availability may vary)*

## What is included

- Helm deploy, upgrade, and rollback workflows
- Ingress routing and TLS via NGINX Ingress + cert-manager
- Resource sizing, health checks, and recovery drills
- Troubleshooting notes: logs, events, probes, config validation

## Notes

Sandbox/lab environment. No production SLO or uptime claim.`,
    challenges: [
      'Providing a realistic Rocket.Chat deployment that is safe to run as a sandbox',
      'Hardening ingress exposure with TLS while keeping internal services private by default',
      'Documenting operational workflows for upgrades, failures, and common recovery tasks',
      'Keeping the setup reproducible and easy to iterate on during learning and testing',
    ],
    solutions: [
      'Standardized Helm deployment patterns with repeatable values and upgrade steps',
      'Used NGINX Ingress + cert-manager for TLS and controlled external exposure',
      'Kept internal services private (ClusterIP) and exposed only what is necessary',
      'Added operational guardrails: probes, resource requests/limits, and clear troubleshooting steps',
    ],
    impact:
      'Helm-based Rocket.Chat sandbox on Kubernetes with TLS ingress and documented troubleshooting steps.',
    technologies: {
      Kubernetes: ['Kubernetes', 'Helm'],
      Networking: ['NGINX Ingress', 'cert-manager', 'TLS'],
      Data: ['MongoDB'],
      Observability: ['Prometheus (optional)', 'Grafana (optional)'],
      Application: ['Rocket.Chat'],
    },
  },
  'rocketchat-microservices-migration': {
    slug: 'rocketchat-microservices-migration',
    longDescription: `## Overview

GitOps migration for Rocket.Chat: static manifests replaced with Argo CD + Helm.

Goal: upgrades become a single version bump instead of manifest rewrites.

## What changed

- **10,355 lines of YAML deleted** by moving to Helm + GitOps composition
- One-commit upgrades for day-2 operations

## Upgrade path

- Adopted existing in-cluster MongoDB and NATS without downtime
- Upgraded Rocket.Chat **v7.12.2 → v7.13.2** via Multi-Source apps

## Links

- **Argo CD UI**: https://argocd.canepro.me *(authentication required)*
- **Rocket.Chat**: https://k8.canepro.me *(best effort)*
- **Source**: https://github.com/Canepro/central-observability-hub-stack/tree/main/argocd

## Safety

- Stateful volumes use Retain policies
- \`ops/\` Kustomize app manages shared cluster primitives under Argo CD`,
    challenges: [
      'Reducing operational overhead without breaking running stateful services',
      'Adopting existing resources under GitOps control safely (no surprise deletes)',
      'Creating an upgrade workflow that is reproducible and low-risk',
    ],
    solutions: [
      'ArgoCD Multi-Source Apps to separate “ops” Kustomize from “app” Helm releases',
      'Controlled adoption patterns for existing MongoDB/NATS resources before any upgrade',
      'Helm-driven version bump workflow to make upgrades a single, reviewable change',
    ],
    impact:
      'Removed 10,355 lines of YAML; Rocket.Chat upgrades now run through Argo CD Multi-Source and Helm.',
    technologies: {
      GitOps: ['ArgoCD', 'ArgoCD Multi-Source'],
      Kubernetes: ['Kubernetes', 'Helm'],
      Data: ['MongoDB', 'NATS'],
      Observability: ['Prometheus', 'OpenTelemetry'],
    },
  },
  'rocketchat-observability': {
    slug: 'rocketchat-observability',
    longDescription: `Complete Rocket.Chat observability demo environment with Prometheus, Grafana, exporters, and Traefik.

    Quick start
    1) git clone --depth 1 https://github.com/Canepro/rocketchat-observability.git
    2) cd rocketchat-observability
    3) cp env.example .env  (set DOMAIN to your host, e.g. localhost)
    4) make demo-up
    5) Open Grafana at http://localhost/grafana and Prometheus at http://localhost/prometheus

    Ports/URLs
    - Grafana: http://localhost/grafana
    - Prometheus: http://localhost/prometheus
    - Traefik Dashboard (optional if enabled): http://localhost:8080

    Notes & limitations
    - Designed for local/lab use; not hardened for production.
    - Set DOMAIN in .env to avoid Traefik 404 routing issues.
    - Do not expose Traefik or Grafana publicly without authentication.

    Enhancements (suggestions)
    - Add a short GIF showcasing the Grafana dashboard navigation.
    - Add CI to validate dashboard provisioning and exporter readiness.
    - Provide a guide for deploying the stack to a cloud VM or test cluster.
    - Optional: enable basic auth for Traefik/Grafana when exposing externally.

    Badges (recommended)
    - compose-lint: https://github.com/Canepro/rocketchat-observability/actions/workflows/compose-lint.yml/badge.svg`,
    challenges: [
      'Configuring Traefik routes and path-based services',
      'Setting up exporters for Rocket.Chat and MongoDB',
      'Provisioning Grafana dashboards automatically',
      'Ensuring compatibility with Docker and Podman',
    ],
    solutions: [
      'Traefik file provider routing with path-based services',
      'Node and MongoDB exporters integrated into the compose stack',
      'Grafana provisioning with pre-baked dashboards',
      'Documented support for Podman and Docker engines',
    ],
    impact: 'Local Rocket.Chat observability stack with Prometheus, Grafana, and Traefik routing.',
    technologies: {
      Orchestration: ['Docker Compose', 'Podman Compose'],
      Monitoring: ['Prometheus', 'Grafana', 'Alertmanager'],
      Routing: ['Traefik'],
      Services: ['Rocket.Chat', 'MongoDB'],
    },
  },
  'dockerized-portfolio': {
    slug: 'dockerized-portfolio',
    longDescription: `Multi-stage Docker build for this Next.js site.

- Alpine-based image with a non-root runtime user
- Health check endpoint for orchestrators
- Makefile detects Docker or Podman automatically`,
    challenges: [
      'Optimizing Docker image size for faster deployments',
      'Ensuring compatibility with both Docker and Podman',
      'Implementing proper health checks for container orchestration',
      'Managing secrets and environment variables securely',
    ],
    solutions: [
      'Multi-stage build with Alpine Linux base image',
      'Engine detection script in Makefile with fallback logic',
      'HTTP health check endpoint with proper timeout configuration',
      'Build-time ARGs and runtime ENV separation',
    ],
    impact:
      'Multi-stage Docker image with non-root user, health checks, and Docker/Podman Makefile targets.',
    technologies: {
      Containerization: ['Docker', 'Podman', 'Alpine Linux'],
      'Build Tools': ['Multi-stage builds', 'Makefile', 'Bun'],
      Framework: ['Next.js', 'React', 'Node.js'],
      Security: ['Non-root user', 'Minimal base image'],
    },
  },
  'ci-pipeline-github': {
    slug: 'ci-pipeline-github',
    longDescription: `GitHub Actions workflow for this portfolio repo.

- Runs on push and pull request
- Parallel jobs across Node.js versions
- Dependency caching and build artifact upload
- Concurrency groups cancel stale runs`,
    challenges: [
      'Optimizing build times with effective caching strategies',
      'Running tests across multiple Node.js versions',
      'Managing workflow concurrency to prevent duplicate runs',
      'Storing build artifacts for debugging failed builds',
    ],
    solutions: [
      'Implemented dependency caching with cache keys based on lock files',
      'Matrix strategy for Node.js 18 and 20 parallel testing',
      'Concurrency groups with automatic cancellation of outdated runs',
      'Artifact upload with 7-day retention for build outputs',
    ],
    impact:
      'GitHub Actions CI with matrix builds, dependency caching, and artifact retention for failed runs.',
    technologies: {
      'CI/CD': ['GitHub Actions', 'YAML', 'Workflow automation'],
      Testing: ['Node.js matrix builds', 'bun scripts'],
      Optimization: ['Dependency caching', 'Parallel jobs'],
      Artifacts: ['Build output storage', 'Debug logs'],
    },
  },
  'terraform-azure': {
    slug: 'terraform-azure',
    longDescription: `Minimal Terraform example that provisions an Azure Resource Group and Storage Account.
    
    Quick start
    1) git clone --depth 1 https://github.com/Canepro/tf-hello-azure.git
    2) cd tf-hello-azure
    3) az login && az account set --subscription <AZURE_SUBSCRIPTION_ID>
    4) terraform init
    5) terraform apply -auto-approve
    
    Notes & limitations
    - Intended for learning/demo; review before production.
    - Use placeholders only (e.g., <AZURE_SUBSCRIPTION_ID>, <AZURE_CREDENTIALS>). Do not commit secrets.
    - Remember to clean up: terraform destroy -auto-approve
    
    Enhancements (suggestions)
    - Add GitHub Actions CI for fmt/validate/plan.
    - Add examples for additional Azure resources (vnet, key vault).
    - Provide cost notes and tagging strategy.
    - Add terraform-docs generation and pre-commit hooks.`,
    challenges: [
      'Managing provider authentication and subscription context',
      'Designing consistent naming and tagging',
      'Keeping state safe and reproducible',
    ],
    solutions: [
      'Documented az login and subscription selection',
      'Conventional resource naming and baseline tags',
      'Guidance on remote state and workspaces for team use',
    ],
    impact: 'Minimal Azure Resource Group + Storage Account example for learning Terraform.',
    technologies: {
      IaC: ['Terraform'],
      Azure: ['Resource Group', 'Storage Account'],
      Auth: ['Azure CLI', 'Service Principal (optional)'],
    },
  },
  'rocketchat-local-dev': {
    slug: 'rocketchat-local-dev',
    longDescription: `Local Rocket.Chat development stack with MongoDB, Redis, and Traefik. One-command startup with automatic engine detection (Docker or Podman).

    Quick start (one command)
    1) git clone --depth 1 https://github.com/Canepro/rocketchat-local-dev.git
    2) cd rocketchat-local-dev
    3) ./up.sh

    What it does
    - Creates .env from .env.example if missing
    - Detects Docker or Podman automatically
    - Starts all services and initializes MongoDB replica set

    Ports/URLs
    - Rocket.Chat: http://localhost:8080 (via Traefik)
    - Traefik Dashboard (dev only): http://localhost:8081

    Common tasks
    - Stop/remove: ./down.sh
    - Upgrade images: edit .env (e.g. ROCKETCHAT_IMAGE=rocketchat/rocket.chat:7.x) then ./upgrade.sh

    Notes & limitations
    - Local/dev only; not production-hardened.
    - Keep customizations in .env; TRAEFIK_HTTP_PORT controls external port.
    - Avoid exposing extra container ports beyond Traefik.

    Enhancements (suggestions)
    - CI: compose-lint + basic health checks for services.
    - Seed data/sample users for quick demos.
    - Add a short demo GIF showing first-run onboarding.
    - Document backup/restore for MongoDB volume.

    Badges (recommended)
    - compose-lint: https://github.com/Canepro/rocketchat-local-dev/actions/workflows/compose-lint.yml/badge.svg`,
    challenges: [
      'Balancing simplicity with realistic service topology',
      'Ensuring fast resets while preserving important data',
      'Supporting both Docker and Podman engines',
    ],
    solutions: [
      'Compose files organized for easy spins and resets',
      'Named volumes for persistence and quick cleanup options',
      'Engine-agnostic compose usage documented',
    ],
    impact: 'One-command local Rocket.Chat stack with Docker or Podman.',
    technologies: {
      Orchestration: ['Docker Compose', 'Podman Compose'],
      Services: ['Rocket.Chat', 'MongoDB', 'Redis'],
      Optional: ['Traefik'],
    },
  },
  'rocketchat-troubleshooting': {
    slug: 'rocketchat-troubleshooting',
    longDescription: `Scripts for parsing Rocket.Chat logs and surfacing common failure patterns.

- Regex patterns for multiple log formats
- Error frequency counts and summary reports
- Stream processing for large files`,
    challenges: [
      'Parsing multiple log formats and structures',
      'Identifying patterns in noisy log data',
      'Providing actionable insights from raw logs',
      'Handling large log files efficiently',
    ],
    solutions: [
      'Flexible regex patterns for various log formats',
      'Statistical analysis with error frequency tracking',
      'Knowledge base of common issues and solutions',
      'Stream processing for large files with minimal memory usage',
    ],
    impact: 'Parses Rocket.Chat logs and groups errors by pattern for faster triage.',
    technologies: {
      Languages: ['Python', 'PowerShell', 'Bash'],
      Analysis: ['Regex', 'Pattern matching', 'Statistical analysis'],
      Automation: ['Script automation', 'Batch processing'],
      Output: ['JSON reports', 'CSV exports', 'HTML dashboards'],
    },
  },
  'log-analysis-dashboard': {
    slug: 'log-analysis-dashboard',
    longDescription: `Flask dashboard for Rocket.Chat log analysis.

- Chart.js visualizations for error trends
- Filtering and search over parsed log data
- Export for post-mortem reports`,
    challenges: [
      'Processing logs in real-time without performance impact',
      'Creating intuitive visualizations for complex data',
      'Implementing efficient filtering and search',
      'Managing browser memory with large datasets',
    ],
    solutions: [
      'WebSocket connections for real-time streaming',
      'Aggregated data with drill-down capabilities',
      'Indexed search with Elasticsearch integration',
      'Pagination and virtual scrolling for large results',
    ],
    impact: 'Flask + Chart.js dashboard for filtering and visualizing parsed Rocket.Chat logs.',
    technologies: {
      Backend: ['Python', 'Flask', 'WebSockets'],
      Frontend: ['JavaScript', 'Chart.js', 'Bootstrap'],
      'Data Processing': ['Pandas', 'NumPy', 'Regular expressions'],
      Visualization: ['Time series charts', 'Heat maps', 'Error distribution'],
    },
  },
};
