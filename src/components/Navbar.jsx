import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

// --- SVG Icons for the UI ---
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;

function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  const activeLinkStyle = {
    color: '#EF4444' // Red color for active link
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* === Left Side: Brand & Main Navigation === */}
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="text-2xl font-bold text-red-600">Bharat 24/7</NavLink>
            <div className="hidden md:flex items-baseline space-x-6">

              <NavLink to="/" className="text-gray-600 hover:text-red-600 font-medium" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                Home
              </NavLink>
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-red-600 font-medium flex items-center">
                  <span>Categories</span>
                  <div className="group-hover:rotate-180 transition-transform duration-200">
                    <ChevronDownIcon />
                  </div>
                </button>
                {/* Dropdown Menu - The pt-2 ensures a seamless hover area */}
                <div className="absolute left-0 top-full pt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <NavLink to="/create-post" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">Send Post</NavLink>
                  <NavLink to="/posts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">See Posts</NavLink>
                </div>
              </div>

              {/* Pages Dropdown */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-red-600 font-medium flex items-center">
                  <span>Pages</span>
                  <div className="group-hover:rotate-180 transition-transform duration-200">
                    <ChevronDownIcon />
                  </div>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">My Profile</NavLink>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">Settings</NavLink>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">FAQ</NavLink>
                </div>
              </div>

              <NavLink to="/contact" className="text-gray-600 hover:text-red-600 font-medium" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                Contact Us
              </NavLink>
              <NavLink to="/about" className="text-gray-600 hover:text-red-600 font-medium" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                About Us
              </NavLink>
            </div>
          </div>

          {/* === Right Side: Search, Profile & Actions === */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search Anything"
                className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>

            {user && (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} alt="avatar" className="w-8 h-8 rounded-full" />
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                  </div>
                  <span className="font-semibold text-gray-700">{user.displayName}</span>
                  <div className="group-hover:rotate-180 transition-transform duration-200">
                    <ChevronDownIcon />
                  </div>
                </div>
                <div className="absolute right-0 top-full pt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">Sign Out</button>
                </div>
              </div>
            )}
            
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-600">
              <BookmarkIcon />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

