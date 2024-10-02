import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext'; // Adjust path as needed

const Compound = () => {
  const { handleCompound } = useContext(AppContext); // Access handleCompound from context

  const handleClick = async () => {
    try {
      await handleCompound(); // Call the compound logic
      console.log("Compound successful!");
    } catch (error) {
      console.error("Compound failed:", error);
    }
  };

  return (
   

     <div className="flex flex-col flex-wrap sm:flex-row justify-between mt-7 space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={handleClick}  className="bg-[#8B0000] flex-1   rounded-2xl py-2 px-6 sm:px-4 text-lg text-white custom-button">
            Compound
          </button>
          </div>
  );
};

export default Compound;
