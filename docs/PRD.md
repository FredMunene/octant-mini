# Product Requirements Document (PRD)

## 🧩 Product Name
**Octant Mini**

---

## 💡 Summary
Octant Mini is a lightweight, plug-and-play funding engine that enables smaller DAOs, communities, and early-stage protocols to convert idle stablecoin capital into sustainable ecosystem funding — automatically and transparently.  

It compresses the core mechanisms of **Octant v2** — yield generation, routing, and transparency — into a mini, easy-to-deploy framework powered by **Aave v3** yield and on-chain routing logic.

---

## 🎯 Problem Statement
Most small ecosystems and DAOs:
- Have idle treasury funds but lack expertise or infrastructure to earn yield safely.  
- Want to fund public goods and contributors sustainably, without custom contracts.  
- Struggle with transparency and yield visibility.

**Gap:** There is no simple, pre-packaged vault + router system to turn **capital → yield → funding** seamlessly.

---

## 🧠 Vision
Enable any ecosystem — regardless of size or resources — to automate yield-based public goods funding through transparent, composable on-chain primitives.

---

## 👥 Target Users

| User Type | Pain Point | Value Delivered |
|------------|-------------|-----------------|
| Small DAOs (50–500 members) | Idle capital, no DeFi infra | Deposit and auto-fund programs via yield |
| Ecosystem Grants Teams | Manual treasury ops | Automated yield routing with clear audit trail |
| Public Goods Collectives | No recurring income | Passive funding stream from yield |
| Hackathon / Builder Communities | Limited time + infra | 15-min deployable Octant-like engine |

---

## 🧱 Goals & Success Metrics

| Goal | Metric |
|------|---------|
| Validate Octant Mini concept | Working demo (deposit → yield → route) |
| Simplify integration | Setup under 15 minutes |
| Demonstrate real impact | Mock payout simulation |
| Transparency | On-chain dashboard shows flow in <10 s |
| Community traction | ≥10 test deployments post-hackathon |

---

## ✨ Key Features

1. **Vault Interface (ERC-4626)**
   - Accept stablecoin deposits (USDC/DAI).
   - Integrate or simulate Aave v3 yield.
   - Display APY, balances, accrued yield.

2. **Routing Panel (Allocation Dashboard)**
   - Slider-based allocation between funding programs.
   - Preview distribution before confirmation.
   - Confirm triggers `route()` transaction.

3. **Impact Dashboard (Transparency Layer)**
   - Visualize deposits, yield, and funded programs.
   - On-chain or simulated real-time feed.

4. **Plug-and-Play Deployment**
   - Single JSON config or UI wizard setup.
   - Works on EVM-compatible testnets (Base Sepolia, Optimism Goerli, etc.).

5. **Admin Panel**
   - Add/edit programs.
   - Configure vault parameters (APY source, frequency).

---

## 🚀 User Flow
1. Connect wallet (Metamask / WalletConnect).  
2. Deposit stablecoins into the vault.  
3. Yield accrues via Aave or mock simulation.  
4. Allocation sliders define yield distribution.  
5. Confirm routing — donations executed on-chain.  
6. Dashboard updates with funding impact summary.

---

## ⚡ MVP Scope

| Must-Have | Nice-to-Have |
|------------|--------------|
| ERC-4626 vault with deposit/withdraw | Real Aave v3 yield |
| Mock yield generator (simulated APY) | Subgraph analytics |
| Allocation slider & routing preview | Multi-vault support |
| Basic dashboard (React + Recharts) | Governance trigger (Snapshot) |
| Smart-contract tests | NFT receipts for donors |

---

## 🧩 Dependencies
- **Smart Contracts:** Solidity (`ERC-4626`, Aave Pool, Router)
- **Frontend:** React + Wagmi + Ethers.js + TailwindCSS
- **Backend (optional):** Node/Express for metadata
- **Storage:** IPFS / Filecoin for program data
- **Network:** Ethereum Sepolia / Base Sepolia
- **Data Viz:** Recharts / D3.js

---

## 🔄 Risks & Mitigations

| Risk | Mitigation |
|-------|-------------|
| Hackathon time constraint | Limit scope to mock yield + 2 screens |
| Contract complexity | Re-use OpenZeppelin ERC-4626 base |
| UI confusion | Single-page dashboard, clear flow |
| Gas/network issues | Deploy to testnets only |
| Missing data feed | Simulated APY fallback |

---

## 🗓 Timeline (Hackathon Plan)

| Phase | Deliverable | Duration |
|--------|--------------|----------|
| Ideation | Wireframes + PRD | Day 1-2 |
| Smart Contract Dev | Vault + Router contracts | Day 3-5 |
| Front-End Dev | Dashboard + Allocations UI | Day 4-6 |
| Integration & Testing | Mock yield + routing | Day 6-7 |
| Submission | Demo video + README | Day 8-9 |

---

## ⚙️ Technical Overview

**Layers:**
- **Smart Contracts:**  
  - `OctantMiniVault.sol` – ERC-4626 vault (deposit, withdraw, report).  
  - `AaveYieldDonatingStrategy.sol` – deploys funds to Aave, harvests yield, calls `vault.report(profit, loss)`.  
  - `FundingRouter.sol` – manages programs and yield routing.
- **Frontend:** React app for deposit, allocation, and dashboard.
- **Backend (optional):** REST endpoints for program metadata.

---

## 🧩 Deliverables
- ✅ Working on-chain demo (testnet)
- ✅ Public GitHub repo (contracts + frontend)
- ✅ README + docs (ADR, Runbook, Threat Model)
- ✅ 1-min demo video
- ✅ Short post or X thread explaining concept
