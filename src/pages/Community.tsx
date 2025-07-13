import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Award, TrendingUp, Plus, Search } from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: "What's your writing routine?",
      author: "Sarah Mitchell",
      replies: 47,
      lastActivity: "2 hours ago",
      category: "Writing Tips",
      likes: 23
    },
    {
      id: 2,
      title: "Feedback on my latest short story",
      author: "James Park",
      replies: 12,
      lastActivity: "4 hours ago",
      category: "Feedback",
      likes: 8
    },
    {
      id: 3,
      title: "Best books you've read this month",
      author: "Emma Rodriguez",
      replies: 89,
      lastActivity: "6 hours ago",
      category: "Book Club",
      likes: 56
    }
  ];

  const events = [
    {
      id: 1,
      title: "Weekly Writing Challenge: Time Travel",
      date: "March 15, 2024",
      time: "7:00 PM EST",
      participants: 234,
      type: "Challenge"
    },
    {
      id: 2,
      title: "Author Spotlight: Indie Publishing",
      date: "March 18, 2024",
      time: "6:00 PM EST",
      participants: 156,
      type: "Workshop"
    },
    {
      id: 3,
      title: "Poetry Reading Night",
      date: "March 22, 2024",
      time: "8:00 PM EST",
      participants: 89,
      type: "Event"
    }
  ];

  const groups = [
    {
      id: 1,
      name: "Sci-Fi Writers Circle",
      members: 1247,
      description: "A community for science fiction writers to share ideas and get feedback",
      image: "https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      name: "Poetry Corner",
      members: 892,
      description: "Share your poems and discover beautiful verses from fellow poets",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      name: "First-Time Authors",
      members: 2156,
      description: "Support and guidance for writers publishing their first book",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our Community
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Connect with fellow writers, share your work, and grow together in our supportive community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Start a Discussion
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-purple-600 transition-colors">
                Join a Group
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Users className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">12,000+</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">3,500+</div>
            <div className="text-gray-600">Discussions</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-gray-600">Events Monthly</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Award className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <div className="flex space-x-1">
            {[
              { id: 'discussions', label: 'Discussions', icon: MessageSquare },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'groups', label: 'Groups', icon: Users }
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
        {activeTab === 'discussions' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>New Discussion</span>
                </button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>by {discussion.author}</span>
                          <span>{discussion.lastActivity}</span>
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
                            {discussion.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Categories</h3>
                <div className="space-y-3">
                  {['Writing Tips', 'Feedback', 'Book Club', 'Publishing', 'Inspiration'].map((category) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 100) + 20} posts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Be respectful and constructive</li>
                  <li>• Provide helpful feedback</li>
                  <li>• Stay on topic</li>
                  <li>• No spam or self-promotion</li>
                  <li>• Support fellow writers</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Create Event</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.type === 'Challenge' ? 'bg-green-100 text-green-700' :
                      event.type === 'Workshop' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {event.type}
                    </span>
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>{event.date}</div>
                    <div>{event.time}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {event.participants} participants
                    </span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Writing Groups</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search groups..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Create Group</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div key={group.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {group.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {group.members.toLocaleString()} members
                      </span>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                        Join Group
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;