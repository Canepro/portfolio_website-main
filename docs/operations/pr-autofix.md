# Portfolio PR auto-fix

## Trigger and execution

The fallback owner is the initiating T3 thread on `canepro-mac`. The intended future owner is a dedicated T3 thread on `mira-oci-worker`. Use T3's native `watch_pull_request` for each eligible open PR. It reads checks every two minutes and wakes the agent for failures and other meaningful PR events. Idle monitoring does not need repeated model turns. An hourly T3 scheduled task registers newly opened PRs and reconciles current failures; a new PR can wait up to an hour for registration. Once registered, native watching provides the short failure-detection interval.

This choice avoids webhook secrets, GitHub webhook settings and a new GitHub Actions workflow. No price reduction is claimed or measured. The hourly discovery turn still consumes model usage. A watcher alone covers only registered PRs, so discovery is part of the wiring.

The repair contract is [pr-autofix-agent.md](pr-autofix-agent.md). The scheduled discovery prompt embeds the contract as literal text, with its SHA-256 fingerprint. It stays bound to the owning thread; PR branches cannot supply replacement authority. The worker uses its existing GitHub and model access. No new credentials are part of this setup.

## Current activation state

The OCI service and existing GitHub reader respond, but this thread cannot create an OCI automation thread. The initiating thread is hosted on `canepro-mac`; its MCP tools cannot target another environment. Native desktop control timed out twice. OCI thread creation, its native watchers and its hourly schedule are not activated or proved. The owner explicitly authorized a Mac-hosted fallback. Mac watchers and the discovery schedule are recorded below when activated; they need the Mac awake and its T3 server running. The OCI brief in the PR body is ready for a future existing-access handoff.

Test PR: https://github.com/Canepro/portfolio_website-main/pull/102

The test introduces a deliberate TypeScript error in `src/lib/autofix-proof.ts`. Proof must retain the failed GitHub job, native trigger receipt, fix commit on that feature branch, and passing jobs at the fix SHA. Close the PR without merging after proof.

Opening PRs causes this repository's existing Netlify integration to run Deploy Previews automatically. The agent does not invoke deployment commands or change that integration. Production remains tied to main.

## Turn it off

In the owning thread, call `update_scheduled_task` with the recorded `scheduledTaskId` and `enabled: false`. Then list that thread's PRs and call `unwatch_pull_request` on each watched PR. Leave the thread unarchived if retaining its receipts is useful. Native watching also stops if the owning thread is stopped, archived or settled, or the PR closes. Pausing discovery alone does not stop existing watchers. No repo setting needs changing.

## Evidence still required

Record the OCI environment ID, dedicated thread ID, scheduledTaskId, nextRunAt and enabled state after activation. Verify the resulting native watchers on that server. The Mac test failure-to-green sequence is complete and retained in the proof receipt. OCI needs its own test. Run an additional receipt/readback while the Mac is disconnected before claiming independence from the Mac. The worker service being up alone does not prove scheduler execution or agent repair.

## Activation receipt

- Host: canepro-mac, environment `6f178105-ef05-4971-9db3-399ba7b9fd7f`.
- Owning thread: `82bcc845-a97b-47a6-9c4e-58011ed2ec53`.
- Native test watch: PR #102, registered and delivered failed-check wake at head `b747be5f59b6d3776779142fabc9eb3539043e18`.
- Discovery scheduledTaskId: `scheduled-task:command:mcp:1a661f56-3d3a-4454-9df4-4d1768f68a04:schedule-task:portfolio-autofix-mac-discovery-20261008`.
- Enabled: true. Interval: hourly. Next run at activation: `2026-10-08T11:35:29.284Z`.
- Contract SHA-256: `91b70934f3940da51e3c3fad91d8d5df34e6ba8f6b0814474cabb155f8509dbc` (exact `pr-autofix-agent.md` bytes).
- Hosted proof: [failure-to-green receipt](pr-autofix-proof.md); test #102 closed without merging.
- No OCI runtime or Mac-asleep execution proof.

Automatic writes cover source defects on eligible human-owned feature branches. Bot-managed branches and protected/configuration/authority paths are diagnosed and reported, so some failures need the owner. Receipts in the gitignored `.codex/portfolio-autofix-state` directory of the owning workspace preserve retry counts across compaction and normal reboots. They are operational state, not Codex memory. Missing or corrupt receipts stop writes; macOS temporary directories are not their owner. The agent contract is a procedural limit on existing access; it does not narrow the permissions of the already-authenticated GitHub account.

## Move to OCI later

Disable Mac discovery and unregister Mac watchers first. Transfer the pinned contract, its fingerprint and complete receipts through existing approved access. Create one dedicated OCI thread with the exact brief in this PR description, verify its state paths and existing identity, then enable its discovery and native watches. Never enable both owners together. OCI activation and a Mac-disconnected run require fresh proof.

The current T3 MCP catalog has no explicit unsettle tool. A scheduled message starts a normal thread turn; source inspection shows turns clear a settled override, but merge/settle recovery has not been exercised here. If registration reports that the thread is settled, report the stopped watch for owner recovery rather than touching the database.
