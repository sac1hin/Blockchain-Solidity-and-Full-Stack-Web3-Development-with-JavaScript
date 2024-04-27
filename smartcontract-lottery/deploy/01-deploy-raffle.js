const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId;

    let vrfCoordinatorV2 = networkConfig[chainId]["vrfCoordinatorV2"]
    let subscriptionId  = networkConfig[chainId]["subscriptionId"]

    const arguments = [
        vrfCoordinatorV2,
        subscriptionId,
        networkConfig[chainId]["gasLane"],
        networkConfig[chainId]["interval"],
        networkConfig[chainId]["enteranceFee"],
        networkConfig[chainId]["callbackGasLimit"],
    ]

    log("Deploying Raffle...")
    const raffle = await deploy("Raffle", {
        from: deployer,
        args:arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(raffle.address, arguments)
    }

    log("deployed!")
    log("-------------------------------")
}

module.exports.tags = ["all", "raffle"]
