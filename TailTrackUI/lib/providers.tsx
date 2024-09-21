'use client';

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {

  

  return (
    <DynamicContextProvider
      theme="auto"
      settings={{
        environmentId: "91619ccf-43d6-433c-9b19-efaf9d0e7f8d",
           walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}