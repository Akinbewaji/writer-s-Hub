import React from 'react';
import { useRouter } from 'next/router';
import { TrendingUp, Eye, Heart, MessageSquare, Users, Calendar, BarChart3, PieChart, Activity, BookOpen, Clock, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AnalyticsPage: React.FC = () => {
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

  // Mock analytics data
  const analyticsData = {
    totalViews: 12847,
    totalLikes: 1234,
    totalComments: 456,
    totalFollowers: 789,
    viewsGrowth: 12.5,
    likesGrowth: 8.3,
    commentsGrowth: 15.2,
    followersGrowth: 6.7,
    topPosts: [
      { title: 'The Future of Web Development', views: 3456, likes: 234, comments: 45 },
      { title: 'Building Better UIs', views: 2890, likes: 189, comments: 32 },
      { title: 'Advanced React Patterns', views: 2156, likes: 145, comments: 28 },
      { title: 'JavaScript Best Practices', views: 1876, likes: 123, comments: 19 },
      { title: 'CSS Grid Mastery', views: 1654, likes: 98, comments: 15 }
    ],
    monthlyViews: [
      { month: 'Jan', views: 1200, likes: 89, comments: 23 },
      { month: 'Feb', views: 1890, likes: 134, comments: 34 },
      { month: 'Mar', views: 2340, likes: 178, comments: 45 },
      { month: 'Apr', views: 2890, likes: 234, comments: 56 },
      { month: 'May', views: 3456, likes: 289, comments: 67 },
      { month: 'Jun', views: 4123, likes: 345, comments: 78 }
    ],
    audienceData: [
      { country: 'United States', percentage: 35, views: 4496 },
      { country: 'United Kingdom', percentage: 18, views: 2312 },
      { country: 'Canada', percentage: 12, views: 1542 },
      { country: 'Germany', percentage: 10, views: 1285 },
      { country: 'Australia', percentage: 8, views: 1028 },
      { country: 'Others', percentage: 17, views: 2184 }
    ]
  };

  const readerAnalytics = {
    booksRead: 24,
    pagesRead: 8450,
    readingTime: 156,
    averageRating: 4.2,
    readingStreak: 12,
    favoriteGenres: [
      { genre: 'Fiction', percentage: 35, books: 8 },
      { genre: 'Technology', percentage: 25, books: 6 },
      { genre: 'Mystery', percentage: 20, books: 5 },
      { genre: 'Science Fiction', percentage: 15, books: 4 },
      { genre: 'Biography', percentage: 5, books: 1 }
    ],
    monthlyReading: [
      { month: 'Jan', books: 3, hours: 24 },
      { month: 'Feb', books: 4, hours: 32 },
      { month: 'Mar', books: 5, hours: 38 },
      { month: 'Apr', books: 4, hours: 28 },
      { month: 'May', books: 5, hours: 42 },
      { month: 'Jun', books: 3, hours: 26 }
    ]
  };

  const stats = isWriter ? [
    { label: 'Total Views', value: analyticsData.totalViews.toLocaleString(), change: `+${analyticsData.viewsGrowth}%`, icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Likes', value: analyticsData.totalLikes.toLocaleString(), change: `+${analyticsData.likesGrowth}%`, icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Total Comments', value: analyticsData.totalComments.toLocaleString(), change: `+${analyticsData.commentsGrowth}%`, icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Followers', value: analyticsData.totalFollowers.toLocaleString(), change: `+${analyticsData.followersGrowth}%`, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }
  ] : [
    { label: 'Books Read', value: readerAnalytics.booksRead.toString(), change: '+3 this month', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pages Read', value: readerAnalytics.pagesRead.toLocaleString(), change: '+450 this month', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Reading Hours', value: `${readerAnalytics.readingTime}h`, change: '+12h this month', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Reading Streak', value: `${readerAnalytics.readingStreak} days`, change: 'Current streak', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isWriter ? 'Content Analytics' : 'Reading Analytics'}
          </h1>
          <p className="text-gray-600">
            {isWriter 
              ? 'Track your content performance and audience engagement'
              : 'Monitor your reading habits and progress'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bg} rounded-2xl p-6 shadow-sm border border-gray-100`}>
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-indigo-600" />
                  {isWriter ? 'Monthly Performance' : 'Monthly Reading'}
                </h2>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                  <p className="text-gray-600">Performance chart visualization</p>
                  <p className="text-sm text-gray-500">
                    {isWriter ? 'Views, likes, and comments over time' : 'Books read and hours spent reading'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Content / Genres */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                {isWriter ? 'Top Performing Posts' : 'Favorite Genres'}
              </h2>
            </div>
            <div className="p-6">
              {isWriter ? (
                <div className="space-y-4">
                  {analyticsData.topPosts.map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{post.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{post.views.toLocaleString()} views</span>
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {readerAnalytics.favoriteGenres.map((genre, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{genre.genre}</span>
                          <span className="text-sm text-gray-500">{genre.books} books</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${genre.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Audience / Reading Patterns */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <PieChart className="h-6 w-6 mr-2 text-purple-600" />
                {isWriter ? 'Audience by Country' : 'Reading Patterns'}
              </h2>
            </div>
            <div className="p-6">
              {isWriter ? (
                <div className="space-y-3">
                  {analyticsData.audienceData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-900">{country.country}</span>
                          <span className="text-sm text-gray-500">{country.views.toLocaleString()} views</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{readerAnalytics.averageRating}</div>
                    <div className="text-gray-600">Average Rating Given</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">6.5h</div>
                      <div className="text-sm text-gray-600">Avg. per week</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">4</div>
                      <div className="text-sm text-gray-600">Books/month</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-orange-600" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {isWriter ? (
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Post published</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Reached 1K views milestone</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New follower milestone</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Finished "The Art of Storytelling"</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">12-day reading streak achieved</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Added 3 books to reading list</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;