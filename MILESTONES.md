# Milestones

## Milestone 1 — Repo & Docs Scaffolding
- [x] Initialize repo structure (`/src`, `/script`, `/test`, `/docs`, `/frontend`).
- [x] Add base docs: `README.md`, `PRD.md`, `ADR.md`, `RUNBOOK.md`, `THREAT_model.md`.
- [x] Configure tooling: Foundry (or Hardhat), linting, formatting.

## Milestone 2 — Core Contracts Scaffolding
- [ ] Create `OctantMiniVault.sol` skeleton (ERC-4626, ownable/access control).
- [ ] Create `FundingRouter.sol` skeleton.
- [ ] Create `AaveYieldDonatingStrategy.sol` skeleton.
- [ ] Define interfaces for Aave v3 Pool & aTokens.

## Milestone 3 — OctantMiniVault Implementation
- [ ] Implement ERC-4626 logic (deposit, withdraw, totalAssets, convert).
- [ ] Add `setStrategy`, `setFundingRouter` with access control.
- [ ] Implement `report(profit, loss)` hook for yield-donating behavior.
- [ ] Emit clear events (e.g. `YieldDonated`, `LossReported`, config changes).

## Milestone 4 — AaveYieldDonatingStrategy Implementation
- [ ] Wire constructor with `asset`, `aToken`, `pool`, `vault`.
- [ ] Implement `deployFunds(uint256)` → `pool.supply(...)`.
- [ ] Implement `freeFunds(uint256)` → `pool.withdraw(...)`.
- [ ] Track principal vs current balance.
- [ ] Implement `harvestAndReport()` → compute `profit/loss`, call `vault.report(...)`.
- [ ] Add optional `emergencyWithdraw()`.

## Milestone 5 — FundingRouter Implementation
- [ ] Define Program struct (recipient, bps, metadataURI).
- [ ] Implement `addProgram`, `updateProgram`, `setAllocations`.
- [ ] Implement `route()` to split current balance by basis points.
- [ ] Emit `FundsRouted` and config change events.
- [ ] Enforce access control for admin-only functions.

## Milestone 6 — Testing & Simulation
- [ ] Unit tests: vault (deposits, withdrawals, access control).
- [ ] Unit tests: strategy (deploy, free, harvest, report).
- [ ] Unit tests: router (allocations, routing math).
- [ ] Integration test: deposit → deployFunds → harvestAndReport → route().
- [ ] (Optional) Fuzz tests for allocation sums & profit/loss edges.

## Milestone 7 — Frontend MVP
- [ ] Connect wallet (Wagmi).
- [ ] Show vault stats (TVL, your shares, donated yield).
- [ ] Deposit / withdraw UI.
- [ ] Allocation sliders for admin (call `setAllocations`).
- [ ] Button to trigger `route()` (admin/keeper).
- [ ] Impact dashboard: programs + amounts funded.

## Milestone 8 — Deployment & Scripts
- [ ] Add Foundry/Hardhat scripts to deploy MockUSDC, Router, Vault, Strategy.
- [ ] Add environment configuration for Sepolia/Base Sepolia.
- [ ] Document deployment flow in `DEPLOYMENT.md`.
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
