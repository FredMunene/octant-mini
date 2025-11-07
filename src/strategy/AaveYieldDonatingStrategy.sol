// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {OctantMiniVault} from "../vault/OctantMiniVault.sol";
import {IAaveV3Pool} from "../interfaces/IAaveV3Pool.sol";
import {IAToken} from "../interfaces/IAToken.sol";

/// @title AaveYieldDonatingStrategy
/// @notice Deploys funds into Aave v3 and reports yield back to the Octant Mini vault.
contract AaveYieldDonatingStrategy is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant KEEPER_ROLE = keccak256("KEEPER_ROLE");

    OctantMiniVault public immutable vault;
    IERC20 public immutable asset;
    IAToken public immutable aToken;
    IAaveV3Pool public immutable pool;

    uint256 public principalBalance;

    event FundsDeployed(uint256 indexed amount);
    event FundsFreed(uint256 indexed amount);
    event Harvested(int256 indexed pnl);
    event EmergencyWithdrawn(uint256 indexed amount, address indexed recipient);

    error InvalidAddress();
    error NotImplemented();

    constructor(
        OctantMiniVault vault_,
        IERC20 asset_,
        IAToken aToken_,
        IAaveV3Pool pool_,
        address admin
    ) {
        if (
            address(vault_) == address(0) ||
            address(asset_) == address(0) ||
            address(aToken_) == address(0) ||
            address(pool_) == address(0) ||
            admin == address(0)
        ) revert InvalidAddress();

        vault = vault_;
        asset = asset_;
        aToken = aToken_;
        pool = pool_;

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(KEEPER_ROLE, admin);

        asset_.safeApprove(address(pool_), type(uint256).max);
    }

    function deployFunds(uint256 amount) external onlyRole(KEEPER_ROLE) nonReentrant {
        amount;
        revert NotImplemented();
    }

    function freeFunds(uint256 amount) external onlyRole(KEEPER_ROLE) nonReentrant {
        amount;
        revert NotImplemented();
    }

    function harvestAndReport() external onlyRole(KEEPER_ROLE) nonReentrant {
        revert NotImplemented();
    }

    function emergencyWithdraw(address recipient) external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
        recipient;
        revert NotImplemented();
    }
}
