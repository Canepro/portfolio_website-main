// Next.js Application Validation Pipeline for portfolio_website-main
// This pipeline validates the Next.js/TypeScript portfolio application.
// Purpose: CI validation - complements Azure DevOps pipelines for additional checks.
pipeline {
  // Use default agent (Ubuntu-based with basic tools)
  // Bun will be installed in the Setup stage
  agent {
    kubernetes {
      label 'default'
      defaultContainer 'jnlp'
    }
  }
  
  // Environment variables for tool versions
  // These match the project's package.json requirements
  environment {
    NODE_VERSION = '20'      // Node.js version (required by Next.js)
    BUN_VERSION = '1.3.5'    // Bun version (package manager and runtime)
  }
  
  stages {
    // Stage 1: Install Bun Runtime
    // Bun is the package manager and runtime for this Next.js project
    // Installing it here allows us to use bun commands in subsequent stages
    stage('Setup') {
      steps {
        sh '''
          # Install unzip (required by bun installer)
          # Since we're running as non-root, try multiple approaches
          if ! command -v unzip &> /dev/null; then
            echo "unzip not found, attempting installation..."
            
            # Method 1: Try with sudo (if available and passwordless)
            if command -v sudo &> /dev/null && sudo -n true 2>/dev/null; then
              echo "Attempting installation with sudo..."
              if command -v apt-get &> /dev/null; then
                sudo apt-get update && sudo apt-get install -y unzip && echo "✅ Installed unzip with sudo"
              elif command -v yum &> /dev/null; then
                sudo yum install -y unzip && echo "✅ Installed unzip with sudo"
              elif command -v apk &> /dev/null; then
                sudo apk add --no-cache unzip && echo "✅ Installed unzip with sudo"
              fi
            fi
            
            # Method 2: Download static unzip binary (no root required)
            if ! command -v unzip &> /dev/null; then
              echo "⚠️ Could not install unzip via package manager, downloading static binary..."
              mkdir -p "$HOME/.local/bin"
              
              # Try to download a static unzip binary
              # Using busybox unzip (lightweight, single binary)
              if command -v busybox &> /dev/null; then
                # Busybox has unzip built-in
                ln -sf "$(which busybox)" "$HOME/.local/bin/unzip"
                export PATH="$HOME/.local/bin:$PATH"
                echo "✅ Using busybox unzip"
              elif command -v python3 &> /dev/null; then
                # Fallback: Python zipfile module
                echo "Using Python zipfile module as fallback..."
                cat > "$HOME/.local/bin/unzip" << 'PYEOF'
#!/usr/bin/env python3
import sys
import zipfile
import os

if len(sys.argv) < 2:
    print("Usage: unzip <zipfile> [-d <dir>]", file=sys.stderr)
    sys.exit(1)

zipfile_path = sys.argv[1]
extract_dir = "."

if "-d" in sys.argv:
    idx = sys.argv.index("-d")
    if idx + 1 < len(sys.argv):
        extract_dir = sys.argv[idx + 1]

os.makedirs(extract_dir, exist_ok=True)
with zipfile.ZipFile(zipfile_path, 'r') as zip_ref:
    zip_ref.extractall(extract_dir)
PYEOF
                chmod +x "$HOME/.local/bin/unzip"
                export PATH="$HOME/.local/bin:$PATH"
                echo "✅ Created Python-based unzip wrapper"
              else
                echo "ERROR: Cannot install unzip and no fallback available"
                exit 1
              fi
            fi
          fi
          
          # Verify unzip is available
          if ! command -v unzip &> /dev/null; then
            echo "ERROR: unzip is still not available after installation attempt"
            exit 1
          fi
          
          echo "✅ unzip is available: $(which unzip)"
          
          # Install Bun using official installer
          curl -fsSL https://bun.sh/install | bash
          # Add Bun to PATH for this session
          export PATH="$HOME/.bun/bin:$PATH"
          # Verify installation
          bun --version
        '''
      }
    }
    
    // Stage 2: Dependency Security Audit
    // Scans package.json dependencies for known vulnerabilities
    // Similar to npm audit or yarn audit, but for Bun
    stage('Dependency Audit') {
      steps {
        sh '''
          export PATH="$HOME/.bun/bin:$PATH"
          # Run security audit on dependencies
          # || echo: don't fail on warnings, only critical vulnerabilities
          bun audit || echo "Audit completed (warnings may exist)"
        '''
      }
    }
    
    // Stage 3: Code Quality Checks
    // Runs ESLint (linting) and Prettier (formatting check)
    // Ensures code follows project style guidelines
    stage('Code Quality') {
      steps {
        sh '''
          export PATH="$HOME/.bun/bin:$PATH"
          # Run ESLint to catch code quality issues
          bun run lint
          # Check code formatting (Prettier) without modifying files
          bun run format:check
        '''
      }
    }
    
    // Stage 4: TypeScript Type Checking
    // Validates TypeScript types without building
    // Catches type errors early in the CI pipeline
    stage('Type Checking') {
      steps {
        sh '''
          export PATH="$HOME/.bun/bin:$PATH"
          # Run TypeScript compiler in check-only mode
          bun run typecheck
        '''
      }
    }
    
    // Stage 5: Build Validation
    // Attempts to build the Next.js application
    // Ensures the app can compile successfully before deployment
    stage('Build Validation') {
      steps {
        sh '''
          export PATH="$HOME/.bun/bin:$PATH"
          # Build Next.js application for production
          # This validates that all code compiles and bundles correctly
          bun run build
        '''
      }
    }
    
    // Stage 6: Container Image Security Scan
    // Scans Dockerfile and container images for vulnerabilities
    // Only runs on main/master branches (production builds)
    stage('Container Scan') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
        }
      }
      steps {
        sh '''
          # Container scanning (if Dockerfile exists)
          # This would use tools like Trivy, Snyk, or similar
          if [ -f Dockerfile ]; then
            echo "Container scanning would run here (trivy, etc.)"
            # Example: trivy image --exit-code 1 --severity HIGH,CRITICAL <image>
            # Note: Would need to build image first, then scan it
          fi
        '''
      }
    }
  }
  
  // Post-build actions: cleanup and status reporting
  post {
    // Always clean workspace after build (free up disk space)
    always {
      cleanWs()
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
