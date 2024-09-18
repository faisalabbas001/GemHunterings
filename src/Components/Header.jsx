import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal(); // Use this hook to get the open function

  return (
    <header className="p-4 relative">
      <div className="flex flex-col items-center text-center w-full">
        <img src="/logo.jpg" alt="logo" className='' width={180} height={190} />

        <div className="mt-4">
          <h6 className="text-lg text-white font-posey">THE ETH REWARD POOL WITH THE</h6>
          <h6 className="text-lg text-white font-posey">BEST DAILY REWARDS!</h6>
          <h6 className="text-lg text-white font-posey mt-2">8% VARIABLE RETURNS DAILY</h6>
        </div>

        <div className="mt-4 block lg:hidden">
          {isConnected ? (
            <div className="bg-white text-black py-2 px-4 rounded-lg">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          ) : (
            <button onClick={open} className="bg-white text-black py-2 px-4 rounded-lg">
              Connect
            </button>
          )}
        </div>
      </div>

      <div className="fixed top-10 right-4 hidden lg:block cursor-pointer">
        {isConnected ? (
          <div className="bg-white text-black py-1 px-4 rounded-2xl hover:bg-green-700">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        ) : (
          <button onClick={open} className="bg-white text-black py-1 px-4 rounded-2xl hover:bg-green-700">
            Connect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
