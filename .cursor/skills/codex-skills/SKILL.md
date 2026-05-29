---
name: codex-skills
description: Route to the portable skill library at ~/src/codex-skills (github.com/Canepro/codex-skills). Use when a task matches a library skill, when skills are missing, or when refreshing installs.
---

# Codex Skills Library

Canonical checkout: `~/src/codex-skills` ([Canepro/codex-skills](https://github.com/Canepro/codex-skills))

Install or refresh:

```bash
bash ~/src/codex-skills/scripts/bootstrap.sh
```

Verify drift:

```bash
bash ~/src/codex-skills/scripts/check-drift.sh
```

## Portfolio routing

| Task                                   | Skill                            |
| -------------------------------------- | -------------------------------- |
| Copy polish, remove AI tone            | `anti-ai-writing`                |
| UI feels templated or generic          | `frontend-uncodixfy`             |
| UX/layout audit before ship            | `frontend-review`                |
| Mobile/responsive fixes                | `responsive-design`              |
| Post-change browser verification       | `webapp-testing` or `playwright` |
| Tokens, primitives, UI drift           | `design-system-maintenance`      |
| GitHub Actions checks red              | `gh-fix-ci`                      |
| PR review threads                      | `gh-address-comments`            |
| Jenkins / pipeline failures            | `ci-pipeline-triage`             |
| Husky / lint-staged setup              | `setup-pre-commit`               |
| Delivery summary after a change        | `codex-closeout`                 |
| Find or install new skills             | `find-skills`                    |
| Emails, PR bodies, customer-safe prose | `written-communication`          |
| React bundle/render perf               | `react-performance-review`       |

Project symlinks live in `.cursor/skills/<name>/` and point at `~/src/codex-skills/skills/<name>/`. Read that skill's `SKILL.md` before acting.

Rocket.Chat–specific and private ops skills stay outside this repo. Do not copy secrets or ticket data into skills.
