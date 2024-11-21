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
  console.log("cehking the prtection 55555555555",ProtectionTime)
  const [loading, setLoading] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(ProtectionTime - Math.floor(Date.now() / 1000));

  // Update remaining time in seconds on component mount
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const newRemainingTime = Math.max(ProtectionTime - currentTimeInSeconds, 0);
      setRemainingTimeInSeconds(newRemainingTime);
      if (newRemainingTime === 0) {
        setIsTimeUp(true);
        clearInterval(interval); // Stop the timer if time is up
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [ProtectionTime]);

  const handleAddDay = async () => {
    setLoading(true);
    try {
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'purchaseProtection',
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, { hash });

      // Update ProtectionTime in AppContext or re-fetch data as needed
      setShowUpdatedData(true);
      // toast.success('Protection purchased successfully!');

      // Update remaining time after successful purchase
      const newProtectionTime = Math.floor(Date.now() / 1000) + 86400; // Example: add 1 day
      setRemainingTimeInSeconds(newProtectionTime - Math.floor(Date.now() / 1000));
      setIsTimeUp(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to purchase protection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Completionist = () => <span>{isTimeUp ? 'Time To Take Action' : 'Retry After The Countdown'}</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return isTimeUp ? <span>Time to purchase protection</span> : <span>{`${hours}:${minutes}:${seconds}`}</span>;
    }
  };

  return (
    <div className="text-center">
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative  p-6 rounded-lg shadow-lg w-full max-w-md"   style={{
        backgroundImage: `url("/BuyProtection.jpeg")`,
        backgroundSize: 'cover', // Ensures the image covers the entire div
        backgroundPosition: '10% 33%', // Centers the image
        backgroundRepeat:"no-repeat"
      }}>
          <button
            onClick={() => setisProtectionsShieldActive(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            ✖️
          </button>

          <h3 className="text-xl text-black">Remaining Time</h3>
          <p className="mt-4 text-black font-semibold">Remaining Time ⏱⏱</p>
          <p className="text-lg text-black font-bold">
            <Countdown
              date={Date.now() + remainingTimeInSeconds * 1000} // Correct remaining time calculation
              renderer={renderer}
              onComplete={() => setIsTimeUp(true)} // Callback for countdown completion
            />
          </p>

          <button
            className="mt-6 bg-red-500 flex justify-center items-center text-white px-4 py-2 rounded w-full relative"
            disabled={!isTimeUp || loading}
            onClick={handleAddDay}
            style={{ backgroundColor: isTimeUp ? 'red' : 'gray' }}
          >
            Add 1 Day
          </button>
        </div>
      </div>
    </div>
  );
}




// ................................................................................................................................ 

// import  { useState, useContext, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { simulateContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';
// import { config } from '../BlockChainContext/config';
// import { abi, contractAddress } from '../BlockChainContext/helper';
// import Countdown from 'react-countdown';
// import { AppContext } from '../context/AppContext';

// // eslint-disable-next-line react/prop-types
// export default function PurchaseProtection({setisProtectionsShieldActive}) {
//   const { ProtectionTime,setShowUpdatedData } = useContext(AppContext); // Use ProtectionTime from context
// //   console.log("ProtectionTime is here, main value is: ", ProtectionTime); // Log the correct variable
// //  const ProtectionTime=1728035184
//   const [loading, setLoading] = useState(false);
//   const [isTimeUp, setIsTimeUp] = useState(false);


//   console.log("ProtectionTime is here, main value is: ", ProtectionTime); // Log the correct variable

//   const handleCountdownComplete = () => {
//     setIsTimeUp(true); // Enable the button when countdown is complete
//   };

//   const handleAddDay = async () => {
//     setIsTimeUp(true)
//     setLoading(true);
//     try {
//       const { request } = await simulateContract(config, {
//         abi,
//         address: contractAddress,
//         functionName: 'purchaseProtection',
//       });
//       const hash = await writeContract(config, request);
//       // toast.info(`Transaction sent! Hash: ${hash}`);
//       // eslint-disable-next-line no-unused-vars
//       const transactionReceipt = await waitForTransactionReceipt(config, {
//         hash: hash,
//       });
//       setIsTimeUp(false)
//       setShowUpdatedData(true)
//       // toast.success('Protection purchased successfully!');
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to purchase protection. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const Completionist = () => <span>{ isTimeUp ? 'Time To Take Action' : 'Retry After The Countdown'}</span>;

//   const renderer = ({ hours, minutes, seconds, completed }) => {
//     if (completed) {
//       return <Completionist />;
//     } else {
//       return isTimeUp ? <span>Time to purchase protection</span> : <span>{hours}:{minutes}:{seconds}</span>;
//     }
//   };

//   const currentTimeInSeconds = Math.floor(Date.now() / 1000);
//   const remainingTimeInSeconds = Math.max(ProtectionTime - currentTimeInSeconds, 0); // Use ProtectionTime

//    useEffect(() => {
//     if (remainingTimeInSeconds === 0) {
//       setIsTimeUp(true);
//     }
//   }, [isTimeUp]);
  

//   return (
//     <div className="text-center">
      
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <button
//               onClick={()=>setisProtectionsShieldActive(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//             >
//               ✖️
//             </button>

//             <h3 className="text-xl text-black">Remaining Time</h3>
//             <p className="mt-4 text-black font-semibold">Remaining Time ⏱⏱</p>
//             <p className="text-lg text-black font-bold">
//               <Countdown
//                 date={Date.now() + remainingTimeInSeconds * 1000} // Correct remaining time calculation
//                 renderer={renderer}
//                 onComplete={handleCountdownComplete}
//               />
//             </p>

//             <button
//               className="mt-6 bg-red-500 flex justify-center items-center text-white px-4 py-2 rounded w-full relative"
//               disabled={!isTimeUp || loading}
//               onClick={handleAddDay}
//               style={{ backgroundColor: isTimeUp ? 'red' : 'gray' }}
//             >
//                 Add 1 Day
//             </button>
//           </div>
//         </div>
      
//     </div>
//   );
// }


