

// import  { useState } from 'react';
// // import backgroundImage from './path-to-your-background-image.png'; // Update the path to your image

// const LeaderBoard = () => {
//     const [activeTab, setActiveTab] = useState('hunters'); // default tab
//     const [filter, setFilter] = useState('all-time'); // default filter

//     const huntersData = [
//         { avatar: '🥇', name: 'Hunter1', percentage: '40%' },
//         { avatar: '🥈', name: 'Hunter2', percentage: '30%' },
//         { avatar: '🥉', name: 'Hunter3', percentage: '20%' },
//         { avatar: '🏅', name: 'Hunter4', percentage: '7%' },
//         { avatar: '🏅', name: 'Hunter5', percentage: '3%' },
//     ];

//     const stealersData = [
//         { avatar: '😈', name: 'Stealer1', streak: '15' },
//         { avatar: '😈', name: 'Stealer2', streak: '12' },
//         { avatar: '😈', name: 'Stealer3', streak: '10' },
//         { avatar: '😈', name: 'Stealer4', streak: '7' },
//         { avatar: '😈', name: 'Stealer5', streak: '5' },
//     ];

//     const defendersData = [
//         { avatar: '🛡️', name: 'Defender1', defended: '20' },
//         { avatar: '🛡️', name: 'Defender2', defended: '18' },
//         { avatar: '🛡️', name: 'Defender3', defended: '15' },
//         { avatar: '🛡️', name: 'Defender4', defended: '12' },
//         { avatar: '🛡️', name: 'Defender5', defended: '10' },
//     ];

//     const renderData = () => {
//         if (activeTab === 'hunters') {
//             return huntersData.map((hunter, index) => (
//                 <div key={index} className="flex items-center justify-between text-white p-2">
//                     <span>{hunter.avatar}</span>
//                     <span>{hunter.name}</span>
//                     <span>{hunter.percentage}</span>
//                 </div>
//             ));
//         } else if (activeTab === 'stealers') {
//             return stealersData.map((stealer, index) => (
//                 <div key={index} className="flex items-center justify-between text-white p-2">
//                     <span>{stealer.avatar}</span>
//                     <span>{stealer.name}</span>
//                     <span>{stealer.streak} steals</span>
//                 </div>
//             ));
//         } else if (activeTab === 'defenders') {
//             return defendersData.map((defender, index) => (
//                 <div key={index} className="flex items-center justify-between text-white p-2">
//                     <span>{defender.avatar}</span>
//                     <span>{defender.name}</span>
//                     <span>{defender.defended} defenses</span>
//                 </div>
//             ));
//         }
//     };

//     return (
//         <div
//             className="min-h-screen bg-cover bg-center text-white"
//         >
//             <div className="max-w-4xl mx-auto pt-10">
//                 <h1 className="text-4xl text-center font-bold">Leaderboard</h1>
                
//                 {/* Tabs for switching between leaderboard categories */}
//                 <div className="flex justify-center space-x-4 mt-6">
//                     <button 
//                         onClick={() => setActiveTab('hunters')} 
//                         className={`px-4 py-2 rounded-lg ${activeTab === 'hunters' ? 'bg-purple-600' : 'bg-gray-700'}`}
//                     >
//                         Top Hunters
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('stealers')} 
//                         className={`px-4 py-2 rounded-lg ${activeTab === 'stealers' ? 'bg-purple-600' : 'bg-gray-700'}`}
//                     >
//                         Top Stealers
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('defenders')} 
//                         className={`px-4 py-2 rounded-lg ${activeTab === 'defenders' ? 'bg-purple-600' : 'bg-gray-700'}`}
//                     >
//                         Top Defenders
//                     </button>
//                 </div>

