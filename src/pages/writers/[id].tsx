import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Globe, Users, BookOpen, Heart, Eye, Star, Award, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const WriterProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Mock writer data - in real app, this would come from API/database
  const writer = {
    id: id as string,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'writer' as const,
    bio: 'Tech writer and full-stack developer with 8 years of experience. Passionate about emerging technologies and their impact on society. I love breaking down complex concepts into digestible stories that inspire and educate.',
    createdAt: '2023-01-15T10:00:00Z',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    specialties: ['Technology', 'Programming', 'AI', 'Web Development'],
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
  };

  // Mock recent posts
  const recentPosts = [
    {
      id: '1',
      title: 'The Future of Web Development: What to Expect in 2024',
      excerpt: 'Exploring the latest trends and technologies that will shape web development...',
      publishedAt: '2024-01-15T10:00:00Z',
      likes: 234,
      views: 1200,
      readTime: 5,
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      excerpt: 'Best practices and patterns for creating maintainable React codebases...',
      publishedAt: '2024-01-10T14:30:00Z',
      likes: 189,
      views: 890,
      readTime: 8,
      category: 'Programming'
    },
    {
      id: '3',
      title: 'AI in Software Development: Tools and Techniques',
      excerpt: 'How artificial intelligence is revolutionizing the way we write code...',
      publishedAt: '2024-01-05T09:15:00Z',
      likes: 156,
      views: 650,
      readTime: 6,
      category: 'AI'
    }
  ];

  const handleFollow = () => {
    console.log(`Toggle follow for writer ${writer.id}`);
  };

  if (!writer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Writer not found</h1>
          <Link href="/writers" className="text-indigo-600 hover:text-indigo-700">
            ← Back to writers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/writers"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to writers</span>
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6 -mt-16">
              <div className="relative mb-4 lg:mb-0">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-28 h-28 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
                    {writer.name.charAt(0)}
                  </div>
                </div>
                {writer.featured && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{writer.name}</h1>
                      {writer.verified && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {writer.featured && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                          Featured Writer
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 max-w-2xl">{writer.bio}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      {writer.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{writer.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDistanceToNow(new Date(writer.createdAt), { addSuffix: true })}</span>
                      </div>
                      {writer.website && (
                        <div className="flex items-center space-x-1">
                          <Globe className="h-4 w-4" />
                          <a href={writer.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">
                            Website
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {writer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleFollow}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        writer.isFollowing
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {writer.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{writer.stats.postsCount}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{writer.stats.followersCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{writer.stats.likesReceived.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Likes</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <Eye className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{writer.stats.totalViews.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Views</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{writer.stats.averageRating}</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
              <Link
                href={`/posts?author=${writer.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View all posts
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <article key={post.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                        <Link href={`/posts/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-3">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterProfilePage;