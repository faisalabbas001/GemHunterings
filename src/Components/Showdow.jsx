import { useState } from 'react';
import './shadow.css'; // Import the CSS file
import UnlockGems from "../models/UnlockGems";
import CollectDailyRewards from "../models/MyRewardsDaily";
import WithDrawGems from "../models/WithDrawGems";
import  PurchaseProtection from "../models/PurchaseProtection";
import  ResetCoolDown from "../models/ResetCoolDown";
import  Attacks from "../models/Attacks";
const Showdow = () => {
  const [inputValue, setInputValue] = useState(''); 

  // Function to clear input value
  const clearInput = () => {
    setInputValue('');
  };

  return (
    <div className='flex sm:flex-row flex-col justify-center'>
      <div className="bg-[#FF0000] custom-shadow rounded-md p-6 m-2 text-white text-center">
        {/* Rows with Left and Right Text */}
        <div className="flex justify-between mb-4">
          <p>Total Stacked</p>
          <p>0 ETH</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Wallet</p>
          <p>0 ETH</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>GemBalance</p>
          <p>0 MINERS</p>
        </div>

        {/* Input Field */}
        <div className="flex items-center border-4 border-black bg-white p-2 rounded-lg">
          <input
            type="search"
            className="flex-1 text-black text-right outline-none pr-12"
            placeholder="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex items-center ml-2 cursor-pointer" onClick={clearInput}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-black text-xs md:text-sm lg:text-base flex-shrink-0">
              ETH
            </p>
          </div>
        </div>

        {/* Stake Button */}
        <button className="bg-[#8B0000] rounded-md py-2 w-full text-lg mt-2 text-white custom-button">
          STAKE
        </button>

  

        {/* Composed/Collect Daily Rewards Buttons */}

        <div className="flex flex-col flex-wrap sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
        <button  className="bg-[#8B0000] flex-1   rounded-2xl py-2 px-6 sm:px-4 text-lg text-white custom-button">
            Composed
          </button>

          <button  className="bg-[#8B0000]  flex-1 rounded-2xl py-2 px-6 sm:px-4 text-lg text-white custom-button">
          UnStack
          </button>
         
        </div>


        {/* Unlock/Unstack Buttons */}
        <div className="flex flex-col flex-wrap  sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
        <UnlockGems/>
        <CollectDailyRewards/>
        
        </div>

        {/* Withdraw/Purchase Protection Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
          <WithDrawGems/>
          <PurchaseProtection/>
        </div>

        {/* Reset/Attack Buttons */}
        <div className="flex flex-col  sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
          <ResetCoolDown/>
         <Attacks/>
        </div>

      </div>
    </div>
  );
};

export default Showdow;
