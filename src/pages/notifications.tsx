import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Bell, Heart, MessageSquare, Users, BookOpen, Settings, Check, Trash2, Filter } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'post' | 'mention' | 'system';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  actionUrl?: string;
  avatar?: string;
  metadata?: {
    postTitle?: string;
    userName?: string;
    count?: number;
  };
}

const NotificationsPage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, router]);

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      title: 'New likes on your post',
      message: 'Sarah Johnson and 12 others liked your post "The Future of Web Development"',
      time: '2024-01-15T10:30:00Z',
      unread: true,
      actionUrl: '/posts/1',
      metadata: { postTitle: 'The Future of Web Development', count: 13 }
    },
    {
      id: '2',
      type: 'comment',
      title: 'New comment',
      message: 'Michael Chen commented on your post "Building Better UIs"',
      time: '2024-01-15T09:15:00Z',
      unread: true,
      actionUrl: '/posts/2',
      metadata: { userName: 'Michael Chen', postTitle: 'Building Better UIs' }
    },
    {
      id: '3',
      type: 'follow',
      title: 'New follower',
      message: 'Emma Rodriguez started following you',
      time: '2024-01-15T08:45:00Z',
      unread: true,
      actionUrl: '/writers/3',
      metadata: { userName: 'Emma Rodriguez' }
    },
    {
      id: '4',
      type: 'post',
      title: 'New post from followed writer',
      message: 'David Kim published a new post "JavaScript Best Practices"',
      time: '2024-01-14T16:20:00Z',
      unread: false,
      actionUrl: '/posts/4',
      metadata: { userName: 'David Kim', postTitle: 'JavaScript Best Practices' }
    },
    {
      id: '5',
      type: 'mention',
      title: 'You were mentioned',
      message: 'Lisa Thompson mentioned you in a comment on "Advanced React Patterns"',
      time: '2024-01-14T14:10:00Z',
      unread: false,
      actionUrl: '/posts/5',
      metadata: { userName: 'Lisa Thompson', postTitle: 'Advanced React Patterns' }
    },
    {
      id: '6',
      type: 'system',
      title: 'Weekly summary',
      message: 'Your posts received 234 views and 45 likes this week',
      time: '2024-01-14T09:00:00Z',
      unread: false,
      actionUrl: '/analytics',
      metadata: { count: 234 }
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageSquare;
      case 'follow': return Users;
      case 'post': return BookOpen;
      case 'mention': return MessageSquare;
      case 'system': return Bell;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like': return 'text-red-500 bg-red-50';
      case 'comment': return 'text-blue-500 bg-blue-50';
      case 'follow': return 'text-purple-500 bg-purple-50';
      case 'post': return 'text-green-500 bg-green-50';
      case 'mention': return 'text-orange-500 bg-orange-50';
      case 'system': return 'text-gray-500 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const filteredNotifications = mockNotifications.filter(notification => {
    if (filter === 'unread') return notification.unread;
    if (filter === 'read') return !notification.unread;
    if (filter !== 'all') return notification.type === filter;
    return true;
  });

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  const handleMarkAsRead = (notificationId: string) => {
    // In real app, this would make an API call
    console.log('Mark as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    // In real app, this would make an API call
    console.log('Mark all as read');
  };

  const handleDelete = (notificationId: string) => {
    // In real app, this would make an API call
    console.log('Delete notification:', notificationId);
  };

  const handleBulkAction = (action: 'read' | 'delete') => {
    // In real app, this would make an API call
    console.log(`Bulk ${action}:`, selectedNotifications);
    setSelectedNotifications([]);
  };

  const toggleSelection = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

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

  const filterOptions = [
    { id: 'all', name: 'All', count: mockNotifications.length },
    { id: 'unread', name: 'Unread', count: unreadCount },
    { id: 'like', name: 'Likes', count: mockNotifications.filter(n => n.type === 'like').length },
    { id: 'comment', name: 'Comments', count: mockNotifications.filter(n => n.type === 'comment').length },
    { id: 'follow', name: 'Follows', count: mockNotifications.filter(n => n.type === 'follow').length },
    { id: 'post', name: 'Posts', count: mockNotifications.filter(n => n.type === 'post').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Bell className="h-8 w-8 mr-3 text-indigo-600" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-3 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-gray-600">Stay updated with your latest activity</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Check className="h-4 w-4" />
                <span>Mark all read</span>
              </button>
            )}
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </h3>
              <div className="space-y-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFilter(option.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filter === option.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option.name}</span>
                      <span className="text-sm text-gray-500">{option.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {selectedNotifications.length} notification{selectedNotifications.length !== 1 ? 's' : ''} selected
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBulkAction('read')}
                      className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Mark as read
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">
                    {filter === 'unread' ? 'All caught up! No unread notifications.' : 'You have no notifications yet.'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    const colorClasses = getNotificationColor(notification.type);
                    
                    return (
                      <div
                        key={notification.id}
                        className={`p-6 hover:bg-gray-50 transition-colors ${
                          notification.unread ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(notification.id)}
                            onChange={() => toggleSelection(notification.id)}
                            className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className={`text-sm font-medium ${
                                  notification.unread ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                  {notification.unread && (
                                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                                  )}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2 ml-4">
                                {notification.unread && (
                                  <button
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                    title="Mark as read"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDelete(notification.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            {notification.actionUrl && (
                              <button
                                onClick={() => router.push(notification.actionUrl!)}
                                className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                              >
                                View →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;