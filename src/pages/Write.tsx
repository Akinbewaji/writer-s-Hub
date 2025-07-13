import React from 'react';
import { useNavigate } from 'react-router-dom';
import WriteEditor from '../components/WriteEditor';
import { useApp } from '../context/AppContext';

const Write: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  const handleSave = () => {
    // Navigate to dashboard after saving
    navigate('/dashboard');
  };

  if (!state.isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-600 mb-8">You need to sign in to write stories.</p>
          <button 
            onClick={() => {
              // Simulate sign in
              localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
              window.location.reload();
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Write Your Story</h1>
          <p className="text-gray-600">Share your thoughts, experiences, and imagination with the world</p>
        </div>

        <WriteEditor onSave={handleSave} />
      </div>
    </div>
  );
};

export default Write;