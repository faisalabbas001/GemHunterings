import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { polygon, sepolia, hardhat,baseSepolia } from 'wagmi/chains';

// Use the provided project ID directly
export const projectId = 'c393f03d1f1862474d10921e825246ca';

export const metadata = {
  name: 'Decryptor',
  description: 'Decryptor',
  url: 'https://decryptor.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [baseSepolia];

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
