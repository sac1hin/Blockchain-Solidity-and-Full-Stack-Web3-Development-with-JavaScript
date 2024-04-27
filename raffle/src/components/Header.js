"use client";
"use client";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { config } from "@/config/wagmiConfig";
import Profile from "./Profile";
import WalletOptions from "./WalletOptions";

function Header() {
  const { isConnected } = useAccount({ config });
  const { address } = useAccount({ config });
  return (
    <>
      <nav className="bg-white dark:bg-gray-700 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
          { isConnected && <div className="font-bold dark:text-white mr-6">{address}</div>}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isConnected ? <Profile /> : <WalletOptions />}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
