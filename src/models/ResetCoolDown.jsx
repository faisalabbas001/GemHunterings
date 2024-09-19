import React, { useState, useEffect } from 'react';
import {
  getBalance,
  readContract,
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from '@wagmi/core';
import { config } from '../BlockChainContext/config';
import { nonceManager, parseEther } from 'viem';
import {
  abi,
  contractAddress,
  testTokenAddress,
  erc20Abi,
} from '../BlockChainContext/helper';
import { useAccount, useBalance } from 'wagmi';
import { sepolia } from 'viem/chains';

export default function ResetCoolDown() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [remainingTime, setRemainingTime] = useState('');
  const [customDate, setCustomDate] = useState(new Date('2024-09-19T00:00:00'));

  const handleOpen = () => {
    
    
    setOpen(true);      
 
};

const showloading=()=>{
  setLoading(true);  
  setTimeout(() => {
    setLoading(false);  
    location.reload();
       
  },500);
  
}

  
 
  const handleClose = () => setOpen(false);

 
  const calculateRemainingTime = (targetDate) => {
    const now = new Date();
    const timeRemaining = targetDate - now; 

   
    if (timeRemaining <= 0) return 'Time is up!';

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

   
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  const handleReset=async ()=>{

    console.log("reset");
        try {
      console.log(eth);
      const result = await readContract(config, {
        abi,
        address: contractAddress,
        functionName: 'getUserStakePercentage',
      });
      console.log(result);

      let noOfEth;
      if (result.data < 0.5) {
        noOfEth=0.01;
      } else if (result.data >= 0.5 && result.data < 1) {
        noOfEth=0.02;
      } else if (result.data >= 1) {
        noOfEth=0.03;
      }
      try {
        const { request } = await simulateContract(config, {
          abi: abi,
          address: contractAddress,
          functionName: 'purchaseProtection',
          value: parseEther(noOfEth)
        });
        const hash = await writeContract(config, request);
        const transactionReceipt = await waitForTransactionReceipt(config, {
          // confirmations: 2,
          hash: hash,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

 
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime(customDate));
    }, 1000);

  

  
    return () => clearInterval(timer);
  }, [customDate]);


  return (
    <div className="text-center">
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-2 px-12 text-lg text-white w-full flex items-center justify-center"
        disabled={loading}  
        style={{ minWidth: '160px' }} 
      >
        {/* Button Text (invisible when loading) */}
       
        Reset-coolDown
       

        {/* Conditionally render the loader when loading */}
       
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖️
            </button>

            {/* Modal content */}
            <h3 className="text-xl text-black">Will Reset After 00:00</h3>
            <p className="mt-4 text-black font-semibold">{remainingTime}</p>
        

            {/* Unlock button */}
            <button className="mt-6 flex justify-center items-center  bg-red-500 text-white px-4 py-2 rounded w-full" disabled={loading} onClick={showloading}>
             


              <span onClick={handleReset} className={loading ? 'invisible' : ''}>
              Reset
        </span>

        {loading && (
          <div
            className="absolute inline-block h-6 w-6 file animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white"
            role="status"
          >
            <span className="!absolute !m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}


            </button>
          </div>
        </div>
      )}
    </div>
  );
}
