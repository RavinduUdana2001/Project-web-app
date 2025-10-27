// src/components/NewPostsSection.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// Helper component for the bookmark icon
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;

// 🚨 STEP 1: IMPORT YOUR IMAGES HERE!
// Replace these dummy paths with the actual relative paths to your images in the assets folder.
import imageMobile from '../assets/n1.jpg';
import imageSurfboards from '../assets/n2.jpg';
import imageSquirrel from '../assets/n3.jpg';
import imageCarNight from '../assets/n4.jpg';
import imageVinyl from '../assets/n5.jpg';
import imageGirlMusic from '../assets/n6.jpg';


// --- Data for the New Posts Grid (3 rows, 2 columns) ---
const newPosts = [
  {
    id: '101', title: '12 Mobile UX Design Trends For 2018', 
    excerpt: 'Things Move Quickly in the Mobile App Universe. To Succeed in The Field Of Mobile UX Design, Designers...',
    image: imageMobile, author: 'Jon Kantner', date: 'July 14, 2022', avatarUrl: 'https://ui-avatars.com/api/?name=J+K&background=F5A623&color=fff',
  },
  {
    id: '102', title: 'No Boat Bottomfish: Jetty Fishing On The...', 
    excerpt: 'Cast From The Rocks To Bring Home Fresh Fish Tacos In This Iconic Spring And Summer Fishery — Are You...',
    image: imageSurfboards, author: 'Louis Hodbreqets', date: 'July 13, 2022', avatarUrl: 'https://ui-avatars.com/api/?name=L+H&background=4CAF50&color=fff',
  },
  {
    id: '103', title: 'What A Disabled Squirrel Taught Me About Life...', 
    excerpt: 'Why It Helps To Know What It’s Like, And The Exquisite Beauty Of Empathy These Days, The Wood Patio Area...',
    image: imageSquirrel, author: 'James', date: 'July 12, 2022', avatarUrl: 'https://ui-avatars.com/api/?name=James&background=0D8ABC&color=fff',
  },
  {
    id: '104', title: 'Becoming A Self-Driving Car & Machine Learning...', 
    excerpt: 'How I Left My Full-Time Job, Studied At Udacity, And Landed A Job At BMW The Past Year Has Been Quite...',
    image: imageCarNight, author: 'Cassie Evans', date: 'July 12, 2022', avatarUrl: 'https://ui-avatars.com/api/?name=C+E&background=E91E63&color=fff',
  },
  {
    id: '105', title: 'How To Become A Master Designer', 
    excerpt: 'Many Outsiders Believe That Designers Are Unicorns, Gifted Or Special In Some Way. We Have An Innate...',
    image: imageVinyl, author: 'Linda', date: 'July 10, 2022', avatarUrl: 'https://ui-avatars.com/api/?name=Linda&background=9C27B0&color=fff',
  },
  {
    id: '106', title: 'This Free Course Can Teach You Music...', 
    excerpt: 'A Berlin-Based Music Software Company, Just Released A Free Interactive Music Course That Runs Right In Yo...',
    image: imageGirlMusic, author: 'Patricia', date: 'July 09, 2022', avatarUrl: 'https://ui-avatars.com/api/?name=Patricia&background=00BCD4&color=fff',
  },
];

// Component for a single New Post Card (Image on Left, Content on Right)
const NewPostCard = ({ post }) => (
  <NavLink to={`/posts/${post.id}`} className="block group">
    <div className="bg-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl border border-gray-100 flex h-48">
      
      {/* 1. Image Area (Left side) */}
      <div className="relative overflow-hidden w-2/5 flex-shrink-0">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-l-xl"
        />
      </div>

      {/* 2. Content Area (Right side) */}
      <div className="p-4 flex flex-col justify-between w-3/5">
        <div>
            <h3 className="text-md font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 leading-snug line-clamp-2">
                {post.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
        </div>

        {/* 3. Footer / Metadata Area */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-2">
              <img src={post.avatarUrl} alt={post.author} className="w-6 h-6 rounded-full" />
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
    </div>
  </NavLink>
);


function NewPostsSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-20">
      {/* Heading and Show All button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
            New Posts
        </h2>
        <NavLink to="/all-posts" className="text-sm font-medium text-gray-500 hover:text-red-600 flex items-center">
            Show All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </NavLink>
      </div>
      
      {/* Grid Layout: 2 columns, 3 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newPosts.map((post) => (
          <NewPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default NewPostsSection;