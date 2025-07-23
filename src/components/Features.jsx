import React from 'react';
import { PenTool, BookOpen, Users, MessageSquare, TrendingUp, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: PenTool,
      title: 'Intuitive Writing Tools',
      description: 'Rich text editor with formatting options, auto-save, and distraction-free writing mode.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: BookOpen,
      title: 'Discover Great Content',
      description: 'Personalized recommendations, trending stories, and curated collections.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Users,
      title: 'Vibrant Community',
      description: 'Connect with fellow writers and readers, join writing groups and discussions.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Feedback',
      description: 'Get constructive feedback, comments, and engage with your audience.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Track your readership, engagement metrics, and writing progress.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your content is protected with advanced security and privacy controls.',
      color: 'from-slate-500 to-gray-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Create and Discover
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides all the tools and features you need to share your stories 
            and connect with an engaged community of readers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-colors font-medium">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;