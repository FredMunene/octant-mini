#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/run-full-flow.sh \
#       --vault 0xEd74acc3a88c06E1f7b18f8800898d37bf1B217f \
#       --router 0xFE7726C0915B14B2584A2407cF3d34496a0d223B \
#       --strategy 0xF5DB0574FFa04f79BCbdE87d318B1cC1310acbE9 \
#       --asset 0x42B031295A44Ca499bB118dfFA7E2f29AFE0C88F \
#       --rpc https://sepolia.infura.io/v3/<key> \
#       --pk 0xabc123...
#
# This script mints test tokens (if using the mock asset), deposits into the vault,
# forwards funds to the strategy, deploys them to Aave, harvests profit, and routes it.

while [[ $# -gt 0 ]]; do
    case $1 in
        --vault) VAULT="$2"; shift 2 ;;
        --router) ROUTER="$2"; shift 2 ;;
        --strategy) STRATEGY="$2"; shift 2 ;;
        --asset) ASSET="$2"; shift 2 ;;
        --rpc) RPC="$2"; shift 2 ;;
        --pk) PK="$2"; shift 2 ;;
        --holder) HOLDER="$2"; shift 2 ;;
        *) echo "Unknown arg: $1" >&2; exit 1 ;;
    esac
done

: "${VAULT:?missing --vault}"
: "${ROUTER:?missing --router}"
: "${STRATEGY:?missing --strategy}"
: "${ASSET:?missing --asset}"
: "${RPC:?missing --rpc}"
: "${PK:?missing --pk}"

HOLDER="${HOLDER:-$(cast wallet address --private-key "$PK")}"

echo "Using holder $HOLDER"

# Mint mock tokens if asset is the locally deployed mock
cast send "$ASSET" "mint(address,uint256)" "$HOLDER" 10000000000000000000 \
    --private-key "$PK" --rpc-url "$RPC" || true

# Approve & deposit 5 tokens
cast send "$ASSET" "approve(address,uint256)" "$VAULT" 5000000000000000000 \
    --private-key "$PK" --rpc-url "$RPC"

cast send "$VAULT" "deposit(uint256,address)" 5000000000000000000 "$HOLDER" \
    --private-key "$PK" --rpc-url "$RPC"

# Forward funds to strategy & deploy to Aave
cast send "$VAULT" "forwardToStrategy(uint256)" 5000000000000000000 \
    --private-key "$PK" --rpc-url "$RPC"

cast send "$STRATEGY" "deployFunds(uint256)" 5000000000000000000 \
    --private-key "$PK" --rpc-url "$RPC"

# Trigger harvest (profit/loss calculation) and routing
cast send "$STRATEGY" "harvestAndReport()" \
    --private-key "$PK" --rpc-url "$RPC"

cast send "$ROUTER" "route()" \
    --private-key "$PK" --rpc-url "$RPC"

echo "End-to-end flow executed."