//                 {/* Filter for the leaderboard */}
//                 <div className="mt-6 text-center">
//                     <label htmlFor="filter" className="mr-2">Filter:</label>
//                     <select 
//                         id="filter" 
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                         className="text-black p-2 rounded-lg"
//                     >
//                         <option value="daily">Daily</option>
//                         <option value="weekly">Weekly</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="all-time">All Time</option>
//                     </select>
//                 </div>

//                 {/* Display the leaderboard data */}
//                 <div className="mt-10 bg-neutral-600 space-y-2">
//                     {renderData()}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeaderBoard;



import React, { useState } from 'react';

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('hunters'); // default tab
    const [filter, setFilter] = useState('all-time'); // default filter

    const huntersData = [
        { avatar: '🥇', name: 'Hunter1', percentage: '40%' },
        { avatar: '🥈', name: 'Hunter2', percentage: '30%' },
        { avatar: '🥉', name: 'Hunter3', percentage: '20%' },
        { avatar: '🏅', name: 'Hunter4', percentage: '7%' },
        { avatar: '🏅', name: 'Hunter5', percentage: '3%' },
    ];

    const stealersData = [
        { avatar: '😈', name: 'Stealer1', streak: '15' },
        { avatar: '😈', name: 'Stealer2', streak: '12' },
        { avatar: '😈', name: 'Stealer3', streak: '10' },
        { avatar: '😈', name: 'Stealer4', streak: '7' },
        { avatar: '😈', name: 'Stealer5', streak: '5' },
    ];

    const defendersData = [
        { avatar: '🛡️', name: 'Defender1', defended: '20' },
        { avatar: '🛡️', name: 'Defender2', defended: '18' },
        { avatar: '🛡️', name: 'Defender3', defended: '15' },
        { avatar: '🛡️', name: 'Defender4', defended: '12' },
        { avatar: '🛡️', name: 'Defender5', defended: '10' },
    ];

    const renderData = () => {
        const data = activeTab === 'hunters' ? huntersData : activeTab === 'stealers' ? stealersData : defendersData;
        
        return data.map((item, index) => (
            <div 
                key={index} 
                className="flex items-center justify-between bg-blue-gray-300 bg-opacity-30 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
                <span className="text-2xl">{item.avatar}</span>
                <span className="text-xl ">{item.name}</span>
                <span>{activeTab === 'hunters' ? item.percentage : activeTab === 'stealers' ? `${item.streak} steals` : `${item.defended} defenses`}</span>
            </div>
        ));
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center text-white"
        >
            <div className="max-w-4xl mx-auto pt-10">
                <h1 className="text-5xl text-center font-extrabold mb-10">Leaderboard</h1>
                
                {/* Tabs */}
                <div className="flex justify-center space-x-4 mb-8 bg-black  bg-opacity-30 rounded-lg p-4">
                    <button 
                        onClick={() => setActiveTab('hunters')} 
                        className={`px-6 py-3 rounded-xl text-lg ${activeTab === 'hunters' ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'} transition duration-300`}
                    >
                        Top Hunters
                    </button>
                    <button 
                        onClick={() => setActiveTab('stealers')} 
                        className={`px-6 py-3 rounded-xl text-lg ${activeTab === 'stealers' ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'} transition duration-300`}
                    >
                        Top Stealers
                    </button>
                    <button 
                        onClick={() => setActiveTab('defenders')} 
                        className={`px-6 py-3 rounded-xl  text-lg ${activeTab === 'defenders' ?'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'} transition duration-300`}
                    >
                        Top Defenders
                    </button>
                </div>

                {/* Filter Dropdown */}
                <div className="flex justify-center items-center mb-10">
                    <span className=' mr-2 text-lg'>filter</span>
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="text-black text-lg font-semibold p-2 rounded-lg bg-white bg-opacity-80 focus:outline-none"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="all-time">All Time</option>
                    </select>
                </div>

                {/* Leaderboard Data */}
                <div className="space-y-4  bg-black bg-opacity-30 rounded-lg p-5 mb-10">
                    {renderData()}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
