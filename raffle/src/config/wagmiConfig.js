import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID is not defined");

export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  projectId,
});
