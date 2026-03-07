# Blog Content Roadmap

> Last Updated: March 7, 2026

---

## Series 1: PipelineHealer Hackathon Journey (5-6 posts)

The AI Dev Days Hackathon runs Feb 10 – Mar 15, 2026. These posts document the journey
of building PipelineHealer — an AI-powered multi-agent system that automatically detects,
diagnoses, and fixes CI/CD pipeline failures.

| #   | Title                                                                      | Target Publish            | Status            |
| --- | -------------------------------------------------------------------------- | ------------------------- | ----------------- |
| 1   | PipelineHealer: An AI Agent That Fixes CI/CD Failures                      | Week 1 (Feb 10-16)        | ✅ Published      |
| 2   | Designing a Multi-Agent Pipeline: Log Analyzer to Diagnosis to Remediation | Week 1 (Feb 10-16)        | ✅ Published      |
| 3   | Deploying PipelineHealer to Azure: What Went Wrong (and Right)             | Week 1-2 (Feb 12)         | ✅ Published      |
| 4   | Teaching an AI to Read GitHub Actions Logs                                 | Week 3 (Feb 17-23)        | ✅ Published      |
| 5   | From Webhook to Pull Request: The Full Healing Loop                        | Week 4 (Mar 3-9)          | ✅ Published      |
| 6   | Hackathon Retrospective: What I'd Do Differently                           | Post-submission (Mar 16+) | 📝 Ready (PR #75) |

---

## Series 2: DevOps From the Trenches

Real posts drawn from actual projects and repos.

| #   | Title                                                                                | Source Repo                                | Status  |
| --- | ------------------------------------------------------------------------------------ | ------------------------------------------ | ------- |
| 7   | Building a Centralized Observability Stack: Prometheus + Grafana Across Environments | `central-observability-hub-stack`          | ❌ TODO |
| 8   | Rocket.Chat on K3s: Running Enterprise Chat with Prometheus Agent                    | `rocketchat-k8s`                           | ❌ TODO |
| 9   | I Inherited a Terraform Repo — Here's How I Reviewed and Hardened It                 | `Aws-3tier-Infrastructure-using-Terraform` | ❌ TODO |
| 10  | Automating Linux Server Audits with Bash                                             | `server-audit-kit`                         | ❌ TODO |
| 11  | My Portable DevOps Workstation: Tools That Follow Me Everywhere                      | `portable-lab-setup`                       | ❌ TODO |

---

## Series 3: Quick Hits / Lessons Learned

Short-form posts (~500 words) on specific gotchas and tips.

| #   | Title                                                      | Status  |
| --- | ---------------------------------------------------------- | ------- |
| 12  | The Kubernetes Secret That Was Double-Encoded (and Why)    | ❌ TODO |
| 13  | Cleaning Up 22 GitHub Repos in 5 Minutes                   | ❌ TODO |
| 14  | Terraform State Locking: The DynamoDB Table You're Missing | ❌ TODO |
| 15  | Why `terraform destroy` Was Running on Every Push to Main  | ❌ TODO |

---

## Blog Format Reference

Posts live in: `content/blog/YYYY-MM-DD-slug.mdx`

```yaml
---
title: 'Post Title'
date: 'YYYY-MM-DD'
description: 'Brief summary'
tags: ['tag1', 'tag2']
---
```

---

## Notes

- Hackathon series doubles as submission narrative — judges value documented thinking
- DevOps posts can reference GitHub repos directly for credibility
- Quick Hits should be punchy, one-problem-one-lesson format
- Aim for 1 post per week minimum during hackathon period
