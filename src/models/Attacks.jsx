import React, { useState } from 'react';

export default function Attacks() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAttack = () => {
    setLoading(true); // Start loading when attack is initiated

    // Simulate some delay for the attack process
    setTimeout(() => {
      setLoading(false); // Stop loading after the attack process is done
      // You can replace this with your actual logic
    }, 500); // Example: 2 seconds loading time
  };

  return (
    <div>
      <button onClick={handleOpen} className="bg-[#8B0000] rounded-2xl py-1.5 px-20 text-lg text-white custom-button" style={{ width: '100%' }}>
        Attacks
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded shadow-lg w-full max-w-md">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900"
            >
              ✖️ {/* Simple cross icon */}
            </button>
            <input
              type="text"
              placeholder="602,806,327,588 HEX"
              className="w-full p-2 mt-7 border text-black border-gray-300 rounded"
            />

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded relative"
              disabled={loading}
              onClick={handleAttack}
            >
              {loading && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  role="status"
                >
                  <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-white"
                  >
                    <span className="!absolute !m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              )}
              <span className={loading ? 'invisible' : ''}>
                Attack
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
