import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Bookmark, Search, Filter, Calendar, Heart, Eye, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface BookmarkedPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  publishedAt: string;
  bookmarkedAt: string;
  readTime: number;
  likes: number;
  views: number;
  tags: string[];
}

const BookmarksPage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, router]);

  // Mock bookmarked posts data
  const mockBookmarks: BookmarkedPost[] = [
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development...',
      author: { id: '1', name: 'Sarah Johnson' },
      category: 'Technology',
      publishedAt: '2024-01-15T10:00:00Z',
      bookmarkedAt: '2024-01-16T14:30:00Z',
      readTime: 5,
      likes: 234,
      views: 1200,
      tags: ['web development', 'javascript', 'react']
    },
    {
      id: '2',
      title: 'Mastering the Art of Storytelling',
      excerpt: 'Learn the fundamental techniques that make stories compelling and memorable...',
      author: { id: '2', name: 'Michael Chen' },
      category: 'Writing',
      publishedAt: '2024-01-14T15:30:00Z',
      bookmarkedAt: '2024-01-15T09:20:00Z',
      readTime: 8,
      likes: 189,
      views: 890,
      tags: ['storytelling', 'creative writing', 'narrative']
    },
    {
      id: '3',
      title: 'Building Sustainable Habits',
      excerpt: 'A practical guide to creating lasting positive changes in your daily routine...',
      author: { id: '3', name: 'Emma Rodriguez' },
      category: 'Lifestyle',
      publishedAt: '2024-01-13T09:15:00Z',
      bookmarkedAt: '2024-01-14T16:45:00Z',
      readTime: 6,
      likes: 156,
      views: 650,
      tags: ['habits', 'productivity', 'wellness']
    },
    {
      id: '4',
      title: 'Advanced React Patterns',
      excerpt: 'Deep dive into advanced React patterns and best practices for scalable applications...',
      author: { id: '1', name: 'Sarah Johnson' },
      category: 'Technology',
      publishedAt: '2024-01-12T11:20:00Z',
      bookmarkedAt: '2024-01-13T08:15:00Z',
      readTime: 12,
      likes: 298,
      views: 1456,
      tags: ['react', 'javascript', 'patterns']
    },
    {
      id: '5',
      title: 'The Psychology of Color in Design',
      excerpt: 'Understanding how colors affect user behavior and emotional responses in digital design...',
      author: { id: '4', name: 'David Kim' },
      category: 'Design',
      publishedAt: '2024-01-11T13:45:00Z',
      bookmarkedAt: '2024-01-12T10:30:00Z',
      readTime: 7,
      likes: 167,
      views: 743,
      tags: ['design', 'psychology', 'color theory']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: mockBookmarks.length },
    { id: 'technology', name: 'Technology', count: mockBookmarks.filter(b => b.category.toLowerCase() === 'technology').length },
    { id: 'writing', name: 'Writing', count: mockBookmarks.filter(b => b.category.toLowerCase() === 'writing').length },
    { id: 'lifestyle', name: 'Lifestyle', count: mockBookmarks.filter(b => b.category.toLowerCase() === 'lifestyle').length },
    { id: 'design', name: 'Design', count: mockBookmarks.filter(b => b.category.toLowerCase() === 'design').length }
  ];

  const handleRemoveBookmark = (postId: string) => {
    // In real app, this would make an API call
    console.log('Remove bookmark:', postId);
  };

  const filteredBookmarks = mockBookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                           bookmark.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'oldest-bookmarked':
        return new Date(a.bookmarkedAt).getTime() - new Date(b.bookmarkedAt).getTime();
      case 'oldest-published':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'newest-published':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'most-liked':
        return b.likes - a.likes;
      case 'most-viewed':
        return b.views - a.views;
      case 'title':
        return a.title.localeCompare(b.title);
      default: // newest-bookmarked
        return new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime();
    }
  });

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Bookmark className="h-8 w-8 mr-3 text-indigo-600" />
            My Bookmarks
          </h1>
          <p className="text-gray-600">Your saved articles and stories for later reading</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">{mockBookmarks.length}</div>
            <div className="text-gray-600">Total Bookmarks</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {mockBookmarks.reduce((sum, b) => sum + b.readTime, 0)}m
            </div>
            <div className="text-gray-600">Total Read Time</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(mockBookmarks.map(b => b.author.id)).size}
            </div>
            <div className="text-gray-600">Unique Authors</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(mockBookmarks.map(b => b.category)).size}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>

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
                    onClick={() => setCategoryFilter(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      categoryFilter === category.id
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
            {/* Search and Sort */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="newest-bookmarked">Recently Bookmarked</option>
                  <option value="oldest-bookmarked">Oldest Bookmarked</option>
                  <option value="newest-published">Recently Published</option>
                  <option value="oldest-published">Oldest Published</option>
                  <option value="most-liked">Most Liked</option>
                  <option value="most-viewed">Most Viewed</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>

            {/* Bookmarks List */}
            {sortedBookmarks.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
                <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookmarks found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No bookmarks match "${searchTerm}"`
                    : 'Start bookmarking articles you want to read later!'
                  }
                </p>
                <Link
                  href="/posts"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Discover Stories
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedBookmarks.map((bookmark) => (
                  <article
                    key={bookmark.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                            {bookmark.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            Bookmarked {formatDistanceToNow(new Date(bookmark.bookmarkedAt), { addSuffix: true })}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                          <Link href={`/posts/${bookmark.id}`}>
                            {bookmark.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{bookmark.excerpt}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <span>by {bookmark.author.name}</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDistanceToNow(new Date(bookmark.publishedAt), { addSuffix: true })}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{bookmark.readTime} min read</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {bookmark.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{bookmark.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{bookmark.views}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/posts/${bookmark.id}`}
                              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                            >
                              Read Now
                            </Link>
                            <button
                              onClick={() => handleRemoveBookmark(bookmark.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove bookmark"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;