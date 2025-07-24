import React from 'react';
import { PenTool, BookOpen, Users, MessageSquare, TrendingUp, Shield, Zap, Globe, Award, Palette, Brain, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: PenTool,
      title: 'AI-Powered Writing Assistant',
      description: 'Smart suggestions, grammar checking, and style improvements powered by advanced AI to enhance your writing.',
      color: 'from-purple-500 to-indigo-600',
      badge: 'New'
    },
    {
      icon: BookOpen,
      title: 'Smart Discovery Engine',
      description: 'Personalized recommendations using machine learning, trending stories, and curated collections tailored to your taste.',
      color: 'from-blue-500 to-cyan-600',
      badge: 'Popular'
    },
    {
      icon: Users,
      title: 'Global Writing Community',
      description: 'Connect with 100,000+ writers and readers worldwide, join specialized groups, and participate in live events.',
      color: 'from-green-500 to-emerald-600',
      badge: 'Growing'
    },
    {
      icon: Brain,
      title: 'Advanced Analytics',
      description: 'Deep insights into reader engagement, story performance, and audience demographics with actionable recommendations.',
      color: 'from-pink-500 to-rose-600',
      badge: 'Pro'
    },
    {
      icon: Zap,
      title: 'Instant Publishing',
      description: 'Publish your stories instantly with automatic formatting, SEO optimization, and cross-platform distribution.',
      color: 'from-yellow-500 to-orange-600',
      badge: 'Fast'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Write and read in 50+ languages with real-time translation and cultural context assistance.',
      color: 'from-indigo-500 to-purple-600',
      badge: 'Global'
    },
    {
      icon: Award,
      title: 'Recognition System',
      description: 'Earn badges, compete in writing challenges, and get featured in our monthly spotlight program.',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Rewarding'
    },
    {
      icon: Palette,
      title: 'Custom Themes',
      description: 'Personalize your reading and writing experience with beautiful themes and customizable layouts.',
      color: 'from-rose-500 to-pink-600',
      badge: 'Beautiful'
    },
    {
      icon: Heart,
      title: 'Reader Engagement',
      description: 'Build meaningful connections with readers through comments, reactions, and exclusive subscriber content.',
      color: 'from-red-500 to-rose-600',
      badge: 'Social'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Powered by cutting-edge technology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Create
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              and Discover Amazing Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our next-generation platform combines powerful AI tools, global community features, 
            and advanced analytics to help you craft compelling stories and reach the right audience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
            >
              {feature.badge && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {feature.badge}
                </div>
              )}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
              
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Experience the Future of Storytelling?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who have already discovered the power of our advanced platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300 font-bold">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;