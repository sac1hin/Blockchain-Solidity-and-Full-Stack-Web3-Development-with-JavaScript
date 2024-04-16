//TRANSACTIONS - VALUE TRANSFER

// Nonce: TX count forthe account
// Gas price: per unit of gas (in wei)
// Gas limit: maximum gas that this transition can use  // 21000
// To: address that the TX is sand to
// Value: Amount of wei to send
// Data: what to send to the address
// V, R, S: Component of TX signature

// TODO

// get funds from users
// Withdraw funds
// Set a minimun funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


contract FundMe {
    uint256 public minimumUsd = 50 * 1e18;

    function fund() public payable {
        // want to be able to set a minimun fund amount
        // 1. How do we send ETH to this contract?
        require(getConversionRate(msg.value) >= minimumUsd, "Didn't send enough!");

        // what is reverting?
        // undo any action before, and send remaining gas back
    }

    function getPrice() public view returns (uint256) {
        // ABI
        // Address
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        // uint80 roundID,
        // uint startedAt,
        // uint timeStamp,
        // uint80 answeredInRound
        (,int256 answer,,,) = priceFeed.latestRoundData();

        return uint256(answer * 1e10);
    }

    function getConversionRate(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUSd = (ethPrice * ethAmount) / 1e18;
        return  ethAmountInUSd;
    }

    // function withdraw(){};
}


