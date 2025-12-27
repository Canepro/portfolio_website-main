# Maintenance

This doc collects “repo maintenance” guidance that doesn’t need to live in the root directory.

## Branch management

### Branch naming

- `feature/*` new features
- `fix/*` bug fixes
- `docs/*` documentation changes
- `chore/*` maintenance

### Cleanup

After merging PRs:

```bash
git fetch --prune
git branch --merged main | grep -v "main" | xargs git branch -d
```

If you need to clean up older branches:

```bash
./scripts/cleanup-old-branches.sh
./scripts/delete-old-branches.sh
```

## Docs + assets hygiene

- Keep `README.md` as the entry point, and keep docs in `docs/`.
- Avoid duplicate docs for the same topic.
- Keep project images referenced in `src/constants/constants.ts` and `src/constants/projectDetails.ts`.
