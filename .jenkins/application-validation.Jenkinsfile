// Next.js Application Validation Pipeline for portfolio_website-main
// This pipeline validates the Next.js/TypeScript portfolio application.
// Purpose: CI validation - complements Azure DevOps pipelines for additional checks.
pipeline {
  // Use a build container that can install OS deps (unzip/curl).
  // The default `jnlp` inbound-agent runs as non-root and cannot apt-get.
  agent {
    kubernetes {
      // Define a complete pod with both jnlp (required) and node (for builds) containers
      // This avoids issues with pod template inheritance/merging
      // Avoid colliding with any statically-configured Kubernetes pod templates in Jenkins.
      label 'portfolio-node-build'
      defaultContainer 'node'
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: jnlp
      image: docker.io/jenkins/inbound-agent:latest
      imagePullPolicy: Always
      resources:
        requests:
          cpu: "25m"
          memory: "128Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"
    - name: node
      image: docker.io/library/node:22-bullseye
      command: ["cat"]
      tty: true
      resources:
        requests:
          cpu: "50m"
          memory: "256Mi"
        limits:
          cpu: "1000m"
          memory: "2Gi"
    - name: kaniko
      image: gcr.io/kaniko-project/executor:v1.23.2-debug
      command: ["/busybox/cat"]
      tty: true
      resources:
        requests:
          cpu: "50m"
          memory: "256Mi"
        limits:
          cpu: "1500m"
          memory: "3Gi"
'''
    }
  }

  // Environment variables for tool versions
  // These match the project's package.json requirements
  environment {
    NODE_VERSION = '22'      // Node.js version (matches local dev)
    BUN_TAG = 'bun-v1.3.5'   // Bun release tag (passed to installer). Override with BUN_TAG_OVERRIDE.
  }

  stages {
    // Stage 1: Install Bun Runtime
    // Bun is the package manager and runtime for this Next.js project
    // Installing it here allows us to use bun commands in subsequent stages
    stage('Setup') {
      steps {
        sh '''
          # Install prerequisites for bun installer (needs unzip + curl + bash)
          # node:22-bullseye runs as root by default, so apt works here.
          set -eu
          BUN_TAG="${BUN_TAG_OVERRIDE:-$BUN_TAG}"
          apt-get update
          apt-get install -y --no-install-recommends unzip curl ca-certificates

          # Install Bun using official installer
          curl -fsSL https://bun.sh/install -o /tmp/bun-install.sh
          bash /tmp/bun-install.sh "$BUN_TAG"
          # Add Bun to PATH for this session
          export PATH="$HOME/.bun/bin:$PATH"
          # Verify installation
          bun --version
        '''
      }
    }

    // Stage 2: Install Dependencies
    // Install project dependencies before running validation checks
    // Required for lint, typecheck, and build commands to work
    stage('Install Dependencies') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          # Install project dependencies (Next.js, TypeScript, ESLint, etc.)
          bun install --frozen-lockfile
        '''
      }
    }

    // Stage 3: Dependency Security Audit
    // Scans package.json dependencies for known vulnerabilities
    // Similar to npm audit or yarn audit, but for Bun
    stage('Dependency Audit') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          # Run security audit on dependencies
          # Only fail on CRITICAL vulnerabilities.
          bun audit --audit-level=critical
        '''
      }
    }

    // Stage 4: Code Quality Checks
    // Runs ESLint (linting) and Prettier (formatting check)
    // Ensures code follows project style guidelines
    stage('Code Quality') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          # Run ESLint to catch code quality issues
          bun run lint
          # Check code formatting (Prettier) without modifying files
          bun run format:check
        '''
      }
    }

    // Stage 5: TypeScript Type Checking
    // Validates TypeScript types without building
    // Catches type errors early in the CI pipeline
    stage('Type Checking') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          # Run TypeScript compiler in check-only mode
          bun run typecheck
        '''
      }
    }

    // Stage 6: Build Validation
    // Attempts to build the Next.js application
    // Ensures the app can compile successfully before deployment
    stage('Build Validation') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          # Build Next.js application for production
          # This validates that all code compiles and bundles correctly
          bun run build
        '''
      }
    }

    // Stage 7: Container Build Validation (no push)
    // Validates the Dockerfile stays buildable (portable deploy via Docker/Podman).
    // Uses kaniko (no Docker daemon required).
    stage('Container Build (no push)') {
      when {
        expression { fileExists('Dockerfile') }
      }
      steps {
        sh '''
          set -eu

          # hadolint container image is minimal and not suitable as a Jenkins K8s agent sidecar.
          # Install the pinned binary for this build only.
          HADOLINT_VERSION="v2.12.0"
          HADOLINT_BIN="/usr/local/bin/hadolint"
          ARCH="$(dpkg --print-architecture 2>/dev/null || true)"
          if [ -z "$ARCH" ]; then
            ARCH="$(uname -m)"
          fi
          case "$ARCH" in
            amd64|x86_64) HADOLINT_ASSET="hadolint-Linux-x86_64" ;;
            arm64|aarch64) HADOLINT_ASSET="hadolint-Linux-arm64" ;;
            *) echo "Unsupported architecture for hadolint: $ARCH" >&2; exit 1 ;;
          esac
          if [ ! -x "$HADOLINT_BIN" ]; then
            curl -fsSL -o "$HADOLINT_BIN" \
              "https://github.com/hadolint/hadolint/releases/download/${HADOLINT_VERSION}/${HADOLINT_ASSET}"
            # Verify supply-chain integrity before execution.
            EXPECTED_SHA="$(curl -fsSL \
              "https://github.com/hadolint/hadolint/releases/download/${HADOLINT_VERSION}/${HADOLINT_ASSET}.sha256" \
              | awk '{print $1}')"
            ACTUAL_SHA="$(sha256sum "$HADOLINT_BIN" | awk '{print $1}')"
            if [ -z "$EXPECTED_SHA" ] || [ "$EXPECTED_SHA" != "$ACTUAL_SHA" ]; then
              echo "hadolint checksum mismatch for ${HADOLINT_ASSET} (${HADOLINT_VERSION})" >&2
              exit 1
            fi
            chmod +x "$HADOLINT_BIN"
          fi
          hadolint --version
          # Treat warnings as advisory (print them) but only fail the build on errors.
          hadolint --failure-threshold error Dockerfile
        '''
        container('kaniko') {
          sh '''
            set -eu
            DESTINATION="${KANIKO_DESTINATION:-docker.io/library/portfolio_website-main:ci}"
            /kaniko/executor \
              --context "$WORKSPACE" \
              --dockerfile "$WORKSPACE/Dockerfile" \
              --destination "$DESTINATION" \
              --no-push \
              --no-push-cache \
              --tarPath "$WORKSPACE/ci-image.tar"

            rm -f "$WORKSPACE/ci-image.tar" || true
          '''
        }
      }
    }
  }

  // Post-build actions: cleanup and status reporting
  post {
    // Always clean workspace after build (free up disk space)
    always {
      script {
        // If the Kubernetes pod never starts (image pull, scheduling), there is no workspace context.
        try {
          cleanWs()
        } catch (err) {
          echo "cleanWs skipped: ${err}"
        }
      }
    }
    // Success message for easy log scanning
    success {
      echo '✅ Application validation passed'
    }
    // Failure message for easy log scanning
    failure {
      echo '❌ Application validation failed'
    }
  }
}
