@@ .. @@
+import React from 'react';
+import { Users, MessageSquare, Calendar, Award, Globe, Zap, Heart, Star } from 'lucide-react';
+
+const CommunitySection = () => {
+  const stats = [
+    { label: 'Active Writers', value: '25,000+', icon: Users, color: 'from-blue-500 to-cyan-500' },
+    { label: 'Stories Published', value: '150,000+', icon: MessageSquare, color: 'from-green-500 to-emerald-500' },
+    { label: 'Daily Readers', value: '500,000+', icon: Globe, color: 'from-purple-500 to-pink-500' },
+    { label: 'Awards Given', value: '10,000+', icon: Award, color: 'from-yellow-500 to-orange-500' }
+  ];
+
+  const events = [
+    {
+      title: 'Global Writing Challenge',
+      description: 'Monthly themed writing competition with cash prizes',
+      participants: 5250,
+      date: 'Every Month',
+      color: 'from-blue-500 to-cyan-500',
+      prize: '$5,000',
+      featured: true
+    },
+    {
+      title: 'Author Masterclass Series',
+      description: 'Learn from bestselling authors and industry experts',
+      participants: 2890,
+      date: 'Every Friday',
+      color: 'from-purple-500 to-pink-500',
+      prize: 'Free',
+      featured: false
+    },
+    {
+      title: 'Live Feedback Sessions',
+      description: 'Get real-time feedback from professional editors',
+      participants: 4100,
+      date: 'Every Wednesday',
+      color: 'from-green-500 to-emerald-500',
+      prize: 'Premium',
+      featured: true
+    }
+  ];
+
+  const testimonials = [
+    {
+      name: "Sarah Johnson",
+      role: "Published Author",
+      content: "This platform transformed my writing journey. I went from hobbyist to published author in just 6 months!",
+      avatar: "SJ",
+      rating: 5,
+      books: 3
+    },
+    {
+      name: "Michael Chen",
+      role: "Freelance Writer",
+      content: "The community feedback helped me improve my craft tremendously. Now I'm earning $5K/month from my writing.",
+      avatar: "MC",
+      rating: 5,
+      books: 0
+    },
+    {
+      name: "Emma Rodriguez",
+      role: "Bestselling Novelist",
+      content: "The AI writing assistant and analytics tools are game-changers. My latest novel hit #1 on Amazon!",
+      avatar: "ER",
+      rating: 5,
+      books: 12
+    }
+  ];
+
+  return (
+    <section id="community" className="py-24 bg-gradient-to-br from-white via-indigo-50 to-purple-50 relative overflow-hidden">
+      {/* Background Pattern */}
+      <div className="absolute inset-0 opacity-5">
+        <div className="absolute inset-0" style={{
+          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm20 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
+        }}></div>
+      </div>
+      
+      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+        <div className="text-center mb-20">
+          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
+            <Heart className="h-4 w-4" />
+            <span>Join 100,000+ writers worldwide</span>
+          </div>
+          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
+            Join Our Thriving
+            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
+              Global Community
+            </span>
+          </h2>
+          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
+            Connect with passionate writers and readers from around the world. 
+            Participate in exclusive events, earn recognition, and grow your audience together.
+          </p>
+        </div>
+
+        {/* Enhanced Stats */}
+        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
+          {stats.map((stat, index) => (
+            <div key={index} className="text-center group">
+              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
+                <stat.icon className="h-10 w-10 text-white" />
+              </div>
+              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
+                {stat.value}
+              </div>
+              <div className="text-gray-600 font-medium">
+                {stat.label}
+              </div>
+            </div>
+          ))}
+        </div>
+
+        {/* Enhanced Community Events */}
+        <div className="mb-20">
+          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
+            Exclusive Community Events
+          </h3>
+          
+          <div className="grid md:grid-cols-3 gap-8">
+            {events.map((event, index) => (
+              <div
+                key={index}
+                className={`bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-white/50 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${event.featured ? 'ring-2 ring-indigo-200' : ''}`}
+              >
+                {event.featured && (
+                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
+                    Featured
+                  </div>
+                )}
+                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${event.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
+                  <Calendar className="h-8 w-8 text-white" />
+                </div>
+                
+                <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
+                  {event.title}
+                </h4>
+                
+                <p className="text-gray-600 mb-6 leading-relaxed">
+                  {event.description}
+                </p>
+                
+                <div className="space-y-3 mb-6">
+                  <div className="flex items-center justify-between text-sm">
+                    <span className="text-gray-500">Schedule:</span>
+                    <span className="font-semibold text-indigo-600">{event.date}</span>
+                  </div>
+                  <div className="flex items-center justify-between text-sm">
+                    <span className="text-gray-500">Participants:</span>
+                    <span className="font-semibold text-gray-900">{event.participants.toLocaleString()}</span>
+                  </div>
+                  <div className="flex items-center justify-between text-sm">
+                    <span className="text-gray-500">Prize:</span>
+                    <span className="font-bold text-green-600">{event.prize}</span>
+                  </div>
+                </div>
+                
+                <button className={`w-full bg-gradient-to-r ${event.color} text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform group-hover:-translate-y-1`}>
+                  Join Event
+                </button>
+              </div>
+            ))}
+          </div>
+        </div>
+
+        {/* Success Stories */}
+        <div className="mb-20">
+          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
+            Success Stories from Our Community
+          </h3>
+          <div className="grid md:grid-cols-3 gap-8">
+            {testimonials.map((testimonial, index) => (
+              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
+                <div className="flex items-center mb-6">
+                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
+                    {testimonial.avatar}
+                  </div>
+                  <div className="ml-4">
+                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
+                    <p className="text-indigo-600 font-medium text-sm">{testimonial.role}</p>
+                    {testimonial.books > 0 && (
+                      <p className="text-xs text-gray-500">{testimonial.books} Published Books</p>
+                    )}
+                  </div>
+                </div>
+                <div className="flex mb-4">
+                  {[...Array(testimonial.rating)].map((_, i) => (
+                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
+                  ))}
+                </div>
+                <p className="text-gray-700 leading-relaxed italic">
+                  "{testimonial.content}"
+                </p>
+              </div>
+            ))}
+          </div>
+        </div>
+
+        {/* Enhanced Join CTA */}
+        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
+          <div className="absolute inset-0 bg-black/10"></div>
+          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
+          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
+          
+          <div className="relative z-10">
+            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
+              <Zap className="h-4 w-4" />
+              <span>Limited time offer</span>
+            </div>
+            <h3 className="text-4xl md:text-5xl font-bold mb-6">
+              Ready to Transform Your Writing Journey?
+            </h3>
+            <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
+              Join thousands of writers who have already discovered the power of our community. 
+              Start your journey today with our premium features free for 30 days.
+            </p>
+            <div className="flex flex-col sm:flex-row gap-6 justify-center">
+              <button className="bg-white text-indigo-600 px-12 py-5 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg">
+                Start Free Trial
+              </button>
+              <button className="border-2 border-white text-white px-12 py-5 rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 text-lg">
+                Explore Community
+              </button>
+            </div>
+            <p className="text-sm opacity-75 mt-6">
+              No credit card required • Cancel anytime • Join 100,000+ writers
+            </p>
+          </div>
+        </div>
+      </div>
+    </section>
+  );
+};
+
+export default CommunitySection;