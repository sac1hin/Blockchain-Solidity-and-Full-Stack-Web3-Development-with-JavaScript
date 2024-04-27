"use client"

import * as React from "react";
import { Connector, useConnect } from "wagmi";

function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector, index) => (
    index === 0 &&
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button disabled={!ready} onClick={onClick}>
      Connect
    </button>
  );
}

export default WalletOptions;
