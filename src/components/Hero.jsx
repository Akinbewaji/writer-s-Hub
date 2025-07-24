import React from 'react';
import { ArrowRight, Play, Star, Sparkles, TrendingUp, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Content */}
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4" />
              <span>Trusted by 100,000+ creators worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Where
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Stories</span>
              <br />
              <span className="relative">
                Come to Life
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
              Connect with passionate readers, share your stories, and discover amazing content from writers around the globe. 
              Join our thriving community and turn your words into impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-3 group shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <span>Start Writing Today</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              
              <button className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-full hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-semibold flex items-center justify-center space-x-3 backdrop-blur-sm">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-3 border-white shadow-lg"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-3 border-white shadow-lg"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-3 border-white shadow-lg"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
                    +5K
                  </div>
                </div>
                <div>
                  <div className="font-semibold">5,000+ active today</div>
                  <div className="text-xs text-gray-500">Writers & readers online</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-semibold">98% satisfaction</div>
                  <div className="text-xs text-gray-500">User rating</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-semibold">Free to start</div>
                  <div className="text-xs text-gray-500">No credit card required</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-10 relative overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
              <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-40 animate-ping"></div>
              
              <div className="relative z-10 space-y-8">
                {/* Mock Story Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
                    <div>
                      <div className="font-bold text-gray-900">Sarah Mitchell</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <span>Published 2 hours ago</span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span className="text-green-600 font-medium">Trending</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">The Midnight Garden</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    In the quiet corners of the old mansion, where moonlight painted silver stories...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <span className="text-red-500">❤️</span>
                        <span className="font-semibold">1.2k</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-blue-500">💬</span>
                        <span className="font-semibold">89</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-green-500">📖</span>
                        <span className="font-semibold">5 min read</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">4.9</span>
                    </div>
                  </div>
                </div>
                
                {/* Mock Reading Progress */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-700">Reading Progress</span>
                    <span className="text-indigo-600 font-bold">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full w-3/4 transition-all duration-1000 ease-out shadow-sm"></div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>Chapter 3 of 4</span>
                    <span>12 min remaining</span>
                  </div>
                </div>
                
                {/* Mock Notification */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-green-800">New Achievement!</div>
                      <div className="text-xs text-green-600">You've earned "Storyteller" badge</div>
                    </div>
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