const { ethers, network } = require("hardhat")
const fs = require("fs");
require("dotenv").config()

const FRONT_END_ADDRESSES_FILE = "../raffle/src/constants/contractAddress.json"
const FRONT_END_ABI_FILE = "../raffle/src/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        await updateContractAddresses()
        // await updateAbi()
        console.log("Front end updated!")
    }
}

async function updateAbi(){
    const raffle = await ethers.getContractAt("Raffle");
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const raffle = await ethers.getContractAt("Raffle");
    const chainId = network.config.chainId.toString()
    const contractAddress = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if(chainId in contractAddress){
        if(!contractAddress[chainId].includes(raffle.address)){
            contractAddress[chainId].push(raffle.address);
        }
    }{
        contractAddress[chainId] = [raffle.address]
    }

    fs.writeFileSync(FRONT_END_ADDRESSES_FILE,JSON.stringify(contractAddress));
}

module.exports.tags = ["all", "frontend"]