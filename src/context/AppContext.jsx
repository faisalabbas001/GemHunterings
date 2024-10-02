import { createContext, useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi'; 
import { readContract } from '@wagmi/core'; 
import { formatEther } from 'ethers'; 
import { sepolia } from 'viem/chains'; 
import {
  abi,
  contractAddress,
  testTokenAddress,
} from '../BlockChainContext/helper';

import { config } from '../BlockChainContext/config';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { address: userAddress } = useAccount();

  // State variables
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
  const [OneMinuteTimer, setOneMinuteTimer] = useState(0);
  const [ShowUpdatedData, setShowUpdatedData] = useState(false);
  
  const {
    data: balanceData,
    isError,
    isLoading,
  } = useBalance({
    address: userAddress,
    token: testTokenAddress,
    chainId: sepolia.id,
  });
  
  console.log(balanceData);

  async function getUserData() {
    try {
      const result = await readContract(config, {
        abi,
        address: contractAddress,
        functionName: 'getUserData',
        args: [userAddress],
      });
      console.log("Results is that here", result);
      setShowUpdatedData(true);
      setGemBalance(Number(result.gemBalanceAmount));
      setTotalStacke(formatEther(result.stakedTokensAmount));
      setConversionLock(result?.conversionLock);
      setGemBalance(formatEther(result?.gemBalanceAmount));
      setNoOfCompoundsAmount(Number(result?.noOfCompoundsAmount));
      setProtectionEndTimeAmount(Number(result?.protectionEndTimeAmount));
      setStakedTokensAmount(Number(result?.stakedTokensAmount));
      setStealCooldownAmount(Number(result?.stealCooldownAmount));
      setStealStreakAmount(Number(result?.stealStreakAmount));
      
    } catch (error) {
      console.log(error);
    }
  }

  // Function to initialize the OneMinuteTimer
  const initializeTimer = () => {
    const currentTimestamp = Date.now();
    const storedExpiry = localStorage.getItem('conversionLockExpiry');
    const expiryAsNumber = storedExpiry ? parseInt(storedExpiry, 10) : null;

    console.log('Current Timestamp:', currentTimestamp);
    console.log('Stored Expiry:', storedExpiry);

    if (expiryAsNumber) {
      if (currentTimestamp < expiryAsNumber) {
        
        const remainingTime = Math.floor((expiryAsNumber - currentTimestamp) / 1000);
        console.log('Remaining Time:', remainingTime);
        setOneMinuteTimer(remainingTime > 0 ? remainingTime : 0);
      } else {
       
        console.log('Timer expired, clearing stored expiry.');
        localStorage.removeItem('conversionLockExpiry');
        setOneMinuteTimer(0); 
      }
    } else {
      
      const newExpiry = currentTimestamp + 60 * 1000; 
      localStorage.setItem('conversionLockExpiry', newExpiry.toString());
      setOneMinuteTimer(60); 
      console.log('Setting new timer for 60 seconds.');
    }
  };

  useEffect(() => {
    initializeTimer();
    getUserData(); 
  }, []); 

  console.log("This is the gem balance", conversionLock?.time);
  console.log("My minutes timer", OneMinuteTimer); 

  return (
    <AppContext.Provider
      value={{
        contractTime: Number(conversionLock?.time) || 0,
        OneMinuteTimer,
        ProtectionTime: Number(protectionEndTimeAmount) || 0,
        CoolDownTime: Number(stealCooldownAmount) || 0,
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
        setStakeAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
