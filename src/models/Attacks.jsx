import React, { useState } from 'react';
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
import { toast } from 'react-toastify';
export default function Attacks({handleClose}) {
  const [inputValue, SetInputValue] = useState('');
  // const handleClose = () => setOpen(false);


  const handleAttack = async () => {
    try {
      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: 'attemptSteal',
        args: [inputValue],
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        // confirmations: 2,
        hash: hash,
      });
      toast.success(' Attacked   Successfully !');
    } catch (error) {
      console.log(error);
      toast.error('Failed to Attacked  . Please try again.');
    }
  };

  return (
     
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded shadow-lg w-full max-w-md">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900"
            >
              ✖️ {/* Simple cross icon */}
            </button>
            <input
              type="text"
              placeholder="602,806,327,588 HEX"
              className="w-full p-2 mt-7 border text-black border-gray-300 rounded"
              onChange={(e) => SetInputValue(e.target.value)}
              value={inputValue}
            />

            <button  onClick={handleAttack} className="mt-6 bg-red-500 flex justify-center items-center  text-white px-4 py-2 rounded w-full relative">   
              Attack
            </button>

          </div>
        </div>
    

  );
}
