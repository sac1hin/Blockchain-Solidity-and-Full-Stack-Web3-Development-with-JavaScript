"use client";

import { config, projectId } from "@/config/wagmiConfig";
import { WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
if (!projectId) throw new Error("Project ID is not defined");

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

const queryClient = new QueryClient();

function Provider({ children, initialState }) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default Provider;
