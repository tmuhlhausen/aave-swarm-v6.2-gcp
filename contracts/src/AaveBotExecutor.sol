// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract AaveBotExecutor is FlashLoanSimpleReceiverBase, ReentrancyGuard, Ownable {
    
    constructor() 
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb))
        Ownable(msg.sender)
    {}

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override nonReentrant returns (bool) {
        require(msg.sender == address(POOL), "Not Aave Pool");
        require(initiator == address(this), "Initiator mismatch");

        // Decode parameters from the bot (target DEX, swap calldata, minimum output)
        (address dex, bytes memory swapData, uint256 minOut) = abi.decode(params, (address, bytes, uint256));

        // Execute the swap
        (bool success,) = dex.call(swapData);
        require(success, "Swap failed");

        // Safety check: ensure we received at least minOut after the swap
        uint256 balanceAfter = IERC20(asset).balanceOf(address(this));
        uint256 totalDebt = amount + premium;
        require(balanceAfter >= totalDebt + minOut, "Insufficient output (below minOut)");

        // Repay Aave + 0.25% safety buffer
        require(balanceAfter >= totalDebt * 1025 / 10000, "Safety buffer fail");

        IERC20(asset).approve(address(POOL), totalDebt);
        return true;
    }

    function requestFlashLoan(address asset, uint256 amount, bytes calldata params) external onlyOwner {
        POOL.flashLoanSimple(address(this), asset, amount, params, 0);
    }
}
