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

Jenkins is deployed on OKE, and the recommended pipeline (`Jenkinsfile`) uses a Kubernetes agent. Ensure the Jenkins Kubernetes plugin is configured (cloud, namespace, and permissions) so it can start the `portfolio-node-build` pod template used by the pipeline.

If your cluster enforces short-name image resolution, keep images fully qualified (for example `docker.io/jenkins/inbound-agent:latest` instead of `jenkins/inbound-agent:latest`) to avoid `ErrImagePull` ambiguity.

For build reproducibility, Bun is pinned in the Jenkinsfiles and can be overridden with `BUN_TAG_OVERRIDE` when you intentionally bump versions.

## Docker Validation

This repo includes a `Dockerfile` intended to be portable (Docker, Podman, k8s).

The multibranch pipeline validates container readiness without requiring Docker-in-Docker:

- **Dockerfile lint**: `hadolint` (downloaded per-build; architecture-aware for arm64/amd64)
  - Warnings are printed but do not fail the build.
- **Image build (no push)**: `kaniko` builds the image in-cluster with `--no-push` to ensure the Dockerfile remains buildable.

### Notes (kaniko + Jenkins durable-task)

The `gcr.io/kaniko-project/executor:*` images are intentionally minimal. In some environments Jenkins' `durable-task`
wrapper expects basic Unix utilities to be present on `PATH` to keep the step heartbeat alive (for example `touch`).

The pod templates in `Jenkinsfile` and `.jenkins/application-validation.Jenkinsfile` set:

- `PATH=/busybox:...`

so BusyBox applets are available to Jenkins and the build step is stable on Kubernetes.
