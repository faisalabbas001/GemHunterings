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
export default function Attacks() {
  const [open, setOpen] = useState(false);
  const [inputValue, SetInputValue] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-1.5 px-20 text-lg text-white custom-button"
        style={{ width: '100%' }}
      >
        Attacks
      </button>
      {open && (
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

            <button
              onClick={handleAttack}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Attack
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
