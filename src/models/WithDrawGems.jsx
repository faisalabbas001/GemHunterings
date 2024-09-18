import React, { useState, useEffect } from 'react';

export default function WithDrawGems() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('ETH'); // Set default value to 'ETH'
  const [warningMessage, setWarningMessage] = useState('20% will be deducted in the case of ETH'); // Set default warning message

  const handleOpen = () => {
    setLoading(true);  
    setTimeout(() => {
      setLoading(false);  
      setOpen(true);      
    }, 1000);
  };
  
  const handleClose = () => setOpen(false);
 

  return (
    <div className="text-center">
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-2 px-14 sm:px-14  text-lg text-white w-full flex items-center justify-center"
       
        style={{ minWidth: '160px' }} 
      >
        {/* Button Text (invisible when loading) */}
       
        WithDraw Gems
      

        {/* Conditionally render the loader when loading */}
       
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖️
            </button>

            {/* Modal content */}
            <input type="text" placeholder="Enter Amount" className="w-full p-2 mt-4 border text-black border-gray-300 rounded" />
            <h3 className="text-xl text-black">To Asset</h3>
            <select className='text-black' >
              <option value="ETH" className='text-black'>ETH</option>
              <option value="TKir">TKir</option>
            </select>
             <p className="text-lg text-black font-bold">20% will be deducted in the case of ETH</p>
          </div>
        </div>
      )}
    </div>
  );
}