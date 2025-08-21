import type { ProjectDetail } from '../types/project';

export const projectDetails: Record<string, ProjectDetail> = {
  'containerized-chat-observability': {
    slug: 'containerized-chat-observability',
    longDescription: `Successfully deployed and configured a full-stack Rocket.Chat microservices platform with enterprise-grade monitoring and observability.
    
    The deployment includes Rocket.Chat for team communication, Traefik for reverse proxy and SSL termination, Prometheus for metrics collection, and Grafana for visualization dashboards.
    
    Everything is orchestrated using Podman Compose for container management with rootless containers for enhanced security.`,
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
    longDescription: `Infrastructure as Code implementation demonstrating Azure resource provisioning with Terraform, showcasing cloud automation best practices.
    
    The project creates a complete Azure environment with proper resource naming, tagging strategies, and state management configuration.
    
    This serves as a foundation for larger Azure deployments with modular, reusable Terraform code.`,
    challenges: [
      'Managing Terraform state in a team environment',
      'Implementing proper resource tagging for cost tracking',
      'Ensuring idempotent resource creation',
      'Handling Azure authentication securely'
    ],
    solutions: [
      'Azure Storage backend for remote state with locking',
      'Consistent tagging module with environment and cost center tags',
      'Proper resource lifecycle management with create_before_destroy',
      'Service Principal authentication with environment variables'
    ],
    impact: 'Reduced infrastructure provisioning time from hours to minutes with consistent, repeatable deployments',
    technologies: {
      'IaC': ['Terraform', 'HCL', 'State management'],
      'Cloud': ['Azure Resource Manager', 'Storage Accounts', 'Resource Groups'],
      'Security': ['Service Principals', 'RBAC', 'Key Vault integration'],
      'Best Practices': ['Remote state', 'Modules', 'Variables']
    }
  },
  'rocketchat-local-dev': {
    slug: 'rocketchat-local-dev',
    longDescription: `Complete local development environment for Rocket.Chat that enables developers to quickly spin up, test, and debug the platform.
    
    The stack includes all necessary services: MongoDB for data persistence, Redis for caching, and Traefik for routing, all orchestrated with Docker Compose.
    
    Features include data persistence across restarts, easy version switching, and isolated networking for security.`,
    challenges: [
      'Managing data persistence across container restarts',
      'Configuring inter-service communication securely',
      'Enabling easy version upgrades and rollbacks',
      'Providing developer-friendly logging and debugging'
    ],
    solutions: [
      'Named volumes for MongoDB and uploads with backup scripts',
      'Custom Docker network with service discovery',
      'Version pinning with .env file configuration',
      'Centralized logging with docker-compose logs aggregation'
    ],
    impact: 'Reduced developer onboarding time from days to hours, enabling rapid feature development and testing',
    technologies: {
      'Orchestration': ['Docker Compose', 'Podman Compose'],
      'Services': ['Rocket.Chat', 'MongoDB', 'Redis', 'Traefik'],
      'Development': ['Hot reload', 'Debug ports', 'Volume mounts'],
      'Networking': ['Service mesh', 'Internal DNS', 'Port mapping']
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


