#!/bin/bash
# Script to delete old merged feature branches
# Run this script with: ./scripts/delete-old-branches.sh
#
# Prerequisites:
# 1. GitHub CLI installed (https://cli.github.com/)
# 2. Authenticated with: gh auth login
# 3. Run from repository root

set -e

REPO="Canepro/portfolio_website-main"

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Branch Cleanup Script ===${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed.${NC}"
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not authenticated with GitHub CLI.${NC}"
    echo "Please run: gh auth login"
    exit 1
fi

echo -e "${YELLOW}This script will delete the following merged branches:${NC}"
echo ""

# Array of branches to delete (confirmed merged/closed and no longer needed)
BRANCHES_TO_DELETE=(
  "copilot/review-most-recent-pr"
  "docs/improve-documentation"
  "feat/hero-modern-redesign"
  "feature/add-project-markdowns-and-data"
  "feature/enterprise-kubernetes-project"
  "feature/modernize-portfolio-phase1"
  "fix/dependabot-nodemailer-upgrade"
  "fix/hero-tweak-layout"
  "fix/standardize-component-names"
  "fix/timeline-useEffect-cleanup"
  "pr-27"
  "update/projects-meta"
)

for branch in "${BRANCHES_TO_DELETE[@]}"; do
  echo "  - $branch"
done

echo ""
echo -e "${YELLOW}Total branches to delete: ${#BRANCHES_TO_DELETE[@]}${NC}"
echo ""
echo -e "${RED}⚠️  WARNING: This action cannot be undone!${NC}"
echo "Branches can be recreated from commit history if needed."
echo ""

# Prompt for confirmation
read -p "Do you want to proceed with deletion? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${YELLOW}Aborted. No branches were deleted.${NC}"
    exit 0
fi

echo -e "${BLUE}Starting branch deletion...${NC}"
echo ""

DELETED_COUNT=0
FAILED_COUNT=0
FAILED_BRANCHES=()

for branch in "${BRANCHES_TO_DELETE[@]}"; do
  echo -n "Deleting '$branch'... "
  
  if gh api -X DELETE "/repos/$REPO/git/refs/heads/$branch" &> /dev/null; then
    echo -e "${GREEN}✓ Deleted${NC}"
    ((DELETED_COUNT++))
  else
    echo -e "${RED}✗ Failed${NC}"
    ((FAILED_COUNT++))
    FAILED_BRANCHES+=("$branch")
  fi
done

echo ""
echo -e "${BLUE}=== Deletion Summary ===${NC}"
echo -e "${GREEN}Successfully deleted: $DELETED_COUNT branches${NC}"

if [ $FAILED_COUNT -gt 0 ]; then
  echo -e "${RED}Failed to delete: $FAILED_COUNT branches${NC}"
  echo ""
  echo "Branches that failed to delete:"
  for branch in "${FAILED_BRANCHES[@]}"; do
    echo "  - $branch"
  done
  echo ""
  echo "Possible reasons for failure:"
  echo "  - Branch already deleted"
  echo "  - Branch is protected"
  echo "  - Insufficient permissions"
fi

echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Verify the branches are deleted in GitHub UI"
echo "2. Clean up local repository:"
echo "   git fetch --prune"
echo "   git branch --merged main | grep -v 'main' | xargs git branch -d"
echo ""
echo -e "${GREEN}Done!${NC}"
