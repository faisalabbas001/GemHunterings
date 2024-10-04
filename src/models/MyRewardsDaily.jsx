import React, { useState, useContext } from 'react';
import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from '@wagmi/core';
import { config } from '../BlockChainContext/config';
import { abi, contractAddress } from '../BlockChainContext/helper';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import Countdown from 'react-countdown';
import { AppContext } from '../context/AppContext';

export default function CollectDailyRewards() {
  const { contractTime } = useContext(AppContext); // Contract time (Unix timestamp in seconds)
  console.log("contract time is here collect daily rewards", contractTime);
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false); // Track if the countdown is complete
  const { address: userAddress } = useAccount();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleCollect = async () => {
    if (!isTimeUp) return; // Don't allow collecting until countdown finishes

    try {
      console.log("Collecting rewards...");
      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: 'cashInDailyRewards',
        args: [userAddress],
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });

      toast.success('Collected Rewards Successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to Collect Rewards. Please try again.');
    }
  };

  // Countdown completion handler
  const handleCountdownComplete = () => {
    setIsTimeUp(true); // Enable the collect button after countdown finishes
  };

  const Completionist = () => <span>Ready to collect rewards!</span>;

  // Countdown renderer
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  // Calculate remaining time (contractTime is in seconds, Date.now() is in milliseconds)
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const remainingTimeInSeconds = Math.max(contractTime - currentTimeInSeconds, 0); // Ensure non-negative remaining time

  return (
    <div className="text-center">
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-2 px-14 sm:px-10 text-lg text-white w-full flex items-center justify-center"
        disabled={loading}
        style={{ minWidth: '160px' }}
      >
        Collect Rewards
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
            <h3 className="text-xl text-black">Daily Reward: 0 ETH</h3>
            <p className="mt-4 text-black font-semibold">Remaining Time ⏱</p>
            <p className="text-lg text-black font-bold">
              <Countdown
                date={Date.now() + remainingTimeInSeconds * 1000} // Calculate remaining time in milliseconds
                renderer={renderer}
                onComplete={handleCountdownComplete} // Enable button after countdown completes
              />
            </p>

            {/* Collect Rewards button */}
            <button
              className="mt-6 flex justify-center items-center bg-red-500 text-white px-4 py-2 text-center rounded w-full"
              disabled={!isTimeUp || loading} // Disabled until the countdown finishes
              onClick={showLoading}
              style={{ backgroundColor: isTimeUp ? 'red' : 'gray' }}
            >
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
              <span onClick={handleCollect} className={loading ? 'invisible' : ''}>
                {isTimeUp ? 'Collect Rewards' : 'Cannot Collect Yet'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
