import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageSquare, Share2, Bookmark, Clock, Calendar, User, ThumbsUp, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, formatRelativeTime, getInitials, generateId } from '../utils/helpers';

const StoryDetail: React.FC = () => {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const [comment, setComment] = useState('');

  const story = state.stories.find(s => s.id === id);
  const storyComments = state.comments.filter(c => c.storyId === id);

  if (!story) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <p className="text-gray-600 mb-8">The story you're looking for doesn't exist.</p>
          <Link 
            to="/discover"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Browse Stories
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    dispatch({ type: 'LIKE_STORY', payload: story.id });
  };

  const handleBookmark = () => {
    dispatch({ type: 'BOOKMARK_STORY', payload: story.id });
  };

  const handleAddComment = () => {
    if (!comment.trim() || !state.currentUser) return;

    const newComment = {
      id: generateId(),
      content: comment,
      author: state.currentUser,
      storyId: story.id,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    dispatch({ type: 'ADD_COMMENT', payload: newComment });
    setComment('');
  };

  const handleLikeComment = (commentId: string) => {
    dispatch({ type: 'LIKE_COMMENT', payload: commentId });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/discover"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Stories</span>
        </Link>

        {/* Story Header */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            {/* Category and Meta */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {story.category}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{story.publishDate ? formatDate(story.publishDate) : 'Draft'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{story.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {story.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(story.author.name)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{story.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {story.author.followers} followers • {story.author.bio}
                  </div>
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                Follow
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 mb-8">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 transition-colors ${
                    story.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${story.isLiked ? 'fill-current' : ''}`} />
                  <span>{story.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>{story.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
              <button
                onClick={handleBookmark}
                className={`transition-colors ${
                  story.isBookmarked ? 'text-yellow-600' : 'text-gray-600 hover:text-yellow-600'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${story.isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none">
              {story.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              Comments ({story.comments})
            </h2>
          </div>

          {/* Add Comment */}
          {state.isAuthenticated && (
            <div className="p-6 border-b border-gray-100">
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {state.currentUser && getInitials(state.currentUser.name)}
                </div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this story..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <button 
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="p-6">
            {storyComments.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {storyComments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(comment.author.name)}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{comment.author.name}</span>
                          <span className="text-sm text-gray-500">
                            {formatRelativeTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <button 
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center space-x-1 hover:text-indigo-600 transition-colors ${
                            comment.isLiked ? 'text-indigo-600' : ''
                          }`}
                        >
                          <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="hover:text-indigo-600 transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;