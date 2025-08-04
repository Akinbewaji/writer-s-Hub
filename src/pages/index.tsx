import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, TrendingUp, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredPosts = [
    {
      id: '1',
      title: 'The Future of Digital Storytelling',
      excerpt: 'Exploring how technology is reshaping the way we tell and consume stories...',
      author: 'Sarah Johnson',
      category: 'Technology',
      readTime: 5,
      likes: 234,
    },
    {
      id: '2',
      title: 'Finding Your Voice as a Writer',
      excerpt: 'A comprehensive guide to developing your unique writing style and voice...',
      author: 'Michael Chen',
      category: 'Writing Tips',
      readTime: 8,
      likes: 189,
    },
    {
      id: '3',
      title: 'The Art of Character Development',
      excerpt: 'Creating memorable characters that readers will connect with emotionally...',
      author: 'Emma Rodriguez',
      category: 'Creative Writing',
      readTime: 6,
      likes: 156,
    },
  ];

  const stats = [
    { label: 'Active Writers', value: '10,000+', icon: Users },
    { label: 'Stories Published', value: '50,000+', icon: BookOpen },
    { label: 'Monthly Readers', value: '500,000+', icon: TrendingUp },
    { label: 'Community Rating', value: '4.9/5', icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Where Stories
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Come to Life
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our community of passionate writers and readers. Share your stories, 
              discover amazing content, and connect with fellow storytellers from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <span>Start Writing Today</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/posts"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 font-semibold"
              >
                Explore Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most engaging stories from our talented community of writers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="mb-3">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors">
                    <Link href={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>by {post.author}</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/posts"
              className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-colors font-medium"
            >
              View All Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who have already discovered the power of our platform. 
            Start your writing journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;