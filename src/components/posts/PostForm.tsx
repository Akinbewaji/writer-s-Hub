import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Eye, Upload } from 'lucide-react';
import { Post } from '@/context/AuthContext';

interface PostFormData {
  title: string;
  content: string;
  category: string;
  tags: string;
  status: 'draft' | 'published';
}

interface PostFormProps {
  post?: Post;
  onSubmit: (data: PostFormData) => void;
  isLoading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, isLoading = false }) => {
  const [isPreview, setIsPreview] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PostFormData>({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      category: post?.category || 'General',
      tags: post?.tags.join(', ') || '',
      status: post?.status || 'draft',
    }
  });

  const watchedContent = watch('content', '');
  const watchedTitle = watch('title', '');
  
  const wordCount = watchedContent.split(/\s+/).filter(word => word.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const categories = [
    'General', 'Technology', 'Lifestyle', 'Travel', 'Food', 'Health',
    'Business', 'Education', 'Entertainment', 'Sports', 'Science', 'Art'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {!isPreview ? (
          <>
            {/* Editor */}
            <div className="p-6">
              <div className="mb-6">
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  placeholder="Enter your post title..."
                  className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
              
              <textarea
                {...register('content', { required: 'Content is required' })}
                placeholder="Start writing your story..."
                className="w-full h-96 text-lg text-gray-700 placeholder-gray-400 border-none outline-none resize-none leading-relaxed"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>
          </>
        ) : (
          /* Preview */
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {watchedTitle || 'Untitled Post'}
            </h1>
            <div className="prose prose-lg max-w-none">
              {watchedContent.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                {...register('tags')}
                type="text"
                placeholder="Add tags separated by commas"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 space-x-4">
              <span>Words: {wordCount}</span>
              <span>Read time: {readTime} min</span>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{post ? 'Update' : 'Save'} Post</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;