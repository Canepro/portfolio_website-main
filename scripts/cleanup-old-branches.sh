#!/bin/bash
# Script to identify old merged branches that can be safely deleted
# This script will list branches but NOT delete them automatically for safety

set -e

echo "=== Branch Cleanup Analysis ==="
echo ""
echo "Current branches in the repository:"
echo ""

# List of branches that should NOT be deleted (protected branches)
PROTECTED_BRANCHES=("main" "staging" "develop" "master")

echo "Protected branches (will NOT be deleted):"
for branch in "${PROTECTED_BRANCHES[@]}"; do
  echo "  - $branch"
done
echo ""

echo "=== Branches that appear to be old feature branches ==="
echo "Based on naming conventions, these branches are likely from completed work:"
echo ""

# These branches correspond to merged PRs based on the analysis
OLD_FEATURE_BRANCHES=(
  "copilot/review-most-recent-pr"
  "docs/improve-documentation"
  "feat/hero-modern-redesign"
  "feature/add-project-markdowns-and-data"
  "feature/enterprise-kubernetes-project"
  "feature/modernize-portfolio-phase1"
  "fix/code-quality-improvements-issue-53"
  "fix/hero-tweak-layout"
  "fix/standardize-component-names"
  "fix/timeline-useEffect-cleanup"
  "pr-27"
  "update/projects-meta"
)

echo "Old feature branches identified for potential cleanup:"
for branch in "${OLD_FEATURE_BRANCHES[@]}"; do
  echo "  - $branch"
done
echo ""

echo "Total branches that could be cleaned up: ${#OLD_FEATURE_BRANCHES[@]}"
echo ""

echo "=== Next Steps ==="
echo "To delete these branches, you can:"
echo "1. Use the GitHub UI: Go to Settings > Branches and manually delete"
echo "2. Use GitHub CLI: gh api -X DELETE /repos/OWNER/REPO/git/refs/heads/BRANCH_NAME"
echo "3. The new workflow will automatically delete future merged branches"
echo ""
echo "⚠️  IMPORTANT: Verify these branches are fully merged before deletion!"
echo ""
