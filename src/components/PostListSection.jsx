// src/components/PostListSection.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// Assuming you have a BookmarkIcon defined in Navbar.jsx or another common location.
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;


// Mock Data for demonstration (Replace with your Redux state/API call results)
const mockUserPosts = [
    { 
        id: '1', 
        title: 'Ultimate Guide to Deploying React Applications', 
        excerpt: 'A comprehensive step-by-step guide to setting up CI/CD pipelines for production deployment using various cloud platforms.', 
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop', // Laptop/Code image
        author: 'Behzad', 
        date: 'Oct 21, 2025', 
        avatarUrl: 'https://ui-avatars.com/api/?name=B&background=1f2937&color=fff' 
    },
    { 
        id: '2', 
        title: 'Mastering the Art of Tailwind CSS Components', 
        excerpt: 'Tips and tricks for building flexible, responsive, and maintainable UI components using Tailwind CSS utility classes.', 
        image: 'https://images.unsplash.com/photo-1549492423-ae558a2d3345?q=80&w=600&auto=format&fit=crop', // Abstract/Color image
        author: 'Behzad', 
        date: 'Oct 20, 2025', 
        avatarUrl: 'https://ui-avatars.com/api/?name=B&background=1f2937&color=fff' 
    },
    { 
        id: '3', 
        title: 'Firebase Authentication and State Management with Redux', 
        excerpt: 'Integrating Firebase auth flow with Redux Toolkit slices for robust and scalable user session management in large applications.', 
        image: 'https://images.unsplash.com/photo-1550009151-54b66b4c10a4?q=80&w=600&auto=format&fit=crop', // Fire image
        author: 'Behzad', 
        date: 'Oct 19, 2025', 
        avatarUrl: 'https://ui-avatars.com/api/?name=B&background=1f2937&color=fff' 
    },
];

// Reusing the detailed card style (similar to PopularPostsSection)
const PostCard = ({ post }) => (
    <NavLink to={`/posts/${post.id}`} className="block group">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl border border-gray-100">
            
            {/* 1. Image Area (Standard Post Card Look) */}
            <div className="relative overflow-hidden h-48 rounded-t-xl">
                <img 
                    src={post.image} 
                    alt={post.title} 
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
            
            {/* 3. Footer / Metadata Area */}
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


function PostListSection() {
  return (
    <>
        {/* Title/Header for the Post List (You can customize this title) */}
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
                My Created Posts
            </h2>
            {/* Navigation arrows (optional for scrolling lists) */}
            <div className="flex space-x-2">
                <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
        
        {/* Grid layout for the posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUserPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    </>
  );
}

export default PostListSection;