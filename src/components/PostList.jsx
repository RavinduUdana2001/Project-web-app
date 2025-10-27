// src/components/PostList.jsx
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Assuming these imports are correct based on your project structure:
import { fetchPosts } from '../store/slices/postsSlice.js'; 

// CRITICAL FIX: Import the single, required image
import defaultPostImage from '../assets/12.jpg'; // Ensure 12.jpg is in your src/assets folder


// Helper component for the bookmark icon
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;


// Reusable Post Card component
const PostCard = ({ post }) => {
    const authorName = post.user?.name || 'User';

    // Date formatting logic
    const rawDate = post.date || post.createdAt || post.timestamp;
    const formattedDate = rawDate 
        ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Unknown Date';
    
    return (
        <NavLink to={`/posts/${post.id}`} className="block group h-full"> 
            
            {/* The main card container: MUST be flex-col and h-full for alignment */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                
                {/* 1. Image Area (Fixed height, uses 12.jpg) */}
                <div className="relative overflow-hidden h-48 rounded-t-xl flex-shrink-0">
                    <img 
                        // FINAL FIX: Always use the imported image variable
                        src={defaultPostImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                </div>

                {/* 2. Content Area (Flex-grow for uniform height) */}
                <div className="p-4 pt-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors duration-200 leading-snug line-clamp-2">
                            {post.title}
                        </h3>
                        {/* line-clamp-2 ensures exactly two lines of text for uniformity */}
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                            {post.explanation || post.excerpt || "No summary provided."}
                        </p>
                    </div>
                    
                    {/* 🚨 FINAL FIX: Display ALL Tags (Removed .slice(0, 2)) */}
                    {post.postTags && post.postTags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 flex-shrink-0">
                            {post.postTags.map((postTag, index) => (
                                <span key={postTag.id || index} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    #{postTag.tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* 3. Footer / Metadata Area (Fixed at the bottom) */}
                <div className="flex items-center justify-between p-4 border-t border-gray-100 mt-2 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <img 
                            src={post.user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=22d3ee&color=fff&size=32`} 
                            alt={authorName} 
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-xs font-medium text-gray-800">{authorName}</p>
                            <p className="text-xs text-gray-500">{formattedDate}</p>
                        </div>
                    </div>
                    
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <BookmarkIcon />
                    </button>
                </div>
            </div>
        </NavLink>
    );
};


function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const postsToDisplay = posts && posts.length > 0 ? posts : []; 

    if (postStatus === 'loading') return <div className="text-center py-10 text-gray-600">Loading posts...</div>;
    if (postStatus === 'failed') return <div className="text-center py-10 text-red-600">Failed to load posts: {error}</div>;

    // Icons for the header navigation arrows
    const LeftArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
    const RightArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;

    return (
        <>
            {/* Title/Header for the Post List */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
                    Community Posts
                </h2>
                
                {/* Navigation arrows */}
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
            {postsToDisplay.length === 0 ? (
                // This message appears ONLY if your Redux store is genuinely empty
                <div className="text-center py-10 text-gray-500 border rounded-xl bg-gray-50">
                    No posts found. Create a new post to see it here!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {postsToDisplay.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </>
    );
}

export default PostList;