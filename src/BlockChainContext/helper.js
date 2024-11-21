//import {ethers,BigNumber} from 'ethers';
export const abi=[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_uniswapRouter",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_totalSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "ConversionLocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "ConversionReleased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DailyRewardsCashed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "toETH",
          "type": "bool"
        }
      ],
      "name": "GemsConverted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "HuntersHired",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "name": "ProtectionPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "attacker",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "StealAttempt",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "TokensUnstaked",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "addSupplyToContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "admins",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allTimeGems",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "attemptSteal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "numerator",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "denominator",
          "type": "uint256"
        }
      ],
      "name": "calculatePercentage",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "a",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "b",
          "type": "uint256"
        }
      ],
      "name": "calculatePercentageOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cashInDailyRewards",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "compoundTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "conversionLocks",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isReleased",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "toETH",
          "type": "bool"
        }
      ],
      "name": "convertGems",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "gemBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllUserData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "stakedTokensAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stakedTokensTimeStamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gemBalanceAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "noOfCompoundsAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "protectionEndTimeAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stealCooldownAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stealStreakAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "allTimeGemsBalance",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "time",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isReleased",
                  "type": "bool"
                }
              ],
              "internalType": "struct GemHunter3.ConversionLock",
              "name": "conversionLock",
              "type": "tuple"
            }
          ],
          "internalType": "struct GemHunter3.UserData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getDefenceBonusPercentage",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "stakedTokensAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stakedTokensTimeStamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gemBalanceAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "noOfCompoundsAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "protectionEndTimeAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stealCooldownAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stealStreakAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "allTimeGemsBalance",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "time",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isReleased",
                  "type": "bool"
                }
              ],
              "internalType": "struct GemHunter3.ConversionLock",
              "name": "conversionLock",
              "type": "tuple"
            }
          ],
          "internalType": "struct GemHunter3.UserData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserStakePercentage",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "holders",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialContractHoldings",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "isAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lastCashed",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "noOfCompounds",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "protectionEndTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "purchaseProtection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetStealCooldown",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stakeTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stakedTokens",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokens",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timeStamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stealCooldown",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stealStreak",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "uniswapRouter",
      "outputs": [
        {
          "internalType": "contract IUniswapV2Router02",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unstakeTokens",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawFromLock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
 
export const contractAddress="0x3fFC6BfD52f2c6d248f135D5d8f857AF37152A43";
export const decimal=18;

// export const formater = (value) => {
//   try {
//     // Convert the value to a string without scientific notation
//     //const valueAsString = value.toLocaleString('fullwide', { useGrouping: false });
//     return ethers.utils.formatUnits(BigNumber.from(valueAsString), 18); 
//   } catch (error) {
//     console.error("Error formatting value:", error);
//     return "N/A";
//   }
// };

// export const formaterWithInteger = (value) => {
// 	try {
// 		// Ensure the value is a BigNumber and avoid converting it to a floating-point number
// 		const bigValue = BigNumber.from(value); // Handle it as a BigNumber from the start
	
// 		// Format the BigNumber value using 18 decimals (assuming the value is in Wei or other 18 decimal units)
// 		const formattedValue = ethers.utils.formatUnits(bigValue, 18);
	
// 		return formattedValue;
// 	  } catch (error) {
// 		console.error("Error formatting value:", error);
// 		return "N/A";
// 	  }
//   };

export const erc20Abi = [
	{
	  constant: true,
	  inputs: [],
	  name: 'name',
	  outputs: [
		{
		  name: '',
		  type: 'string',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: false,
	  inputs: [
		{
		  name: '_spender',
		  type: 'address',
		},
		{
		  name: '_value',
		  type: 'uint256',
		},
	  ],
	  name: 'approve',
	  outputs: [
		{
		  name: '',
		  type: 'bool',
		},
	  ],
	  payable: false,
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [],
	  name: 'totalSupply',
	  outputs: [
		{
		  name: '',
		  type: 'uint256',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: false,
	  inputs: [
		{
		  name: '_from',
		  type: 'address',
		},
		{
		  name: '_to',
		  type: 'address',
		},
		{
		  name: '_value',
		  type: 'uint256',
		},
	  ],
	  name: 'transferFrom',
	  outputs: [
		{
		  name: '',
		  type: 'bool',
		},
	  ],
	  payable: false,
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [],
	  name: 'decimals',
	  outputs: [
		{
		  name: '',
		  type: 'uint8',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [
		{
		  name: '_owner',
		  type: 'address',
		},
	  ],
	  name: 'balanceOf',
	  outputs: [
		{
		  name: 'balance',
		  type: 'uint256',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [],
	  name: 'symbol',
	  outputs: [
		{
		  name: '',
		  type: 'string',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  constant: false,
	  inputs: [
		{
		  name: '_to',
		  type: 'address',
		},
		{
		  name: '_value',
		  type: 'uint256',
		},
	  ],
	  name: 'transfer',
	  outputs: [
		{
		  name: '',
		  type: 'bool',
		},
	  ],
	  payable: false,
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  constant: true,
	  inputs: [
		{
		  name: '_owner',
		  type: 'address',
		},
		{
		  name: '_spender',
		  type: 'address',
		},
	  ],
	  name: 'allowance',
	  outputs: [
		{
		  name: '',
		  type: 'uint256',
		},
	  ],
	  payable: false,
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  payable: true,
	  stateMutability: 'payable',
	  type: 'fallback',
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  name: 'owner',
		  type: 'address',
		},
		{
		  indexed: true,
		  name: 'spender',
		  type: 'address',
		},
		{
		  indexed: false,
		  name: 'value',
		  type: 'uint256',
		},
	  ],
	  name: 'Approval',
	  type: 'event',
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  name: 'from',
		  type: 'address',
		},
		{
		  indexed: true,
		  name: 'to',
		  type: 'address',
		},
		{
		  indexed: false,
		  name: 'value',
		  type: 'uint256',
		},
	  ],
	  name: 'Transfer',
	  type: 'event',
	},
  ];
export const testTokenAddress="0x23864Ad720a9285d1656D3466a5B2a7A28aE3C0F";
export const zeroAddress='0x0000000000000000000000000000000000000000';