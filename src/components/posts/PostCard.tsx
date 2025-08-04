import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Clock, User } from 'lucide-react';
import { Post } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLike) {
      onLike(post.id);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
      <Link href={`/posts/${post.id}`}>
        <div className="p-6">
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{post.author.name}</div>
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="mb-3">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;