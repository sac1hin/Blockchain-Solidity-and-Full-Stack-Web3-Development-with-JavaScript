import { run } from "hardhat";

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
    }
};

export default verify;
