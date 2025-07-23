import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>Trusted by 50,000+ creators</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Where
              <span className="text-indigo-600"> Stories</span>
              <br />
              Come to Life
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with passionate readers, share your stories, and discover amazing content. 
              Join our thriving community of writers and readers today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 group">
                <span>Start Writing Today</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-colors font-medium flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                </div>
                <span>2,000+ active today</span>
              </div>
              <div>✨ Free to start</div>
            </div>
          </div>
          
          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-200 rounded-full opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-pink-200 rounded-full opacity-60"></div>
              
              <div className="relative z-10 space-y-6">
                {/* Mock Story Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                      <div className="text-sm text-gray-500">Published 2 hours ago</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">The Midnight Garden</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    In the quiet corners of the old mansion, where moonlight painted silver stories...
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>❤️ 1.2k</span>
                    <span>💬 89</span>
                    <span>📖 5 min read</span>
                  </div>
                </div>
                
                {/* Mock Reading Progress */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Reading Progress</span>
                    <span className="text-sm text-indigo-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;