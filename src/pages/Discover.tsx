import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StoryCard from '../components/StoryCard';

const Discover: React.FC = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Stories', count: state.stories.length },
    { id: 'fiction', name: 'Fiction', count: state.stories.filter(s => s.category === 'Fiction').length },
    { id: 'non-fiction', name: 'Non-Fiction', count: state.stories.filter(s => s.category === 'Non-Fiction').length },
    { id: 'poetry', name: 'Poetry', count: state.stories.filter(s => s.category === 'Poetry').length },
    { id: 'sci-fi', name: 'Sci-Fi', count: state.stories.filter(s => s.category === 'Sci-Fi').length },
    { id: 'romance', name: 'Romance', count: state.stories.filter(s => s.category === 'Romance').length },
    { id: 'mystery', name: 'Mystery', count: state.stories.filter(s => s.category === 'Mystery').length }
  ];

  const trendingTopics = [
    "Climate Fiction", "Remote Work", "Mental Health", "AI Ethics", "Space Exploration",
    "Sustainable Living", "Digital Minimalism", "Cultural Identity"
  ];

  const filteredStories = useMemo(() => {
    let filtered = state.stories.filter(story => story.status === 'published');

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story =>
        story.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort stories
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishDate || 0).getTime() - new Date(b.publishDate || 0).getTime());
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default: // popular
        filtered.sort((a, b) => (b.likes + b.views + b.comments) - (a.likes + a.views + a.comments));
    }

    return filtered;
  }, [state.stories, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Stories
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore thousands of stories from talented writers around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(topic)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 cursor-pointer transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Stories' : categories.find(c => c.id === selectedCategory)?.name}
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
                <option value="most-liked">Most Liked</option>
                <option value="most-viewed">Most Viewed</option>
              </select>
            </div>

            {filteredStories.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No stories match your search for "${searchTerm}"`
                    : 'No stories in this category yet'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>

                {filteredStories.length > 6 && (
                  <div className="mt-12 text-center">
                    <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors font-medium">
                      Load More Stories
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;