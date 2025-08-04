import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TrendingUp, Users, BookOpen, MessageSquare, Eye, Heart, Plus, Edit } from 'lucide-react';
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

  const stats = [
    { label: 'Total Views', value: '12,847', change: '+12%', icon: Eye, color: 'text-blue-600' },
    { label: 'Posts Published', value: state.user.stats.postsCount.toString(), change: '+3', icon: BookOpen, color: 'text-green-600' },
    { label: 'Total Likes', value: state.user.stats.likesReceived.toString(), change: '+8%', icon: Heart, color: 'text-red-600' },
    { label: 'Followers', value: state.user.stats.followersCount.toString(), change: '+15%', icon: Users, color: 'text-purple-600' }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {state.user.name}! Here's what's happening with your content.</p>
          </div>
          {state.user.role === 'writer' && (
            <Link
              href="/posts/new"
              className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
              </div>
              <div className="p-6">
                {state.user.role === 'writer' ? (
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
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Welcome to your reading dashboard!</p>
                    <Link
                      href="/posts"
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Discover Stories
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Chart Placeholder */}
            {state.user.role === 'writer' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Views Over Time</h2>
                </div>
                <div className="p-6">
                  <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                      <p className="text-gray-600">Analytics chart would go here</p>
                      <p className="text-sm text-gray-500">Track your content performance over time</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                {state.user.role === 'writer' ? (
                  <>
                    <Link
                      href="/posts/new"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <Plus className="h-5 w-5 text-indigo-600" />
                      <span>Write New Post</span>
                    </Link>
                    <Link
                      href="/posts"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <span>View All Posts</span>
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
                      href="/writers"
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <Users className="h-5 w-5 text-purple-600" />
                      <span>Discover Writers</span>
                    </Link>
                  </>
                )}
                <Link
                  href="/profile"
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Edit Profile</span>
                </Link>
              </div>
            </div>

            {/* Goals */}
            {state.user.role === 'writer' && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Goals</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Posts Published</span>
                      <span>{state.user.stats.postsCount}/5</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((state.user.stats.postsCount / 5) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Followers</span>
                      <span>{state.user.stats.followersCount}/100</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((state.user.stats.followersCount / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;