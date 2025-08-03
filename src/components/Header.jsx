import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, PenTool, Users, User, LogOut, Bell, Search, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getInitials } from '../utils/helpers';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useApp();

  const isActive = (path) => location.pathname === path;

  const handleSignIn = () => {
    // Simulate sign in - in a real app, this would be proper authentication
    if (!state.isAuthenticated) {
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      dispatch({ type: 'SET_USER', payload: state.currentUser });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    dispatch({ type: 'SET_USER', payload: null });
    setIsProfileMenuOpen(false);
    // Redirect to home page after sign out
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <BookOpen className="h-10 w-10 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              Writers & Readers Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/discover" 
              className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                isActive('/discover') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Discover
            </Link>
            <Link 
              to="/write" 
              className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                isActive('/write') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Write
            </Link>
            <Link 
              to="/community" 
              className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                isActive('/community') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Community
            </Link>
            {state.isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                  isActive('/dashboard') 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              <Search className="h-5 w-5" />
            </button>

            {!state.isAuthenticated ? (
              <>
                <button 
                  onClick={handleSignIn}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50"
                >
                  <Link to="/signin">Sign In</Link>
                </button>
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 relative">
                    <Bell className="h-5 w-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </button>
                </div>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
                      {state.currentUser && getInitials(state.currentUser.name)}
                    </div>
                    <div className="hidden xl:block text-left">
                      <div className="text-sm font-semibold text-gray-900">
                        {state.currentUser?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Writer
                      </div>
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 backdrop-blur-sm">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">{state.currentUser?.name}</div>
                        <div className="text-sm text-gray-500">{state.currentUser?.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <PenTool className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Search Bar (when open) */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 py-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories, authors, topics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-18 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xl">
            <div className="px-6 py-8 space-y-6">
              <Link 
                to="/discover" 
                className={`flex items-center space-x-4 text-lg font-semibold transition-colors ${
                  isActive('/discover') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-6 w-6" />
                <span>Discover</span>
              </Link>
              <Link 
                to="/write" 
                className={`flex items-center space-x-4 text-lg font-semibold transition-colors ${
                  isActive('/write') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <PenTool className="h-6 w-6" />
                <span>Write</span>
              </Link>
              <Link 
                to="/community" 
                className={`flex items-center space-x-4 text-lg font-semibold transition-colors ${
                  isActive('/community') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-6 w-6" />
                <span>Community</span>
              </Link>
              {state.isAuthenticated && (
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-4 text-lg font-semibold transition-colors ${
                    isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-6 w-6" />
                  <span>Dashboard</span>
                </Link>
              )}
              <div className="pt-6 space-y-4 border-t border-gray-200">
                {!state.isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-lg font-semibold text-gray-700 hover:text-indigo-600 py-2"
                    >
                      <Link to="/signin">Sign In</Link>
                    </button>
                    <Link 
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center font-semibold shadow-lg inline-block"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/profile"
                      className="flex items-center space-x-4 text-lg font-semibold text-gray-700 hover:text-indigo-600 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-6 w-6" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-4 text-lg font-semibold text-red-600 hover:text-red-700 w-full text-left py-2"
                    >
                      <LogOut className="h-6 w-6" />
                      <span>Sign Out</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;