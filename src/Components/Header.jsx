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
        {/* Mobile View (Hidden on larger screens) */}
        <div className="mt-4 block lg:hidden">
          {isConnected ? (
            <button
              className="bg-[#363A41] text-white text-[14px] sm:text-[16px] px-2 sm:px-4 py-[6px] transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-lg"
              onClick={() => open()}
            >
              {address.slice(0, 4)}...{address.slice(-4)}
            </button>
          ) : (
            <button
              onClick={() => open()}
              className="bg-[#363A41] text-white text-[14px] sm:text-[16px] px-1 sm:px-3 py-1 transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-lg"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      {/* Desktop View (Hidden on smaller screens) */}
      <div className="fixed top-10 right-4 hidden lg:block cursor-pointer">
        {isConnected ? (
          <button
            className="bg-[#363A41] text-white text-[14px] sm:text-[16px] px-2 sm:px-4 py-[6px] transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-2xl hover:bg-green-700"
            onClick={() => open()}
          >
            {address.slice(0, 4)}...{address.slice(-4)}
          </button>
        ) : (
          <button
            onClick={() => open()}
            className="bg-[#363A41] text-white text-[14px] sm:text-[16px] px-1 sm:px-3 py-1 transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-2xl hover:bg-green-700"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;