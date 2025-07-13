import React from 'react';
import { Users, MessageSquare, Calendar, Award } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const stats = [
    { label: 'Active Writers', value: '12,000+', icon: Users },
    { label: 'Stories Published', value: '45,000+', icon: MessageSquare },
    { label: 'Daily Readers', value: '150,000+', icon: Calendar },
    { label: 'Awards Given', value: '2,500+', icon: Award }
  ];

  const events = [
    {
      title: 'Weekly Writing Challenge',
      description: 'Join our weekly prompt-based writing challenge',
      participants: 1250,
      date: 'Every Monday',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Author Spotlight Series',
      description: 'Featured interviews with emerging writers',
      participants: 890,
      date: 'Every Friday',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Feedback Friday',
      description: 'Get constructive feedback on your work',
      participants: 2100,
      date: 'Every Friday',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="community" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Thriving Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with passionate writers and readers from around the world. 
            Participate in events, share feedback, and grow together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

        {/* Community Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Upcoming Community Events
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center mb-4`}>
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h4>
                
                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-600 font-medium">
                    {event.date}
                  </span>
                  <span className="text-gray-500">
                    {event.participants.toLocaleString()} participants
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Share Your Story?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of writers and readers who are already part of our community. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Start Writing
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-indigo-600 transition-colors">
              Explore Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;