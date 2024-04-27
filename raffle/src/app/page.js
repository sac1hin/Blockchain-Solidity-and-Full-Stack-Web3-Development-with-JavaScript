"use client";
import LotteryComponent from "@/components/LotteryComponent";
import Profile from "@/components/Profile";
import WalletOptions from "@/components/WalletOptions";
import Image from "next/image";
import { useAccount } from "wagmi";
import { NotificationProvider } from "@web3uikit/core";
import Header from "@/components/Header";

export default function Home() {
  return (
    <NotificationProvider>
      <main className="">
        <Header />
        <div className="mt-20 p-6">
          <LotteryComponent />
        </div>
      </main>
    </NotificationProvider>
  );
}
