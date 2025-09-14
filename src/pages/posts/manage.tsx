import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Plus, Edit3, Trash2, Eye, Heart, MessageSquare, Search, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const ManagePostsPage: React.FC = () => {
  const { state, dispatch } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Redirect if not authenticated or not a writer
  React.useEffect(() => {
    if (!state.loading && (!state.isAuthenticated || state.user?.role !== 'writer')) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, state.user?.role, router]);

  // Mock posts data
  const mockPosts = [
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development...',
      status: 'published' as const,
      publishedAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      views: 1234,
      likes: 89,
      comments: 23,
      category: 'Technology',
      readTime: 5
    },
    {
      id: '2',
      title: 'Building Better User Interfaces',
      excerpt: 'A comprehensive guide to creating intuitive and accessible user interfaces...',
      status: 'published' as const,
      publishedAt: '2024-01-12T14:30:00Z',
      updatedAt: '2024-01-12T14:30:00Z',
      views: 856,
      likes: 67,
      comments: 15,
      category: 'Design',
      readTime: 8
    },
    {
      id: '3',
      title: 'My Writing Journey - Draft',
      excerpt: 'Sharing my personal experience and lessons learned as a content creator...',
      status: 'draft' as const,
      publishedAt: null,
      updatedAt: '2024-01-10T09:15:00Z',
      views: 0,
      likes: 0,
      comments: 0,
      category: 'Personal',
      readTime: 6
    },
    {
      id: '4',
      title: 'Advanced React Patterns',
      excerpt: 'Deep dive into advanced React patterns and best practices for scalable applications...',
      status: 'published' as const,
      publishedAt: '2024-01-08T16:45:00Z',
      updatedAt: '2024-01-08T16:45:00Z',
      views: 2156,
      likes: 145,
      comments: 34,
      category: 'Technology',
      readTime: 12
    }
  ];

  const handleDelete = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      dispatch({ type: 'DELETE_POST', payload: postId });
    }
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      case 'most-viewed':
        return b.views - a.views;
      case 'most-liked':
        return b.likes - a.likes;
      case 'title':
        return a.title.localeCompare(b.title);
      default: // newest
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

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

  const statusCounts = {
    all: mockPosts.length,
    published: mockPosts.filter(p => p.status === 'published').length,
    draft: mockPosts.filter(p => p.status === 'draft').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Posts</h1>
            <p className="text-gray-600">Create, edit, and organize your content</p>
          </div>
          <Link
            href="/posts/new"
            className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{statusCounts.all}</div>
            <div className="text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{statusCounts.published}</div>
            <div className="text-gray-600">Published</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.draft}</div>
            <div className="text-gray-600">Drafts</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">
              {mockPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status ({statusCounts.all})</option>
                  <option value="published">Published ({statusCounts.published})</option>
                  <option value="draft">Drafts ({statusCounts.draft})</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-viewed">Most Viewed</option>
                <option value="most-liked">Most Liked</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Edit3 className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? `No posts match "${searchTerm}"` : 'Start writing your first post!'}
              </p>
              <Link
                href="/posts/new"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create New Post</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sortedPosts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                          <Link href={`/posts/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {post.status}
                        </span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {post.publishedAt 
                              ? `Published ${formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}`
                              : `Updated ${formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}`
                            }
                          </span>
                        </div>
                        <span>{post.readTime} min read</span>
                        {post.status === 'published' && (
                          <>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/posts/${post.id}`}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View post"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/posts/edit/${post.id}`}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit post"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePostsPage;