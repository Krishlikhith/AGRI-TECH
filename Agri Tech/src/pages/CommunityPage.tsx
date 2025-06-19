import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, MessageSquare, Heart, ThumbsUp, Users, PlusCircle } from 'lucide-react';

// Sample data for community posts
const forumPosts = [
  {
    id: 1,
    title: 'Best practices for rice farming in monsoon',
    content: 'I\'ve been farming rice for 10 years now, and I wanted to share some tips for maintaining good yield during heavy monsoon seasons. First, ensure proper drainage...',
    author: {
      name: 'Ramesh Singh',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: 'Allahabad, UP'
    },
    tags: ['Rice', 'Monsoon', 'Drainage'],
    comments: 28,
    likes: 156,
    timestamp: '2 days ago'
  },
  {
    id: 2,
    title: 'Organic pest control methods for vegetable farms',
    content: 'After years of using chemical pesticides, I\'ve switched to organic methods. Here\'s what worked for me: 1. Neem oil solution - Mix 1 tablespoon neem oil, 1 teaspoon mild soap in 1 liter water...',
    author: {
      name: 'Priya Verma',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: 'Nashik, Maharashtra'
    },
    tags: ['Organic', 'Pest Control', 'Vegetables'],
    comments: 42,
    likes: 203,
    timestamp: '1 week ago'
  },
  {
    id: 3,
    title: 'How to increase cotton yield with less water',
    content: 'Water management is crucial for cotton farming, especially in drought-prone areas. I\'ve implemented drip irrigation and mulching techniques that reduced my water usage by 40%...',
    author: {
      name: 'Ahmed Khan',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: 'Guntur, Andhra Pradesh'
    },
    tags: ['Cotton', 'Water Conservation', 'Irrigation'],
    comments: 19,
    likes: 87,
    timestamp: '2 weeks ago'
  },
  {
    id: 4,
    title: 'Which fertilizer is best for sugarcane?',
    content: 'I\'m planning to grow sugarcane on my 2-acre land for the first time. Can anyone recommend the best fertilizer combination and application schedule?',
    author: {
      name: 'Suresh Patel',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: 'Kolhapur, Maharashtra'
    },
    tags: ['Sugarcane', 'Fertilizer', 'Beginners'],
    comments: 35,
    likes: 42,
    timestamp: '3 days ago'
  },
  {
    id: 5,
    title: 'Government subsidy for solar pumps - My experience',
    content: 'I recently got a solar pump installed with 80% subsidy from the government. Here\'s my experience with the application process and what documents you\'ll need...',
    author: {
      name: 'Lakshmi Devi',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: 'Anantapur, Andhra Pradesh'
    },
    tags: ['Solar', 'Government Scheme', 'Subsidy'],
    comments: 52,
    likes: 174,
    timestamp: '5 days ago'
  }
];

const popularTags = [
  'Rice', 'Wheat', 'Cotton', 'Organic', 'Irrigation', 'Pest Control', 
  'Government Schemes', 'Fertilizers', 'Seeds', 'Monsoon', 'Water Conservation',
  'Equipment', 'Technology', 'Marketing', 'Soil Health'
];

const CommunityPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredPosts = forumPosts.filter(post => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected tags
    const matchesTags = 
      selectedTags.length === 0 || 
      post.tags.some(tag => selectedTags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            {t('community.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with farmers, agricultural experts, and rural innovators. Share knowledge, ask questions, and learn from the community.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors flex items-center justify-center">
                  <PlusCircle size={18} className="mr-2" />
                  {t('community.newPost')}
                </button>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Popular Categories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 hover:text-primary-600 cursor-pointer">
                      <Users size={16} className="mr-2" />
                      <span>Discussions</span>
                      <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">216</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-primary-600 cursor-pointer">
                      <MessageSquare size={16} className="mr-2" />
                      <span>Questions</span>
                      <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">148</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-primary-600 cursor-pointer">
                      <Heart size={16} className="mr-2" />
                      <span>Success Stories</span>
                      <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">93</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-primary-600 cursor-pointer">
                      <ThumbsUp size={16} className="mr-2" />
                      <span>Tips & Tricks</span>
                      <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">175</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? 'bg-primary-100 text-primary-800 border border-primary-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('community.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Filter className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">{post.author.name}</div>
                          <div className="text-gray-500 text-sm">
                            {post.author.location} • {post.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4 text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <ThumbsUp size={16} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <MessageSquare size={16} />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <Search size={48} className="mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;