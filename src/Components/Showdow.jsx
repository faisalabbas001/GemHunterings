import React from 'react';
import './shadow.css'; // Import the CSS file

const Showdow = () => {
  return (
    <div className="bg-[#FF0000] custom-shadow rounded-2xl p-6 max-w-sm mx-auto mt-12 text-white text-center">
      {/* Rows with Left and Right Text */}
      <div className="flex justify-between mb-4">
        <p>Contract</p>
        <p>0 ETH</p>
      </div>
      <div className="flex justify-between mb-4">
        <p>Wallet</p>
        <p>0 ETH</p>
      </div>
      <div className="flex justify-between mb-4">
        <p>Your Miners</p>
        <p>0 MINERS</p>
      </div>

      {/* Input Field */}
      <div className="flex items-center border-4 border-black bg-white p-2 rounded-lg">
  <input
    type="search"
    className="flex-1 text-black text-right outline-none pr-12"
    placeholder="0"
  />
  <div className="flex items-center ml-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2 cursor-pointer text-blue-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <p className="text-black text-xs md:text-sm lg:text-base flex-shrink-0">
      ETH
    </p>
  </div>
</div>


      {/* Percentage Buttons */}
      <div className="grid grid-cols-5 gap-2 mb-4 mt-2">
        <button className="bg-white text-black hover:bg-green-700 rounded-2xl py-1">25%</button>
        <button className="bg-white text-black hover:bg-green-700 rounded-2xl">50%</button>
        <button className="bg-white text-black hover:bg-green-700 rounded-2xl">75%</button>
        <button className="bg-white text-black hover:bg-green-700 rounded-2xl">100%</button>
        <button className="bg-white text-black hover:bg-green-700 rounded-2xl">MAX</button>
      </div>

      {/* Down Manner Button */}
      <button className="bg-[#8B0000] rounded-md py-3 w-full text-lg text-white custom-button">
        HIRE MINERS
      </button>

      <div className="flex justify-between mt-7 ">
        <p>RE-HIRE</p>
        <p>YOUR REWARDS</p>
      </div>
      <div className="flex justify-between mt-7">
        <p>0 DIAMONDS</p>
        <p>0.00000000 ETH</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-[#8B0000] rounded-2xl py-2 px-6 sm:px-12 text-lg  custom-button text-white">
          RE-HIRE
        </button>
        <button className="bg-[#8B0000] rounded-2xl py-2 px-6 sm:px-4 text-lg text-white custom-button">
          SELL DIAMONDS
        </button>
      </div>
    </div>
  );
};

export default Showdow;
