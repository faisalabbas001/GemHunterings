import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import UnlockGems from "../models/UnlockGems";
import WithDrawGems from "../models/WithDrawGems";
import { useAccount, useBalance } from 'wagmi';
import { polygonAmoy, sepolia,baseSepolia } from 'viem/chains';
import {
  abi,
  contractAddress,
  testTokenAddress,
  erc20Abi,
} from '../BlockChainContext/helper';
const Calculator = () => {
  const { address: userAddress } = useAccount();
  const [inputValue, setInputValue] = useState(23);
  const [selectedOption, setSelectedOption] = useState("ETH");
  const [convertedValue, setConvertedValue] = useState(null);
  const {
    data: balanceData,
    isError,
    isLoading,
  } = useBalance({
    address: userAddress,
    token: testTokenAddress, // If you're querying a token balance
    chainId: baseSepolia.id,
  });
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConversion = () => {
    if (!isNaN(inputValue) && inputValue.trim() !== "") {
      const value = parseFloat(inputValue); 
      let conversionResult = 0;

      if (selectedOption === "ETH") {
        conversionResult = value * 0.8; 
      } else if (selectedOption === balanceData?.symbol) {
        conversionResult = value; 
      }

      setConvertedValue(conversionResult.toFixed(2)); 
    } else {
      alert("Please enter a valid number");
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setConvertedValue(null); 
  };




  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div
        className="shadow-lg p-8 rounded-lg max-w-lg w-full"
        style={{
          backgroundImage: `url("/ConvertGems.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center mb-6 font-semibold text-xl text-white">
          Calculator
        </h2>

        {/* Input Field */}
        <div className="mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border rounded-md p-3 w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value e.g. 0000.000"
          />
        </div>

        {/* Dropdown and Conversion Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/2 pr-2">
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="border rounded-md p-3 w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ETH">ETH</option>
              <option value={balanceData?.symbol}>{balanceData?.symbol}</option>
            </select>
          </div>

          <FaArrowRightArrowLeft className="mx-2 text-2xl text-gray-600" />

          <div className="w-1/2 pl-2">
            <button
              onClick={() =>
                alert(`You entered: ${inputValue} ${selectedOption}`)
              }
              className="bg-blue-600 text-white py-3 px-4 rounded-md w-full hover:bg-blue-700"
            >
              {convertedValue
                ? `${convertedValue} ${selectedOption}`
                : "000.000"}
            </button>
          </div>
        </div>

        {/* Conversion Button */}
        <div className="flex justify-center">
          <button
            onClick={handleConversion}
            className="bg-green-600 text-white py-3 px-6 rounded-md w-full hover:bg-green-700"
          >
            Convert
          </button>
        </div>

        <div className="flex justify-between items-center mb-6 mt-8 gap-4 flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <UnlockGems />
          </div>
          <div className="w-full md:w-1/2">
            <WithDrawGems />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
