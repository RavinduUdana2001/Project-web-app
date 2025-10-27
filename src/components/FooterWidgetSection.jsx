// src/components/FooterWidgetSection.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// 🚨 STEP 1: IMPORT LOCAL IMAGES HERE
// Replace these with the actual names of your downloaded images in src/assets/
import instaImage1 from '../assets/12.jpg'; 
import instaImage2 from '../assets/123.jpg';
import instaImage3 from '../assets/n2.jpg';
import instaImage4 from '../assets/n4.jpg';
import instaImage5 from '../assets/n5.jpg';
import instaImage6 from '../assets/n1.jpg';
import instaImage7 from '../assets/2.jpg';
import instaImage8 from '../assets/3.jpg';
// We will use external links for the last two for variety, but you can import them too.


// Helper Icons
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.5a.5.5 0 001 0V12a.5.5 0 00-1 0V10.5z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>;

// --- 1. Mega News / Newsletter Widget ---
const MegaNewsWidget = () => (
    <div className="lg:col-span-1">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-full mr-2"></span>
            Mega News
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta nibh venenatis cras sed. Nisl nisi scelerisque eu ultrices vitae auctor. Morbi tristique senectus et netus. Malesuada fames ac turpis egestas integer.
        </p>

        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-full mr-2"></span>
            Newsletters
        </h3>
        <div className="relative flex items-center">
            <input
                type="email"
                placeholder="Write Your Email..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <div className="absolute right-0 mr-4">
                <MailIcon />
            </div>
        </div>
    </div>
);

// --- 2. Categories & Social Network Widget ---
const CategoriesSocialWidget = () => (
    <div className="lg:col-span-1 flex flex-col space-y-8">
        
        {/* Categories */}
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="h-1.5 w-1.5 bg-red-600 rounded-full mr-2"></span>
                Categories
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600">
                {['Culture', 'Fashion', 'Featured', 'Food', 'Healthy Living', 'Technology', 'Travel', 'Science'].map(cat => (
                    <li key={cat} className="hover:text-red-600 cursor-pointer transition-colors">{cat}</li>
                ))}
            </ul>
        </div>

        {/* Social Network */}
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="h-1.5 w-1.5 bg-red-600 rounded-full mr-2"></span>
                Social Network
            </h3>
            <div className="flex space-x-3">
                <a href="#" className="flex items-center justify-center w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full transition-colors shadow-md">
                    <InstagramIcon />
                </a>
                <a href="#" className="flex items-center justify-center w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full transition-colors shadow-md">
                    <TwitterIcon />
                </a>
            </div>
        </div>
    </div>
);

// --- 3. New Comments Widget ---
const NewCommentsWidget = () => {
    const comments = [
        { user: 'Ellsmartx', text: 'How Nice Does This Look I Feel It Should Be Delicious, Thank You.', date: '3 mins ago' },
        { user: 'Cassia', text: 'Take A Next I’ll Be Cheer Up You Again I Need Game Go Go', date: '3 mins ago' },
        { user: 'Amanda', text: 'You’re Showing Sunny Jo! Great Match', date: '5 mins ago' },
        { user: 'Denis Simonassi', text: 'This Is Amazing And Absolutely Lovely', date: '8 mins ago' },
    ];

    return (
        <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="h-1.5 w-1.5 bg-red-600 rounded-full mr-2"></span>
                New Comments
            </h3>
            <div className="space-y-6">
                {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <p className="font-semibold text-gray-800 hover:text-red-600 cursor-pointer">{comment.user}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{comment.text}</p>
                        <p className="text-xs text-gray-400 mt-1">3 mins ago</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 4. Follow On Instagram Widget ---
const InstagramFeedWidget = () => {
    // 🚨 STEP 2: Use the imported variables and fallback external URLs for the 8 images
    const instaImages = [
        instaImage1,
        instaImage2,
        instaImage3,
        instaImage4,
        instaImage5,
        instaImage6,
        instaImage7,
        instaImage8,
    ];

    return (
        <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="h-1.5 w-1.5 bg-red-600 rounded-full mr-2"></span>
                Follow On Instagram
            </h3>
            
            {/* Instagram Image Grid (4x2 layout) */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2">
                {instaImages.map((src, index) => (
                    <div 
                        key={index} 
                        className="w-full aspect-square overflow-hidden rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        <img src={src} alt={`Instagram ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};


function FooterWidgetSection() {
    return (
        // Section container that separates the content above it
        <div className="bg-white pt-16 pb-12 border-t border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Main 4-Column Grid for the Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Column 1: Mega News & Newsletter */}
                    <MegaNewsWidget />

                    {/* Column 2: Categories & Social Network */}
                    <CategoriesSocialWidget />

                    {/* Column 3: New Comments */}
                    <NewCommentsWidget />

                    {/* Column 4: Instagram Feed */}
                    <InstagramFeedWidget />

                </div>
            </div>
        </div>
    );
}

export default FooterWidgetSection;