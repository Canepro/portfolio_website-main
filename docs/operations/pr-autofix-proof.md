# Failed-check repair proof

- Test PR: https://github.com/Canepro/portfolio_website-main/pull/102
- Deliberate failure head: `b747be5f59b6d3776779142fabc9eb3539043e18`.
- Failed Node 20 job: https://github.com/Canepro/portfolio_website-main/actions/runs/37761162994/job/113257639733
- Failed Node 22 job: https://github.com/Canepro/portfolio_website-main/actions/runs/37761162994/job/113257640112
- Native T3 watcher delivered the failed-check wake to the owning Mac thread.
- Fix: `fbc1ccee96690f8029b58b5dc557a0bb8e0b2786`, normal push to `mira/portfolio-autofix-proof-20261008`.
- Local frozen install, lint, typecheck and build returned 0. The production loopback `verify:portfolio` check passed 116/116.
- Current GitHub readback at the fix SHA: Node 20/22, Azure Pipelines, CodeQL, Netlify preview and its header/redirect checks succeeded. Pages changed was neutral.

- [Build (Node 20)](https://github.com/Canepro/portfolio_website-main/actions/runs/37762369887/job/113261646660): SUCCESS
- [Build (Node 22)](https://github.com/Canepro/portfolio_website-main/actions/runs/37762369887/job/113261646238): SUCCESS

The test PR was closed without merging after proof; readback was `CLOSED`, `mergedAt: null`, same fix SHA. No deploy command was invoked. The existing Netlify integration created previews automatically.

Proof: direct native watcher wake, feature-branch repair and hosted checks demonstrated the failure-to-green path on canepro-mac. OCI execution, Mac-asleep operation, future defects, retry exhaustion and settled-thread recovery were not exercised.
