import './App.css';
import AppComponent from './AppComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';
import NotFound from './Pages/NotFound';
import Calculater from  "./Pages/calculater";
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { io } from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import Toastify CSS

import moment from'moment';

// Socket.IO client initialization
const socket = io('http://localhost:5000'); // Replace with your actual server URL

function App() {
   const { address } = useAccount();

   useEffect(() => {
     // Verify WebSocket connection
     socket.on('connect', () => {
       console.log('Connected to WebSocket server');
     });

     // Cleanup on component unmount
     return () => {
       socket.off('connect');
     };
   }, []);

   useEffect(() => {
     // Register the user's wallet address when it's available
     if (address) {
       socket.emit('registerAddress', address);
       console.log("registerAddress", address);
     }

     // Event listeners for different blockchain events
     socket.on('huntersHiredNotification', (notification) => {
       console.log('Hunters Hired Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
     });

     socket.on('gemsConvertedNotification', (notification) => {
       console.log('Gems Converted Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
     });

     socket.on('protectionPurchasedNotification', (notification) => {
       console.log('Protection Purchased Notification received:', notification);
       displayToast(notification.message, notification.protectionEndTime, notification.time);
     });

     socket.on('stealAttemptNotification', (notification) => {
       console.log('Steal Attempt Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
     });

     socket.on('conversionLockedNotification', (notification) => {
       console.log('Conversion Locked Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
     });

     socket.on('conversionReleasedNotification', (notification) => {
       console.log('Conversion Released Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
     });

     socket.on('tokensUnstakedNotification', (notification) => {
       console.log('Tokens Unstaked Notification received:', notification);
       displayToast(notification.message, '', notification.time);
     });

     // Cleanup event listeners when the component unmounts
     return () => {
       socket.off('huntersHiredNotification');
       socket.off('gemsConvertedNotification');
       socket.off('protectionPurchasedNotification');
       socket.off('stealAttemptNotification');
       socket.off('conversionLockedNotification');
       socket.off('conversionReleasedNotification');
       socket.off('tokensUnstakedNotification');
     };
   }, [address]);

   // Function to display the notification using Toast
   const displayToast = (message, detail, time) => {
     console.log("Notification:", message, detail, time);
     toast(`${message} ${detail ? `| Detail: ${detail}` : ''} at ${moment(time).format('h:mm:ss a')}`, {
       position: 'top-right',
       autoClose: 10000,
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
           <Route index element={<AppComponent />} />
           <Route path="/leader-board" element={<LeaderBoard />} />
           <Route path="/calculater" element={<Calculater />} />
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     </>
   );
}

export default App;
