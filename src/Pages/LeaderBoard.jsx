import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('hunters'); // default tab
    const [filter, setFilter] = useState('all-time'); // default filter
    const [data, setData] = useState({
        hunters: [],
        stealers: [],
        defenders: [],
    });

    // Fetch data from API
    const GetDataFromApi = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/get-all/");
            const apiData = res.data;

            // Process and structure the data
            const hunters = apiData.sort((a, b) => parseFloat(b.stakedTokensAmount) - parseFloat(a.stakedTokensAmount)).slice(0, 5); // Top hunters based on stakedTokensAmount
            const stealers = apiData.sort((a, b) => parseFloat(b.stealStreakAmount) - parseFloat(a.stealStreakAmount)).slice(0, 5); // Top stealers based on stealStreakAmount
            const defenders = apiData.sort((a, b) => parseFloat(b.noOfCompoundsAmount) - parseFloat(a.noOfCompoundsAmount)).slice(0, 5); // Top defenders based on noOfCompoundsAmount

            setData({ hunters, stealers, defenders });
        } catch (error) {
            console.error("Error fetching API data:", error);
        }
    };

    useEffect(() => {
        GetDataFromApi();
    }, []);

    // Render leaderboard data based on the active tab and filter
    const renderData = () => {
        const activeData = activeTab === 'hunters' ? data.hunters : activeTab === 'stealers' ? data.stealers : data.defenders;

        return activeData.map((item, index) => (
            <div 
                key={index} 
                className="flex items-center justify-between bg-blue-gray-300 bg-opacity-30 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
                <span className="text-2xl">{activeTab === 'hunters' ? '🏹' : activeTab === 'stealers' ? '😈' : '🛡️'}</span>
                <span className="text-xl">{item.address}</span>
                <span>
                    {activeTab === 'hunters' 
                        ? `${parseFloat(item.stakedTokensAmount).toFixed(2)} tokens`
                        : activeTab === 'stealers'
                        ? `${parseFloat(item.stealStreakAmount).toFixed(2)} steals`
                        : `${parseFloat(item.noOfCompoundsAmount).toFixed(2)} defenses`}
                </span>
            </div>
        ));
    };

    return (
        <div className="min-h-screen bg-cover bg-center text-white">
            <div className="max-w-4xl mx-auto pt-10">
                <h1 className="text-5xl text-center font-extrabold mb-10">Leaderboard</h1>
                
                {/* Tabs */}
                <div className="flex justify-center space-x-4 mb-8 bg-black bg-opacity-30 rounded-lg p-4">
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
                        className={`px-6 py-3 rounded-xl text-lg ${activeTab === 'defenders' ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'} transition duration-300`}
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





