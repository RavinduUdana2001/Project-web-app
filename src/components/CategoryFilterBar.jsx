// src/components/CategoryFilterBar.jsx

import React from 'react';

// --- UPDATED Sample data with specific gradient classes to match the screenshot colors ---
const categories = [
  // These specific Tailwind gradients match the colors and depth in the screenshot:
  { name: 'Food', gradient: 'from-amber-600 to-red-600', icon: '🌶️' },        // Dark Yellow/Orange to Red
  { name: 'Animal', gradient: 'from-yellow-400 to-orange-500', icon: '🐾' },   // Light Yellow to Orange
  { name: 'Car', gradient: 'from-cyan-500 to-blue-600', icon: '🚗' },          // Light Blue to Deep Blue
  { name: 'Sport', gradient: 'from-green-500 to-emerald-600', icon: '⚽' },     // Green to Darker Green
  { name: 'Music', gradient: 'from-pink-500 to-purple-600', icon: '🎵' },      // Pink to Deep Purple
  { name: 'Technology', gradient: 'from-indigo-600 to-blue-800', icon: '💻' }, // Indigo to Navy Blue
  { name: 'Abstract', gradient: 'from-fuchsia-500 to-pink-600', icon: '🌌' },   // Fuchsia to Pink/Red
  
  // Additional categories adjusted for better visual variety
  { name: 'Travel', gradient: 'from-teal-400 to-cyan-500', icon: '✈️' },
  { name: 'Science', gradient: 'from-gray-600 to-gray-800', icon: '🔬' },
];

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

const CategoryFilterBar = () => {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="relative">
        <div className="flex items-center space-x-4 overflow-x-auto py-4 scrollbar-hide">
          
          {/* Helper to hide the scrollbar */}
          <style jsx="true">{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}</style>
          
          {categories.map((category) => (
            <button
              key={category.name}
              // Applied the gradient class for a richer, two-tone color effect
              className={`flex-shrink-0 px-5 py-2 rounded-full text-white font-medium text-sm shadow-md hover:shadow-lg transition-shadow duration-200 
                          bg-gradient-to-r ${category.gradient} whitespace-nowrap`}
            >
              {category.icon && <span className="mr-1 text-base">{category.icon}</span>}
              {category.name}
            </button>
          ))}

          {/* --- Navigation Arrow/Fader on the Right --- */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center">
              {/* White fade effect to suggest more content */}
              <div className="w-16 h-full bg-gradient-to-l from-white via-white/80 to-transparent absolute right-0 z-10"></div>
              
              {/* Arrow button */}
              <button className="flex-shrink-0 p-2 ml-4 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-red-600 z-20">
                  <ChevronRightIcon />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar;