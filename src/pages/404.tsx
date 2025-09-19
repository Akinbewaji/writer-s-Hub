import React from 'react';
import Link from 'next/link';
import { BookOpen, Home, Search, ArrowLeft } from 'lucide-react';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <BookOpen className="h-12 w-12 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-900">Writers Hub</span>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-indigo-200 mb-4">404</div>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The story you're looking for seems to have wandered off. 
          Let's help you find your way back to amazing content.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
          
          <Link
            href="/posts"
            className="w-full flex items-center justify-center space-x-2 border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full hover:bg-indigo-50 transition-all duration-300 font-semibold"
          >
            <Search className="h-5 w-5" />
            <span>Discover Stories</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-indigo-600 px-8 py-4 rounded-full hover:bg-indigo-50 transition-all duration-300 font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/writers" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Writers
            </Link>
            <Link href="/posts" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Stories
            </Link>
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;