import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Clock, Bookmark, Eye, Star, TrendingUp, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRelativeTime, getInitials } from '../utils/helpers';

const StoryCard = ({ story, showStats = true, featured = false }) => {
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
      <article className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${featured ? 'ring-2 ring-indigo-200' : ''}`}>
        {story.image && (
          <div className="relative overflow-hidden">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 flex space-x-2">
              <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-indigo-600 shadow-lg">
                {story.category}
              </span>
              {story.likes > 1000 && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Hot</span>
                </span>
              )}
            </div>
            {featured && (
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-2 rounded-full shadow-lg">
                  <Award className="h-4 w-4" />
                </div>
              </div>
            )}
            {story.status === 'draft' && (
              <div className="absolute bottom-4 right-4">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Draft
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-1 text-white text-sm font-medium">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span>4.{Math.floor(Math.random() * 9) + 1}</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {getInitials(story.author.name)}
              </div>
              <div>
                <div className="font-bold text-gray-900 flex items-center space-x-2">
                  <span>{story.author.name}</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-500">
                  {story.publishDate ? formatRelativeTime(story.publishDate) : 'Draft'}
                </div>
              </div>
            </div>
            {story.readTime && (
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span className="font-medium">{story.readTime} min</span>
                </div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
            {story.title}
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {story.excerpt}
          </p>

          {showStats && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">{story.views?.toLocaleString() || '0'}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-300 ${
                    story.isLiked 
                      ? 'bg-red-100 text-red-600 shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 hover:shadow-md'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${story.isLiked ? 'fill-current' : ''}`} />
                  <span className="font-semibold">{story.likes}</span>
                </button>
                
                <button className="flex items-center space-x-1 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 hover:shadow-md transition-all duration-300">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-semibold">{story.comments}</span>
                </button>
                
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    story.isBookmarked
                      ? 'bg-yellow-100 text-yellow-600 shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600 hover:shadow-md'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${story.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}

          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {story.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
              {story.tags.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                  +{story.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default StoryCard;
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