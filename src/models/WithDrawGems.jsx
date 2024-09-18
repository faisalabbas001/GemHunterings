import { input } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';

import { getBalance, readContract,simulateContract,writeContract,waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../BlockChainContext/config';
import { nonceManager, parseEther } from "viem";
import {
  abi,
  contractAddress,
  testTokenAddress,
  erc20Abi
} from '../BlockChainContext/helper';
import { useAccount, useBalance } from 'wagmi';
import { sepolia } from 'viem/chains';

export default function WithDrawGems() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [selectedOption, setSelectedOption] = useState('ETH'); // Set default value to 'ETH'
  const [warningMessage, setWarningMessage] = useState('20% will be deducted in the case of ETH'); // Set default warning message
  const [inputValue,setInputValue]=useState(0)
  const [eth,setEth]=useState();

  const handleOpen = () => {
    setLoading(true);  
    setTimeout(() => {
      setLoading(false);  
      setOpen(true);      
    }, 1000);
  };
  
  const handleSelectChange = async (e) => {
    const value = e.target.value;
    // Update selected value
    console.log(value);
    if(value==="ETH"){
      setEth(true);
      //console.log(eth);
    }else{
      setEth(false);
      //console.log(eth);
    }
    

  };
  const handleWithdraw=async ()=>{
    try {
      console.log(eth);
      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: 'convertGems',
        args:[parseEther(inputValue),eth]
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        // confirmations: 2,
        hash: hash,
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleClose = () => setOpen(false);
 

  return (
    <div className="text-center">
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-2 px-14 sm:px-14  text-lg text-white w-full flex items-center justify-center"
       
        style={{ minWidth: '160px' }} 
      >
        {/* Button Text (invisible when loading) */}
       
        WithDraw Gems
      

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
            <input type="text" placeholder="Enter Amount" className="w-full p-2 mt-4 border text-black border-gray-300 rounded" onChange={(e)=>setInputValue(e.target.value)} value={inputValue} />
            <h3 className="text-xl text-black">To Asset</h3>
            <select className='text-black' onChange={handleSelectChange} >
              <option value="ETH"  className='text-black'>ETH</option>
              <option value="TKir">TKir</option>
            </select>
             <p className="text-lg text-black font-bold">20% will be deducted in the case of ETH</p>
             <button onClick={handleWithdraw} className='text-black bg-red-500'  >
                withdraw
              </button>
          </div>
        </div>
      )}
    </div>
  );
}