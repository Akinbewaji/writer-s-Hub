import React from 'react';
import { Heart, MessageCircle, Share2, BookOpen, TrendingUp, Star } from 'lucide-react';

const StoryCard = ({ story }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      {story.image && (
        <div className="relative overflow-hidden">
          <img 
            src={story.image} 
            alt={story.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {story.trending && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
          {story.featured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {story.category}
          </span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {story.readTime} min read
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {story.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {story.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(story.author.name)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{story.author.name}</div>
              <div className="text-sm text-gray-500">
                {new Date(story.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-gray-500">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{story.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{story.comments}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;