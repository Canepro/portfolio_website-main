import type { ProjectDetail } from '../types/project';

export const projectDetails: Record<string, ProjectDetail> = {
  'rocketchat-kubernetes-enterprise': {
    slug: 'rocketchat-kubernetes-enterprise',
    longDescription: `## 🚀 Production-Ready Enterprise Chat Platform

**A comprehensive Kubernetes deployment showcasing enterprise-grade architecture, advanced DevOps practices, and production monitoring excellence.**

---

### ⭐ **Key Achievements**

🎯 **99.7% Production Uptime SLO** - Consistently maintained in live environment  
💰 **20% Cost Reduction** - Through intelligent monitoring and optimization  
📊 **1,238+ Metrics** - Comprehensive observability across 55+ pods  
📚 **5,300+ Lines** - Production troubleshooting documentation  

---

### 🎮 **Live Demo Access**

Experience the actual production infrastructure:

**🔗 Live Chat Application**  
[https://chat.canepro.me](https://chat.canepro.me) *(Guest access enabled)*

**📊 Real-Time Monitoring Dashboard**  
[Public Dashboard](https://grafana.canepro.me/d/public-rocketchat-overview) | [Kiosk Mode](https://grafana.canepro.me/d/public-rocketchat-overview?kiosk=tv&theme=dark)

---

### 🏗️ **Infrastructure Architecture**

**Container Orchestration**
- **Azure Kubernetes Service** - Production-grade cluster management
- **55+ Managed Pods** - Across multiple namespaces with auto-scaling
- **Multi-replica deployments** - High availability and fault tolerance

**Database Layer**
- **MongoDB Replica Set** - 3-node cluster with automated failover
- **Redis Cache** - Session management and real-time features
- **Persistent Storage** - Azure managed disks with backup automation

**Monitoring & Observability**
- **28-Panel Grafana Dashboard** - Comprehensive system monitoring
- **Prometheus Metrics** - 1,238+ series with custom alerts
- **Loki Log Aggregation** - Centralized logging with Fluent Bit
- **Desired vs Actual State Tracking** - Kubernetes workload monitoring

---

### 🔒 **Enterprise Security**

**Network Security**
- **SSL/TLS Automation** - cert-manager with Let's Encrypt
- **Network Policies** - Micro-segmentation between services
- **Ingress Controls** - Secure external access management

**Access Control**
- **RBAC Implementation** - Role-based access across namespaces  
- **Pod Security Contexts** - Non-root containers with security policies
- **Secret Management** - Kubernetes secrets with rotation policies

---

### ⚡ **Performance & Reliability**

**Automated Scaling**
- **Horizontal Pod Autoscaler** - CPU/memory-based scaling
- **Cluster Autoscaler** - Node-level scaling for cost optimization
- **Resource Quotas** - Guaranteed performance with limits

**Disaster Recovery**
- **Automated MongoDB Backups** - Daily snapshots with retention policies
- **GitOps Deployments** - Infrastructure as Code with rollback capabilities
- **Health Checks** - Comprehensive liveness and readiness probes

---

### 📈 **Production Metrics**

| Metric | Achievement | Impact |
|--------|-------------|---------|
| **Uptime SLO** | 99.7% | Exceeds enterprise standards |
| **Response Time** | <200ms | Optimal user experience |
| **Cost Optimization** | 20% reduction | Efficient resource utilization |
| **Monitoring Coverage** | 1,238+ metrics | Complete observability |
| **Documentation** | 5,300+ lines | Enterprise troubleshooting |

---

### 🛠️ **DevOps Excellence**

**CI/CD Pipeline**
- **GitOps Workflow** - Automated deployments with ArgoCD
- **Multi-environment** - Dev/staging/prod with promotion workflows  
- **Automated Testing** - Integration and performance tests

**Monitoring-Driven Operations**
- **Proactive Alerting** - Slack/email notifications for anomalies
- **Performance Optimization** - Data-driven scaling decisions
- **Capacity Planning** - Resource trend analysis and forecasting

---

*This deployment demonstrates real-world production expertise in cloud-native technologies, DevOps practices, and enterprise-grade system reliability.*`,
    challenges: [
      'Designing resilient architecture for 99.7% uptime SLO while managing costs',
      'Implementing comprehensive monitoring across 55+ Kubernetes pods',
      'Creating production-ready MongoDB cluster with automated failover',
      'Balancing security policies with operational flexibility in Kubernetes',
      'Managing complex networking between microservices and external dependencies',
      'Optimizing resource allocation to achieve 20% cost reduction',
      'Building monitoring dashboard that tracks desired vs actual infrastructure state'
    ],
    solutions: [
      'Deployed multi-replica MongoDB cluster with automatic failover and backup strategies',
      'Built comprehensive monitoring stack with Prometheus, Grafana, and Loki for full observability',
      'Implemented RBAC, network policies, and pod security contexts for enterprise-grade security',
      'Created 28-panel Grafana dashboard with real-time monitoring and alerting',
      'Developed automated scaling policies based on application metrics and resource usage',
      'Established GitOps deployment pipeline with automated testing and rollback capabilities',
      'Documented comprehensive troubleshooting procedures with real-world case studies'
    ],
    impact: 'Production-ready enterprise chat platform serving real users with 99.7% uptime, 20% cost optimization, and comprehensive monitoring demonstrating advanced Kubernetes and cloud-native expertise',
    technologies: {
      'Container Orchestration': ['Kubernetes', 'Azure AKS', 'Helm Charts', 'HPA'],
      'Monitoring & Observability': ['Prometheus', 'Grafana', 'Loki', 'Fluent Bit', 'Alertmanager'],
      'Database & Storage': ['MongoDB Replica Set', 'Redis', 'Azure Storage', 'Persistent Volumes'],
      'Security & Networking': ['SSL/TLS', 'cert-manager', 'RBAC', 'Network Policies', 'Ingress'],
      'CI/CD & GitOps': ['GitHub Actions', 'ArgoCD', 'Helm', 'Git Workflows'],
      'Application Stack': ['Rocket.Chat', 'Node.js', 'WebRTC', 'Real-time Messaging']
    }
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
      'Ensuring compatibility with Docker and Podman'
    ],
    solutions: [
      'Traefik file provider routing with path-based services',
      'Node and MongoDB exporters integrated into the compose stack',
      'Grafana provisioning with pre-baked dashboards',
      'Documented support for Podman and Docker engines'
    ],
    impact: 'Improved monitoring visibility and accelerated troubleshooting for Rocket.Chat environments',
    technologies: {
      'Orchestration': ['Docker Compose', 'Podman Compose'],
      'Monitoring': ['Prometheus', 'Grafana', 'Alertmanager'],
      'Routing': ['Traefik'],
      'Services': ['Rocket.Chat', 'MongoDB']
    }
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
      'Managing secrets and environment variables securely'
    ],
    solutions: [
      'Multi-stage build with Alpine Linux base image',
      'Engine detection script in Makefile with fallback logic',
      'HTTP health check endpoint with proper timeout configuration',
      'Build-time ARGs and runtime ENV separation'
    ],
    impact: 'Reduced deployment time by 40% and enabled consistent development environments across the team',
    technologies: {
      'Containerization': ['Docker', 'Podman', 'Alpine Linux'],
      'Build Tools': ['Multi-stage builds', 'Makefile', 'npm'],
      'Framework': ['Next.js', 'React', 'Node.js'],
      'Security': ['Non-root user', 'Minimal base image']
    }
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
      'Storing build artifacts for debugging failed builds'
    ],
    solutions: [
      'Implemented dependency caching with cache keys based on lock files',
      'Matrix strategy for Node.js 18 and 20 parallel testing',
      'Concurrency groups with automatic cancellation of outdated runs',
      'Artifact upload with 7-day retention for build outputs'
    ],
    impact: 'Caught 95% of build issues before merge, saving 10+ hours weekly in debugging production issues',
    technologies: {
      'CI/CD': ['GitHub Actions', 'YAML', 'Workflow automation'],
      'Testing': ['Node.js matrix builds', 'npm scripts'],
      'Optimization': ['Dependency caching', 'Parallel jobs'],
      'Artifacts': ['Build output storage', 'Debug logs']
    }
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
      'Keeping state safe and reproducible'
    ],
    solutions: [
      'Documented az login and subscription selection',
      'Conventional resource naming and baseline tags',
      'Guidance on remote state and workspaces for team use'
    ],
    impact: 'Provides a simple baseline for Azure IaC and fast onboarding to Terraform',
    technologies: {
      'IaC': ['Terraform'],
      'Azure': ['Resource Group', 'Storage Account'],
      'Auth': ['Azure CLI', 'Service Principal (optional)']
    }
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
      'Supporting both Docker and Podman engines'
    ],
    solutions: [
      'Compose files organized for easy spins and resets',
      'Named volumes for persistence and quick cleanup options',
      'Engine-agnostic compose usage documented'
    ],
    impact: 'Accelerates local development and testing for Rocket.Chat',
    technologies: {
      'Orchestration': ['Docker Compose', 'Podman Compose'],
      'Services': ['Rocket.Chat', 'MongoDB', 'Redis'],
      'Optional': ['Traefik']
    }
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
      'Handling large log files efficiently'
    ],
    solutions: [
      'Flexible regex patterns for various log formats',
      'Statistical analysis with error frequency tracking',
      'Knowledge base of common issues and solutions',
      'Stream processing for large files with minimal memory usage'
    ],
    impact: 'Reduced average troubleshooting time by 75%, from hours to minutes for common issues',
    technologies: {
      'Languages': ['Python', 'PowerShell', 'Bash'],
      'Analysis': ['Regex', 'Pattern matching', 'Statistical analysis'],
      'Automation': ['Script automation', 'Batch processing'],
      'Output': ['JSON reports', 'CSV exports', 'HTML dashboards']
    }
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
      'Managing browser memory with large datasets'
    ],
    solutions: [
      'WebSocket connections for real-time streaming',
      'Aggregated data with drill-down capabilities',
      'Indexed search with Elasticsearch integration',
      'Pagination and virtual scrolling for large results'
    ],
    impact: 'Enabled proactive monitoring leading to 50% reduction in critical incidents',
    technologies: {
      'Backend': ['Python', 'Flask', 'WebSockets'],
      'Frontend': ['JavaScript', 'Chart.js', 'Bootstrap'],
      'Data Processing': ['Pandas', 'NumPy', 'Regular expressions'],
      'Visualization': ['Time series charts', 'Heat maps', 'Error distribution']
    }
  }
};


