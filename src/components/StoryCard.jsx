import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Clock, Bookmark, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRelativeTime, getInitials } from '../utils/helpers';

const StoryCard = ({ story, showStats = true }) => {
  const { dispatch } = useApp();

  const handleLike = (e) => {
    e.preventDefault();
    dispatch({ type: 'LIKE_STORY', payload: story.id });
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    dispatch({ type: 'BOOKMARK_STORY', payload: story.id });
  };

  return (
    <Link to={`/story/${story.id}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
        {story.image && (
          <div className="relative overflow-hidden">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                {story.category}
              </span>
            </div>
            {story.status === 'draft' && (
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Draft
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(story.author.name)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{story.author.name}</div>
              <div className="text-sm text-gray-500">
                {story.publishDate ? formatRelativeTime(story.publishDate) : 'Draft'}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
            {story.title}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {story.excerpt}
          </p>

          {showStats && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{story.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{story.views}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                    story.isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${story.isLiked ? 'fill-current' : ''}`} />
                  <span>{story.likes}</span>
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>{story.comments}</span>
                </button>
                
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full transition-colors ${
                    story.isBookmarked
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${story.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}

          {story.tags && story.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {story.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default StoryCard;