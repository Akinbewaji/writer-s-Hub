import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, PenTool, Users, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getInitials } from '../utils/helpers';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useApp();

  const isActive = (path: string) => location.pathname === path;

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
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Writers & Readers Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/discover" 
              className={`transition-colors font-medium ${
                isActive('/discover') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Discover
            </Link>
            <Link 
              to="/write" 
              className={`transition-colors font-medium ${
                isActive('/write') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Write
            </Link>
            <Link 
              to="/community" 
              className={`transition-colors font-medium ${
                isActive('/community') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Community
            </Link>
            {state.isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`transition-colors font-medium ${
                  isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!state.isAuthenticated ? (
              <>
                <button 
                  onClick={handleSignIn}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleSignIn}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors font-medium"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {state.currentUser && getInitials(state.currentUser.name)}
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <PenTool className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/discover" 
                className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5" />
                <span>Discover</span>
              </Link>
              <Link 
                to="/write" 
                className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <PenTool className="h-5 w-5" />
                <span>Write</span>
              </Link>
              <Link 
                to="/community" 
                className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span>Community</span>
              </Link>
              {state.isAuthenticated && (
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              )}
              <div className="pt-4 space-y-3">
                {!state.isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => {
                        handleSignIn();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-indigo-600"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        handleSignIn();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition-colors text-center"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/profile"
                      className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
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