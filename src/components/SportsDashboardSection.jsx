// src/components/SportsDashboardSection.jsx
import React from 'react';

// 🚨 CRITICAL FIX: IMPORT ALL IMAGES HERE
// Replace 'stadium-bg.jpg', 'man-city-logo.png', and 'liverpool-logo.png' 
// with your actual filenames in the src/assets folder.
import stadiumBackground from '../assets/bg.jpg';
import manCityLogo from '../assets/img2.png';
import liverpoolLogo from '../assets/img.png';


// --- Card 1: Calendar Component ---
const CalendarCard = () => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 
    24, 25, 26, 27, 28, 29, 30,
    31, null, null, null, null, null, null
  ];

  return (
    <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-gray-100 h-full backdrop-blur-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Jan 2022</h3>
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {/* Days of the Week Header */}
        {daysOfWeek.map(day => (
          <div key={day} className="font-medium text-gray-500">{day}</div>
        ))}

        {/* Calendar Dates */}
        {dates.map((date, index) => (
          <div 
            key={index} 
            className={`py-1 rounded-full ${date === 22 ? 'bg-red-600 text-white font-bold' : 'text-gray-800'} ${date === null ? 'invisible' : 'hover:bg-gray-100 cursor-pointer'}`}
          >
            {date}
            {/* Dots to indicate events */}
            {date === 1 && <span className="block h-1 w-1 bg-blue-500 rounded-full mx-auto -mt-1"></span>}
            {date === 2 && <span className="block h-1 w-1 bg-green-500 rounded-full mx-auto -mt-1"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Card 2: League Table Component ---
const LeagueTableCard = () => {
  const standings = [
    { rank: 1, club: 'Manchester City', gp: 38, w: 29, d: 6, l: 3, f: 99, a: 26, gd: 73, pts: 93 },
    { rank: 2, club: 'Liverpool', gp: 38, w: 28, d: 8, l: 2, f: 94, a: 26, gd: 68, pts: 92 },
    { rank: 3, club: 'Chelsea', gp: 38, w: 21, d: 11, l: 6, f: 76, a: 33, gd: 43, pts: 74 },
    { rank: 4, club: 'Tottenham Hotspur', gp: 38, w: 22, d: 5, l: 11, f: 69, a: 40, gd: 29, pts: 71 },
    { rank: 5, club: 'Arsenal', gp: 38, w: 22, d: 3, l: 13, f: 61, a: 48, gd: 13, pts: 69 },
    { rank: 6, club: 'Manchester United', gp: 38, w: 16, d: 10, l: 12, f: 57, a: 57, gd: 0, pts: 58 },
  ];

  const tableHeaders = ['#', 'Club', 'GP', 'W', 'D', 'L', 'F', 'A', 'GD', 'Pts'];

  return (
    <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-gray-100 h-full backdrop-blur-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Club</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              {tableHeaders.map(header => (
                <th key={header} className={`py-1 ${header === 'Pts' ? 'text-right' : ''}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map(s => (
              <tr key={s.rank} className="border-b border-gray-100 last:border-b-0">
                <td className="py-1 font-medium">{s.rank}</td>
                <td className="py-1 flex items-center whitespace-nowrap">
                  <span className={`h-2 w-2 rounded-full mr-2 
                    ${s.rank <= 4 ? 'bg-green-600' : s.rank === 5 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  {s.club}
                </td>
                <td className="py-1">{s.gp}</td>
                <td className="py-1">{s.w}</td>
                <td className="py-1">{s.d}</td>
                <td className="py-1">{s.l}</td>
                <td className="py-1">{s.f}</td>
                <td className="py-1">{s.a}</td>
                <td className="py-1">{s.gd}</td>
                <td className="py-1 text-right font-bold">{s.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Card 3: Match Scorecard Component ---
const ScorecardCard = () => {
  return (
    <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-gray-100 h-full backdrop-blur-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">The Final Round</h3>
      
      <div className="flex flex-col items-center justify-center text-center pt-2">
        
        {/* Logos and VS */}
        <div className="flex items-center justify-center space-x-6 mb-4">
          <div className="flex flex-col items-center">
            {/* Man City Logo */}
            <img src={manCityLogo} alt="Man City Logo" className="w-16 h-16 object-contain mb-1" />
            <span className="text-sm font-semibold hidden lg:inline">Manchester City</span>
          </div>
          
          <div className="text-4xl font-extrabold text-red-600 mx-4">VS</div>
          
          <div className="flex flex-col items-center">
            {/* Liverpool Logo */}
            <img src={liverpoolLogo} alt="Liverpool Logo" className="w-16 h-16 object-contain mb-1" />
            <span className="text-sm font-semibold hidden lg:inline">Liverpool</span>
          </div>
        </div>
        
        <p className="text-md text-gray-600 font-medium mb-6">Sunday, August 8th</p>

        {/* Score Boxes: Matching the red/blue/black style in the screenshot */}
        <div className="flex items-center w-full">
          {/* Man City (Blue/Cyan color) */}
          <div className="bg-[#5BC0DE] text-white py-2 font-bold text-md text-center flex-1 rounded-l-lg whitespace-nowrap">
            Manch City
          </div>
          {/* Score box 1 (Black/Dark Gray) */}
          <div className="bg-gray-800 text-white py-2 font-bold text-xl w-12 text-center">
            00
          </div>
          {/* Score box 2 (Black/Dark Gray) */}
          <div className="bg-gray-800 text-white py-2 font-bold text-xl w-12 text-center">
            00
          </div>
          {/* Liverpool (Red/Maroon color) */}
          <div className="bg-[#D9534F] text-white py-2 font-bold text-md text-center flex-1 rounded-r-lg whitespace-nowrap">
            Liverpool
          </div>
        </div>
      </div>
    </div>
  );
};


function SportsDashboardSection() {
  return (
    // Outer container with the imported image URL and the dark/transparent overlay effect
    <div 
        className="bg-gray-900 bg-cover bg-center py-20"
        style={{ 
            // 🚨 Uses the imported variable `stadiumBackground`
            backgroundImage: `url(${stadiumBackground})`, 
            // The dark, transparent effect requested:
            backgroundBlendMode: 'multiply', 
            backgroundColor: 'rgba(0, 0, 0, 0.6)' 
        }}
    >
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* 3-Column Grid for the Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CalendarCard />
                <LeagueTableCard />
                <ScorecardCard />
            </div>
        </div>
    </div>
  );
}

export default SportsDashboardSection;