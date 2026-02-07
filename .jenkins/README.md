# Jenkins CI Validation for portfolio_website-main

This directory contains Jenkinsfiles for CI validation of the `portfolio_website-main` repository.

## Available Pipelines

See the Jenkinsfiles in this directory for available validation pipelines.

## Setup in Jenkins

### Option 1: CLI Setup (Recommended)

```bash
# From this repository directory
cd portfolio_website-main
export JENKINS_URL="https://jenkins.canepro.me"
export JOB_NAME="portfolio_website-main"
export CONFIG_FILE=".jenkins/job-config.xml"
bash .jenkins/create-job.sh
```

### Option 2: UI Setup

1. Go to Jenkins UI: https://jenkins.canepro.me
2. Click "New Item"
3. Enter job name: `portfolio_website-main`
4. Select "Multibranch Pipeline"
5. Configure GitHub branch source
6. Set Script Path to `Jenkinsfile` (repo root, recommended) or one of the `.jenkins/*.Jenkinsfile` pipelines

## GitHub Webhook

Configure webhook in repository settings:

- **URL**: `https://jenkins.canepro.me/github-webhook/`
- **Events**: Pull requests, Pushes
- **Content type**: `application/json`

## More Information

This repo uses Jenkins strictly for CI validation (lint, typecheck, build) on:

- `main` branch builds
- Pull requests via Multibranch Pipeline PR jobs (for example `PR-64`)

Jenkins is not the deploy mechanism for this site (Netlify handles deploys). The Jenkins pipeline is intentionally focused on fast, deterministic validation.

## Notes (OKE)

Jenkins is deployed on OKE, and the recommended pipeline (`Jenkinsfile`) uses a Kubernetes agent. Ensure the Jenkins Kubernetes plugin is configured (cloud, namespace, and permissions) so it can start the `node-build` pod template used by the pipeline.

If your cluster enforces short-name image resolution, keep images fully qualified (for example `docker.io/jenkins/inbound-agent:latest` instead of `jenkins/inbound-agent:latest`) to avoid `ErrImagePull` ambiguity.

For build reproducibility, Bun is pinned in the Jenkinsfiles and can be overridden with `BUN_TAG_OVERRIDE` when you intentionally bump versions.
