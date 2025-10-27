// src/components/WeatherDashboard.jsx
import React from 'react';

// --- Helper Icon Components (Defined first to avoid ReferenceError) ---

// SVG for the Sun Icon
const SunIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
// SVG for the Cloud Icon (using a simple cloud look)
const CloudIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.64-9.983 5.992 5.992 0 00-4.73-2.73 6 6 0 00-2.48 11.23z" /></svg>;
// SVG for the Cloud/Rain Icon
const CloudRainIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v.01M6 8v.01M16 16v.01M6 16v.01M12 8v.01M12 16v.01M12 12v.01M8 12h.01M16 12h.01M10 21h4c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 2.21 1.09 4.17 2.76 5.38M12 10v4" /></svg>;


// --- Data Structures (Now reference the correctly defined icon components) ---
const mainCityData = {
    city: 'New York, NY',
    date: 'Wednesday 04/03',
    temp: 29,
    // CRITICAL: Passing the component reference itself
    condition: 'Sun',
    iconComponent: SunIcon, // Use a clear, separate prop for the component
    details: { precipitation: '2%', humidity: '70%', wind: '3 Km/h' },
    hourlyTemps: [27, 26, 23, 23, 25, 21, 21, 22],
    hourlyTimes: ['5 AM', '8 AM', '11 AM', '2 PM', '5 PM', '8 PM', '11 PM', '2 AM'],
    weeklyForecast: [
        { day: 'Tue', temp: 29, icon: SunIcon, isToday: true },
        { day: 'Wed', temp: 29, icon: CloudIcon },
        { day: 'Thu', temp: 20, icon: CloudRainIcon },
        { day: 'Fri', temp: 29, icon: SunIcon },
        { day: 'Sat', temp: 29, icon: SunIcon },
        { day: 'Sun', temp: 29, icon: CloudIcon },
        { day: 'Mon', temp: 30, icon: SunIcon },
        { day: 'Tue', temp: 27, icon: CloudRainIcon },
    ]
};

const miniCardsData = [
    { city: 'Ankara', temp: 32, icon: SunIcon, time: '2:30 AM', gradient: 'from-orange-500 to-red-500', details: { precipitation: '0%', humidity: '41%', wind: '7 Km/h' } },
    { city: 'Alaska', temp: 16, icon: CloudRainIcon, time: '3:00 AM', gradient: 'from-blue-600 to-indigo-700', details: { precipitation: '18%', humidity: '35%', wind: '10 Km/h' } },
    { city: 'Berlin', temp: 24, icon: CloudIcon, time: '1:00 PM', gradient: 'from-green-500 to-lime-600', details: { precipitation: '7%', humidity: '50%', wind: '11 Km/h' } },
    { city: 'Paris', temp: 27, icon: CloudRainIcon, time: '10:00 PM', gradient: 'from-purple-600 to-fuchsia-700', details: { precipitation: '70%', humidity: '44%', wind: '14 Km/h' } },
];

// --- Sub-Component Functions ---

