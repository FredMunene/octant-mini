# Octant Mini — Sepolia Deployment Log

| Component | Address | Notes |
|-----------|---------|-------|
| Mock Asset (if used) | `0x42B031295A44Ca499bB118dfFA7E2f29AFE0C88F` | Deployed via script (18 decimals, 1M mint to admin) |
| FundingRouter | `0xFE7726C0915B14B2584A2407cF3d34496a0d223B` | |
| OctantMiniVault | `0xEd74acc3a88c06E1f7b18f8800898d37bf1B217f` | Funding router wired during deploy |
| AaveYieldDonatingStrategy | `0xF5DB0574FFa04f79BCbdE87d318B1cC1310acbE9` | Approved for Aave Pool `0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951` |

## Program Allocations

| Program | Recipient | BPS | Metadata | Active |
|---------|-----------|-----|----------|--------|
| `_Program 0_` | `_TBD_` | `_TBD_` | `_TBD_` | `_TBD_` |

> After running `forge script ... --broadcast` on Sepolia, capture the emitted console logs and update the table above.
