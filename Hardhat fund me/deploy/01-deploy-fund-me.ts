import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { network } from "hardhat";
import { developmentChains, newtworkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId || 11155111;

  // const ethUsdPriceFeedAddress = newtworkConfig[chainId]["ethUsdPriceFeed"];
  let ethUsdPriceFeedAddress;
  if(developmentChains.includes(network.name)){
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  }else{
    ethUsdPriceFeedAddress = newtworkConfig[chainId]["ethUsdPriceFeed"];
  }

  log("Deploying FundMe contract...");
  const args = [ethUsdPriceFeedAddress];
  const fundeMe = await deploy("FundMe", {
    from: deployer,
    args,
    log: true,
    // waitConfirmations: network.config.blockConfirmations || 1,
  });

  if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
    await verify(fundeMe.address, args);
  }

};

module.exports = func;
module.exports.tags = ["all", "fundme"];