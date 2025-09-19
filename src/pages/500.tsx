import React from 'react';
import Link from 'next/link';
import { BookOpen, Home, RefreshCw, AlertTriangle } from 'lucide-react';

const Custom500: React.FC = () => {
  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <BookOpen className="h-12 w-12 text-red-600" />
          <span className="text-2xl font-bold text-gray-900">Writers Hub</span>
        </div>

        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          <div className="text-6xl font-bold text-red-200 mb-4">500</div>
          <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Server Error
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Our servers are having trouble processing your request. 
          We're working to fix this issue as quickly as possible.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleRefresh}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full hover:from-red-700 hover:to-orange-700 transition-all duration-300 font-semibold"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center space-x-2 border-2 border-red-600 text-red-600 px-8 py-4 rounded-full hover:bg-red-50 transition-all duration-300 font-semibold"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            If this problem persists, please contact our support team.
          </p>
          <p className="text-xs text-gray-400">
            Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Custom500;