const networkConfig = {
    11155111: {
        name: "sepolia",
        subscriptionId: "11392",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
        enteranceFee: "10000000000000000",
        callbackGasLimit: "500000",
        interval: "30"
    }
} 

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains
}