# Deployment Guide

## Prerequisites
- Node v18+, Foundry or Hardhat toolchain  
- Testnet RPC (Alchemy/Infura for Sepolia or Base Sepolia)  
- Private key with testnet ETH  
- Deployed mock or real USDC token  
- Verified Aave v3 Pool and aToken addresses for the same testnet  

## Deployment Order

### 1. Deploy MockUSDC (if required)
```bash
forge create src/mocks/MockUSDC.sol:MockUSDC --rpc-url $RPC_URL --private-key $PK
```

### 2. Deploy FundingRouter
```bash
forge create src/FundingRouter.sol:FundingRouter --rpc-url $RPC_URL --private-key $PK
```
Record the router address.

### 3. Deploy OctantMiniVault
```bash
forge create src/OctantMiniVault.sol:OctantMiniVault   --constructor-args <USDC_ADDRESS> <ROUTER_ADDRESS>   --rpc-url $RPC_URL --private-key $PK
```

### 4. Deploy AaveYieldDonatingStrategy
```bash
forge create src/AaveYieldDonatingStrategy.sol:AaveYieldDonatingStrategy   --constructor-args <USDC_ADDRESS> <aUSDC_ADDRESS> <AAVE_POOL> <VAULT_ADDRESS>   --rpc-url $RPC_URL --private-key $PK
```

### 5. Link Vault ↔ Strategy
```bash
cast send <VAULT_ADDRESS> "setStrategy(address)" <STRATEGY_ADDRESS> --rpc-url $RPC_URL --private-key $PK
```

### 6. Verify Contracts (optional)
```bash
forge verify-contract ...
```

### 7. Deploy Frontend
- `npm install && npm run build`
- Host via Vercel / Netlify / Static IPFS.

## Environment Variables (example)
```
NEXT_PUBLIC_VAULT_ADDRESS=0x...
NEXT_PUBLIC_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_USDC_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
```

## Post-Deployment Tests
1. Deposit USDC → shares minted.  
2. Trigger `harvestAndReport()` manually.  
3. Confirm router receives yield.  
4. Call `route()` → verify recipient balances.  
5. Validate events in Etherscan.
