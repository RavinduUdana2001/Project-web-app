// src/components/LatestVideosSection.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// Helper for Icons
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white fill-current opacity-90 transition-opacity duration-300 group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;
const RightArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const LeftArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;


// 🚨 CRITICAL FIX: The image imports MUST come BEFORE the data arrays that use them.
// Ensure these paths are correct relative to your src/assets folder.
import featuredVideoImg from '../assets/123.jpg';
import boxingImg from '../assets/n4.jpg';
import poachedEggsImg from '../assets/n3.jpg';
import headphonesImg from '../assets/n1.jpg';
import laptopPurpleImg from '../assets/123.jpg';


// --- Data for the Latest Videos Section ---
const featuredVideo = {
    id: '201',
    title: 'How Music Affects Your Brain (Plus 11 Artists To Listen At Work)',
    excerpt: 'You’ve Read All Your Free Member-Only Stories. Become A Member To Get Unlimited Access. Your Membership Fee Supports The Voices You Want To Hear More From.',
    image: featuredVideoImg,
    videoUrl: 'https://www.youtube.com/watch?v=kYv_8A3T2uE', 
};

const smallPosts = [
    {
        id: '202', title: '5 Reasons Why You Should Wrap...',
        excerpt: 'So, You Finally Went To Your First Boxing Class And Learned The Basics Of The Sport. You Also Learned That It’s Recommended To Wrap Your Hands Before Putting On The Gloves. But There Are Times When You Just...',
        image: boxingImg,
    },
    {
        id: '203', title: 'Music Genre Classification With...',
        excerpt: 'A Guide To Analyzing Audio/Music Signals In Python — Music Is Like A Mirror, And It Tells People A Lot About Who You Are And What You Care About, Whether You Like It Or Not. You’ve Read All Your Free...',
        image: headphonesImg,
    },
    {
        id: '204', title: '10 Cooking Lessons To Use In Everyday Life',
        excerpt: 'I Recently Stumbled Upon This Quote By Paul Theroux: “Cooking Requires Confident Guesswork.”...',
        image: poachedEggsImg,
    },
    {
        id: '205', title: 'How to Build a Self-Driving Car in One Month',
        excerpt: 'Can I Learn The Necessary Computer Science To Build The Software Part Of A Self-Driving Car In...',
        image: laptopPurpleImg,
    },
];

// Component for the Large Featured Video Card
const LargeVideoCard = ({ post }) => (
    <a 
        href={post.videoUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        // Force full width on mobile, 2/3 width on desktop
        className="relative h-full overflow-hidden rounded-xl shadow-xl transition-shadow duration-300 group col-span-1 lg:col-span-2 cursor-pointer"
    >
        {/* Image */}
        <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/40">
            <PlayIcon />
        </div>
        
        {/* Text Box Overlay (Purple/Dark Gradient) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-purple-800/80 to-transparent">
            <h3 className="text-2xl font-bold text-white leading-snug mb-2 group-hover:underline">
                {post.title}
            </h3>
            <p className="text-sm text-gray-200 line-clamp-2">{post.excerpt}</p>
        </div>
    </a>
);

// Component for the Small Side Cards (FIXED for mobile responsiveness)
const SmallSideCard = ({ post }) => (
    <NavLink to={`/posts/${post.id}`} className="block group h-full"> 
        <div className="bg-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl flex h-full"> 
            
            {/* Image (Left Side) - Adjusted proportions for small cards */}
            <div className="relative overflow-hidden w-2/5 flex-shrink-0"> 
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover rounded-l-xl transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            
            {/* Content (Right Side) */}
            <div className="p-3 flex flex-col justify-center w-3/5">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 leading-snug line-clamp-2">
                    {post.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                    {post.excerpt}
                </p>
            </div>
        </div>
    </NavLink>
);


function LatestVideosSection() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-20">
            {/* Heading and Navigation Arrows */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
                    Latest Videos
                </h2>
                
                <div className="flex space-x-2">
                    <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
                        <LeftArrowIcon />
                    </button>
                    <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
                        <RightArrowIcon />
                    </button>
                </div>
            </div>
            
            {/* Main Content Grid: Featured Video (span 2) + Small Cards (span 1) */}
            {/* Note: lg:h-[400px] ensures consistent height on desktop, but lets height be auto on mobile. */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[400px]">
                
                {/* Featured Video (lg:col-span-2) */}
                <LargeVideoCard post={featuredVideo} />

                {/* Small Side Grid (The right-hand section) */}
                <div className="lg:col-span-1">
                    {/* 🚨 FIX: This inner grid now uses 'grid-cols-1' by default, 
                       forcing the 4 cards to stack vertically on mobile/small screens.
                       It only switches to the 2x2 layout on desktop (lg:grid-cols-2 lg:grid-rows-2). */}
                    <div className="grid grid-cols-1 gap-3 h-full lg:grid-cols-2 lg:grid-rows-2">
                        {/* We use all 4 cards here. The h-full on the SmallSideCard helps them stretch on desktop. */}
                        <SmallSideCard post={smallPosts[0]} />
                        <SmallSideCard post={smallPosts[2]} />
                        <SmallSideCard post={smallPosts[1]} />
                        <SmallSideCard post={smallPosts[3]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LatestVideosSection;