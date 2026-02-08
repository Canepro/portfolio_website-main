// Multibranch Pipeline entrypoint.
// This repo builds with Bun + Next.js. The pipeline is CI validation only.
pipeline {
  agent {
    kubernetes {
      // Avoid colliding with any statically-configured Kubernetes pod templates in Jenkins.
      // Some clusters define a global `node-build` template that may inject extra containers.
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

  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Setup') {
      steps {
        sh '''
          # Jenkins executes `sh` steps using /bin/sh; avoid bash-only options like `pipefail`.
          set -eu
          BUN_TAG="${BUN_TAG_OVERRIDE:-bun-v1.3.5}"

          apt-get update
          apt-get install -y --no-install-recommends unzip curl ca-certificates

          curl -fsSL https://bun.sh/install -o /tmp/bun-install.sh
          bash /tmp/bun-install.sh "$BUN_TAG"
          export PATH="$HOME/.bun/bin:$PATH"
          bun --version
          node --version
        '''
      }
    }

    stage('Install') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          bun install --frozen-lockfile
        '''
      }
    }

    stage('Dependency Audit') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          # Only fail on CRITICAL vulnerabilities.
          bun audit --audit-level=critical
        '''
      }
    }

    stage('Lint') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          bun run lint
        '''
      }
    }

    stage('Typecheck') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          bun run typecheck
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
          set -eu
          export PATH="$HOME/.bun/bin:$PATH"
          bun run build
        '''
      }
    }

    stage('Dockerfile Lint') {
      when {
        expression { fileExists('Dockerfile') }
      }
      steps {
        sh '''
          set -eu

          # hadolint image is minimal and not suitable as a long-running sidecar in Jenkins K8s agents.
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
      }
    }

    stage('Container Build (no push)') {
      when {
        expression { fileExists('Dockerfile') }
      }
      steps {
        container('kaniko') {
          sh '''
            set -eu
            # Kaniko image is minimal; ensure BusyBox applets (sleep, rm, etc.) are available.
            export PATH="/busybox:$PATH"
            DESTINATION="${KANIKO_DESTINATION:-docker.io/library/portfolio_website-main:ci}"
            # Kaniko builds container images from Dockerfile without requiring a Docker daemon.
            # We use --no-push so PR builds validate portability without publishing images.
            echo "kaniko: starting build (no push) -> $DESTINATION"

            # Keep the Jenkins durable-task heartbeat alive by emitting periodic output.
            /kaniko/executor \
              --context "$WORKSPACE" \
              --dockerfile "$WORKSPACE/Dockerfile" \
              --destination "$DESTINATION" \
              --no-push \
              --no-push-cache &

            pid="$!"
            while kill -0 "$pid" 2>/dev/null; do
              echo "kaniko: still building..."
              sleep 30
            done
            wait "$pid"
          '''
        }
      }
    }
  }

  post {
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
    success {
      echo '✅ CI validation passed'
    }
    failure {
      echo '❌ CI validation failed'
    }
  }
}
