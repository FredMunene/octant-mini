# Milestones

## Milestone 1 — Repo & Docs Scaffolding
- [x] Initialize repo structure (`/src`, `/script`, `/test`, `/docs`, `/frontend`).
- [x] Add base docs: `README.md`, `PRD.md`, `ADR.md`, `RUNBOOK.md`, `THREAT_model.md`.
- [x] Configure tooling: Foundry (or Hardhat), linting, formatting.

## Milestone 2 — Core Contracts Scaffolding
- [x] Create `OctantMiniVault.sol` skeleton (ERC-4626, ownable/access control).
- [x] Create `FundingRouter.sol` skeleton.
- [x] Create `AaveYieldDonatingStrategy.sol` skeleton.
- [x] Define interfaces for Aave v3 Pool & aTokens.

## Milestone 3 — OctantMiniVault Implementation
- [x] Implement ERC-4626 logic (deposit, withdraw, totalAssets, convert).
- [x] Add `setStrategy`, `setFundingRouter` with access control.
- [x] Implement `report(profit, loss)` hook for yield-donating behavior.
- [x] Emit clear events (e.g. `YieldDonated`, `LossReported`, config changes).

## Milestone 4 — AaveYieldDonatingStrategy Implementation
- [x] Wire constructor with `asset`, `aToken`, `pool`, `vault`.
- [x] Implement `deployFunds(uint256)` → `pool.supply(...)`.
- [x] Implement `freeFunds(uint256)` → `pool.withdraw(...)`.
- [x] Track principal vs current balance.
- [x] Implement `harvestAndReport()` → compute `profit/loss`, call `vault.report(...)`.
- [x] Add optional `emergencyWithdraw()`.

## Milestone 5 — FundingRouter Implementation
- [x] Define Program struct (recipient, bps, metadataURI).
- [x] Implement `addProgram`, `updateProgram`, `setAllocations`.
- [x] Implement `route()` to split current balance by basis points.
- [x] Emit `FundsRouted` and config change events.
- [x] Enforce access control for admin-only functions.

## Milestone 6 — Testing & Simulation
- [x] Unit tests: vault (deposits, withdrawals, access control).
- [x] Unit tests: strategy (deploy, free, harvest, report).
- [x] Unit tests: router (allocations, routing math).
- [x] Integration test: deposit → deployFunds → harvestAndReport → route().
- [x] (Optional) Fuzz tests for allocation sums & profit/loss edges.

## Milestone 7 — Frontend MVP
- [ ] Connect wallet (Wagmi).
- [ ] Show vault stats (TVL, your shares, donated yield).
- [ ] Deposit / withdraw UI.
- [ ] Allocation sliders for admin (call `setAllocations`).
- [ ] Button to trigger `route()` (admin/keeper).
- [ ] Impact dashboard: programs + amounts funded.

## Milestone 8 — Deployment & Scripts
- [x] Add Foundry/Hardhat scripts to deploy MockUSDC, Router, Vault, Strategy.
- [x] Add environment configuration for Sepolia/Base Sepolia.
- [x] Document deployment flow in `DEPLOYMENT.md`.
- [ ] Record deployed addresses in `docs/deployments/<network>.md`.

## Milestone 9 — Security & Hardening
- [ ] Integrate OpenZeppelin `ReentrancyGuard`, `Ownable`/`AccessControl`.
- [ ] Validate external calls (Aave Pool).
- [ ] Sanity checks for allocation sums and zero-addresses.
- [ ] Document residual risks in `THREAT_model.md`.

## Milestone 10 — Final Polish for Hackathon
- [ ] Ensure all tests pass.
- [ ] Ensure docs are coherent and consistent.
- [ ] Prepare demo script & walkthrough.
- [ ] Tag release for submission.
