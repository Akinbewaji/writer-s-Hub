@@ .. @@
 import React from 'react';
-import { Star, Clock, Heart, MessageCircle } from 'lucide-react';
+import { Star, Clock, Heart, MessageCircle, TrendingUp, Award, Eye, Bookmark } from 'lucide-react';
 
 const WriterSpotlight = () => {
   const stories = [
     {
       id: 1,
       title: "The Last Library",
       author: "Emma Rodriguez",
+      authorBadge: "Featured Author",
       excerpt: "In a world where books are forbidden, Maya discovers the last remaining library hidden beneath the city...",
       readTime: "8 min read",
       likes: 2847,
       comments: 156,
+      views: 12450,
       rating: 4.9,
       category: "Sci-Fi",
+      trending: true,
+      featured: true,
       image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
     },
     {
       id: 2,
       title: "Midnight Café Chronicles",
       author: "James Park",
+      authorBadge: "Rising Star",
       excerpt: "Every night at midnight, the old café transforms into something magical, where time travelers gather...",
       readTime: "12 min read",
       likes: 1923,
       comments: 98,
+      views: 8930,
       rating: 4.7,
       category: "Fantasy",
+      trending: false,
+      featured: false,
       image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400"
     },
     {
       id: 3,
       title: "Letters to Tomorrow",
       author: "Sophia Chen",
+      authorBadge: "Bestselling Author",
       excerpt: "A young woman finds a mailbox that delivers letters to the future, changing her understanding of destiny...",
       readTime: "6 min read",
       likes: 3156,
       comments: 234,
+      views: 15670,
       rating: 4.8,
       category: "Romance",
+      trending: true,
+      featured: true,
       image: "https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg?auto=compress&cs=tinysrgb&w=400"
     }
   ];
 
+  const featuredAuthors = [
+    {
+      name: "Emma Rodriguez",
+      followers: "12.5K",
+      stories: 24,
+      avatar: "ER",
+      badge: "Sci-Fi Master",
+      verified: true
+    },
+    {
+      name: "James Park",
+      followers: "8.2K",
+      stories: 18,
+      avatar: "JP",
+      badge: "Fantasy Expert",
+      verified: true
+    },
+    {
+      name: "Sophia Chen",
+      followers: "15.8K",
+      stories: 32,
+      avatar: "SC",
+      badge: "Romance Queen",
+      verified: true
+    }
+  ];
+
   return (
-    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
+    <section className="py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
+      {/* Background Elements */}
+      <div className="absolute inset-0 overflow-hidden">
+        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
+        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
+      </div>
+      
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
-        <div className="text-center mb-16">
-          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
-            Featured Stories
+        <div className="text-center mb-20">
+          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
+            <Award className="h-4 w-4" />
+            <span>Curated by our editorial team</span>
+          </div>
+          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
+            Featured Stories & Authors
           </h2>
-          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
-            Discover captivating stories from our talented community of writers
+          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
+            Discover award-winning stories and connect with the most talented writers in our community
           </p>
         </div>
 
-        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
+        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
           {stories.map((story) => (
             <article
               key={story.id}
-              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
+              className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border border-white/50 hover:-translate-y-3"
             >
               <div className="relative overflow-hidden">
                 <img
                   src={story.image}
                   alt={story.title}
-                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
+                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                 />
-                <div className="absolute top-4 left-4">
-                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
+                <div className="absolute top-4 left-4 flex space-x-2">
+                  <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-indigo-600 shadow-lg">
                     {story.category}
                   </span>
+                  {story.trending && (
+                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
+                      <TrendingUp className="h-3 w-3" />
+                      <span>Trending</span>
+                    </span>
+                  )}
+                </div>
+                {story.featured && (
+                  <div className="absolute top-4 right-4">
+                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-2 rounded-full shadow-lg">
+                      <Award className="h-4 w-4" />
+                    </div>
+                  </div>
+                )}
+                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
+                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
+                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
+                    <Bookmark className="h-4 w-4 text-gray-700" />
+                  </button>
                 </div>
               </div>
 
-              <div className="p-6">
-                <div className="flex items-center space-x-3 mb-4">
-                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
+              <div className="p-8">
+                <div className="flex items-center justify-between mb-6">
+                  <div className="flex items-center space-x-3">
+                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
+                      {story.author.split(' ').map(n => n[0]).join('')}
+                    </div>
+                    <div>
+                      <div className="font-bold text-gray-900 flex items-center space-x-2">
+                        <span>{story.author}</span>
+                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
+                      </div>
+                      <div className="text-sm text-indigo-600 font-medium">{story.authorBadge}</div>
+                    </div>
+                  </div>
+                  <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
+                    <Star className="h-4 w-4 fill-current text-yellow-400" />
+                    <span className="text-sm font-bold text-gray-700">{story.rating}</span>
+                  </div>
+                </div>
+
+                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
+                  {story.title}
+                </h3>
+
+                <p className="text-gray-600 mb-6 leading-relaxed">
+                  {story.excerpt}
+                </p>
+
+                <div className="flex items-center justify-between text-sm">
+                  <div className="flex items-center space-x-4 text-gray-500">
+                    <div className="flex items-center space-x-1">
+                      <Clock className="h-4 w-4" />
+                      <span className="font-medium">{story.readTime}</span>
+                    </div>
+                    <div className="flex items-center space-x-1">
+                      <Eye className="h-4 w-4" />
+                      <span className="font-medium">{story.views.toLocaleString()}</span>
+                    </div>
+                  </div>
+                  <div className="flex items-center space-x-3">
+                    <div className="flex items-center space-x-1 text-red-500">
+                      <Heart className="h-4 w-4" />
+                      <span className="font-bold">{story.likes.toLocaleString()}</span>
+                    </div>
+                    <div className="flex items-center space-x-1 text-blue-500">
+                      <MessageCircle className="h-4 w-4" />
+                      <span className="font-bold">{story.comments}</span>
+                    </div>
+                  </div>
+                </div>
+              </div>
+            </article>
+          ))}
+        </div>
+
+        {/* Featured Authors Section */}
+        <div className="mb-16">
+          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
+            Featured Authors This Month
+          </h3>
+          <div className="grid md:grid-cols-3 gap-6">
+            {featuredAuthors.map((author, index) => (
+              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 text-center group hover:-translate-y-2">
+                <div className="relative inline-block mb-4">
+                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                     {story.author.split(' ').map(n => n[0]).join('')}
                   </div>
-                  <div>
-                    <div className="font-semibold text-gray-900">{story.author}</div>
-                    <div className="flex items-center space-x-1 text-sm text-gray-500">
-                      <Star className="h-4 w-4 fill-current text-yellow-400" />
-                      <span>{story.rating}</span>
+                  {author.verified && (
+                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
+                      <div className="w-3 h-3 bg-white rounded-full"></div>
                     </div>
-                  </div>
+                  )}
                 </div>
-
-                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
-                  {story.title}
+                <h4 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h4>
+                <p className="text-indigo-600 font-medium text-sm mb-4">{author.badge}</p>
+                <div className="flex justify-center space-x-6 text-sm text-gray-600 mb-4">
+                  <div>
+                    <div className="font-bold text-gray-900">{author.followers}</div>
+                    <div>Followers</div>
+                  </div>
+                  <div>
+                    <div className="font-bold text-gray-900">{author.stories}</div>
+                    <div>Stories</div>
+                  </div>
+                </div>
+                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform group-hover:-translate-y-1">
+                  Follow
+                </button>
+              </div>
+            ))}
+          </div>
+        </div>
+
+        {/* Stats Section */}
+        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden mb-16">
+          <div className="absolute inset-0 bg-black/10"></div>
+          <div className="relative z-10">
+            <h3 className="text-3xl font-bold mb-8">Community Impact</h3>
+            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
+              <div>
+                <div className="text-4xl font-bold mb-2">2.5M+</div>
+                <div className="text-indigo-100">Stories Read</div>
+              </div>
+              <div>
+                <div className="text-4xl font-bold mb-2">150K+</div>
+                <div className="text-indigo-100">Active Readers</div>
+              </div>
+              <div>
+                <div className="text-4xl font-bold mb-2">25K+</div>
+                <div className="text-indigo-100">Published Authors</div>
+              </div>
+              <div>
+                <div className="text-4xl font-bold mb-2">500+</div>
+                <div className="text-indigo-100">Awards Given</div>
+              </div>
+            </div>
+          </div>
+        </div>
+
+        {/* CTA Section */}
+        <div className="text-center">
+          <h3 className="text-3xl font-bold text-gray-900 mb-6">
+            Ready to Share Your Story?
+          </h3>
+          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
+            Join our community of talented writers and start building your audience today.
+          </p>
+          <div className="flex flex-col sm:flex-row gap-4 justify-center">
+            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
+              Start Writing Now
+            </button>
+            <button className="border-2 border-indigo-600 text-indigo-600 px-10 py-4 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 font-bold">
+              Browse All Stories
+            </button>
+          </div>
+        </div>
+      </div>
+    </section>
+  );
+};
+
+export default WriterSpotlight;