/* eslint-disable react/prop-types */
import React from 'react';
import { config, projectId, metadata } from '../BlockChainContext/config'; // Correct import path
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

// Initialize Web3Modal (only once ideally)
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
});

const queryClient = new QueryClient();

export default function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
