import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Users, BookOpen, Heart, TrendingUp, Star, MapPin, Calendar, Award, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface Writer {
  id: string;
  name: string;
  email: string;
  role: 'writer';
  bio: string;
  avatar?: string;
  createdAt: string;
  location?: string;
  website?: string;
  specialties: string[];
  stats: {
    postsCount: number;
    followersCount: number;
    followingCount: number;
    likesReceived: number;
    totalViews: number;
    averageRating: number;
  };
  isFollowing?: boolean;
  featured?: boolean;
  verified?: boolean;
}

const WritersPage: React.FC = () => {
  const { state, dispatch } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Mock writers data
  const mockWriters: Writer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'writer',
      bio: 'Tech writer and full-stack developer with 8 years of experience. Passionate about emerging technologies and their impact on society.',
      createdAt: '2023-01-15T10:00:00Z',
      location: 'San Francisco, CA',
      website: 'https://sarahjohnson.dev',
      specialties: ['Technology', 'Programming', 'AI'],
      stats: {
        postsCount: 45,
        followersCount: 2500,
        followingCount: 180,
        likesReceived: 8900,
        totalViews: 125000,
        averageRating: 4.8,
      },
      isFollowing: false,
      featured: true,
      verified: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'writer',
      bio: 'Creative writing instructor and published novelist. Helping aspiring writers find their unique voice and tell compelling stories.',
      createdAt: '2023-03-20T14:30:00Z',
      location: 'New York, NY',
      specialties: ['Creative Writing', 'Fiction', 'Storytelling'],
      stats: {
        postsCount: 32,
        followersCount: 1800,
        followingCount: 95,
        likesReceived: 5600,
        totalViews: 89000,
        averageRating: 4.6,
      },
      isFollowing: true,
      featured: true,
      verified: false,
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma@example.com',
      role: 'writer',
      bio: 'Lifestyle and wellness coach turned writer. Sharing practical tips for building sustainable habits and living your best life.',
      createdAt: '2023-05-10T09:15:00Z',
      location: 'Austin, TX',
      specialties: ['Lifestyle', 'Wellness', 'Self-Improvement'],
      stats: {
        postsCount: 28,
        followersCount: 3200,
        followingCount: 220,
        likesReceived: 7200,
        totalViews: 98000,
        averageRating: 4.7,
      },
      isFollowing: false,
      featured: false,
      verified: true,
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@example.com',
      role: 'writer',
      bio: 'Business strategist and entrepreneur. Writing about startups, leadership, and the future of work in the digital age.',
      createdAt: '2023-02-28T16:45:00Z',
      location: 'Seattle, WA',
      specialties: ['Business', 'Entrepreneurship', 'Leadership'],
      stats: {
        postsCount: 38,
        followersCount: 1950,
        followingCount: 145,
        likesReceived: 6800,
        totalViews: 112000,
        averageRating: 4.5,
      },
      isFollowing: false,
      featured: false,
      verified: false,
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      email: 'lisa@example.com',
      role: 'writer',
      bio: 'Travel photographer and adventure writer. Documenting cultures, cuisines, and hidden gems from around the world.',
      createdAt: '2023-04-12T11:20:00Z',
      location: 'Portland, OR',
      specialties: ['Travel', 'Photography', 'Culture'],
      stats: {
        postsCount: 52,
        followersCount: 4100,
        followingCount: 380,
        likesReceived: 12500,
        totalViews: 156000,
        averageRating: 4.9,
      },
      isFollowing: true,
      featured: true,
      verified: true,
    },
    {
      id: '6',
      name: 'James Wilson',
      email: 'james@example.com',
      role: 'writer',
      bio: 'Science communicator and researcher. Making complex scientific concepts accessible to everyone through engaging storytelling.',
      createdAt: '2023-06-05T13:10:00Z',
      location: 'Boston, MA',
      specialties: ['Science', 'Research', 'Education'],
      stats: {
        postsCount: 29,
        followersCount: 1650,
        followingCount: 120,
        likesReceived: 4900,
        totalViews: 78000,
        averageRating: 4.4,
      },
      isFollowing: false,
      featured: false,
      verified: true,
    },
  ];

  const specialties = [
    { id: 'all', name: 'All Specialties', count: mockWriters.length },
    { id: 'technology', name: 'Technology', count: mockWriters.filter(w => w.specialties.some(s => s.toLowerCase().includes('technology') || s.toLowerCase().includes('programming') || s.toLowerCase().includes('ai'))).length },
    { id: 'creative-writing', name: 'Creative Writing', count: mockWriters.filter(w => w.specialties.some(s => s.toLowerCase().includes('creative') || s.toLowerCase().includes('fiction') || s.toLowerCase().includes('storytelling'))).length },
    { id: 'lifestyle', name: 'Lifestyle', count: mockWriters.filter(w => w.specialties.some(s => s.toLowerCase().includes('lifestyle') || s.toLowerCase().includes('wellness'))).length },
    { id: 'business', name: 'Business', count: mockWriters.filter(w => w.specialties.some(s => s.toLowerCase().includes('business') || s.toLowerCase().includes('entrepreneur'))).length },
    { id: 'travel', name: 'Travel', count: mockWriters.filter(w => w.specialties.some(s => s.toLowerCase().includes('travel'))).length },
    { id: 'science', name: 'Science', count: mockWriters.filter(w => w.specialties.some(s => s.toLowerCase().includes('science'))).length },
  ];

  const handleFollow = (writerId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggle follow for writer ${writerId}`);
    dispatch({ type: 'FOLLOW_WRITER', payload: writerId });
  };

  const filteredWriters = mockWriters.filter(writer => {
    const matchesSearch = writer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         writer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         writer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            writer.specialties.some(s => {
                              switch(selectedSpecialty) {
                                case 'technology':
                                  return s.toLowerCase().includes('technology') || s.toLowerCase().includes('programming') || s.toLowerCase().includes('ai');
                                case 'creative-writing':
                                  return s.toLowerCase().includes('creative') || s.toLowerCase().includes('fiction') || s.toLowerCase().includes('storytelling');
                                case 'lifestyle':
                                  return s.toLowerCase().includes('lifestyle') || s.toLowerCase().includes('wellness');
                                case 'business':
                                  return s.toLowerCase().includes('business') || s.toLowerCase().includes('entrepreneur');
                                case 'travel':
                                  return s.toLowerCase().includes('travel');
                                case 'science':
                                  return s.toLowerCase().includes('science');
                                default:
                                  return false;
                              }
                            });
    
    return matchesSearch && matchesSpecialty;
  });

  const sortedWriters = [...filteredWriters].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'most-followers':
        return b.stats.followersCount - a.stats.followersCount;
      case 'most-posts':
        return b.stats.postsCount - a.stats.postsCount;
      case 'highest-rated':
        return b.stats.averageRating - a.stats.averageRating;
      default: // popular
        return (b.stats.followersCount + b.stats.likesReceived) - (a.stats.followersCount + a.stats.likesReceived);
    }
  });

  const featuredWriters = mockWriters.filter(writer => writer.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Writers
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Connect with talented storytellers, follow your favorites, and discover your next great read
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search writers by name, bio, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Writers */}
        {featuredWriters.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Writers</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredWriters.slice(0, 3).map((writer) => (
                <div key={writer.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {writer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">{writer.name}</h3>
                          {writer.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          {writer.location && (
                            <>
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{writer.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{writer.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {writer.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{writer.stats.postsCount} posts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{writer.stats.followersCount.toLocaleString()} followers</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{writer.stats.averageRating}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/writers/${writer.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => handleFollow(writer.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        writer.isFollowing
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {writer.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Specialties
              </h3>
              <div className="space-y-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => setSelectedSpecialty(specialty.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedSpecialty === specialty.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{specialty.name}</span>
                      <span className="text-sm text-gray-500">{specialty.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Writers</span>
                  <span className="font-semibold text-gray-900">{mockWriters.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stories Published</span>
                  <span className="font-semibold text-gray-900">{mockWriters.reduce((sum, w) => sum + w.stats.postsCount, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Followers</span>
                  <span className="font-semibold text-gray-900">{mockWriters.reduce((sum, w) => sum + w.stats.followersCount, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                All Writers
                {searchTerm && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    for "{searchTerm}"
                  </span>
                )}
              </h2>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-followers">Most Followers</option>
                <option value="most-posts">Most Posts</option>
                <option value="highest-rated">Highest Rated</option>
              </select>
            </div>

            {sortedWriters.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No writers found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No writers match your search for "${searchTerm}"`
                    : 'No writers in this specialty yet'
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedWriters.map((writer) => (
                  <div key={writer.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                          {writer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900">{writer.name}</h3>
                            {writer.verified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Joined {formatDistanceToNow(new Date(writer.createdAt), { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{writer.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {writer.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{writer.stats.postsCount} posts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{writer.stats.followersCount.toLocaleString()} followers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{writer.stats.totalViews.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{writer.stats.averageRating} rating</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        href={`/writers/${writer.id}`}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => handleFollow(writer.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          writer.isFollowing
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {writer.isFollowing ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritersPage;