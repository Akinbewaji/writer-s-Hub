import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Star, Search, Filter, Plus, Check, Clock, Trash2, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface ReadingListItem {
  id: string;
  title: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  publishedAt: string;
  addedAt: string;
  readTime: number;
  priority: 'low' | 'medium' | 'high';
  status: 'to-read' | 'reading' | 'completed';
  tags: string[];
  progress?: number; // percentage for currently reading items
}

const ReadingListPage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, router]);

  // Mock reading list data
  const mockReadingList: ReadingListItem[] = [
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development...',
      author: { id: '1', name: 'Sarah Johnson' },
      category: 'Technology',
      publishedAt: '2024-01-15T10:00:00Z',
      addedAt: '2024-01-16T14:30:00Z',
      readTime: 5,
      priority: 'high',
      status: 'reading',
      progress: 65,
      tags: ['web development', 'javascript', 'react']
    },
    {
      id: '2',
      title: 'Mastering the Art of Storytelling',
      excerpt: 'Learn the fundamental techniques that make stories compelling and memorable...',
      author: { id: '2', name: 'Michael Chen' },
      category: 'Writing',
      publishedAt: '2024-01-14T15:30:00Z',
      addedAt: '2024-01-15T09:20:00Z',
      readTime: 8,
      priority: 'medium',
      status: 'to-read',
      tags: ['storytelling', 'creative writing', 'narrative']
    },
    {
      id: '3',
      title: 'Building Sustainable Habits',
      excerpt: 'A practical guide to creating lasting positive changes in your daily routine...',
      author: { id: '3', name: 'Emma Rodriguez' },
      category: 'Lifestyle',
      publishedAt: '2024-01-13T09:15:00Z',
      addedAt: '2024-01-14T16:45:00Z',
      readTime: 6,
      priority: 'high',
      status: 'completed',
      tags: ['habits', 'productivity', 'wellness']
    },
    {
      id: '4',
      title: 'Advanced React Patterns',
      excerpt: 'Deep dive into advanced React patterns and best practices for scalable applications...',
      author: { id: '1', name: 'Sarah Johnson' },
      category: 'Technology',
      publishedAt: '2024-01-12T11:20:00Z',
      addedAt: '2024-01-13T08:15:00Z',
      readTime: 12,
      priority: 'medium',
      status: 'to-read',
      tags: ['react', 'javascript', 'patterns']
    },
    {
      id: '5',
      title: 'The Psychology of Color in Design',
      excerpt: 'Understanding how colors affect user behavior and emotional responses in digital design...',
      author: { id: '4', name: 'David Kim' },
      category: 'Design',
      publishedAt: '2024-01-11T13:45:00Z',
      addedAt: '2024-01-12T10:30:00Z',
      readTime: 7,
      priority: 'low',
      status: 'to-read',
      tags: ['design', 'psychology', 'color theory']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reading': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'to-read': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusChange = (itemId: string, newStatus: string) => {
    // In real app, this would make an API call
    console.log('Status change:', itemId, newStatus);
  };

  const handlePriorityChange = (itemId: string, newPriority: string) => {
    // In real app, this would make an API call
    console.log('Priority change:', itemId, newPriority);
  };

  const handleRemove = (itemId: string) => {
    // In real app, this would make an API call
    console.log('Remove from reading list:', itemId);
  };

  const filteredItems = mockReadingList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'oldest-added':
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'read-time':
        return a.readTime - b.readTime;
      case 'title':
        return a.title.localeCompare(b.title);
      default: // newest-added
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
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

  const statusCounts = {
    all: mockReadingList.length,
    'to-read': mockReadingList.filter(item => item.status === 'to-read').length,
    reading: mockReadingList.filter(item => item.status === 'reading').length,
    completed: mockReadingList.filter(item => item.status === 'completed').length
  };

  const totalReadTime = mockReadingList.reduce((sum, item) => sum + item.readTime, 0);
  const completedReadTime = mockReadingList
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.readTime, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Star className="h-8 w-8 mr-3 text-indigo-600" />
              My Reading List
            </h1>
            <p className="text-gray-600">Organize and track your reading progress</p>
          </div>
          <Link
            href="/posts"
            className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Stories</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">{statusCounts.all}</div>
            <div className="text-gray-600">Total Items</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.reading}</div>
            <div className="text-gray-600">Currently Reading</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">{totalReadTime}m</div>
            <div className="text-gray-600">Total Read Time</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Reading Progress</h3>
            <span className="text-sm text-gray-600">
              {completedReadTime}m / {totalReadTime}m completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
              style={{ width: `${totalReadTime > 0 ? (completedReadTime / totalReadTime) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reading list..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status ({statusCounts.all})</option>
              <option value="to-read">To Read ({statusCounts['to-read']})</option>
              <option value="reading">Reading ({statusCounts.reading})</option>
              <option value="completed">Completed ({statusCounts.completed})</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest-added">Recently Added</option>
              <option value="oldest-added">Oldest Added</option>
              <option value="priority">By Priority</option>
              <option value="read-time">By Read Time</option>
              <option value="title">By Title</option>
            </select>
          </div>
        </div>

        {/* Reading List */}
        {sortedItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items in reading list</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No items match "${searchTerm}"`
                : 'Start building your reading list by adding stories you want to read!'
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
            {sortedItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                      <Link href={`/posts/${item.id}`}>
                        {item.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{item.excerpt}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>by {item.author.name}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{item.readTime} min read</span>
                      </div>
                      <span>Added {formatDistanceToNow(new Date(item.addedAt), { addSuffix: true })}</span>
                    </div>
                    
                    {item.status === 'reading' && item.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Reading Progress</span>
                          <span className="text-blue-600 font-medium">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="to-read">To Read</option>
                      <option value="reading">Reading</option>
                      <option value="completed">Completed</option>
                    </select>
                    
                    <select
                      value={item.priority}
                      onChange={(e) => handlePriorityChange(item.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    
                    <div className="flex space-x-1">
                      <Link
                        href={`/posts/${item.id}`}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        Read
                      </Link>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from list"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingListPage;