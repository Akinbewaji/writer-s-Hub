import React from 'react';
import { useRouter } from 'next/router';
import PostForm from '@/components/posts/PostForm';
import { useAuth } from '@/context/AuthContext';

interface PostFormData {
  title: string;
  content: string;
  category: string;
  tags: string;
  status: 'draft' | 'published';
}

const NewPostPage: React.FC = () => {
  const { state, dispatch } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated or not a writer
  React.useEffect(() => {
    if (!state.loading && (!state.isAuthenticated || state.user?.role !== 'writer')) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, state.user?.role, router]);

  const handleSubmit = async (data: PostFormData) => {
    if (!state.user) return;

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      content: data.content,
      excerpt: data.content.substring(0, 200) + (data.content.length > 200 ? '...' : ''),
      authorId: state.user.id,
      author: state.user,
      category: data.category,
      tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      publishedAt: data.status === 'published' ? new Date().toISOString() : '',
      updatedAt: new Date().toISOString(),
      status: data.status,
      likes: 0,
      comments: 0,
      views: 0,
      readTime: Math.max(1, Math.ceil(data.content.split(/\s+/).length / 200)),
      isLiked: false,
      isBookmarked: false,
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
    
    // Redirect to dashboard or post view
    if (data.status === 'published') {
      router.push(`/posts/${newPost.id}`);
    } else {
      router.push('/dashboard');
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!state.isAuthenticated || state.user?.role !== 'writer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600">Share your thoughts and stories with the world</p>
        </div>

        <PostForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewPostPage;