// src/pages/Homepage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import CategoryFilterBar from "../components/CategoryFilterBar";
import HeroFeaturedPosts from "../components/HeroFeaturedPosts";
import PopularPostsSection from "../components/PopularPostsSection";
import SportsDashboardSection from "../components/SportsDashboardSection";
// 👈 Import the new component
import NewPostsSection from "../components/NewPostsSection";
import LatestVideosSection from "../components/LatestVideosSection";
import WeatherDashboard from "../components/WeatherDashboard";
import CopyrightFooter from "../components/CopyrightFooter";
import FooterWidgetSection from "../components/FooterWidgetSection";

function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Category Filter Bar */}
      <CategoryFilterBar/>

      {/* 3. Main Hero Section (Three large posts) */}
      <HeroFeaturedPosts />

      {/* 4. New Posts Section (The newly added section below the hero) */}
      <NewPostsSection />

      {/* 5. Popular Posts Section (The single row grid) */}
      <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <PopularPostsSection />
      </div>

      {/* 6. Bottom Dashboard Area with Background */}
      <SportsDashboardSection />

      <NewPostsSection />

      <LatestVideosSection />

      <WeatherDashboard />

      <FooterWidgetSection />

      <CopyrightFooter />
    </div>
  );
}

export default Homepage;
