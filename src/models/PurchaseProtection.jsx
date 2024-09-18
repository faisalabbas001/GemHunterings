import React, { useState, useEffect } from 'react';

export default function PurchaseProtection() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');
  const [customDate, setCustomDate] = useState(new Date('2024-09-18T00:00:00'));
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleOpen = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 500);
  };

  const handleClose = () => setOpen(false);

  const handleAddDay = () => {
    setCustomDate((prevDate) => new Date(prevDate.getTime() + 24 * 60 * 60 * 1000));
  };

  const calculateRemainingTime = (targetDate) => {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
      setIsTimeUp(true);
      return 'Time is up!';
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime(customDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [customDate]);

  return (
    <div className="text-center">
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="bg-[#8B0000] rounded-2xl py-2 sm:px-6 text-lg text-white w-full flex items-center justify-center"
      >
      
        Purchase Protection

        
        
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
            <h3 className="text-xl text-black">Remaining Time</h3>
            <p className="mt-4 text-black font-semibold">Remaining Time ⏱⏱</p>
            <p className="text-lg text-black font-bold">{remainingTime}</p>

            {/* Add 1 Day button */}
            <button
              onClick={handleAddDay}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded w-full"
              disabled={isTimeUp}
              // style={{ filter: isTimeUp ? 'blur(3px)' : 'none' }}
              style={{backgroundColor: isTimeUp ? 'gray' : 'red'}}

            >
              Add 1 Day
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
