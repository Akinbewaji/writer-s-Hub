import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { User, Mail, Calendar, BookOpen, Heart, Users, Edit3, Save, Camera, Settings, TrendingUp, Clock, Star, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, router]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    defaultValues: {
      name: state.user?.name || '',
      email: state.user?.email || '',
      bio: state.user?.bio || '',
    }
  });

  React.useEffect(() => {
    if (state.user) {
      reset({
        name: state.user.name,
        email: state.user.email,
        bio: state.user.bio || '',
      });
    }
  }, [state.user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!state.user) return;

    const updatedUser = {
      ...state.user,
      name: data.name,
      email: data.email,
      bio: data.bio,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    dispatch({ type: 'SET_USER', payload: updatedUser });
    setIsEditing(false);
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

  // Mock reading data for readers
  const readingStats = {
    booksRead: 24,
    pagesRead: 8450,
    readingStreak: 12,
    favoriteGenres: ['Fiction', 'Mystery', 'Science Fiction'],
    totalReadingTime: 156, // hours
    averageRating: 4.2,
  };

  // Mock recent activity for readers
  const recentActivity = [
    { action: 'Finished reading', item: 'The Art of Storytelling', time: '2 hours ago', icon: BookOpen },
    { action: 'Liked', item: 'Getting Started with Next.js', time: '4 hours ago', icon: Heart },
    { action: 'Started following', item: 'Sarah Johnson', time: '6 hours ago', icon: Users },
    { action: 'Added to favorites', item: 'Building Sustainable Habits', time: '1 day ago', icon: Star },
    { action: 'Left a comment on', item: 'The Future of Web Development', time: '2 days ago', icon: Edit3 }
  ];

  // Mock favorite posts for readers
  const favoriteBooks = [
    {
      id: '1',
      title: 'The Future of Web Development',
      author: 'Sarah Johnson',
      rating: 5,
      dateRead: '2024-01-15',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Mastering the Art of Storytelling',
      author: 'Michael Chen',
      rating: 4,
      dateRead: '2024-01-10',
      category: 'Writing'
    },
    {
      id: '3',
      title: 'Building Sustainable Habits',
      author: 'Emma Rodriguez',
      rating: 5,
      dateRead: '2024-01-08',
      category: 'Lifestyle'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'activity', name: 'Reading Activity', icon: BookOpen },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-28 h-28 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
                    {state.user.name?.charAt(0) || 'U'}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{state.user.name}</h1>
                    <p className="text-gray-600 mt-1">{state.user.bio || 'Book lover and avid reader'}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{state.user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDistanceToNow(new Date(state.user.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Edit3 className="h-5 w-5 text-gray-600" />
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Reading Stats */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Reading Statistics</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 text-center">
                      <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">{readingStats.booksRead}</div>
                      <div className="text-sm text-gray-600">Books Read</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">{readingStats.pagesRead.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Pages Read</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 text-center">
                      <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">{readingStats.totalReadingTime}h</div>
                      <div className="text-sm text-gray-600">Reading Time</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-6 text-center">
                      <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">{readingStats.averageRating}</div>
                      <div className="text-sm text-gray-600">Avg Rating</div>
                    </div>
                  </div>
                </div>

                {/* Reading Streak */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Reading Streak</h4>
                      <p className="text-gray-600">Keep up the great reading habit!</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{readingStats.readingStreak} Days</div>
                      <div className="text-sm text-gray-600">Current Streak 🔥</div>
                    </div>
                  </div>
                </div>

                {/* Favorite Genres */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Favorite Genres</h4>
                  <div className="flex flex-wrap gap-3">
                    {readingStats.favoriteGenres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Reading Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <activity.icon className="h-5 w-5 text-indigo-600" />
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
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Favorite Books</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteBooks.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="mb-3">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                          {book.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{book.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < book.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          Read {formatDistanceToNow(new Date(book.dateRead), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Privacy Settings</h4>
                    <p className="text-gray-600 text-sm mb-4">Control who can see your reading activity</p>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Show reading activity to followers</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Allow others to see your favorite books</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Notifications</h4>
                    <p className="text-gray-600 text-sm mb-4">Choose what notifications you want to receive</p>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">New posts from followed writers</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2 text-sm text-gray-700">Weekly reading recommendations</span>
                      </label>
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

export default ProfilePage;