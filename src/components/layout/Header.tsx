import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, BookOpen, PenTool, Users, User, LogOut, Bell, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'SET_USER', payload: null });
    setIsProfileMenuOpen(false);
    router.push('/');
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <BookOpen className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              Writers Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/posts" 
              className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                isActive('/posts') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Discover
            </Link>
            {state.user?.role === 'writer' && (
              <Link 
                href="/posts/new" 
                className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                  isActive('/posts/new') 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Write
              </Link>
            )}
            <Link 
              href="/writers" 
              className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                isActive('/writers') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Writers
            </Link>
            {state.isAuthenticated && (
              <Link 
                href={state.user?.role === 'writer' ? '/writer-home' : '/dashboard'}
                className={`transition-all duration-200 font-semibold px-3 py-2 rounded-lg ${
                  (isActive('/dashboard') || isActive('/writer-home'))
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {state.user?.role === 'writer' ? 'Writer Home' : 'Dashboard'}
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
              <Search className="h-5 w-5" />
            </button>

            {!state.isAuthenticated ? (
              <>
                <Link 
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 relative">
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {state.user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">{state.user?.name}</div>
                        <div className="text-sm text-gray-500">{state.user?.email}</div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/notifications"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Bell className="h-5 w-5" />
                        <span>Notifications</span>
                      </Link>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">
              <Link 
                href="/posts" 
                className="block text-gray-700 hover:text-indigo-600 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover
              </Link>
              {state.user?.role === 'writer' && (
                <Link 
                  href="/posts/new" 
                  className="block text-gray-700 hover:text-indigo-600 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Write
                </Link>
              )}
              <Link 
                href="/writers" 
                className="block text-gray-700 hover:text-indigo-600 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Writers
              </Link>
              {state.isAuthenticated ? (
                <>
                  <Link 
                    href={state.user?.role === 'writer' ? '/writer-home' : '/dashboard'}
                    className="block text-gray-700 hover:text-indigo-600 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {state.user?.role === 'writer' ? 'Writer Home' : 'Dashboard'}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block text-red-600 hover:text-red-700 font-semibold w-full text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="block text-gray-700 hover:text-indigo-600 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/register"
                    className="block bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;