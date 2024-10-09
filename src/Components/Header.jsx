/* eslint-disable react/prop-types */
import { BsShieldFill } from "react-icons/bs"; 
import { AiTwotoneBell } from "react-icons/ai"; 
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Link } from "react-router-dom";
import PurchaseProtection from "../models/PurchaseProtection";
import moment from "moment";
const  Header = ({isNewNotificationOne,notifications,setIsNewOneNotification}) => {
  const { address, isConnected } = useAccount();
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(true);
  const [isProtectionsShieldActive,setisProtectionsShieldActive] = useState(false);
  const { open } = useWeb3Modal(); // Use this hook to get the open function

console.log('new notification' , notifications, isNewNotificationOne)
   

  return (
    <>
    <div className="flex justify-between items-center fixed top-0 w-full z-50 shadow-md px-4 py-2 h-[60px] sm:h-[70px] lg:h-[70px]  bg-gray-700 bg-opacity-80    opacity-3 ">
    <img
      src="/logo.jpg"
      alt="logo"
      className="cursor-pointer w-[60px] h-[40px] sm:w-[80px] sm:h-[50px] lg:w-[100px] lg:h-[60px]"
    />
    
  
    {/* Icon Container */}
    <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
    {/* <Link to="/leader-board" className="text-white text-[14px] sm:text-[17px] lg:text-[22px] ">Dashboard</Link> */}
    <Link to="/leader-board" className="text-white text-[14px] sm:text-[17px] lg:text-[22px] ">Leader-Board</Link>
    <Link to="/calculater" className="text-white text-[14px] sm:text-[17px] lg:text-[22px] ">Convert Gems</Link>
    <Link to="/faq" className="text-white text-[14px] sm:text-[17px] lg:text-[22px] ">Help/FAQ</Link>
    </div>
  
    {/* Wallet Connection Button */}
    <div className="top-10 right-4  flex items-center justify-center cursor-pointer">
        
        <button onClick={()=>setisProtectionsShieldActive(val=>!val)} className="  text-white me-2 text-lg relative sm:text-xl lg:text-2xl rounded-full bg-[#363A41] w-10 h-10 flex items-center justify-center ">
          <BsShieldFill className={` ${notificationPanelOpen ? "text-green-800 " : "text-red-700"} `} />
        </button>

      <button onClick={()=>{setNotificationPanelOpen(val=>!val)
        setIsNewNotification(false)
        setIsNewOneNotification(false)
      }} className=" text-white me-2 text-lg relative sm:text-xl lg:text-2xl rounded-full bg-[#363A41] w-10 h-10 flex items-center justify-center ">
        <AiTwotoneBell />
        {isNewNotificationOne && <div className=" absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white border-opacity-50 rounded-full animate-ping">
        </div>}
        {notificationPanelOpen && <div className="absolute px-2 top-12 text-black -right-2 t-0 w-72 min-h-32 max-h-[350px] overflow-y-auto scroll-smooth bg-white border-2 font-sans border-black bg-opacity-25 border-opacity-50 rounded-md">
               <h1>Notifications</h1>
               {
                notifications && notifications.length > 0 ?  notifications.map((item,index)=>(
                 <>
                 <div key={index} className="flex-col justify-between mb-3  items-center w-full min-h-10 px-2 bg-black bg-opacity-65 rounded-md  py-2">
                   <div className=" flex justify-between items-center "> <p className=" text-sm text-white">{item.message}</p>
                    {/* <button className="bg-red-500 text-white text-xs px-2 py-1 bg-opacity-25 rounded-full hover:bg-red-700">x</button> */}
                    </div>
                    <p className=" text-[12px] text-left text-white">{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
               </div>
                 </>
                )):
                <p>No new notifications!!</p>
               }
              </div>}
      </button>
      {isConnected ? (
        <button
          className="bg-[#363A41] text-white text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-3 py-1 sm:py-2 transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-2xl hover:bg-green-700"
          onClick={() => open()}
        >
          {address.slice(0, 4)}...{address.slice(-4)}
        </button>
      ) : (
        <button
          onClick={() => open()}
          className="bg-[#363A41] text-white text-[10px] sm:text-[12px] lg:text-[14px] px-2 sm:px-3 py-1 sm:py-2 transform scale-90 sm:scale-100 border border-white border-opacity-50 rounded-2xl hover:bg-green-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  
  </div>
  

    
  {
    isProtectionsShieldActive &&   <PurchaseProtection setisProtectionsShieldActive={setisProtectionsShieldActive}/>
  }
   </>
  );
};
export default Header;