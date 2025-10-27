import React from 'react';
import { Link } from 'react-router-dom';

// A simple bookmark icon
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;

function PostCard({ post, layout = 'default' }) {
  // The layout for the large, featured posts in the hero section remains the same.
  if (layout === 'hero-large') {
    return (
       <Link to={`/posts/${post.id}`} className="relative rounded-xl overflow-hidden h-full group block shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold leading-tight group-hover:underline">{post.title}</h3>
          <p className="text-xs text-gray-300 mt-1 line-clamp-2">{post.description}</p>
        </div>
      </Link>
    );
  }

  // This is the updated, standard card layout for grids like "Popular Posts".
  return (
    <Link to={`/posts/${post.id}`} className="bg-white rounded-xl overflow-hidden group block shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-md font-bold text-gray-800 leading-tight group-hover:text-red-600 transition-colors mb-4 h-12 line-clamp-2">{post.title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full" />
            <div>
              <p className="text-xs font-semibold text-gray-700">{post.author}</p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
          <BookmarkIcon />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

