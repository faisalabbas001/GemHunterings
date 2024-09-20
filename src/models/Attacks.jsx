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
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);


  const handleOpen = () => {
    
    
      setOpen(true);      
    
  };
  
  const showloading=()=>{
    setLoading(true);  
    setTimeout(() => {
      setLoading(false);  
      
         
    },500);
    
  }
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

            <button className="mt-6 bg-red-500 flex justify-center items-center  text-white px-4 py-2 rounded w-full relative" disabled={loading}  onClick={showloading}>
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
              <span onClick={handleAttack} className={loading ? 'invisible' : ''}>
              Attack
              </span>
            </button>




          </div>
        </div>
      )}
    </div>
  );
}
