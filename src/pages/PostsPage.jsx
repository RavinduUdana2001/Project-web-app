// src/pages/PostsPage.jsx
import React from 'react';

// Import ALL necessary components for the complete UI header
import Navbar from '../components/Navbar.jsx';
import CategoryFilterBar from '../components/CategoryFilterBar.jsx';
import PostList from '../components/PostList.jsx'; // Now PostList is the attractive grid
import PopularPostsSection from '../components/PopularPostsSection.jsx';
import FooterWidgetSection from '../components/FooterWidgetSection.jsx';
import CopyrightFooter from '../components/CopyrightFooter.jsx';

function PostsPage() {
  return (
    <div className="min-h-screen bg-white"> 
      
      {/* 1. Navbar */}
      <Navbar />
      
      {/* 2. Category Filter Bar */}
      <CategoryFilterBar />
      
      <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <PopularPostsSection />
      </div>
      
      {/* 4. Posts List Section (Displays the content below the hero area) */}
      <main>
        {/* Added padding to match the general site container size */}
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <PostList />
        </div>
      </main>

      <FooterWidgetSection/>
      <CopyrightFooter/>
    </div>
  );
}

export default PostsPage;