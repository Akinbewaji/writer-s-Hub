import React from 'react';
import { Star, Users, BookOpen, Award, TrendingUp, CheckCircle } from 'lucide-react';

const WriterSpotlight = () => {
  const featuredAuthors = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "Award-winning novelist and creative writing mentor",
      followers: "12.5K",
      stories: 47,
      rating: 4.9,
      verified: true,
      badge: "Bestselling Author",
      specialties: ["Fiction", "Mystery", "Thriller"]
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "Tech journalist and science fiction enthusiast",
      followers: "8.3K",
      stories: 32,
      rating: 4.8,
      verified: true,
      badge: "Rising Star",
      specialties: ["Sci-Fi", "Technology", "Innovation"]
    },
    {
      id: 3,
      name: "Emma Thompson",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "Poetry curator and literary magazine editor",
      followers: "15.2K",
      stories: 89,
      rating: 4.9,
      verified: true,
      badge: "Editor's Choice",
      specialties: ["Poetry", "Literary Fiction", "Essays"]
    }
  ];

  const trendingStories = [
    {
      id: 1,
      title: "The Last Library on Earth",
      author: "Sarah Chen",
      category: "Sci-Fi",
      reads: "45.2K",
      rating: 4.8,
      trending: true
    },
    {
      id: 2,
      title: "Midnight in Silicon Valley",
      author: "Marcus Rodriguez",
      category: "Tech",
      reads: "32.1K",
      rating: 4.7,
      trending: true
    },
    {
      id: 3,
      title: "Whispers of the Ocean",
      author: "Emma Thompson",
      category: "Poetry",
      reads: "28.9K",
      rating: 4.9,
      trending: true
    }
  ];

  const communityStats = [
    { label: "Active Writers", value: "25,000+", icon: Users },
    { label: "Stories Published", value: "150,000+", icon: BookOpen },
    { label: "Community Awards", value: "500+", icon: Award },
    { label: "Monthly Readers", value: "2.5M+", icon: TrendingUp }
  ];

  const successStories = [
    {
      author: "Jessica Park",
      story: "From hobby writer to published novelist in 8 months",
      achievement: "3-book deal with major publisher",
      rating: 5
    },
    {
      author: "David Kim",
      story: "Built a following of 50K readers through consistent posting",
      achievement: "Launched successful writing course",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Writers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover talented authors, trending stories, and join our thriving community of writers and readers
          </p>
        </div>

        {/* Featured Authors */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Spotlight Authors</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredAuthors.map((author) => (
              <div key={author.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group hover:scale-105">
                <div className="relative mb-6">
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all"
                  />
                  {author.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {author.badge}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h4>
                <p className="text-gray-600 mb-4">{author.bio}</p>
                
                <div className="flex justify-center gap-6 mb-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{author.followers}</div>
                    <div className="text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{author.stories}</div>
                    <div className="text-gray-500">Stories</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      {author.rating}
                    </div>
                    <div className="text-gray-500">Rating</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {author.specialties.map((specialty, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Follow Author
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Stories */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Trending Stories</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:scale-105">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Trending
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {story.title}
                </h4>
                
                <p className="text-gray-600 mb-4">by {story.author}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {story.category}
                  </span>
                  <div className="flex items-center gap-4 text-gray-500">
                    <span>{story.reads} reads</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{story.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Community Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((success, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(success.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{success.story}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{success.author}</div>
                  <div className="text-sm text-green-600 font-medium">{success.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-xl mb-8 opacity-90">Start your writing journey today and connect with readers worldwide</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start Writing Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
              Explore Stories
            </button>
          </div>
          <div className="mt-6 text-sm opacity-75">
            🎉 Limited Time: Get premium features free for your first month!
          </div>
        </div>
      </div>
    </section>
  );
};

export default WriterSpotlight;