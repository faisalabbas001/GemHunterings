import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { simulateContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../BlockChainContext/config';
import { abi, contractAddress } from '../BlockChainContext/helper';
import Countdown from 'react-countdown';
import { AppContext } from '../context/AppContext';

export default function PurchaseProtection({setisProtectionsShieldActive}) {
  const { ProtectionTime } = useContext(AppContext); // Use ProtectionTime from context
//   console.log("ProtectionTime is here, main value is: ", ProtectionTime); // Log the correct variable
//  const ProtectionTime=1728035184
  const [loading, setLoading] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);


  const handleCountdownComplete = () => {
    setIsTimeUp(true); // Enable the button when countdown is complete
  };

  const handleAddDay = async () => {
    setLoading(true);
    try {
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'purchaseProtection',
      });
      const hash = await writeContract(config, request);
      // toast.info(`Transaction sent! Hash: ${hash}`);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });
      // toast.success('Protection purchased successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to purchase protection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Completionist = () => <span>Time Ended</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return isTimeUp ? <span>Time to purchase protection</span> : <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const remainingTimeInSeconds = Math.max(ProtectionTime - currentTimeInSeconds, 0); // Use ProtectionTime

  return (
    <div className="text-center">
      
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={()=>setisProtectionsShieldActive(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖️
            </button>

            <h3 className="text-xl text-black">Remaining Time</h3>
            <p className="mt-4 text-black font-semibold">Remaining Time ⏱⏱</p>
            <p className="text-lg text-black font-bold">
              <Countdown
                date={Date.now() + remainingTimeInSeconds * 1000} // Correct remaining time calculation
                renderer={renderer}
                onComplete={handleCountdownComplete}
              />
            </p>

            <button
              className="mt-6 bg-red-500 flex justify-center items-center text-white px-4 py-2 rounded w-full relative"
              disabled={!isTimeUp || loading}
              onClick={handleAddDay}
              style={{ backgroundColor: isTimeUp ? 'red' : 'gray' }}
            >
              {loading && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  role="status"
                >
                  <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-white"
                  >
                    <span className="!absolute !m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              )}
              <span className={loading ? 'invisible' : ''}>
                Add 1 Day
              </span>
            </button>
          </div>
        </div>
      
    </div>
  );
}
