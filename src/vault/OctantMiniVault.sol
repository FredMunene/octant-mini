// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title OctantMiniVault
/// @notice ERC-4626 vault that coordinates with a donating strategy and funding router.
contract OctantMiniVault is ERC4626, AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant STRATEGIST_ROLE = keccak256("STRATEGIST_ROLE");
    bytes32 public constant ROUTER_ROLE = keccak256("ROUTER_ROLE");

    address public strategy;
    address public fundingRouter;

    event StrategyUpdated(address indexed caller, address indexed newStrategy);
    event FundingRouterUpdated(address indexed caller, address indexed newRouter);
    event YieldDonated(uint256 indexed profit, address indexed router);
    event LossReported(uint256 indexed loss, address indexed reporter);

    error InvalidAddress();
    error UnauthorizedStrategy();
    error NotImplemented();

    constructor(
        IERC20 asset_,
        string memory name_,
        string memory symbol_,
        address admin
    )
        ERC20(name_, symbol_)
        ERC4626(asset_)
    {
        if (admin == address(0)) revert InvalidAddress();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    modifier onlyStrategy() {
        if (msg.sender != strategy) revert UnauthorizedStrategy();
        _;
    }

    /// @notice Returns total managed assets (vault + strategy). Placeholder until strategy wiring lands.
    function totalAssets() public view virtual override returns (uint256) {
        // TODO: include strategy-held funds during Milestone 3 implementation.
        return IERC20(asset()).balanceOf(address(this));
    }

    /// @notice Assigns the active strategy that can call report().
    function setStrategy(address newStrategy) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newStrategy == address(0)) revert InvalidAddress();
        strategy = newStrategy;
        emit StrategyUpdated(msg.sender, newStrategy);
    }

    /// @notice Assigns the funding router that will receive donated yield.
    function setFundingRouter(address newRouter) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newRouter == address(0)) revert InvalidAddress();
        fundingRouter = newRouter;
        emit FundingRouterUpdated(msg.sender, newRouter);
    }

    /// @notice Strategy hook to report profit/loss. Implementation deferred to Milestone 3.
    function report(uint256 profit, uint256 loss) external virtual onlyStrategy {
        profit;
        loss;
        revert NotImplemented();
    }
}
