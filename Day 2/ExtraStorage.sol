// SPDX-License-Identifier: MIT

//inheritance
pragma solidity ^0.8.24;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage{
    // + 5 
    // override
    // virtual override

    function store(uint256 _favNumber) public override {
        favoriteNumber = 10 + _favNumber;
    }
}