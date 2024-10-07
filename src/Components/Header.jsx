import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Link } from "react-router-dom";
const  Header = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal(); // Use this hook to get the open function
  return (
    <div className="flex justify-between items-center fixed top-0 w-full z-50 shadow-md px-4 py-2 h-[60px] sm:h-[70px] lg:h-[70px]  bg-gray-700 bg-opacity-80    opacity-3 ">
    <img
      src="/logo.jpg"
      alt="logo"
      className="cursor-pointer w-[60px] h-[40px] sm:w-[80px] sm:h-[50px] lg:w-[100px] lg:h-[60px]"
    />
    
  
    {/* Icon Container */}
    <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
    <Link to="/leader-board" className="text-white text-[14px] sm:text-[17px] lg:text-[22px] ">Leader-Board</Link>
      <img src="/bace.png" className="cursor-pointer w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]" alt="Base Icon" />
      <img src="/book.png" className="cursor-pointer w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]" alt="Book Icon" />
      <img src="/telegram.png" className="cursor-pointer w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]" alt="Telegram Icon" />
      <img src="/twitter.jpg" className="cursor-pointer w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]" alt="Twitter Icon" />
    </div>
  
    {/* Wallet Connection Button */}
    <div className="top-10 right-4 lg:block cursor-pointer">
      {isConnected ? (
        <button
          className="bg-[#363A41] text-white text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-3 py-1 sm:py-2 transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-2xl hover:bg-green-700"
          onClick={() => open()}
        >
          {address.slice(0, 4)}...{address.slice(-4)}
        </button>
      ) : (
        <button
          onClick={() => open()}
          className="bg-[#363A41] text-white text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-3 py-1 sm:py-2 transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-2xl hover:bg-green-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  </div>
  

  
  
   
  );
};
export default Header;