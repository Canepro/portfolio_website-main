Summary
- Update project metadata/content for Rocket.Chat and Terraform projects to ensure accurate, concise, and attractive portfolio entries.

QA checklist
- [ ] Site builds successfully
- [ ] TypeScript types preserved (no new ts errors)
- [ ] No structural changes made (only data/content files)

Changed files
- `src/constants/constants.ts`
- `src/constants/projectDetails.ts`

Project summaries
- rocketchat-observability: Refreshed title, slug, image, and concise description; added quick-start, ports, notes, badges, and enhancements.
- rocketchat-local-dev: Clarified local dev purpose, tags, and image; added quick-start, ports, notes, badges, and enhancements.
- tf-hello-azure: Updated description, image, and guidance; added quick-start, notes with placeholders, and enhancements.

Details per project
1) Rocket.Chat — Observability Stack (`rocketchat-observability`)
   - Title/tagline: Complete Rocket.Chat observability demo with Prometheus, Grafana, exporters, and Traefik
   - Quick start: clone → cp env.example → make demo-up → open Grafana at `/grafana`
   - URLs: Grafana `/grafana`, Prometheus `/prometheus`, Traefik dashboard optional `:8080`
   - Notes: local/demo use, set `DOMAIN`, don’t expose dashboards without auth
   - Badges: compose-lint
   - Enhancements: demo GIF, CI to validate provisioning, cloud VM guide, enable auth

2) Rocket.Chat Local Development Stack (`rocketchat-local-dev`)
   - Tagline: Local Rocket.Chat dev stack with MongoDB/Redis using Docker/Podman Compose
   - Quick start: clone → compose up → open `http://localhost:3000`
   - Ports: Rocket.Chat `:3000`, MongoDB `:27017`
   - Notes: local/dev only, persistence via volumes, review Traefik if enabled
   - Badges: compose-lint
   - Enhancements: CI health checks, seed data, Makefile targets, upgrade docs

3) Terraform: Azure Hello Cloud (`terraform-azure`)
   - Tagline: Minimal Terraform example that provisions Azure RG + Storage Account
   - Quick start: clone → `az login` + select subscription → `terraform init && apply`
   - Notes: placeholders `<AZURE_SUBSCRIPTION_ID>`, no secrets; intended for learning; destroy on cleanup
   - Enhancements: add CI (fmt/validate/plan), add vnet/key vault examples, cost/tagging notes, terraform-docs

Notes
- Only data/content updated; no component, routing, or structural changes.
- Images: used existing assets `chat-observability.png`, `rocketchat-local.png`, and `tf-azure.png`.
