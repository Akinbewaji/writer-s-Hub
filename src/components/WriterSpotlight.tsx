import React from 'react';
import { Star, Clock, Heart, MessageCircle } from 'lucide-react';

const WriterSpotlight: React.FC = () => {
  const stories = [
    {
      id: 1,
      title: "The Last Library",
      author: "Emma Rodriguez",
      excerpt: "In a world where books are forbidden, Maya discovers the last remaining library hidden beneath the city...",
      readTime: "8 min read",
      likes: 2847,
      comments: 156,
      rating: 4.9,
      category: "Sci-Fi",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Midnight Café Chronicles",
      author: "James Park",
      excerpt: "Every night at midnight, the old café transforms into something magical, where time travelers gather...",
      readTime: "12 min read",
      likes: 1923,
      comments: 98,
      rating: 4.7,
      category: "Fantasy",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Letters to Tomorrow",
      author: "Sophia Chen",
      excerpt: "A young woman finds a mailbox that delivers letters to the future, changing her understanding of destiny...",
      readTime: "6 min read",
      likes: 3156,
      comments: 234,
      rating: 4.8,
      category: "Romance",
      image: "https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover captivating stories from our talented community of writers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                    {story.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {story.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.author}</div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span>{story.rating}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {story.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {story.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{story.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{story.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-colors font-medium">
            Browse All Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default WriterSpotlight;