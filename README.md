# Octant Mini

Octant Mini is an ERC-4626-based donating vault that pipes Aave v3 yield to public goods through an on-chain FundingRouter. This repository contains the contracts, docs, and future frontend that make the system reproducible for hackathons or lean treasuries.

## Project Layout

```
├── docs/             # Product, architecture, runbook, and threat model refs
├── src/              # Solidity sources (vault, strategy, router)
├── script/           # Foundry scripts (deploy, config, tasks)
├── test/             # Forge unit + integration suites
├── frontend/         # React/Wagmi dashboard (to be implemented)
├── lib/              # External solidity deps installed via forge
├── MILESTONES.md     # High-level milestone tracker
└── debug.md          # Running log of issues, fixes, and learnings
```

## Tooling

| Concern | Tooling |
|---------|---------|
| Smart contracts | [Foundry](https://book.getfoundry.sh/) w/ `forge fmt` |
| Solidity linting | [`solhint`](https://protofire.github.io/solhint/) |
| Markdown/TS formatting | [`prettier`](https://prettier.io/) |
| Package manager | `pnpm` ≥ 9 (falls back to npm if needed) |

## Getting Started

1. Install Rust + Foundry: `curl -L https://foundry.paradigm.xyz | bash` then `foundryup`.
2. Install pnpm: `npm install -g pnpm` (or use npm/yarn with equivalent scripts).
3. Install JS tooling dependencies:
   ```bash
   pnpm install
   ```
4. Pull Solidity dependencies as they are added:
   ```bash
   forge install
   ```
5. Run formatters / linters to verify the toolchain:
   ```bash
   pnpm lint:sol
   pnpm lint:prettier
   forge fmt --check
   ```

## Developer Workflow

- Track high-level progress in `MILESTONES.md` and check boxes as milestones close.
- Log every notable failure, mitigation, or refactor in `debug.md` using the prescribed template.
- Keep commits small and intentional (e.g., `feat: add ERC4626 vault skeleton`, `docs: summarize threat model assumptions`).
- Reference upstream standards whenever you rely on them (ERC-4626, Aave v3, Octant v2 docs).

## Documentation Index

- Product direction → `docs/PRD.md`
- Architecture decisions → `docs/ADR.md`
- Operations & runbooks → `docs/RUNBOOK.md`
- Threat modeling → `docs/THREAT_model.md`
- Deployment steps → `docs/DEPLOYMENT.md`
- Daily status / scratchpad → `docs/track.md`

## Next Steps

1. Complete Milestone 1 by adding the remaining scaffolding (vault/strategy/router contracts).
2. Flesh out Milestone 2 contract skeletons and wire Foundry tests.
3. Stub the frontend MVP flows for deposits, routing, and reporting.

Everything else in this repo (tests, deployment scripts, and dashboards) should build on this deterministic foundation.
