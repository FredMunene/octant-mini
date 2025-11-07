// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title FundingRouter
/// @notice Splits harvested yield across configured public goods programs.
contract FundingRouter is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint16 public constant BPS_DENOMINATOR = 10_000;

    bytes32 public constant CONFIG_ROLE = keccak256("CONFIG_ROLE");
    bytes32 public constant KEEPER_ROLE = keccak256("KEEPER_ROLE");

    IERC20 public immutable asset;

    struct Program {
        address recipient;
        uint16 bps;
        string metadataURI;
        bool active;
    }

    Program[] internal programs;

    event ProgramAdded(uint256 indexed programId, address indexed recipient, uint16 bps, string metadataURI);
    event ProgramUpdated(uint256 indexed programId, address indexed recipient, uint16 bps, string metadataURI, bool active);
    event AllocationsSet(uint256 indexed programId, uint16 bps);
    event FundsRouted(uint256 indexed amount, address indexed caller);

    error InvalidAddress();
    error InvalidBps();
    error NotImplemented();

    constructor(IERC20 asset_, address admin) {
        if (address(asset_) == address(0) || admin == address(0)) revert InvalidAddress();
        asset = asset_;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(CONFIG_ROLE, admin);
        _grantRole(KEEPER_ROLE, admin);
    }

    function getPrograms() external view returns (Program[] memory) {
        return programs;
    }

    function addProgram(Program calldata program) external onlyRole(CONFIG_ROLE) {
        program;
        revert NotImplemented();
    }

    function updateProgram(uint256 programId, Program calldata program) external onlyRole(CONFIG_ROLE) {
        programId;
        program;
        revert NotImplemented();
    }

    function setAllocations(uint16[] calldata bpsList) external onlyRole(CONFIG_ROLE) {
        bpsList;
        revert NotImplemented();
    }

    function route() external nonReentrant onlyRole(KEEPER_ROLE) {
        revert NotImplemented();
    }
}
