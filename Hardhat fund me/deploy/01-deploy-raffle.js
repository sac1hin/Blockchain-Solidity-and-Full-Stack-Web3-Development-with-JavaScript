const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2
    let subscriptionId


    vrfCoordinatorV2 = networkConfig[chainId]["vrfCoordinatorV2"]
    subscriptionId = networkConfig[chainId]["subscriptionId"]

    const enteranceFee = networkConfig[chainId]["enteranceFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    const interval = networkConfig[chainId]["interval"]

    const args = [
        vrfCoordinatorV2,
        subscriptionId,
        enteranceFee,
        gasLane,
        callbackGasLimit,
        interval,
    ]

    log("Deploying Raffle...")
    const raffle = await deploy("Raffle", {
        from: deployer,
        args:args,
        log: true,
        // waitConfirmations: network.config.blockConfirmations || 1,
    })

    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(raffle.address, args)
    // }

    log("deployed!")
    log("-------------------------------")
}

module.exports.tags = ["all", "raffle"]
