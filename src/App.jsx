import './App.css';
import AppComponent from './AppComponent';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';
import NotFound from './Pages/NotFound';
import Calculater from  "./Pages/calculater";
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { io } from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';

// Socket.IO client initialization
const socket = io('http://localhost:5000'); // Your server URL


function App() {
   const {address: userAddress} = useAccount();

   useEffect(() => {
    // Register user's wallet address on connection
    socket.emit('registerAddress', userAddress);

    // Event listeners for all the different blockchain events
    socket.on('huntersHiredNotification', (notification) => {
      displayToast(notification.message, notification.amount, notification.time);
      console.log(notification);
    });

    socket.on('gemsConvertedNotification', (notification) => {
      displayToast(notification.message, notification.amount, notification.time);
      console.log(notification);
    });

    socket.on('protectionPurchasedNotification', (notification) => {
      displayToast(notification.message, notification.protectionEndTime, notification.time);
      console.log(notification);
    });

    socket.on('stealAttemptNotification', (notification) => {
      displayToast(notification.message, notification.amount, notification.time);
      console.log(notification);
    });

    socket.on('conversionLockedNotification', (notification) => {
      displayToast(notification.message, notification.amount, notification.time);
      console.log(notification);
    });

    socket.on('conversionReleasedNotification', (notification) => {
      displayToast(notification.message, notification.amount, notification.time);
      console.log(notification);
    });

    socket.on('tokensUnstakedNotification', (notification) => {
      displayToast(notification.message, '', notification.time);
      console.log(notification)
    });

    return () => {
      // Cleanup event listeners when the component unmounts
      socket.off('huntersHiredNotification');
      socket.off('gemsConvertedNotification');
      socket.off('protectionPurchasedNotification');
      socket.off('stealAttemptNotification');
      socket.off('conversionLockedNotification');
      socket.off('conversionReleasedNotification');
      socket.off('tokensUnstakedNotification');
    };
  }, [userAddress]);

  // Function to display the notification using Toast
  const displayToast = (message, detail, time) => {
    console.log( "notification",message, detail, time)
    toast(`${message} ${detail ? `| Detail: ${detail}` : ''} at ${time}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: 'info',
    });
  };
 

  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route index element={<AppComponent />}/>
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/calculater" element={<Calculater/>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
