import React from 'react';
import { Link } from 'react-router-dom';
import carImage from '../assets/12.jpg';
import musicImage from '../assets/123.jpg';
import monitorImage from '../assets/1234.jpg';

// --- Placeholder Data: REPLACE THESE IMAGE PATHS ---
const heroPosts = [
  {
    id: '1',
    title: 'How To Drive A Car Safely',
    description: 'Ah, The Joy of The Open Road—It’s a Good Feeling. But if You’re New To Driving, You May...',
    imageUrl: carImage, // <--- REPLACE THIS PATH
  },
  {
    id: '2',
    title: 'How To Make Dance Music',
    description: 'Download Torrents From Verified Or Trusted Uploaders. If You\'re A BitTorrent User Looking...',
    imageUrl: musicImage, // <--- REPLACE THIS PATH
  },
  {
    id: '3',
    title: 'Why I Stopped Using Multiple Monitor',
    description: 'A Single Monitor Manifesto - Many Developers Believe Multiple Monitors Improve Productivity. Studies Have Proven It, Right? Well, Keep In Mind, Of Many.',
    imageUrl: monitorImage, // <--- REPLACE THIS PATH
  },
];

// Helper component for the right arrow SVG
const RightArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

function HeroFeaturedPosts() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-8 mb-12">
      {/* Grid: lg:grid-cols-4 for 1/4 + 1/4 + 1/2 width split. h-[400px] for uniform height. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[400px]"> 
        
        {/* --- Card 1: Car Post (1/4 width) --- */}
        <Link 
          to={`/posts/${heroPosts[0].id}`} 
          key={heroPosts[0].id} 
          className="relative rounded-xl overflow-hidden block group shadow-lg transition-all duration-300 border-2 border-transparent hover:border-gray-300 hover:ring-1 hover:ring-gray-300 hover:shadow-xl lg:col-span-1"
        >
          <img 
            src={heroPosts[0].imageUrl} 
            alt={heroPosts[0].title} 
            // Important: Use onError to debug image loading if needed
            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x400?text=Image+Not+Found" }}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Text Overlay: Dark Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 px-4 py-3 text-white">
            {/* Text styling refined to match the screenshot's density */}
            <h3 className="text-lg font-bold leading-snug">{heroPosts[0].title}</h3>
            <p className="text-xs text-gray-300 mt-1 line-clamp-2">{heroPosts[0].description}</p>
          </div>
        </Link>

        {/* --- Card 2: Music Post (1/4 width) --- */}
        <Link 
          to={`/posts/${heroPosts[1].id}`} 
          key={heroPosts[1].id} 
          className="relative rounded-xl overflow-hidden block group shadow-lg transition-all duration-300 border-2 border-transparent hover:border-gray-300 hover:ring-1 hover:ring-gray-300 hover:shadow-xl lg:col-span-1"
        >
          <img 
            src={heroPosts[1].imageUrl} 
            alt={heroPosts[1].title} 
            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x400?text=Image+Not+Found" }}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 px-4 py-3 text-white">
            {/* Text styling refined to match the screenshot's density */}
            <h3 className="text-lg font-bold leading-snug">{heroPosts[1].title}</h3>
            <p className="text-xs text-gray-300 mt-1 line-clamp-2">{heroPosts[1].description}</p>
          </div>
        </Link>

        {/* --- Card 3: Monitor Post (1/2 width - "bit wider") --- */}
        <div className="relative rounded-xl overflow-hidden group shadow-lg transition-shadow duration-300 lg:col-span-2 h-full"> 
          <Link to={`/posts/${heroPosts[2].id}`} className="block h-full">
            <img 
              src={heroPosts[2].imageUrl} 
              alt={heroPosts[2].title} 
              onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/800x400?text=Image+Not+Found" }}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            {/* The semi-transparent white box for the text, matching the screenshot */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-8 text-white bg-white/10 backdrop-blur-sm">
                <h2 className="text-2xl sm:text-3xl font-bold mt-1 leading-tight text-white">{heroPosts[2].title}</h2>
                <p className="text-sm text-gray-200 mt-3 max-w-2xl">{heroPosts[2].description}</p>
            </div>
          </Link>
          
          {/* Navigation Arrow */}
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-10"
          >
            <RightArrowIcon />
          </button>

          {/* Carousel Dots - Matching screenshot's appearance */}
          <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
            {[...Array(4)].map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${index === 1 ? 'bg-white' : 'bg-gray-400/70'}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroFeaturedPosts;