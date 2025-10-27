// src/components/PopularPostsSection.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import imageKayak from '../assets/1.jpg'; 
import imageLaptop from '../assets/2.jpg';
import imageCar3D from '../assets/3.jpg';
import imageFood from '../assets/4.jpg';


// Helper component for the bookmark icon
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;


// --- Data for the Popular Posts Grid (Now using imported variables) ---
const popularPosts = [
  { 
    id: '4', 
    title: 'Opening Day of Boating Season, Seattle WA', 
    excerpt: 'Of Course The Puget Sound is very watery, And Where There is Water, There are Boats. Today is...',
    image: imageKayak, // 👈 Using the imported variable (which is now the correct URL)
    author: 'James',
    date: 'August 18, 2022',
    avatarUrl: 'https://ui-avatars.com/api/?name=James&background=0D8ABC&color=fff',
  },
  { 
    id: '5', 
    title: 'How to Choose the Right Laptop For...', 
    excerpt: 'Choosing The Right Laptop For Programming Can Be A Tough Process. It’s Easy To Get Confused...',
    image: imageLaptop, // 👈 Using the imported variable
    author: 'Louis Hodbreqets',
    date: 'July 25, 2022',
    avatarUrl: 'https://ui-avatars.com/api/?name=Louis+H&background=F5A623&color=fff',
  },
  { 
    id: '6', 
    title: 'How We Built the First Real Self-Driving Car', 
    excerpt: 'Electric Self-Driving Cars Will Save Millions Of Lives And Significantly Accelerate The World’s...',
    image: imageCar3D, // 👈 Using the imported variable
    author: 'Mary',
    date: 'July 14, 2022',
    avatarUrl: 'https://ui-avatars.com/api/?name=Mary&background=E91E63&color=fff',
  },
  { 
    id: '7', 
    title: 'How to Persuade Your Parents To Buy Fast...', 
    excerpt: 'Parents Often Don’t Want To Buy Fast Food. They May Be Worried That It’s Too Expensive, Or Unheale...',
    image: imageFood, // 👈 Using the imported variable
    author: 'Jon Kantner',
    date: 'May 19, 2022',
    avatarUrl: 'https://ui-avatars.com/api/?name=Jon+K&background=4CAF50&color=fff',
  },
];

// Component for a single Popular Post Card
const PopularPostCard = ({ post }) => (
  <NavLink to={`/posts/${post.id}`} className="block group">
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl border border-gray-100">
      
      {/* 1. Image Area */}
      <div className="relative overflow-hidden h-48 rounded-t-xl">
        <img 
          src={post.image} 
          alt={post.title} 
          // The error handler is kept as a safeguard
          onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x200?text=Image+Not+Found" }}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* 2. Content Area */}
      <div className="p-4 pt-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200 leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
      </div>
      
      {/* 3. Footer / Metadata Area (Matches the bottom part of the screenshot) */}
      <div className="flex items-center justify-between p-4 border-t border-gray-100 mt-2">
        <div className="flex items-center space-x-2">
            <img src={post.avatarUrl} alt={post.author} className="w-8 h-8 rounded-full" />
            <div>
                <p className="text-xs font-medium text-gray-800">{post.author}</p>
                <p className="text-xs text-gray-500">{post.date}</p>
            </div>
        </div>
        
        {/* Bookmark Icon */}
        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
            <BookmarkIcon />
        </button>
      </div>
    </div>
  </NavLink>
);

// Component to structure the heading and the grid
function PopularPostsSection() {
  // Arrow icons for the section heading
  const LeftArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
  const RightArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;

  return (
    <>
      {/* Popular Posts Heading and Navigation Arrows */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
            Popular Posts
        </h2>
        
        {/* Navigation arrows (matching the small arrows in the screenshot) */}
        <div className="flex space-x-2">
            <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
                <LeftArrowIcon />
            </button>
            <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
                <RightArrowIcon />
            </button>
        </div>
      </div>
      
      {/* Grid layout for the posts (4 columns on large screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularPosts.map((post) => (
          <PopularPostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default PopularPostsSection;