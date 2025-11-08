# Octant Mini

Octant Mini is an ERC-4626-based donating vault that pipes Aave v3 yield to public goods through an on-chain FundingRouter. This repository contains the contracts, docs, and future frontend that make the system reproducible for hackathons or lean treasuries.

## Project Layout

```
├── docs/                 # Product, architecture, runbook, and threat model refs
├── frontend/             # React/Wagmi dashboard + demo flows
├── smart_contracts/      # Entire Foundry project (contracts + tooling)
│   ├── src/              # Solidity sources (vault, strategy, router)
│   ├── script/           # Foundry broadcast/config scripts
│   ├── scripts/          # Bash helpers (run-full-flow, etc.)
│   ├── test/             # Forge unit + integration suites
│   ├── lib/              # External solidity deps installed via forge
│   ├── broadcast/, cache/, out/
│   └── foundry.toml, remappings.txt
├── MILESTONES.md         # High-level milestone tracker
└── debug.md              # Running log of issues, fixes, and learnings
```

## Tooling

| Concern | Tooling |
|---------|---------|
| Smart contracts | [Foundry](https://book.getfoundry.sh/) w/ `forge fmt` |
| Solidity linting | [`solhint`](https://protofire.github.io/solhint/) |
| Markdown/TS formatting | [`prettier`](https://prettier.io/) |
| Package manager | `npm` ≥ 10 |

## Getting Started

1. Install Rust + Foundry: `curl -L https://foundry.paradigm.xyz | bash` then `foundryup`.
2. Install JS tooling dependencies:
   ```bash
   npm install
   ```
4. Pull Solidity dependencies (run inside the Foundry workspace):
   ```bash
   cd smart_contracts
   forge install
   ```
5. Run formatters / linters to verify the toolchain:
   ```bash
   npm run lint:sol
   npm run lint:prettier
   forge fmt --check --root smart_contracts
   ```

## Developer Workflow

- Track high-level progress in `MILESTONES.md` and check boxes as milestones close.
- Log every notable failure, mitigation, or refactor in `debug.md` using the prescribed template.
- Keep commits small and intentional (e.g., `feat: add ERC4626 vault skeleton`, `docs: summarize threat model assumptions`).
- Reference upstream standards whenever you rely on them (ERC-4626, Aave v3, Octant v2 docs).

## Frontend Dashboard

The milestone 7 landing page lives under `frontend/` and is built with React + Vite.

```bash
cd frontend
npm install        # first run only
npm run dev        # starts Vite at http://localhost:5173
npm run build      # optional: production bundle
```

Copy `.env.example` to `.env` and fill in RPC + contract addresses before running the dev server. The dashboard now includes wallet connection, live vault stats, deposit/withdraw flows, allocation sliders, and router controls wired to the Sepolia contracts.

## Documentation Index

- Product direction → `docs/PRD.md`
- Architecture decisions → `docs/ADR.md`
- Operations & runbooks → `docs/RUNBOOK.md`
- Threat modeling → `docs/THREAT_model.md`
- Deployment steps → `docs/DEPLOYMENT.md`
- Daily status / scratchpad → `docs/track.md`

## Next Steps

1. Complete Milestone 1 by adding the remaining scaffolding (`smart_contracts/src`, Foundry config).
2. Flesh out Milestone 2 contract skeletons and wire Forge tests under `smart_contracts/test`.
3. Stub the frontend MVP flows for deposits, routing, and reporting.

Everything else in this repo (tests, deployment scripts, and dashboards) should build on this deterministic foundation.
