// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./AaveBotExecutor.sol";

contract AaveBotFactory {
    event BotCreated(address indexed botAddress);

    function createBot() external returns (address) {
        AaveBotExecutor bot = new AaveBotExecutor();
        bot.transferOwnership(msg.sender);
        emit BotCreated(address(bot));
        return address(bot);
    }
}
