import React from 'react';

const Header = () => {
  return (
    <header className="p-4 relative">
      <div className="flex flex-col items-center text-center w-full">
        <img src="/logo.png" alt="logo" width={160} height={160} />
      
        <div className="mt-4">
          <h6 className="text-lg  text-white font-posey ">
            THE ETH REWARD POOL WITH THE 
          </h6>

          <h6 className="text-lg  text-white font-posey">
             BEST DAILY REWARDS!
          </h6>
          <h6 className="text-lg  text-white font-posey  mt-2">
            8% VARIABLE RETURNS DAILY
          </h6>
        </div>

        {/* Button positioned below the text on screens below 900px */}
        <button className="bg-white text-black py-2 px-4 rounded-lg mt-4 block lg:hidden">
          Connect
        </button>
      </div>

      {/* Button positioned in the top right on screens above 900px */}
      <button className="bg-white text-black py-1 px-4 fixed  rounded-2xl  hidden lg:block  top-10  hover:bg-green-700  right-4">
        Connect
      </button>
    </header>
  );
};

export default Header;
