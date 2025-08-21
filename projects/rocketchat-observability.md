# Rocket.Chat — Observability Stack

Tagline
Complete Rocket.Chat observability demonstrator: Rocket.Chat + MongoDB + Prometheus + Grafana + exporters + Traefik, with an opinionated one-command demo flow and preconfigured dashboards.

Value proposition
Deploy a local or demo Rocket.Chat environment with end-to-end observability, ready-to-use dashboards, provisioning and scripted health checks for easy troubleshooting.

Quick start (demo)
1. git clone --depth 1 https://github.com/Canepro/rocketchat-observability.git
2. cd rocketchat-observability
3. cp env.example .env  (set DOMAIN if running non-local)
4. make demo-up
5. Visit Rocket.Chat at http://localhost and Grafana at http://localhost/grafana

Key features
- One-click demo flow (make demo-up) with validation and progressive health checks.
- Prometheus + Grafana provisioning and curated dashboards (MongoDB exporter, Traefik exporter, node exporter).
- Traefik file provider routing with path-based Grafana (/grafana) by default.
- Works with Podman and Docker.
- Designed for reproducible demo environments and developer observability testing.

Tech stack
- Docker / Podman, Docker Compose
- Traefik, Prometheus, Grafana
- Node exporter, MongoDB exporter, Traefik exporter
- Makefile + Bash scripts for developer workflows

Operational notes
- Ensure the DOMAIN or host mapping is correct to avoid 404s (see docs/TROUBLESHOOTING.md).
- For production usage, move exporters/monitoring to a secured observability cluster, enable HTTPS, and lock down Traefik dashboard.
- Avoid exposing Grafana or Traefik dashboards publicly without authentication.

Screenshots
- Include Grafana dashboards and a terminal screenshot of `make demo-up` health checks.

Useful links
- Repository: https://github.com/Canepro/rocketchat-observability
- Docs to surface: docs/TROUBLESHOOTING.md, docs/MIGRATION_GUIDE.md
- Badge: Actions/compose-lint workflow badge (use in portfolio)
