import { useState, useEffect } from 'react';
import './shadow.css'; // Import the CSS file
import UnlockGems from '../models/UnlockGems';
import CollectDailyRewards from '../models/MyRewardsDaily';
import WithDrawGems from '../models/WithDrawGems';
import PurchaseProtection from '../models/PurchaseProtection';
import ResetCoolDown from '../models/ResetCoolDown';
import Attacks from '../models/Attacks';
import { getBalance, readContract,simulateContract,writeContract,waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../BlockChainContext/config';
import { nonceManager, parseEther } from "viem";
import {
  abi,
  contractAddress,
  testTokenAddress,
  erc20Abi,
} from '../BlockChainContext/helper';
import { useAccount, useBalance } from 'wagmi';
import { sepolia } from 'viem/chains';
import { formatEther } from 'ethers';

const Showdow = () => {
  const { address: userAddress } = useAccount();

  const [inputValue, setInputValue] = useState('');
  const [totalStacked, setTotalStacke] = useState();
  const [gemBalance, setGemBalance] = useState();
  const [stakeAmount, setStakeAmount] = useState(0);
  const [conversionLock, setConversionLock] = useState();
  const [gemBalanceAmount, setGemBalanceAmount] = useState(0);
  const [noOfCompoundsAmount, setNoOfCompoundsAmount] = useState(0);
  const [protectionEndTimeAmount, setProtectionEndTimeAmount] = useState(0);
  const [stakedTokensAmount, setStakedTokensAmount] = useState(0);
  const [stealCooldownAmount, setStealCooldownAmount] = useState(0);
  const [stealStreakAmount, setStealStreakAmount] = useState(0);
  const {
    data: balanceData,
    isError,
    isLoading,
  } = useBalance({
    address: userAddress,
    token: testTokenAddress, // If you're querying a token balance
    chainId: sepolia.id,
  });
  console.log(balanceData);

  async function getUserData() {
    try {
      console.log(balanceData);
      console.log(typeof userAddress);
      const result = await readContract(config, {
        abi,
        address: contractAddress,
        functionName: 'getUserData',
        args: [userAddress],
      });
      console.log(result);
      console.log(Number(result.gemBalanceAmount));
      setGemBalance(Number(result.gemBalanceAmount));
      setTotalStacke(formatEther(result.stakedTokensAmount));
      setConversionLock(result.conversionLock); // Assuming conversionLock is part of the result
      setGemBalance(formatEther(result.gemBalanceAmount)); // Assuming gemBalanceAmount is part of the result
      setNoOfCompoundsAmount(Number(result.noOfCompoundsAmount)); // Assuming noOfCompoundsAmount is part of the result
      setProtectionEndTimeAmount(Number(result.protectionEndTimeAmount)); // Assuming protectionEndTimeAmount is part of the result
      setStakedTokensAmount(Number(result.stakedTokensAmount)); // Assuming stakedTokensAmount is part of the result
      setStealCooldownAmount(Number(result.stealCooldownAmount)); // Assuming stealCooldownAmount is part of the result
      setStealStreakAmount(Number(result.stealStreakAmount)); // Assuming stealStreakAmount is part of the result
    // console.log(
    //   gemBalance,
    //   totalStacked,
    //   conversionLock,
    //   gemBalanceAmount,
    //   noOfCompoundsAmount,
    //   protectionEndTimeAmount,
    //   stakedTokensAmount,
    //   stealCooldownAmount,
    //   stealStreakAmount,
    // );
    } catch (error) {
      console.log(error);
    }
  }
  console.log(
    gemBalance,
    totalStacked,
    conversionLock,
    gemBalanceAmount,
    noOfCompoundsAmount,
    protectionEndTimeAmount,
    stakedTokensAmount,
    stealCooldownAmount,
    stealStreakAmount,
  );



useEffect(async ()=>{
getUserData()


},[])


  // async function getBalance2() {
  //   if (userAddress) {
  //     try {
  //       const balance = await getBalance(config, {
  //         address: testTokenAddress,
  //         chainId: sepolia.id,
  //       });
  //       console.log('my balance is that here', balance);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
  // //getBalance();


  const tokenApproval = async (value) => {
    try {
      const { request } = await simulateContract(config, {
        abi: erc20Abi,
        address: testTokenAddress,
        functionName: "approve",
        //cook totalPrice
        args: [contractAddress, parseEther(value)],
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        // confirmations: 2,
        hash: hash,
      });

      console.log("token Aapproved");
      toast.success("Token Approved");
    } catch (error) {
      console.log(error);
    }
  };


  const handleStake = async () => {
    try {
      await tokenApproval(stakeAmount)
      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: 'stakeTokens',
        args: [parseEther(stakeAmount)],
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        // confirmations: 2,
        hash: hash,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleCompound= async () => {
    try {
      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: 'compoundTokens',
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        // confirmations: 2,
        hash: hash,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
   

  // Function to clear input value
  const clearInput = () => {
    setInputValue('');
  };

  return (
    <div className="flex sm:flex-row flex-col justify-center">
      <div className="bg-[#FF0000] custom-shadow rounded-md p-6 m-2 text-white text-center">
        {/* Rows with Left and Right Text */}
        <div className="flex justify-between mb-4">
          <p>Total Stacked</p>
          <p>
            {totalStacked} {balanceData?.symbol}
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Wallet</p>
          <p>
            {parseFloat((balanceData?.formatted)).toFixed(2)} {balanceData?.symbol}
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <p>GemBalance</p>
          <p>{gemBalance} GEMS</p>
        </div>

        {/* Input Field */}
        <div className="flex items-center border-4 border-black bg-white p-2 rounded-lg">
          <input
            type="search"
            className="flex-1 text-black text-right outline-none pr-12"
            placeholder="0"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <div
            className="flex items-center ml-2 cursor-pointer"
            onClick={clearInput}
          >
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
              {balanceData?.symbol}
            </p>
          </div>
        </div>

        {/* Stake Button */}
        <button
          className="bg-[#8B0000] rounded-md py-2 w-full text-lg mt-2 text-white custom-button"
          onClick={handleStake}
        >
          STAKE {stakeAmount}
        </button>





        {/* Composed/Collect Daily Rewards Buttons */}

        <div className="flex flex-col flex-wrap sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={handleCompound} className="bg-[#8B0000] flex-1   rounded-2xl py-2 px-6 sm:px-4 text-lg text-white custom-button">
            Compound
          </button>

          <button className="bg-[#8B0000]  flex-1 rounded-2xl py-2 px-6 sm:px-4 text-lg text-white custom-button">
            UnStack
          </button>
        </div>

        {/* Unlock/Unstack Buttons */}
        <div className="flex flex-col flex-wrap  sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
          <UnlockGems />

          <CollectDailyRewards />
        </div>

        {/* Withdraw/Purchase Protection Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
          <WithDrawGems />
          <PurchaseProtection />
        </div>

        {/* Reset/Attack Buttons */}
        <div className="flex flex-col  sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
          <ResetCoolDown />
          <Attacks />
        </div>
      </div>
    </div>
  );
};

export default Showdow;