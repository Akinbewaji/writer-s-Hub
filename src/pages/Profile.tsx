import React, { useState } from 'react';
import { Edit, Settings, BookOpen, Heart, MessageSquare, Award, Calendar, Users } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stories');

  const userStats = [
    { label: 'Stories Published', value: 24, icon: BookOpen },
    { label: 'Total Likes', value: 1847, icon: Heart },
    { label: 'Comments', value: 312, icon: MessageSquare },
    { label: 'Followers', value: 456, icon: Users }
  ];

  const stories = [
    {
      id: 1,
      title: "The Digital Nomad's Journey",
      excerpt: "A tale of self-discovery through remote work and travel...",
      likes: 234,
      comments: 45,
      publishDate: "2024-02-15",
      status: "published"
    },
    {
      id: 2,
      title: "Midnight Reflections",
      excerpt: "Thoughts that come alive in the quiet hours...",
      likes: 189,
      comments: 32,
      publishDate: "2024-02-10",
      status: "published"
    },
    {
      id: 3,
      title: "The Art of Slow Living",
      excerpt: "Finding peace in a fast-paced world...",
      likes: 0,
      comments: 0,
      publishDate: null,
      status: "draft"
    }
  ];

  const achievements = [
    { title: "First Story", description: "Published your first story", date: "Jan 2024", icon: "🎉" },
    { title: "Popular Writer", description: "Reached 1000 total likes", date: "Feb 2024", icon: "⭐" },
    { title: "Community Member", description: "Active for 6 months", date: "Feb 2024", icon: "🏆" },
    { title: "Helpful Critic", description: "Left 100 helpful comments", date: "Mar 2024", icon: "💬" }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              <div className="relative -mt-16 mb-4 md:mb-0">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold">
                  AC
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Alex Chen</h1>
                    <p className="text-gray-600 mb-4">
                      Passionate storyteller exploring the intersection of technology and humanity. 
                      Love writing about travel, personal growth, and the future.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📍 San Francisco, CA</span>
                      <span>📅 Joined January 2024</span>
                      <span>🌐 alexchen.blog</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <stat.icon className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <div className="flex space-x-1">
            {[
              { id: 'stories', label: 'My Stories', icon: BookOpen },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'activity', label: 'Activity', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'stories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Stories</h2>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Write New Story
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {stories.map((story) => (
                <div key={story.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{story.excerpt}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      story.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {story.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </div>
                    </div>
                    <div>
                      {story.publishDate ? `Published ${story.publishDate}` : 'Draft'}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                      {story.status === 'published' ? 'View' : 'Edit'}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      ⋯
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {achievement.description}
                      </p>
                      <span className="text-xs text-gray-500">
                        Earned {achievement.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900">Published a new story: "The Digital Nomad's Journey"</p>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900">Received 50 likes on "Midnight Reflections"</p>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900">Joined the "Sci-Fi Writers Circle" group</p>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;