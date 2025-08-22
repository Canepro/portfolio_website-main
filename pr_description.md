# Update project metadata — Rocket.Chat & Terraform (branch: update/projects-meta)

QA checklist
- [ ] Site builds successfully
- [ ] TypeScript types preserved (no new ts errors)
- [ ] No structural changes made (only data/content files)

Changed files
- `src/constants/constants.ts`
- `src/constants/projectDetails.ts`

Project summaries
- rocketchat-observability: Updated title/slug/image and concise description; added quick-start steps, ports/URLs, notes, badges, and enhancements.
- rocketchat-local-dev: Clarified local dev purpose and tags; added quick-start, ports, notes, badges, and enhancements.
- tf-hello-azure: Refined description and guidance; added quick-start, notes with placeholders, and enhancements.

Enhancement suggestions
- rocketchat-observability: Add Grafana demo GIF, CI to validate provisioning, cloud VM how-to, enable auth for Traefik/Grafana.
- rocketchat-local-dev: Compose-lint + health checks CI, seed data/sample users, Makefile convenience targets, version upgrade/rollback docs.
- tf-hello-azure: GitHub Actions (fmt/validate/plan), vnet/key vault examples, cost/tagging notes, terraform-docs + pre-commit hooks.

Notes
- No components, styles, routing, or build scripts changed.
- Reused existing images: `chat-observability.png`, `rocketchat-local.png`, `tf-azure.png`. If better screenshots are captured later, replace these files in `public/images/`.
