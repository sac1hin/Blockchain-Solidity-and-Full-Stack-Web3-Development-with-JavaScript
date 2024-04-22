// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConvertor{
    function getPrice(AggregatorV3Interface _priceFeed) internal view returns (uint256) {
        (,int256 amount,,,) = _priceFeed.latestRoundData();
        return uint256(amount / 1 * 1e10); 
    }

    function getConvertedPrice(uint256 _ethAmount,AggregatorV3Interface priceFeed) internal view returns (uint256){
        uint256 feedPrice = getPrice(priceFeed);
        uint256 ethAmountInUSd = (_ethAmount * feedPrice) / 1e18;
        return ethAmountInUSd;
    }
}