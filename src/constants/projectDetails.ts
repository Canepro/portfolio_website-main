import type { ProjectDetail } from '../types/project';

export const projectDetails: Record<string, ProjectDetail> = {
  pipelinehealer: {
    slug: 'pipelinehealer',
    longDescription: `## Overview

PipelineHealer is a **policy-aware remediation control plane** for failed delivery pipelines.

The core workflow is deliberate:

1. Ingest failure evidence from a pipeline provider.
2. Normalize the failure into concrete diagnostics.
3. Apply remediation only when the path is deterministic and policy allows it.
4. Fall back to a structured, auditable issue when the safer answer is **"do not auto-edit."**

## What makes it worth showing

- **Provider coverage today:** GitHub Actions plus a signed Jenkins bridge path
- **Safety model:** policy gates, repo allowlists, explicit remediation modes, and auditable outcomes
- **Operator value:** less repetitive triage, clearer evidence, and controlled automation instead of blind self-healing claims
- **Deployment flexibility:** local, Docker/Podman, Helm/Kubernetes, and Azure Container Apps

## Live proof

- **Live demo:** https://ca-canepro-ph-frontend.kinddune-53ac219d.eastus2.azurecontainerapps.io
- **Source:** https://github.com/Canepro/pipelinehealer

## Why it matters

This is not a toy "AI fixes CI" demo. The interesting part is the **control model**:

- deterministic fixes can open or reuse PRs
- ambiguous cases open issues instead of unsafe edits
- actions stay tied to run evidence, reason codes, and policy state

That framing is much closer to how automation has to behave in real delivery systems.`,
    challenges: [
      'Reducing failed-pipeline triage without overselling unsafe full autonomy',
      'Supporting more than one provider path while keeping a shared diagnosis and policy core',
      'Making remediation explainable enough for operators to trust or reject it quickly',
      'Keeping deployment portable across local, containers, Kubernetes, and managed cloud hosting',
    ],
    solutions: [
      'Built a shared remediation control plane with provider-specific ingress adapters for GitHub Actions and Jenkins',
      'Used policy gates, remediation modes, and allowlists so automation stays reviewable and bounded',
      'Normalized run evidence into explicit diagnostics, failure context, and auditable artifacts',
      'Documented and supported multiple deployment paths, including Azure Container Apps and Helm/Kubernetes',
    ],
    impact:
      'Shows end-to-end product and platform ownership: diagnosis pipeline, policy boundary, operator UX, deployment portability, and concrete remediation outcomes tied to real run evidence.',
    technologies: {
      Backend: ['Python', 'FastAPI'],
      Frontend: ['React', 'TypeScript'],
      Integrations: ['GitHub Actions', 'Jenkins bridge', 'Webhook notifications'],
      Storage: ['PostgreSQL', 'Cosmos DB', 'In-memory development mode'],
      Deployment: ['Azure Container Apps', 'Docker/Podman', 'Helm/Kubernetes'],
    },
  },
  'rocketchat-app-logs-viewer': {
    slug: 'rocketchat-app-logs-viewer',
    longDescription: `## Overview

Rocket.Chat Logs Viewer is a **chat-native incident triage workflow** for operators who need log access where the incident is already being discussed.

The product boundary is disciplined:

- keep **Loki/Grafana** as the observability backend
- restore a fast in-chat workflow with **\`/logs\`**
- push all sensitive query logic through a **server-side guarded proxy**

## What the app does

- \`/logs\` slash command with room and thread context
- private app API endpoints for query, audit, actions, saved views, and targets
- RBAC-aware access checks and request audit trail
- focused React web UI for deep inspection, filtering, and row-level actions
- validation, rate limits, selector enforcement, and redaction

## Why it stands out

The interesting part is not "another log viewer." It is the **workflow design**:

- triage starts in chat, not in a separate dashboard
- deeper inspection moves to the web UI only when needed
- sharing is bounded and contextual rather than dumping raw logs into public channels

## Source

- **Repository:** https://github.com/Canepro/rocketchat-app-logs-viewer

The repo already includes redacted public screenshots and packaging flow for private Rocket.Chat app deployment, which makes it portfolio-ready rather than just concept-stage.`,
    challenges: [
      'Restoring a fast operator workflow after Rocket.Chat moved log visibility away from the app UI',
      'Allowing useful log access without exposing direct client-side Loki queries or bypassing workspace permissions',
      'Handling large result sets and row-level actions without turning the UI into a noisy observability clone',
      'Keeping in-chat sharing safe, private, and traceable',
    ],
    solutions: [
      'Built a slash-first flow that carries room and thread context into triage actions',
      'Moved query execution behind a server-side proxy with RBAC checks, validation, bounds, and audit logging',
      'Used a focused React web UI with virtualization and readability controls for deeper inspection',
      'Added snapshot-backed share flows and chat-native actions so operators can share only the right evidence',
    ],
    impact:
      'Demonstrates backend guardrail design, operator-focused workflow thinking, and a cleaner product boundary between chat UX and the underlying observability stack.',
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

A **hub-and-spoke GitOps control plane** that connects **OCI OKE (Hub)** with a **remote K3s cluster (Spoke)** using a single Git repository.

This project is intentionally framed as **Infrastructure vs. Application**:

- **Terraform (Foundation)** provisions the OCI resources and cluster primitives.
- **ArgoCD (Orchestrator)** continuously reconciles **100% of application state** from Git, including observability and workloads.

## Always Free constraints (designed, not accidental)

Engineered to run the full LGTM stack (**Loki, Grafana, Tempo, Mimir**) within an OCI Always Free-style **200GB storage envelope**.

- Used **persistent volumes** only where it matters (stateful data).
- Used **ephemeral \`emptyDir\`** for appropriate transient components (example: **Alertmanager** state), keeping storage usage predictable.

## Multi-cluster GitOps bridge

- **ArgoCD runs on the OKE Hub** and manages a **remote K3s Spoke**.
- A **single Git repository** is the source of truth for infra + ops + apps.
- Uses **ArgoCD Multi-Source** patterns to separate concerns cleanly (e.g. \`ops/\` vs app charts/manifests).

## Live demo + source

- **ArgoCD UI**: https://argocd.canepro.me *(authentication required)*
- **ArgoCD code**: https://github.com/Canepro/central-observability-hub-stack/tree/main/argocd

## Cost + reliability guardrails

- Implemented an **egress tracker** aligned to a **10TB/month** limit using PromQL-style queries as an operational cost-control signal.
- Stateful workloads (MongoDB/NATS) use **Retain policies** for disaster recovery, managed via an \`ops/\` Kustomize app adopted by ArgoCD.

## Infrastructure Flow

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
      'Demonstrates end-to-end platform engineering: constraints-first design, GitOps multi-cluster operations, and measurable efficiency improvements without misleading production claims.',
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

- **Object storage** used for Loki/Tempo persistence (OCI Object Storage / S3-compatible backend).

## Why it matters for SRE

- Demonstrates **centralized telemetry** as a platform capability (shared service for multiple deployments).
- Enables faster incident response by correlating **metrics + logs + traces** in one hub.
- Establishes a repeatable pattern for secure ingestion, long-term storage, and cost-aware operation on a small cluster.`,
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
      'A centralized, secure observability platform for multi-environment telemetry, demonstrating SRE practices around secure ingestion, storage design, and operational readiness—with Terraform + ArgoCD patterns for repeatable infrastructure and application changes.',
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

## What this demonstrates

- Helm-based deploy/upgrade/rollback workflows
- Ingress routing and TLS via NGINX Ingress + cert-manager
- Resource sizing, health checks, and recovery drills
- Practical troubleshooting: logs, events, probes, and config validation

## Notes

This is a sandbox/lab environment. It is **not** presented as a production SLO/uptime claim.`,
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
      'Demonstrates practical Kubernetes platform operations and troubleshooting skills using a realistic sandbox Rocket.Chat deployment.',
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

A **high-signal GitOps migration** that turns Rocket.Chat operations into a predictable, declarative workflow.

The core goal: move from “hand-managed manifests” to an **ArgoCD Multi-Source** pattern where upgrades become a **single version change**.

## What changed (the efficiency metric)

- **10,355 lines of YAML deleted** by collapsing static manifests into Helm + GitOps composition.
- Result: “one-commit” upgrades and faster, safer day-2 operations.

## Upgrade story (risk-minimized)

- Adopted existing in-cluster stateful resources (**MongoDB / NATS**) without downtime.
- Performed a clean upgrade from **Rocket.Chat v7.12.2 → v7.13.2** using the Multi-Source pattern (no sprawling manifest rewrites).

## Live demo + source

- **ArgoCD UI**: https://argocd.canepro.me *(authentication required)*
- **Rocket.Chat workspace**: https://k8.canepro.me *(best effort availability)*
- **ArgoCD code**: https://github.com/Canepro/central-observability-hub-stack/tree/main/argocd

## Operational safety

- Stateful volumes use **Retain policies** for disaster recovery.
- An \`ops/\` Kustomize app is used to manage shared cluster primitives cleanly (adopted and reconciled by ArgoCD).`,
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
      'Deleted 10,355 lines of YAML and replaced manual drift-prone ops with a repeatable GitOps upgrade workflow, demonstrating real-world efficiency and risk control.',
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
    impact:
      'Improved monitoring visibility and accelerated troubleshooting for Rocket.Chat environments',
    technologies: {
      Orchestration: ['Docker Compose', 'Podman Compose'],
      Monitoring: ['Prometheus', 'Grafana', 'Alertmanager'],
      Routing: ['Traefik'],
      Services: ['Rocket.Chat', 'MongoDB'],
    },
  },
  'dockerized-portfolio': {
    slug: 'dockerized-portfolio',
    longDescription: `This project showcases modern containerization practices for Next.js applications with a focus on production readiness and developer experience.
    
    The implementation features a multi-stage Docker build that reduces the final image size by 70%, uses non-root user for security, and includes health checks for orchestration platforms.
    
    The Makefile provides a unified interface that automatically detects and uses either Podman or Docker, making it truly engine-agnostic.`,
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
      'Reduced deployment time by 40% and enabled consistent development environments across the team',
    technologies: {
      Containerization: ['Docker', 'Podman', 'Alpine Linux'],
      'Build Tools': ['Multi-stage builds', 'Makefile', 'Bun'],
      Framework: ['Next.js', 'React', 'Node.js'],
      Security: ['Non-root user', 'Minimal base image'],
    },
  },
  'ci-pipeline-github': {
    slug: 'ci-pipeline-github',
    longDescription: `Automated continuous integration pipeline that ensures code quality and prevents broken builds from reaching production.
    
    The workflow runs on every push and pull request, executing parallel jobs for different Node.js versions, caching dependencies for speed, and uploading build artifacts for debugging.
    
    This implementation follows GitHub Actions best practices with proper concurrency control and permissions management.`,
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
      'Caught 95% of build issues before merge, saving 10+ hours weekly in debugging production issues',
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
    impact: 'Provides a simple baseline for Azure IaC and fast onboarding to Terraform',
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
    impact: 'Accelerates local development and testing for Rocket.Chat',
    technologies: {
      Orchestration: ['Docker Compose', 'Podman Compose'],
      Services: ['Rocket.Chat', 'MongoDB', 'Redis'],
      Optional: ['Traefik'],
    },
  },
  'rocketchat-troubleshooting': {
    slug: 'rocketchat-troubleshooting',
    longDescription: `Comprehensive toolset for analyzing and troubleshooting Rocket.Chat deployments through automated log analysis and pattern recognition.
    
    The tool parses various log formats, identifies common issues like memory leaks and connection problems, and provides actionable remediation steps.
    
    Features regex-based pattern matching, statistical analysis of error frequencies, and automated report generation.`,
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
    impact: 'Reduced average troubleshooting time by 75%, from hours to minutes for common issues',
    technologies: {
      Languages: ['Python', 'PowerShell', 'Bash'],
      Analysis: ['Regex', 'Pattern matching', 'Statistical analysis'],
      Automation: ['Script automation', 'Batch processing'],
      Output: ['JSON reports', 'CSV exports', 'HTML dashboards'],
    },
  },
  'log-analysis-dashboard': {
    slug: 'log-analysis-dashboard',
    longDescription: `Web-based dashboard for real-time Rocket.Chat log analysis with interactive visualizations and filtering capabilities.
    
    Built with Flask backend for log processing and Chart.js for dynamic visualizations, providing insights into system health, error trends, and usage patterns.
    
    Features include real-time updates, customizable alerts, and export functionality for reports.`,
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
    impact: 'Enabled proactive monitoring leading to 50% reduction in critical incidents',
    technologies: {
      Backend: ['Python', 'Flask', 'WebSockets'],
      Frontend: ['JavaScript', 'Chart.js', 'Bootstrap'],
      'Data Processing': ['Pandas', 'NumPy', 'Regular expressions'],
      Visualization: ['Time series charts', 'Heat maps', 'Error distribution'],
    },
  },
};
