import React from 'react';

// Sample data with specific gradient classes to match the colors in the screenshot
const categories = [
  // Gradient classes are defined to mimic the prominent colors from your image
  { name: 'Food', gradient: 'from-orange-500 to-red-600' },
  { name: 'Animal', gradient: 'from-yellow-400 to-amber-500' },
  { name: 'Car', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Sport', gradient: 'from-green-500 to-emerald-600' },
  { name: 'Music', gradient: 'from-purple-500 to-fuchsia-600' },
  { name: 'Technology', gradient: 'from-indigo-500 to-blue-700' },
  { name: 'Abstract', gradient: 'from-pink-500 to-red-500' },
  { name: 'Lifestyle', gradient: 'from-teal-500 to-cyan-600' },
  { name: 'Travel', gradient: 'from-lime-500 to-yellow-600' },
  { name: 'Science', gradient: 'from-gray-500 to-gray-700' },
];

// Helper component for the right arrow SVG
const RightArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

function CategoryFilterBar() {
  return (
    // Outer container for padding and border
    <div className="bg-white px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      
      {/* Scrollable container with relative positioning for the arrow/fade */}
      <div className="relative">
        
        {/* The actual scrollable list */}
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
              // Classes for gradient, full pill shape, text, and shadow
              className={`flex-shrink-0 px-5 py-2 rounded-full text-white font-medium text-sm shadow-md 
                          bg-gradient-to-r ${category.gradient} hover:shadow-lg transition-shadow duration-200 whitespace-nowrap`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* --- Navigation Arrow & Fade Fffect on the Right --- */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center">
            {/* The white fade effect */}
            <div className="w-16 h-full bg-gradient-to-l from-white via-white/80 to-transparent absolute right-0 z-10"></div>
            
            {/* The actual arrow button */}
            <button className="flex-shrink-0 p-2 ml-4 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-red-600 z-20">
                <RightArrowIcon />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar;