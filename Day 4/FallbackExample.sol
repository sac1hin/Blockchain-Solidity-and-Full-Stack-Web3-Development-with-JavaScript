// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract FallbackExample {
    uint256 public results;

    // uint256 public constant MINI_USD = 10 * 1e18;
    // address public immutable i_owner;

    receive() external payable {
        results = 1;
    }

    fallback() external payable {
        results = 2;
    }
}
