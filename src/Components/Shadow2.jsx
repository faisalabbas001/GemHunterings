import React from 'react';

const Shadow2 = () => {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className=" max-w-sm p-4  mb-2 rounded-lg bg-[#FF0000] text-white">
      
        <input
          type="text"
          readOnly
          className="w-full p-2 border-4 border-black rounded-md mb-4 bg-white text-black" // Adjust text color as needed
          value=""
        />
        <div className="mb-4">
          <button className="w-full py-2 px-4 bg-[#8B0000] text-white rounded-md hover:bg-green-700 ">
            Copy Link
          </button>
        </div>
        <p className="text-white text-sm font-sans">
          Invite your friends using this link and earn ~10% of any Miners they hire and 1% of additional re-hirings. Referral Rewards are additional and are not deducted from your friend's Ethereum.
        </p>
      </div>
    </div>
  );
};

export default Shadow2;
