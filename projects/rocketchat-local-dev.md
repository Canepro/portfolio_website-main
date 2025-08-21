# Rocket.Chat — Local Dev Stack

Tagline
A single-command, engine-agnostic local development stack for Rocket.Chat: MongoDB (replica set ready), Redis, Traefik routing and helper scripts for up / down / upgrade.

Value proposition
Run a production‑like Rocket.Chat environment locally for development, testing, and CI demos without requiring docker.sock.

Quick start
1. git clone https://github.com/Canepro/rocketchat-local-dev.git
2. cd rocketchat-local-dev
3. cp .env.example .env
4. ./up.sh
5. Open Rocket.Chat at http://localhost:8080 and Traefik dashboard at http://localhost:8081

Key features
- One-command lifecycle: up, down, upgrade scripts with health checks.
- Podman and Docker support (auto-detect).
- Traefik file provider used — no docker.sock exposure required.
- MongoDB initialized as a single-node replica set for feature parity with production.
- Redis for caching and sessions.
- .env.example and sane defaults to lower friction for new contributors.

Tech stack
- Docker / Podman, Docker Compose
- Traefik (file provider)
- MongoDB, Redis
- Bash scripts, Makefile helper

Notes & limitations
- Designed for local development and demos — not intended as a production deployment.
- Ports (defaults): Rocket.Chat 8080, Traefik 8081. Update .env if you change host mapping.
- If you expose services publicly, secure Traefik and Grafana dashboards and add HTTPS/Let's Encrypt.

Useful links
- Repository: https://github.com/Canepro/rocketchat-local-dev
- Badge: Actions/compose-lint workflow badge (use in portfolio)
