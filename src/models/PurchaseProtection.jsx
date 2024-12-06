import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { simulateContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../BlockChainContext/config';
import { abi, contractAddress } from '../BlockChainContext/helper';
import Countdown from 'react-countdown';
import { AppContext } from '../context/AppContext';

// eslint-disable-next-line react/prop-types
export default function PurchaseProtection({ setisProtectionsShieldActive }) {
    const { ProtectionTime, setShowUpdatedData } = useContext(AppContext);
  // const ProtectionTime = 173348908900
  const [loading, setLoading] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(
    Math.max(ProtectionTime - Math.floor(Date.now() / 1000), 0)
  );

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const newRemainingTime = Math.max(ProtectionTime - currentTime, 0);

      setRemainingTimeInSeconds(newRemainingTime);

      if (newRemainingTime === 0) {
        setIsTimeUp(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [ProtectionTime]);

  const handleAddDay = async () => {
    setLoading(true);
    try {
      // Simulate and write contract
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'purchaseProtection',
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });

      // Update data after successful transaction
      setShowUpdatedData(true);
      toast.success('Protection purchased successfully!');

      // Extend protection by one day
      const newProtectionTime = Math.floor(Date.now() / 1000) + 86400; // Add 1 day (86400 seconds)
      setRemainingTimeInSeconds(newProtectionTime - Math.floor(Date.now() / 1000));
      setIsTimeUp(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to purchase protection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Countdown completion handler
  const handleCountdownComplete = () => setIsTimeUp(true);

  // Countdown renderer
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed || isTimeUp) {
      return <span>Time to take action</span>;
    }
    return <span>{`${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>;
  };

  return (
    <div className="text-center">
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="relative p-6 rounded-lg shadow-lg w-full max-w-md"
          style={{
            backgroundImage: `url("/BuyProtection.jpeg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <button
            onClick={() => setisProtectionsShieldActive(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            ✖️
          </button>

          <h3 className="text-xl text-black font-semibold">Protection Timer</h3>
          <p className="mt-4 text-black font-semibold">Remaining Time ⏱</p>
          <p className="text-lg text-black font-bold">
            <Countdown
              date={Date.now() + remainingTimeInSeconds * 1000}
              renderer={renderer}
              onComplete={handleCountdownComplete}
            />
          </p>

          <button
            className="mt-6 flex justify-center items-center text-white px-4 py-2 rounded w-full"
            disabled={!isTimeUp || loading}
            onClick={handleAddDay}
            style={{
              backgroundColor: isTimeUp ? 'red' : 'gray',
              cursor: isTimeUp ? 'pointer' : 'not-allowed',
            }}
          >
            {loading ? 'Processing...' : 'Add 1 Day'}
          </button>
        </div>
      </div>
    </div>
  );
}
