/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import AppComponent from './AppComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';
import NotFound from './Pages/NotFound';
import Calculater from  "./Pages/calculater";
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import Toastify CSS

import moment from'moment';
import { ApiUrl } from './utils/Links';
import HelpFaq from './Pages/HelpFaq';

// Socket.IO client initialization
const socket = io('http://localhost:5000', {
  transports: ['websocket'],  // Force WebSocket transport only
}); // Replace with your actual server URL

function App() {
  const [notifications, setNotifications] = useState([]);
  const [isNewNotification, setIsNewNotification] = useState(false);
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
      //  displayToast(notification.message, notification.amount, notification.time);
      toast.info(`${notification.message} ${notification.amount ? `| Amount: ${notification.amount}` : ''} at ${moment(notification.time).format('h:mm:ss a')}`)
       setIsNewNotification(true)
     });

     socket.on('gemsConvertedNotification', (notification) => {
       console.log('Gems Converted Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
       setIsNewNotification(true)
     });

     socket.on('protectionPurchasedNotification', (notification) => {
       console.log('Protection Purchased Notification received:', notification);
       displayToast(notification.message, notification.protectionEndTime, notification.time);
       setIsNewNotification(true)
     });

     socket.on('stealAttemptNotification', (notification) => {
       console.log('Steal Attempt Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
       setIsNewNotification(true)
     });

     socket.on('conversionLockedNotification', (notification) => {
       console.log('Conversion Locked Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
       setIsNewNotification(true)
     });

     socket.on('conversionReleasedNotification', (notification) => {
       console.log('Conversion Released Notification received:', notification);
       displayToast(notification.message, notification.amount, notification.time);
       setIsNewNotification(true)
     });

     socket.on('tokensUnstakedNotification', (notification) => {
       console.log('Tokens Unstaked Notification received:', notification);
       displayToast(notification.message, '', notification.time);
       setIsNewNotification(true)
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


   const NotificationsData = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/${address ? address : ''}`);
      const latestNotifications = res.data.reverse(); // Reverse the array to show the latest first
      setNotifications(latestNotifications);
      console.log(latestNotifications);
    } catch (error) {
      console.log(error);
    }
  };
  

   useEffect(()=>{
    NotificationsData()
   },[address,isNewNotification])

   // Function to display the notification using Toast
   const displayToast = (message, detail, time) => {
    console.log("Notification:", message, detail, time);
    toast.info(`${message} ${detail ? `| Detail: ${detail}` : ''} at ${moment(time).format('h:mm:ss a')}`)};

   return (
     <>
       <BrowserRouter>
         <Routes>
           <Route index element={<AppComponent isNewNotification={isNewNotification} notifications={notifications} setIsNewNotification={setIsNewNotification} />} />
           <Route path="/leader-board" element={<LeaderBoard />} />
           <Route path='/faq' element={<HelpFaq/>} />
           <Route path="/calculater" element={<Calculater />} />
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
       <ToastContainer />
     </>
   );
}

export default App;
