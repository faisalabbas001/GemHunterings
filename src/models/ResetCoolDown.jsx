import React, { useContext, useState } from 'react';
import {
  readContract,
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from '@wagmi/core';
import { AppContext } from '../context/AppContext';
import { config } from '../BlockChainContext/config';
import { abi, contractAddress } from '../BlockChainContext/helper';
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';
import { formatEther, parseEther } from 'viem';

export default function ResetCoolDown() {
  const { CoolDownTime, stakedTokensAmount } = useContext(AppContext); // Access CoolDownTime from context
  // console.log("my reset cooldown time is here", CoolDownTime);

  //  const CoolDownTime=1728035364

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false); // Tracks if the countdown is complete

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Countdown completion handler
  const handleCountdownComplete = () => {
    setIsTimeUp(true); // Set isTimeUp to true when countdown is complete
  };

  const handleReset = async () => {
    try {
      const totalSupply = await readContract(config, {
        abi,
        address: contractAddress,
        functionName: 'totalSupply',
      });
      //console.log(totalSupply);
      const totalSupplyInt = formatEther(totalSupply);
      const stakeTokensInt = stakedTokensAmount.toLocaleString('fullwide', {
        useGrouping: false,
      });
      const userStakePercentage = formatEther(
        (stakeTokensInt / totalSupplyInt) * 100
      );
      // console.log(userStakePercentage);
      // //console.log(normalValue);
      // console.log(totalSupplyInt);
      // console.log( stakedTokensAmount);

      let noOfEth;
      if (userStakePercentage < 0.5) {
        noOfEth = 0.01;
      } else if (userStakePercentage >= 0.5 && userStakePercentage < 1) {
        noOfEth = 0.02;
      } else if (userStakePercentage >= 1) {
        noOfEth = 0.03;
      }

      try {
        console.log(noOfEth);
        const { request } = await simulateContract(config, {
          abi,
          address: contractAddress,
          functionName: 'resetStealCooldown',
          value: parseEther(noOfEth.toString()),
        });
        const hash = await writeContract(config, request);
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        console.log('Protection purchased successfully!', transactionReceipt);
        // toast.success('Protection purchased successfully!');
      } catch (error) {
        console.error('Error writing contract:', error);
      }
    } catch (error) {
      console.error('Error reading contract:', error);
      toast.error('Error reading contract.');
    }
  };

  const Completionist = () => <span>Cooldown Ended</span>;

  // Countdown renderer
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return isTimeUp ? (
        <span>Cooldown is ready to be reset</span>
      ) : (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  // Calculate remaining time for the cooldown in seconds
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const remainingTimeInSeconds = Math.max(
    CoolDownTime - currentTimeInSeconds,
    0
  ); // Ensure it doesn't go negative

  return (
    <div className="text-center">
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-2 px-12 text-lg text-white w-full flex items-center justify-center"
        disabled={loading}
        style={{ minWidth: '160px' }}
      >
        Reset CoolDown
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
            <h3 className="text-xl text-black">Remaining Time</h3>
            <p className="mt-4 text-black font-semibold">Time Remaining ⏱</p>
            <p className="text-lg text-black font-bold">
              <Countdown
                date={Date.now() + remainingTimeInSeconds * 1000} // Set countdown timer correctly
                renderer={renderer}
                onComplete={handleCountdownComplete}
              />
            </p>

            {/* Reset button */}
            <button
              className="mt-6 flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded w-full"
              disabled={!isTimeUp || loading} // Disabled until time is up or loading
              onClick={handleReset}
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
              <span className={loading ? 'invisible' : ''}>
                {isTimeUp ? 'Reset' : 'Cannot Reset Yet'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
