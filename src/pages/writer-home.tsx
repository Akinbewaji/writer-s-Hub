import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PenTool, BookOpen, TrendingUp, Users, Eye, Heart, MessageSquare, Plus, Edit3, Calendar, Target, Award, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const WriterHomePage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated or not a writer
  React.useEffect(() => {
    if (!state.loading && (!state.isAuthenticated || state.user?.role !== 'writer')) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, state.user?.role, router]);

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!state.isAuthenticated || state.user?.role !== 'writer') {
    return null;
  }

  const quickStats = [
    { label: 'Stories Published', value: state.user.stats.postsCount, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Views', value: '12.5K', icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Likes', value: state.user.stats.likesReceived, icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Followers', value: state.user.stats.followersCount, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const recentActivity = [
    { action: 'Published', item: 'The Art of Storytelling', time: '2 hours ago', icon: BookOpen },
    { action: 'Received 15 likes on', item: 'Getting Started with Next.js', time: '4 hours ago', icon: Heart },
    { action: 'New follower', item: 'Sarah Johnson started following you', time: '6 hours ago', icon: Users },
    { action: 'Comment on', item: 'Building Sustainable Habits', time: '1 day ago', icon: MessageSquare }
  ];

  const writingGoals = [
    { goal: 'Publish 5 stories this month', current: state.user.stats.postsCount, target: 5, color: 'indigo' },
    { goal: 'Reach 100 followers', current: state.user.stats.followersCount, target: 100, color: 'purple' },
    { goal: 'Get 500 total likes', current: state.user.stats.likesReceived, target: 500, color: 'pink' }
  ];

  const inspirationalQuotes = [
    "The first draft of anything is shit. - Ernest Hemingway",
    "You can make anything by writing. - C.S. Lewis",
    "Write what should not be forgotten. - Isabel Allende",
    "The scariest moment is always just before you start. - Stephen King"
  ];

  const todayQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <PenTool className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {state.user.name}! ✨
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Ready to craft your next masterpiece? Your writing journey continues here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/posts/new"
                className="bg-white text-indigo-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Start Writing</span>
              </Link>
              <Link
                href="/dashboard"
                className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300 font-semibold"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Inspiration */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-amber-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Daily Inspiration</h2>
              </div>
              <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                "{todayQuote}"
              </blockquote>
            </div>

            {/* Writing Goals */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-bold text-gray-900">Writing Goals</h2>
                  </div>
                  <span className="text-sm text-gray-500">This Month</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {writingGoals.map((goal, index) => {
                  const progress = Math.min((goal.current / goal.target) * 100, 100);
                  const colorClass = goal.color === 'indigo' 
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                    : goal.color === 'purple' 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                    : 'bg-gradient-to-r from-pink-500 to-pink-600';
                    
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{goal.goal}</span>
                        <span className="text-sm text-gray-500">{goal.current}/{goal.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${colorClass}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      {progress >= 100 && (
                        <div className="flex items-center mt-2 text-green-600">
                          <Award className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Goal Achieved! 🎉</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <activity.icon className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span className="font-medium">{activity.action}</span>{' '}
                          <span className="text-indigo-600">{activity.item}</span>
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
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
                <Link
                  href="/posts/new"
                  className="w-full flex items-center space-x-3 p-3 hover:bg-indigo-50 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Plus className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Write New Story</div>
                    <div className="text-sm text-gray-500">Start your next masterpiece</div>
                  </div>
                </Link>
                <Link
                  href="/posts"
                  className="w-full flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Edit3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Edit Drafts</div>
                    <div className="text-sm text-gray-500">Continue your work</div>
                  </div>
                </Link>
                <Link
                  href="/posts"
                  className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Browse Stories</div>
                    <div className="text-sm text-gray-500">Get inspired by others</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Writing Streak */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Writing Streak</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">7 Days</div>
                <p className="text-gray-600 mb-4">Keep it up! You're on fire! 🔥</p>
                <div className="flex justify-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Highlights */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Community Highlights</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-sm text-gray-600">
                    You're in the <span className="font-semibold text-indigo-600">top 10%</span> of active writers this month!
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <p className="text-sm text-gray-600">
                    Your stories have been viewed <span className="font-semibold text-green-600">2.3x more</span> than last month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterHomePage;