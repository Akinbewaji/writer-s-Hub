import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PostCard from '@/components/posts/PostCard';
import { useAuth } from '@/context/AuthContext';

const PostsPage: React.FC = () => {
  const { state, dispatch } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock posts data
  const mockPosts = [
    {
      id: '1',
      title: 'The Future of Web Development',
      content: 'Exploring the latest trends and technologies shaping the future of web development...',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development...',
      authorId: '1',
      author: {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'writer' as const,
        bio: 'Tech writer and developer',
        createdAt: '2024-01-01',
        stats: { postsCount: 15, followersCount: 500, followingCount: 100, likesReceived: 1200 }
      },
      category: 'Technology',
      tags: ['web development', 'javascript', 'react'],
      publishedAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      status: 'published' as const,
      likes: 234,
      comments: 45,
      views: 1200,
      readTime: 5,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: '2',
      title: 'Mastering the Art of Storytelling',
      content: 'Learn the fundamental techniques that make stories compelling and memorable...',
      excerpt: 'Learn the fundamental techniques that make stories compelling and memorable...',
      authorId: '2',
      author: {
        id: '2',
        name: 'Michael Chen',
        email: 'michael@example.com',
        role: 'writer' as const,
        bio: 'Creative writing instructor',
        createdAt: '2024-01-01',
        stats: { postsCount: 25, followersCount: 800, followingCount: 150, likesReceived: 2000 }
      },
      category: 'Writing',
      tags: ['storytelling', 'creative writing', 'narrative'],
      publishedAt: '2024-01-14T15:30:00Z',
      updatedAt: '2024-01-14T15:30:00Z',
      status: 'published' as const,
      likes: 189,
      comments: 32,
      views: 890,
      readTime: 8,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: '3',
      title: 'Building Sustainable Habits',
      content: 'A practical guide to creating lasting positive changes in your daily routine...',
      excerpt: 'A practical guide to creating lasting positive changes in your daily routine...',
      authorId: '3',
      author: {
        id: '3',
        name: 'Emma Rodriguez',
        email: 'emma@example.com',
        role: 'writer' as const,
        bio: 'Lifestyle and wellness coach',
        createdAt: '2024-01-01',
        stats: { postsCount: 30, followersCount: 1200, followingCount: 200, likesReceived: 3500 }
      },
      category: 'Lifestyle',
      tags: ['habits', 'productivity', 'wellness'],
      publishedAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T09:15:00Z',
      status: 'published' as const,
      likes: 156,
      comments: 28,
      views: 650,
      readTime: 6,
      isLiked: false,
      isBookmarked: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: mockPosts.length },
    { id: 'technology', name: 'Technology', count: 1 },
    { id: 'writing', name: 'Writing', count: 1 },
    { id: 'lifestyle', name: 'Lifestyle', count: 1 },
  ];

  const handleLike = (postId: string) => {
    console.log('Like post:', postId);
    // In real app, this would dispatch to context
    // dispatch({ type: 'LIKE_POST', payload: postId });
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'most-liked':
        return b.likes - a.likes;
      case 'most-viewed':
        return b.views - a.views;
      default: // newest
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Stories
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore thousands of stories from talented writers around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Stories' : categories.find(c => c.id === selectedCategory)?.name}
                {searchTerm && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    for "{searchTerm}"
                  </span>
                )}
              </h2>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-viewed">Most Viewed</option>
              </select>
            </div>

            {sortedPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No stories match your search for "${searchTerm}"`
                    : 'No stories in this category yet'
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedPosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLike} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;