const MainWeatherCard = ({ data }) => {
    // Destructure the component reference
    const MainIconComponent = data.iconComponent;

    // Determine the max and min temps for charting scale
    const maxTemp = Math.max(...data.hourlyTemps);
    const minTemp = Math.min(...data.hourlyTemps);
    const tempRange = maxTemp - minTemp;

    // Function to calculate the y-coordinate for the temperature line
    const getY = (temp) => {
        if (tempRange === 0) return 80; 
        return 80 - ((temp - minTemp) / tempRange) * 60; 
    };

    // Generate SVG path for the temperature line
    const linePath = data.hourlyTemps.map((temp, index) => {
        const x = index * 40 + 20; 
        const y = getY(temp);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:col-span-2 h-full flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6 ">
                <div className="flex items-start space-x-4">
                    {/* CRITICAL FIX: Render the component directly */}
                    <MainIconComponent className="h-10 w-10 text-yellow-500" />
                    <div>
                        <div className="text-4xl font-light text-gray-800">{data.temp}°<span className="text-xl">C</span></div>
                        <div className="text-xs text-gray-500 mt-1">
                            Precipitation: {data.details.precipitation}
                            <br />
                            Humidity: {data.details.humidity}
                            <br />
                            Wind: {data.details.wind}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-xl font-bold text-gray-800">{data.city}</h3>
                    <p className="text-sm text-gray-500">{data.date}</p>
                </div>
            </div>

            {/* Hourly Chart Area (SVG) */}
            <div className="flex-grow w-full mb-4 relative" style={{ height: '140px' }}>
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path
                        d={`${linePath} L 300 100 L 0 100 Z`}
                        fill="#FEE2E2" 
                        stroke="none"
                    />
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#F56565" 
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                    {/* Data Points (Circles) and Labels */}
                    {data.hourlyTemps.map((temp, index) => {
                        const x = index * 40 + 20;
                        const y = getY(temp);
                        return (
                            <React.Fragment key={index}>
                                {/* Temperature Label */}
                                <text x={x} y={y - 8} fill="#374151" textAnchor="middle" fontSize="10">
                                    {temp}°
                                </text>
                                {/* Circle Point */}
                                <circle cx={x} cy={y} r="3" fill="#F56565" stroke="#FFFFFF" strokeWidth="1.5" />
                            </React.Fragment>
                        );
                    })}
                </svg>
                
                {/* Hourly Time Labels (Below the SVG) */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around px-2 text-xs text-gray-500">
                    {data.hourlyTimes.map((time, index) => (
                        <span key={index} className="w-10 text-center">{time}</span>
                    ))}
                </div>
            </div>

            {/* Weekly Forecast */}
            <div className="border-t pt-4 mt-6">
                <div className="grid grid-cols-8 gap-4 text-center text-sm">
                    {data.weeklyForecast.map((dayData, index) => {
                        const ForecastIcon = dayData.icon; // Get the component reference
                        return (
                            <div 
                                key={index} 
                                className={`flex flex-col items-center p-2 rounded-lg ${dayData.isToday ? 'bg-gray-100' : ''}`}
                            >
                                <p className="font-semibold text-gray-700">{dayData.day}</p>
                                <ForecastIcon className="h-5 w-5 my-1 text-gray-500" />
                                <p className="text-xs text-gray-500">{dayData.temp}°</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const MiniWeatherCard = ({ data }) => {
    const Icon = data.icon;

    return (
        <div className={`p-4 rounded-xl shadow-lg text-white bg-gradient-to-br ${data.gradient} h-full`}>
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-lg font-bold">{data.city}</h4>
                    <p className="text-xs opacity-80">{data.time}</p>
                </div>
                <Icon className="h-8 w-8 text-white fill-current opacity-80" />
            </div>
            
            <div className="mt-4 flex items-end justify-between">
                <p className="text-5xl font-light">{data.temp}°<span className="text-2xl font-normal">C</span></p>
                <div className="text-xs text-right opacity-90">
                    <p>P: {data.details.precipitation}</p>
                    <p>H: {data.details.humidity}</p>
                    <p>W: {data.details.wind}</p>
                </div>
            </div>
        </div>
    );
};


function WeatherDashboard() {
    // If you plan to import your stadium image, use this format:
    // import stadiumBackground from '../assets/stadium-bg.jpg';
    // const backgroundSource = stadiumBackground;
    
    // For now, use a stable, dark image URL to ensure visibility
    const backgroundSource = 'https://images.unsplash.com/photo-1549476464-325b5830e154?q=80&w=1920&auto=format&fit=crop';
    
    return (
        <section className="px-4 sm:px-6 lg:px-8 mt-10 mb-20">
            {/* Main Layout Grid: 2/3 width for chart, 1/3 for mini cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Large Main City Card (Spans 2 columns) */}
                <MainWeatherCard data={mainCityData} />

                {/* 2. Mini Cards Grid (Spans 1 column, divided into 4 stacked boxes) */}
                <div className="grid grid-rows-2 grid-cols-2 gap-4 lg:col-span-1">
                    {miniCardsData.map((data, index) => (
                        <MiniWeatherCard key={index} data={data} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WeatherDashboard;