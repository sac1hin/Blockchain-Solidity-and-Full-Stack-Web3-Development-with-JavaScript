import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import contractAbi from "../constants/abi.json";
import contractAddress from "../constants/contractAddress.json";
import { useEffect, useState } from "react";
import { useNotification } from "@web3uikit/core";

function LotteryComponent() {
  const notification = useNotification();
  const [ethEntryFee, setEthEntryFee] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [recentWinner, setRecentWinner] = useState("0x");
  const [raffleEntryPending, setRaffleEntryPending] = useState(false);

  const account = useAccount();
  const {
    data: enteranceFeeData,
    error: enteranceFeeError,
    isPending: enteranceFeeIsPending,
  } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress["11155111"][0],
    functionName: "getEnteranceFee",
  });

  const {
    data: noOfPlayersData,
    error: noOfPlayersError,
    isPending: noOfPlayersPending,
  } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress["11155111"][0],
    functionName: "getNumberOfPlayers",
  });

  const {
    data: recentWinnerData,
    error: recentWinnerError,
    isPending: recentWinnerPending,
  } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress["11155111"][0],
    functionName: "getRecentWinner",
  });

  const {
    data: raffleEntryData,
    error: raffleEntryError,
    isPending: raffleEntryIsPending,
    isSuccess: raffleEntrySuccess,
    writeContract,
  } = useWriteContract();

  useEffect(() => {
    updateUi();
  }, [raffleEntryData]);

  useEffect(() => {
    updateUi();
  }, [raffleEntryData, noOfPlayersData, recentWinnerData, enteranceFeeData]);

  const updateUi = async () => {
    setNumberOfPlayers(Number(noOfPlayersData));
    setRecentWinner(recentWinnerData);
    setEthEntryFee(Number(enteranceFeeData) / 10 ** 18);
  };

  useEffect(() => {
    updateUi();
  }, []);

  if(raffleEntryError){
    notification({
      position: "topR",
      title: "Error",
      message: "Tx Rejected",
    });
  }

  if(raffleEntryData){
    notification({
      position: "topR",
      title: "Success",
      message: "Tx Transaction",
    });
  }

  if (raffleEntryPending) return <div>Transaction Pending...</div>;

  if (enteranceFeeIsPending) return <div>Loading...</div>;

  if (enteranceFeeError) return <div>Error: {enteranceFeeError.message}</div>;

  return (
    <div>
      <div className="mb-4 text-3xl font-bold">
        Decentralized Lottery
      </div>
      <div className="mb-4 text-xl">
        Recent Winner: {recentWinner}
      </div>
      <div className="mb-4 text-xl">
        Number of Player: {Number(numberOfPlayers)}
      </div>
      <button
        type="button"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-200 hover:text-white hover:bg-black focus:z-10 focus:ring-4 focus:ring-gray-100 "
        onClick={() =>
          writeContract({
            accounts: account,
            value: BigInt(0.01 * 10 ** 18),
            abi: contractAbi.abi,
            address: contractAddress["11155111"][0],
            functionName: "enterRaffle",
          })
        }
      >
        Enter Raffle
      </button>
      <div className="mt-4 text-xl">
        Entry Fee: {ethEntryFee} ETH
      </div>
    </div>
  );
}

export default LotteryComponent;
