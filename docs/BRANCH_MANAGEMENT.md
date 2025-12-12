# Branch Management Strategy

This document outlines the branch management strategy for the portfolio website repository to keep the branch list clean and organized.

## Branch Structure

### Protected Branches

These branches should **NEVER** be deleted:

- **`main`** - Primary production branch, deployed to production
- **`staging`** - Staging/preview environment (if applicable)

### Feature Branches

Feature branches follow naming conventions:

- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `chore/*` - Maintenance tasks
- `copilot/*` - Copilot-generated changes

## Automated Branch Cleanup

### Automatic Deletion After Merge

A GitHub Actions workflow (`.github/workflows/cleanup-merged-branches.yml`) automatically deletes feature branches after their pull requests are merged. This keeps the repository clean without manual intervention.

**How it works:**
1. When a PR is merged, the workflow triggers
2. The branch is automatically deleted (unless it's a protected branch)
3. You'll see a notification in the PR timeline

### Manual Cleanup for Existing Branches

For branches that existed before the automation was added:

1. **View the cleanup analysis:**
   ```bash
   ./scripts/cleanup-old-branches.sh
   ```

2. **Delete old branches safely:**
   
   Using GitHub CLI (recommended):
   ```bash
   # Delete a single branch
   gh api -X DELETE /repos/Canepro/portfolio_website-main/git/refs/heads/BRANCH_NAME
   
   # Example
   gh api -X DELETE /repos/Canepro/portfolio_website-main/git/refs/heads/fix/hero-tweak-layout
   ```
   
   Using GitHub UI:
   - Go to the repository's [branches page](https://github.com/Canepro/portfolio_website-main/branches)
   - Click the trash icon next to each merged branch

## Old Branches Identified for Cleanup

Based on the analysis of merged PRs, the following branches can be safely deleted:

1. `copilot/review-most-recent-pr` - Merged, no longer needed
2. `docs/improve-documentation` - Documentation work completed
3. `feat/hero-modern-redesign` - Feature merged
4. `feature/add-project-markdowns-and-data` - Feature merged
5. `feature/enterprise-kubernetes-project` - Feature merged
6. `feature/modernize-portfolio-phase1` - Feature merged
7. `fix/code-quality-improvements-issue-53` - Fix merged
8. `fix/hero-tweak-layout` - Fix merged
9. `fix/standardize-component-names` - Fix merged
10. `fix/timeline-useEffect-cleanup` - Fix merged
11. `pr-27` - PR merged (dependency update)
12. `update/projects-meta` - Update merged

**Total:** 12 branches can be cleaned up

## Best Practices

### Creating New Branches

1. **Use descriptive names:**
   - ✅ `feature/add-contact-form`
   - ✅ `fix/navbar-mobile-layout`
   - ❌ `new-stuff`
   - ❌ `updates`

2. **Keep branches short-lived:**
   - Create branch
   - Make changes
   - Open PR
   - Merge and delete

3. **Delete after merging:**
   - The workflow handles this automatically
   - If manual deletion is needed, do it immediately after merge

### Working with Branches

```bash
# Create a new feature branch
git checkout -b feature/my-new-feature

# Push to remote
git push -u origin feature/my-new-feature

# After PR is merged, the branch is automatically deleted
# Update your local repository
git fetch --prune
git branch -d feature/my-new-feature
```

### Cleaning Up Local Branches

Remove local references to deleted remote branches:

```bash
# Fetch and prune deleted branches
git fetch --prune

# List merged branches
git branch --merged main

# Delete local merged branches (except main)
git branch --merged main | grep -v "main" | xargs git branch -d
```

## Troubleshooting

### Branch Not Auto-Deleted

If a branch wasn't automatically deleted after PR merge:

1. Check if it's a protected branch (main, staging)
2. Manually delete it using GitHub UI or CLI
3. Check the Actions tab for workflow errors

### Need to Restore a Deleted Branch

If you accidentally delete a branch:

1. Find the commit SHA from the PR or branch history
2. Recreate the branch:
   ```bash
   git checkout -b branch-name <commit-sha>
   git push origin branch-name
   ```

## Statistics

- **Total branches (before cleanup):** 15
- **Protected branches:** 2 (main, staging)
- **Current working branch:** 1 (copilot/remove-unneeded-branches)
- **Old branches to clean up:** 12
- **Target after cleanup:** 3 branches (main, staging, and current work)

## Maintenance Schedule

- **Immediate:** Delete the 12 identified old branches
- **Ongoing:** Automated cleanup via GitHub Actions
- **Monthly:** Review branch list for any missed cleanups
- **Quarterly:** Review and update branch management strategy

## References

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git Branch Management Best Practices](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)
