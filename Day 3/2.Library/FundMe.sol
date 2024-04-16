// get funds from users
// Withdraw funds
// Set a minimun funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 50 * 1e18;
    
    address[] public fundres;
    mapping (address => uint256) public adressToAmountFunded;

    address public  owner;

    constructor(){
        owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enough!");
        fundres.push(msg.sender);
        adressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner{
        for (uint256 funderIndex = 0; funderIndex < fundres.length; funderIndex++) {
            address funderAddres = fundres[funderIndex];
            adressToAmountFunded[funderAddres] = 0;
            // uint256 amount = adressToAmountFunded[funderAddres];
        }

        // reset the arrat
        fundres = new address[](0);
        
        //transfer
        // payable(msg.sender).transfer(address(this).balance);

        // //send
        // bool sendSucess = payable(msg.sender).send(address(this).balance);
        // require(sendSucess,"send failed");

        //call
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess,"Call failed");
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Sender is not owner");
        _;
    }

}
