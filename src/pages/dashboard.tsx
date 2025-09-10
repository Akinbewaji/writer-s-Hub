import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TrendingUp, Users, BookOpen, MessageSquare, Eye, Heart, Plus, Edit3, Clock, Star, Award, Calendar, Target, Bookmark, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DashboardPage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, router]);

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

  const isWriter = state.user.role === 'writer';

  const stats = [
    { 
      label: isWriter ? 'Total Views' : 'Books Read', 
      value: isWriter ? '12,847' : (state.user.stats.booksRead || 0).toString(), 
      change: '+12%', 
      icon: isWriter ? Eye : BookOpen, 
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      link: isWriter ? '/analytics' : '/reading-history'
    },
    { 
      label: isWriter ? 'Posts Published' : 'Pages Read', 
      value: isWriter ? state.user.stats.postsCount.toString() : (state.user.stats.pagesRead || 0).toLocaleString(), 
      change: '+3', 
      icon: BookOpen, 
      color: 'text-green-600',
      bg: 'bg-green-50',
      link: isWriter ? '/posts/manage' : '/reading-stats'
    },
    { 
      label: isWriter ? 'Total Likes' : 'Reading Hours', 
      value: isWriter ? state.user.stats.likesReceived.toString() : `${state.user.stats.totalReadingTime || 0}h`, 
      change: '+8%', 
      icon: isWriter ? Heart : Clock, 
      color: 'text-red-600',
      bg: 'bg-red-50',
      link: isWriter ? '/engagement' : '/reading-time'
    },
    { 
      label: 'Followers', 
      value: state.user.stats.followersCount.toString(), 
      change: '+15%', 
      icon: Users, 
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      link: '/followers'
    }
  ];

  const recentPosts = [
    {
      id: '1',
      title: "Getting Started with Next.js",
      views: 1234,
      likes: 89,
      comments: 23,
      publishedAt: "2024-01-15",
      status: "published"
    },
    {
      id: '2',
      title: "The Art of Storytelling",
      views: 856,
      likes: 67,
      comments: 15,
      publishedAt: "2024-01-10",
      status: "published"
    },
    {
      id: '3',
      title: "Draft: My Writing Journey",
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: null,
      status: "draft"
    }
  ];

  const recentReadingActivity = [
    { book: 'The Future of Web Development', author: 'Sarah Johnson', action: 'Finished reading', time: '2 hours ago' },
    { book: 'Creative Writing Masterclass', author: 'Michael Chen', action: 'Started reading', time: '1 day ago' },
    { book: 'Building Better Habits', author: 'Emma Rodriguez', action: 'Added to favorites', time: '2 days ago' }
  ];

  const notifications = [
    { type: 'like', message: 'Sarah Johnson liked your comment', time: '1 hour ago', unread: true },
    { type: 'follow', message: 'New follower: Michael Chen', time: '3 hours ago', unread: true },
    { type: 'comment', message: 'Emma Rodriguez commented on your post', time: '1 day ago', unread: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isWriter ? 'Writer Dashboard' : 'Reader Dashboard'}
            </h1>
            <p className="text-gray-600">
              Welcome back, {state.user.name}! Here's your {isWriter ? 'writing' : 'reading'} overview.
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            {isWriter && (
              <Link
                href="/posts/new"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>New Post</span>
              </Link>
            )}
            <Link
              href="/notifications"
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 relative"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {notifications.some(n => n.unread) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.link}>
              <div className={`${stat.bg} rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group`}>
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {isWriter ? 'Recent Posts' : 'Recent Reading Activity'}
                  </h2>
                  <Link
                    href={isWriter ? '/posts/manage' : '/reading-history'}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {isWriter ? (
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              post.status === 'published' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {post.status}
                            </span>
                            {post.publishedAt && <span>Published {post.publishedAt}</span>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                          <Link
                            href={`/posts/edit/${post.id}`}
                            className="text-indigo-600 hover:text-indigo-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentReadingActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{activity.book}</h3>
                          <p className="text-sm text-gray-600">by {activity.author}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {isWriter ? 'Views Over Time' : 'Reading Progress'}
                  </h2>
                  <Link
                    href="/analytics"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View details
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                    <p className="text-gray-600">Analytics chart would go here</p>
                    <p className="text-sm text-gray-500">
                      Track your {isWriter ? 'content performance' : 'reading habits'} over time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                {isWriter ? (
                  <>
                    <Link
                      href="/posts/new"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <Plus className="h-5 w-5 text-indigo-600" />
                      <span>Write New Post</span>
                    </Link>
                    <Link
                      href="/posts/manage"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <span>Manage Posts</span>
                    </Link>
                    <Link
                      href="/analytics"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span>View Analytics</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/posts"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <span>Browse Stories</span>
                    </Link>
                    <Link
                      href="/bookmarks"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <Bookmark className="h-5 w-5 text-blue-600" />
                      <span>My Bookmarks</span>
                    </Link>
                    <Link
                      href="/reading-list"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span>Reading List</span>
                    </Link>
                  </>
                )}
                <Link
                  href="/writers"
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Discover Writers</span>
                </Link>
                <Link
                  href="/profile"
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <Edit className="h-5 w-5 text-gray-600" />
                  <span>Edit Profile</span>
                </Link>
              </div>
            </div>

            {/* Goals/Progress */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                {isWriter ? 'Writing Goals' : 'Reading Goals'}
              </h3>
              <div className="space-y-4">
                {isWriter ? (
                  <>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Posts This Month</span>
                        <span>{state.user.stats.postsCount}/5</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all" 
                          style={{ width: `${Math.min((state.user.stats.postsCount / 5) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>New Followers</span>
                        <span>{state.user.stats.followersCount}/100</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all" 
                          style={{ width: `${Math.min((state.user.stats.followersCount / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Books This Month</span>
                        <span>{state.user.stats.booksRead || 0}/4</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all" 
                          style={{ width: `${Math.min(((state.user.stats.booksRead || 0) / 4) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Reading Streak</span>
                        <span>{state.user.stats.readingStreak || 0}/30 days</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${Math.min(((state.user.stats.readingStreak || 0) / 30) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Recent Notifications</h3>
                  <Link
                    href="/notifications"
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {notifications.slice(0, 3).map((notification, index) => (
                  <div key={index} className={`p-3 rounded-lg ${notification.unread ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;