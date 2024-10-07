import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import UnlockGems from "../models/UnlockGems";
import WithDrawGems from "../models/WithDrawGems";

const Calculator = () => {
  const [inputValue, setInputValue] = useState(23);
  const [selectedOption, setSelectedOption] = useState('ETH');
  const [convertedValue, setConvertedValue] = useState(null); 


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleConversion = () => {
    if (!isNaN(inputValue)) {
      const conversionResult = inputValue * 2;
      setConvertedValue(conversionResult);
    } else {
      alert("Please enter a valid number");
    }
  };

  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='flex justify-center items-center h-screen  px-4'>
      <div className='shadow-lg p-8 rounded-lg bg-white bg-opacity-60 max-w-lg w-full'>
        <h2 className='text-center mb-6 font-semibold text-xl text-gray-700'>
            Calculator
        </h2>

        {/* Input Field */}
        <div className='mb-6'>
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            className='border rounded-md p-3 w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter value e.g. 0000.000'
          />
        </div>

        {/* Dropdown and Conversion Section */}
        <div className="flex justify-between items-center mb-6">
          <div className='w-1/2 pr-2'>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className='border rounded-md p-3 w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value='ETH'>ETH</option>
              <option value='TKR'>TKR</option>
            </select>
          </div>

          <FaArrowRightArrowLeft className="mx-2 text-2xl text-gray-600" />

          <div className='w-1/2 pl-2'>
            <button
              onClick={() => alert(`You entered: ${inputValue} ${selectedOption}`)}
              className='bg-blue-600 text-white py-3 px-4 rounded-md w-full hover:bg-blue-700'>
              {convertedValue ? `${convertedValue} ${selectedOption}` : "000.000"}
            </button>
          </div>
        </div>

        {/* Conversion button */}
        <div className='flex justify-center'>
          <button
            onClick={handleConversion}
            className='bg-green-600 text-white py-3 px-6 rounded-md w-full hover:bg-green-700'>
            Convert
          </button>
        </div>

       
        <div className="flex justify-between items-center mb-6 mt-8 gap-4 flex-col md:flex-row">
            <div className='w-full md:w-1/2'>
              <UnlockGems />
            </div>
            <div className='w-full md:w-1/2'>
              <WithDrawGems />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

