import { createContext, useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi'; 
import { readContract } from '@wagmi/core'; 
import { formatEther, parseEther } from 'ethers'; 
import { sepolia } from 'viem/chains'; 
import { getBalance, simulateContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';
import {
  abi,
  contractAddress,
  erc20Abi,
  testTokenAddress,
} from '../BlockChainContext/helper';
import { config } from '../BlockChainContext/config';
import { toast } from 'react-toastify';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const { address: userAddress } = useAccount();

  // State variables
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
  const [ShowUpdatedData, setShowUpdatedData] = useState(false);

  const { data: balanceData } = useBalance({
    address: userAddress,
    token: testTokenAddress,
    chainId: sepolia.id,
  });

  useEffect(() => {
    if (userAddress) {
      getUserData();  // Ensure user address is available before calling
    }
  }, [userAddress, ShowUpdatedData]);

  async function getUserData() {
    try {
      const result = await readContract(config, {
        abi,
        address: contractAddress,
        functionName: 'getUserData',
        args: [userAddress],
      });

      setShowUpdatedData(false); // Reset data fetch trigger after successful fetch
      setGemBalance(Number(result.gemBalanceAmount));
      setTotalStacke(formatEther(result.stakedTokensAmount));
      setConversionLock(result.conversionLock); // Assuming conversionLock has a time property
      setNoOfCompoundsAmount(Number(result.noOfCompoundsAmount));
      setProtectionEndTimeAmount(Number(result.protectionEndTimeAmount));
      setStakedTokensAmount(Number(result.stakedTokensAmount));
      setStealCooldownAmount(Number(result.stealCooldownAmount));
      setStealStreakAmount(Number(result.stealStreakAmount));

      console.log("User data result:", result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const tokenApproval = async (value) => {
    try {
      const { request } = await simulateContract(config, {
        abi: erc20Abi,
        address: testTokenAddress,
        functionName: "approve",
        args: [contractAddress, parseEther(value)],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });
      toast.success("Token Approved");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleStake = async () => {
    try {
      await tokenApproval(stakeAmount);
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'stakeTokens',
        args: [parseEther(stakeAmount)],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });
      setShowUpdatedData(true); // Refresh data after staking
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompound = async () => {
    try {
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'compoundTokens',
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });
      setShowUpdatedData(true); // Refresh data after compounding
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <AppContext.Provider
      value={{
       contractTime: parseInt(BigInt(conversionLock?.time || 0), 10),
ProtectionTime: parseInt(BigInt(protectionEndTimeAmount || 0), 10),
CoolDownTime: parseInt(BigInt(stealCooldownAmount || 0), 10),

        gemBalance,
        totalStacked,
        conversionLock,
        gemBalanceAmount,
        noOfCompoundsAmount,
        protectionEndTimeAmount,
        stakedTokensAmount,
        stealCooldownAmount,
        stealStreakAmount,
        ShowUpdatedData,
        setProtectionEndTimeAmount, // Allow updating ProtectionTime
        setStakeAmount,
        handleCompound,
        handleStake,
        setShowUpdatedData, // Refresh data manually
      }}
    >
      {children}
    </AppContext.Provider>
  );
};



// .......................................................................... ................................................ 


// /* eslint-disable react-hooks/exhaustive-deps */
// import { createContext, useState, useEffect } from 'react';
// import { useAccount, useBalance } from 'wagmi'; 
// import { readContract } from '@wagmi/core'; 
// import { formatEther, parseEther } from 'ethers'; 
// import { sepolia } from 'viem/chains'; 
// import { getBalance,simulateContract,writeContract,waitForTransactionReceipt } from '@wagmi/core';
// import {
//   abi,
//   contractAddress,
//   erc20Abi,
//   testTokenAddress,
// } from '../BlockChainContext/helper';
// import { config } from '../BlockChainContext/config';
// import { toast } from 'react-toastify';

// export const AppContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const AppProvider = ({ children }) => {
//   const { address: userAddress } = useAccount();

//   // State variables
//   // const [inputValue, setInputValue] = useState('');
//   const [totalStacked, setTotalStacke] = useState();
//   const [gemBalance, setGemBalance] = useState();
//   const [stakeAmount, setStakeAmount] = useState(0);
//   const [conversionLock, setConversionLock] = useState();
//   const [gemBalanceAmount, setGemBalanceAmount] = useState(0);
//   const [noOfCompoundsAmount, setNoOfCompoundsAmount] = useState(0);
//   const [protectionEndTimeAmount, setProtectionEndTimeAmount] = useState(0);
//   const [stakedTokensAmount, setStakedTokensAmount] = useState(0);
//   const [stealCooldownAmount, setStealCooldownAmount] = useState(0);
//   const [stealStreakAmount, setStealStreakAmount] = useState(0);
//   const [ShowUpdatedData, setShowUpdatedData] = useState(false);
//   const [updatedata,setupdatedata] = useState(false);

//   const { data: balanceData, isError, isLoading } = useBalance({
//     address: userAddress,
//     token: testTokenAddress,
//     chainId: sepolia.id,
//   });

//   useEffect(() => {
//     if (userAddress) {
//       getUserData();  // Ensure user address is available before calling
//     }
//   }, [userAddress,ShowUpdatedData]);

//   async function getUserData() {
//     try {
//       const result = await readContract(config, {
//         abi,
//         address: contractAddress,
//         functionName: 'getUserData',
//         args: [userAddress],
//       });

//       setShowUpdatedData(true);
//       setGemBalance(Number(result.gemBalanceAmount));
//       setTotalStacke(formatEther(result.stakedTokensAmount));
//       setConversionLock(result.conversionLock); // Assuming conversionLock has a time property
//       setGemBalance(formatEther(result.gemBalanceAmount));
//       setNoOfCompoundsAmount(Number(result.noOfCompoundsAmount));
//       setProtectionEndTimeAmount(Number(result.protectionEndTimeAmount));
//       setStakedTokensAmount(Number(result.stakedTokensAmount));
//       setStealCooldownAmount(Number(result.stealCooldownAmount));
//       setStealStreakAmount(Number(result.stealStreakAmount));

//       console.log("User data result:", result);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   }

//   const tokenApproval = async (value) => {
//     try {
//       const { request } = await simulateContract(config, {
//         abi: erc20Abi,
//         address: testTokenAddress,
//         functionName: "approve",
//         //cook totalPrice
//         args: [contractAddress, parseEther(value)],
//       });
//       const hash = await writeContract(config, request);
//       const transactionReceipt = await waitForTransactionReceipt(config, {
//         // confirmations: 2,
//         hash: hash,
//       });

//       console.log("token Aapproved");
//       toast.success("Token Approved");
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   const handleStake = async () => {
//     try {
//       await tokenApproval(stakeAmount)
//       const { request } = await simulateContract(config, {
//         abi: abi,
//         address: contractAddress,
//         functionName: 'stakeTokens',
//         args: [parseEther(stakeAmount)],
//       });
//       const hash = await writeContract(config, request);
//       const transactionReceipt = await waitForTransactionReceipt(config, {
//         // confirmations: 2,
//         hash: hash,
//       });

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCompound= async () => {
//     try {
//       const { request } = await simulateContract(config, {
//         abi: abi,
//         address: contractAddress,
//         functionName: 'compoundTokens',
//       });
//       const hash = await writeContract(config, request);
//       const transactionReceipt = await waitForTransactionReceipt(config, {
//         // confirmations: 2,
//         hash: hash,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // Default value for contractTime to ensure it works even if conversionLock is not set
//   const contractTime = Number(conversionLock?.time) || 0; 

//   // console.log("contractTime", contractTime);

//   //  console.log("my purchase protection end time", protectionEndTimeAmount);
//   return (
//     <AppContext.Provider
//       value={{
//         contractTime:Number(conversionLock?.time) || 0,
//         ProtectionTime: Number(protectionEndTimeAmount) || 0,
//         CoolDownTime: Number(stealCooldownAmount) || 0,
//         gemBalance,
//         totalStacked,
//         conversionLock,
//         gemBalanceAmount,
//         noOfCompoundsAmount,
//         protectionEndTimeAmount,
//         stakedTokensAmount,
//         stealCooldownAmount,
//         stealStreakAmount,
//         ShowUpdatedData,
//         setProtectionEndTimeAmount,
//         setStakeAmount,
//         handleCompound,
//         handleStake,
//         setShowUpdatedData
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
