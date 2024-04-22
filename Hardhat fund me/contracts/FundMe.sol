// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "./PriceConvertor.sol";

error FundMe_NotOwner();

/** @title A conytract for crowd funding
 *   @author SAc
 *   @notice demo sample funding contract
 *   @dev This implements price feeds as our library
 */

contract FundMe {
    // Type Declaration
    using PriceConvertor for uint256;

    //State declaration
    mapping(address => uint256) private adressToAmountFunded;
    uint256 public minimumUsd = 10 * 1e18;
    address[] private funders;
    address private immutable owner;
    AggregatorV3Interface public priceFeed;

    modifier onlyOwner() {
        // require(owner == msg.sender, "Sender is not owner");
        if (msg.sender != owner) revert FundMe_NotOwner();
        _;
    }

    // functions orders;
    // contructor
    // receive
    // fallback
    // external
    // public
    // internal
    // private
    // view / pure

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {}

    fallback() external payable {}

    /**
     *   @notice THis function funds this contract
     *   @dev This implements price feeds as our library
     */

    function fund() public payable {
        require(
            msg.value.getConvertedPrice(priceFeed) >= minimumUsd,
            "Required minimum 10Usd"
        );
        funders.push(msg.sender);
        adressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funderAddress = funders[funderIndex];
            adressToAmountFunded[funderAddress] = 0;
        }

        funders = new address[](0);

        // payable(msg.sender).transfer(address(this).balance);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Tx failed");
    }

    function cheaperWithdraw() public onlyOwner {
        address[] memory cfunders = funders;
        for (
            uint256 funderIndex = 0;
            funderIndex < cfunders.length;
            funderIndex++
        ) {
            address funder = cfunders[funderIndex];
            adressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Tx failed");
    }

    function getOwner() public view returns(address){
        return owner;
    }


    function getFunder(uint256 index) public view returns(address){
        return funders[index];
    }

    function getAddressToAmountFunded(address funder) public view returns(uint256){
        return adressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return priceFeed;
    }
}
