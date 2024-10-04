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
import { toast } from 'react-toastify';
export default function WithDrawGems() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [selectedOption, setSelectedOption] = useState('ETH'); // Set default value to 'ETH'
  const [warningMessage, setWarningMessage] = useState('20% will be deducted in the case of ETH'); // Set default warning message
  const [inputValue,setInputValue]=useState(0)
  const [eth,setEth]=useState();

  const handleOpen = () => {
    
    
    setOpen(true);      
 
};

const showloading=()=>{
  setLoading(true);  
  setTimeout(() => {
    setLoading(false);  
    
       
  },500);
  
}
  
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

  useEffect(()=>{

  },[])
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
      toast.success(' WithDrawGems  Successfully !');
    } catch (error) {
      console.log(error);
      toast.error('Failed to WithDrawGems . Please try again.');
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
             {/* <button onClick={handleWithdraw} className='text-black bg-red-500'  >
                withdraw
              </button> */}
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
              <span onClick={handleWithdraw} className={loading ? 'invisible' : ''}>
              withdraw
              </span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}