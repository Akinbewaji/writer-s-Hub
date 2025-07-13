import React, { useState, useRef } from 'react';
import { Save, Eye, Upload, Bold, Italic, List, Quote, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Story } from '../types';
import { generateId, calculateReadTime } from '../utils/helpers';

interface WriteEditorProps {
  story?: Story;
  onSave?: (story: Story) => void;
}

const WriteEditor: React.FC<WriteEditorProps> = ({ story, onSave }) => {
  const { state, dispatch } = useApp();
  const [title, setTitle] = useState(story?.title || '');
  const [content, setContent] = useState(story?.content || '');
  const [category, setCategory] = useState(story?.category || 'Fiction');
  const [tags, setTags] = useState(story?.tags?.join(', ') || '');
  const [isPreview, setIsPreview] = useState(false);
  const [visibility, setVisibility] = useState<'public' | 'unlisted' | 'private'>('public');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    'Fiction', 'Non-Fiction', 'Poetry', 'Sci-Fi', 'Romance', 'Mystery', 'Biography', 'Essay'
  ];

  const formatText = (format: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const handleSave = (publish = false) => {
    if (!state.currentUser) return;

    const storyData: Story = {
      id: story?.id || generateId(),
      title: title || 'Untitled Story',
      content,
      excerpt: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
      author: state.currentUser,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      publishDate: publish ? new Date().toISOString() : story?.publishDate || null,
      status: publish ? 'published' : 'draft',
      likes: story?.likes || 0,
      comments: story?.comments || 0,
      views: story?.views || 0,
      readTime: calculateReadTime(content),
      isLiked: story?.isLiked || false,
      isBookmarked: story?.isBookmarked || false
    };

    if (story) {
      dispatch({ type: 'UPDATE_STORY', payload: storyData });
    } else {
      dispatch({ type: 'ADD_STORY', payload: storyData });
    }

    if (onSave) {
      onSave(storyData);
    }
  };

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const readTime = calculateReadTime(content);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {story ? 'Edit Story' : 'Write New Story'}
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={() => handleSave(false)}
              className="flex items-center space-x-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => handleSave(true)}
              className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Publish</span>
            </button>
          </div>
        </div>
      </div>

      {!isPreview ? (
        <>
          {/* Toolbar */}
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => formatText('bold')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                onClick={() => formatText('quote')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="List">
                <List className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Image">
                <ImageIcon className="h-4 w-4" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
            </div>
          </div>

          {/* Editor */}
          <div className="p-6">
            <input
              type="text"
              placeholder="Enter your story title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none mb-6"
            />
            <textarea
              ref={textareaRef}
              placeholder="Start writing your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 text-lg text-gray-700 placeholder-gray-400 border-none outline-none resize-none leading-relaxed"
            />
          </div>
        </>
      ) : (
        /* Preview */
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{title || 'Untitled Story'}</h1>
          <div className="prose prose-lg max-w-none">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Settings Sidebar */}
      <div className="border-t border-gray-100 p-6 bg-gray-50">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              placeholder="Add tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <span>Words: {wordCount}</span>
            <span>Characters: {content.length}</span>
            <span>Read time: {readTime} min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteEditor;