import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { TrendingUp, Users, BookOpen, MessageSquare, Eye, Heart, Calendar, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import userDatabase from '../utils/userDatabase';

const Dashboard = () => {
  const { state } = useApp();

  // Redirect to sign in if not authenticated
  if (!state.isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Get user-specific dashboard data
  const dashboardData = userDatabase.getUserDashboardData(state.currentUser.id);
  const userStories = dashboardData.stories || [];
  const userActivity = dashboardData.activity || [];
  const userStats = dashboardData.stats || {};

  const stats = [
    { label: 'Total Views', value: userStats.totalViews?.toLocaleString() || '0', change: '+12%', icon: Eye, color: 'text-blue-600' },
    { label: 'Stories Published', value: userStats.storiesPublished?.toString() || '0', change: '+3', icon: BookOpen, color: 'text-green-600' },
    { label: 'Total Likes', value: userStats.totalLikes?.toLocaleString() || '0', change: '+8%', icon: Heart, color: 'text-red-600' },
    { label: 'Followers', value: userStats.followers?.toString() || '0', change: '+15%', icon: Users, color: 'text-purple-600' }
  ];

  // Format user stories for display
  const recentStories = userStories.slice(0, 5).map(story => ({
    title: story.title,
    views: story.views || 0,
    likes: story.likes || 0,
    comments: story.comments || 0,
    publishDate: story.publishDate ? new Date(story.publishDate).toLocaleDateString() : null,
    status: story.status || 'draft'
  }));

  // Format user activity for display
  const recentActivity = userActivity.map(activity => ({
    type: activity.type,
    description: getActivityDescription(activity),
    time: new Date(activity.timestamp).toLocaleString()
  }));

  function getActivityDescription(activity) {
    switch (activity.type) {
      case 'story_created':
        return `Created story "${activity.storyTitle}"`;
      case 'story_updated':
        return `Updated story "${activity.storyTitle}"`;
      case 'story_liked':
        return `Liked story "${activity.storyTitle}"`;
      case 'comment_added':
        return `Commented on "${activity.storyTitle}"`;
      case 'user_followed':
        return `Followed ${activity.targetUserName}`;
      case 'user_login':
        return 'Signed in to account';
      default:
        return 'Activity recorded';
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your stories.</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link 
              to="/write"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Story</span>
            </Link>
          </div>
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
          {/* Recent Stories */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Stories</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentStories.length > 0 ? recentStories.map((story, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{story.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            story.status === 'published' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {story.status}
                          </span>
                          {story.publishDate && <span>Published {story.publishDate}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{story.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No stories yet. Start writing your first story!</p>
                      <Link 
                        to="/write"
                        className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Write Your First Story
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Analytics Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Views Over Time</h2>
              </div>
              <div className="p-6">
                <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                    <p className="text-gray-600">Analytics chart would go here</p>
                    <p className="text-sm text-gray-500">Track your story performance over time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type.includes('like') ? 'bg-red-500' :
                        activity.type.includes('comment') ? 'bg-blue-500' :
                        activity.type.includes('story') ? 'bg-green-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.description}
                        </p>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No recent activity</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <Link 
                  to="/write"
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <Plus className="h-5 w-5 text-indigo-600" />
                  <span>Write New Story</span>
                </Link>
                <Link 
                  to="/discover"
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>View All Stories</span>
                </Link>
                <Link 
                  to="/profile"
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Manage Profile</span>
                </Link>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>

            {/* Writing Goals */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Stories Published</span>
                    <span>{userStats.storiesPublished || 0}/5</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(((userStats.storiesPublished || 0) / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Views</span>
                    <span>{(userStats.totalViews || 0).toLocaleString()}/1k</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(((userStats.totalViews || 0) / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;