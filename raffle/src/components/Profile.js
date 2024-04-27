"use client";

import { config } from "@/config/wagmiConfig";
import { useAccount, useBalance, useDisconnect, useEnsName } from "wagmi";

export default function Profile() {
  const { disconnect } = useDisconnect();

  return (
    <div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
