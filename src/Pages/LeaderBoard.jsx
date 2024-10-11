import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

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
            console.log(apiData);

            // Sort data for each category separately
            const hunters = [...apiData]
                .sort((a, b) => parseFloat(b.stakedTokensAmount) - parseFloat(a.stakedTokensAmount))
                .slice(0, 5); // Top hunters based on stakedTokensAmount
            const stealers = [...apiData]
                .sort((a, b) => parseFloat(b.stealStreakAmount) - parseFloat(a.stealStreakAmount))
                .slice(0, 5); // Top stealers based on stealStreakAmount
            const defenders = [...apiData]
                .sort((a, b) => parseFloat(b.noOfCompoundsAmount) - parseFloat(a.noOfCompoundsAmount))
                .slice(0, 5); // Top defenders based on noOfCompoundsAmount

            setData({ hunters, stealers, defenders });
        } catch (error) {
            console.error("Error fetching API data:", error);
        }
    };

    useEffect(() => {
        GetDataFromApi();
    }, []);

    // Helper function to filter data based on the 'filter' value
    const applyFilter = (items) => {
        dayjs.extend(utc);
        const now = dayjs(); // Current time
        
        return items.filter((item) => {
            const updatedAt = dayjs(item.updatedAt).utc(); // Parse and convert to UTC using dayjs
            console.log("Timestamp:", item.updatedAt);
            console.log("Comparison result:", updatedAt.isAfter(now.subtract(1, 'month')));
    
            switch (filter) {
                case 'daily': 
                    return updatedAt.isAfter(now.subtract(1, 'day')); // Check if within the last 24 hours
                case 'weekly': 
                    return updatedAt.isAfter(now.subtract(1, 'week')); // Check if within the last 7 days
                case 'monthly': 
                    return updatedAt.isAfter(now.subtract(1, 'month')); // Check if within the last 30 days
                case 'all-time': 
                default:
                    return true; // No filtering for 'all-time'
            }
        });
    };
    

    // Render leaderboard data based on the active tab and filter
    const renderData = () => {
        let activeData;
        if (activeTab === 'hunters') {
            activeData = applyFilter(data.hunters);
        } else if (activeTab === 'stealers') {
            activeData = applyFilter(data.stealers);
        } else {
            activeData = applyFilter(data.defenders);
        }

        // If no data matches the filter, display a 'No data' message
        if (activeData.length === 0) {
            return <div className="text-center text-white">No data found for the selected filter.</div>;
        }

        // Map over the filtered data and render it
        return activeData.map((item, index) => (
            <div 
                key={index} 
                className="flex min-w-[650px] items-center justify-between bg-blue-gray-300 bg-opacity-30 text-white p-4 rounded-lg shadow-lg transform hover:scale-95 transition duration-300 ease-in-out"
            >
                <span className="text-2xl mb-2 md:mb-0">
                    {activeTab === 'hunters' ? '🏹' : activeTab === 'stealers' ? '😈' : '🛡️'}
                </span>
                <span className="text-xl ms-2 md:ms-0 text-center md:text-left">{item.address}</span>
                <span className="text-center ms-2 md:ms-0 md:text-right min-w-fit">
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
        <div className="min-h-screen bg-cover bg-center text-white mt-14">
            <div className="max-w-4xl mx-auto pt-10 px-4 md:px-0">
                <h1 className="text-4xl md:text-5xl text-center font-sans font-extrabold text-white bg-black w-fit mb-10 mx-auto bg-opacity-20 p-2 rounded-lg">Leaderboard</h1>
                
                {/* Tabs */}
                <div className="flex flex-wrap justify-center md:justify-between gap-y-3 space-x-4 mb-8 bg-black bg-opacity-30 rounded-lg p-4">
                    <button 
                        onClick={() => setActiveTab('hunters')} 
                        className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-lg ${activeTab === 'hunters' ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'} transition duration-300`}
                    >
                        Top Hunters
                    </button>
                    <button 
                        onClick={() => setActiveTab('stealers')} 
                        className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-lg ${activeTab === 'stealers' ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'} transition duration-300`}
                    >
                        Top Stealers
                    </button>
                    <button 
                        onClick={() => setActiveTab('defenders')} 
                        className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-lg ${activeTab === 'defenders' ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'} transition duration-300`}
                    >
                        Top Defenders
                    </button>
                </div>

                {/* Filter Dropdown */}
                <div className="flex justify-center items-center mb-10">
                    <span className='mr-2 text-lg'>Filter:</span>
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
                <div className="space-y-4 overflow-x-auto bg-black bg-opacity-30 rounded-lg p-5 mb-10">
                    {renderData()}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
