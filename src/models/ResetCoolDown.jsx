/* eslint-disable react/prop-types */
import  { useContext, useState } from 'react';
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

export default function ResetCoolDown({handleClose}) {
  const { CoolDownTime, stakedTokensAmount } = useContext(AppContext); 
  console.log("my reset cooldown time is here", CoolDownTime);

  //  const CoolDownTime=1728035364
  const [isTimeUp, setIsTimeUp] = useState(false); 


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
            <h3 className="text-xl text-center  text-black">Remaining Time</h3>
            <p className="mt-4 text-center  text-black font-semibold">Time Remaining ⏱</p>
            <p className="text-lg text-black font-bold text-center ">
              <Countdown
                date={Date.now() + remainingTimeInSeconds * 1000} // Set countdown timer correctly
                renderer={renderer}
                onComplete={handleCountdownComplete}
              />
            </p>

            {/* Reset button */}
            <button
              className="mt-6 flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded w-full"
              onClick={handleReset}
              style={{ backgroundColor: isTimeUp ? 'red' : 'gray' }}
            >
                {isTimeUp ? 'Reset' : 'Cannot Reset Yet'}
            </button>
          </div>
        </div>
  );
}
