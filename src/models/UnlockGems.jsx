import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { simulateContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../BlockChainContext/config';
import { abi, contractAddress } from '../BlockChainContext/helper';
import Countdown from 'react-countdown';

export default function UnlockGems({ contractTime }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [remainingTime, setRemainingTime] = useState(contractTime);
  const [isTimeUp, setIsTimeUp] = useState(false); // State to track if time is up

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Countdown completion handler
  const handleCountdownComplete = () => {
    setIsTimeUp(true); // Set time up to true when countdown is complete
  };

  const handleUnlockGem = async () => {
    setLoading(true);
    try {
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'withdrawFromLock',
      });
      const hash = await writeContract(config, request);
      toast.info(`Transaction sent! Hash: ${hash}`);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });
      toast.success('Gems successfully unlocked!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to unlock gems. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Completionist = () => <span>Time Ended</span>;

  // Countdown renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return isTimeUp ? <span>Time to unlock the jems </span> : <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  console.log(
    'contractTime',
    contractTime,
    `Math.floor(Date.now()/1000) - Number(contractTime)`,
    Math.floor(Date.now() / 1000) - Number(contractTime)
  );

  return (
    <div className="text-center">
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-2 px-16 text-lg text-white w-full flex items-center justify-center"
        style={{ minWidth: '160px' }}
      >
        <span>Unlock Gems</span>
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>

            <h3 className="text-xl text-black">Gem Unlock</h3>
            <p className="mt-4 text-black font-semibold">Remaining Time ⏱</p>
            <p id="getinnertext" className="text-lg text-black font-bold">
              {
                <Countdown
              date={Math.floor(Date.now()/1000) - contractTime}
                  renderer={renderer}
                  onComplete={handleCountdownComplete} // Trigger action on countdown complete
                />
              }
            </p>

            <button
              className="mt-6 bg-red-500 flex justify-center items-center text-white px-4 py-2 rounded w-full relative"
              disabled={!isTimeUp || loading} // Disable button if time is not up or loading
              onClick={handleUnlockGem}
            >
              {loading && <span>Loading...</span>}
              <span>{isTimeUp ? 'UNLOCK' : 'Cannot Unlock Yet'}</span> {/* Button text changes based on time */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
