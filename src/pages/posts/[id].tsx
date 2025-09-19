import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Clock, User, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { shareContent, copyToClipboard } from '@/utils/helpers';

const PostDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useAuth();

  // Mock post data - in real app, this would come from API/database
  const post = {
    id: id as string,
    title: 'The Future of Web Development',
    content: `
      <p>Web development has evolved tremendously over the past decade, and we're standing at the precipice of even more exciting changes. As we look toward the future, several key trends are shaping how we build and interact with web applications.</p>
      
      <h2>The Rise of AI-Powered Development</h2>
      <p>Artificial Intelligence is no longer just a buzzword in web development. Tools like GitHub Copilot and ChatGPT are already helping developers write code faster and more efficiently. In the coming years, we can expect AI to play an even larger role in:</p>
      
      <ul>
        <li>Automated code generation and optimization</li>
        <li>Intelligent debugging and error detection</li>
        <li>Personalized user experiences</li>
        <li>Automated testing and quality assurance</li>
      </ul>
      
      <h2>WebAssembly: Breaking Performance Barriers</h2>
      <p>WebAssembly (WASM) is revolutionizing what's possible in web browsers. By allowing languages like Rust, C++, and Go to run at near-native speeds in the browser, WASM is opening doors to applications that were previously impossible on the web.</p>
      
      <h2>The Jamstack Revolution</h2>
      <p>The Jamstack architecture continues to gain momentum, offering developers a way to build fast, secure, and scalable websites. With static site generators and headless CMSs becoming more sophisticated, we're seeing a shift toward more performant and developer-friendly workflows.</p>
      
      <p>As we move forward, the key to success in web development will be staying adaptable and continuously learning. The tools and frameworks we use today may be different tomorrow, but the fundamental principles of creating great user experiences will remain constant.</p>
    `,
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development...',
    authorId: '1',
    author: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'writer' as const,
      bio: 'Tech writer and full-stack developer with 8 years of experience. Passionate about emerging technologies and their impact on society.',
      createdAt: '2024-01-01',
      stats: { postsCount: 15, followersCount: 500, followingCount: 100, likesReceived: 1200 }
    },
    category: 'Technology',
    tags: ['web development', 'javascript', 'react', 'future tech'],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'published' as const,
    likes: 234,
    comments: 45,
    views: 1200,
    readTime: 5,
    isLiked: false,
    isBookmarked: false,
  };

  const handleLike = () => {
    dispatch({ type: 'LIKE_POST', payload: post.id });
  };

  const handleBookmark = () => {
    console.log('Bookmark post:', post.id);
    // In real app, this would dispatch to context
    // dispatch({ type: 'BOOKMARK_POST', payload: post.id });
  };

  const handleShare = async () => {
    const success = await shareContent({
      title: post.title,
      text: post.excerpt,
      url: typeof window !== 'undefined' ? window.location.href : '',
    });
    
    if (success && typeof window !== 'undefined') {
      // Show success message (you could use a toast library here)
      console.log('Content shared successfully');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link href="/posts" className="text-indigo-600 hover:text-indigo-700">
            ← Back to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/posts"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to posts</span>
        </Link>

        {/* Main Content */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="mb-4">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{post.author.bio}</div>
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-500">
                <div className="flex items-center space-x-1 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          <div className="px-8 pb-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-5 w-5" />
                  <span>{post.views} views</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
                
                <button 
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    post.isBookmarked 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <Bookmark className="h-4 w-4" />
                  <span>{post.isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Author Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {post.author.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author.name}</h3>
              <p className="text-gray-600 mb-4">{post.author.bio}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <span>{post.author.stats.postsCount} posts</span>
                <span>{post.author.stats.followersCount} followers</span>
                <span>{post.author.stats.likesReceived} likes received</span>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;