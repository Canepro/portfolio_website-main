// Multibranch Pipeline entrypoint.
// This repo builds with Bun + Next.js. The pipeline is CI validation only.
pipeline {
  agent {
    kubernetes {
      label 'node-build'
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
          cpu: "100m"
          memory: "256Mi"
        limits:
          cpu: "1000m"
          memory: "2Gi"
    - name: node
      image: docker.io/library/node:22-bullseye
      command: ["cat"]
      tty: true
      resources:
        requests:
          cpu: "200m"
          memory: "512Mi"
        limits:
          cpu: "1000m"
          memory: "2Gi"
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
          BUN_TAG="${BUN_TAG_OVERRIDE:-bun-v1.3.6}"

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
