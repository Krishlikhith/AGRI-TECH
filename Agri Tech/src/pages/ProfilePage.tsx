import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, ShoppingBag, MessageSquare, Briefcase, BookmarkCheck, Edit, Key } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: t('profile.personalInfo'), icon: User },
    { id: 'listings', label: t('profile.myListings'), icon: ShoppingBag },
    { id: 'posts', label: t('profile.myPosts'), icon: MessageSquare },
    { id: 'jobs', label: t('profile.myJobs'), icon: Briefcase },
    { id: 'saved', label: t('profile.savedItems'), icon: BookmarkCheck },
  ];

  // Sample data for demonstration
  const userListings = [
    {
      id: 1,
      title: 'Organic Fertilizer (50kg)',
      price: '₹850',
      status: 'active',
      views: 245,
      inquiries: 12,
    },
    {
      id: 2,
      title: 'Tractor (2018 Model)',
      price: '₹450,000',
      status: 'sold',
      views: 890,
      inquiries: 35,
    },
  ];

  const userPosts = [
    {
      id: 1,
      title: 'Best practices for rice farming in monsoon',
      comments: 28,
      likes: 156,
      date: '2 days ago',
    },
    {
      id: 2,
      title: 'Organic pest control methods',
      comments: 42,
      likes: 203,
      date: '1 week ago',
    },
  ];

  const userJobs = [
    {
      id: 1,
      title: 'Farm Laborers Needed',
      applications: 15,
      status: 'active',
      posted: '3 days ago',
    },
    {
      id: 2,
      title: '2 Acres Land for Lease',
      applications: 8,
      status: 'closed',
      posted: '2 weeks ago',
    },
  ];

  const savedItems = [
    {
      id: 1,
      type: 'product',
      title: 'Modern Irrigation System',
      price: '₹25,000',
      seller: 'AgriTech Solutions',
    },
    {
      id: 2,
      type: 'post',
      title: 'Guide to Sustainable Farming',
      author: 'Dr. Sharma',
      date: '1 week ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
              <img
                src={user?.profilePicture || 'https://images.pexels.com/photos/2382889/pexels-photo-2382889.jpeg?auto=compress&cs=tinysrgb&w=200'}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600">{user?.userType}</p>
              <p className="text-gray-600">{user?.location}</p>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  <Edit size={16} className="mr-2" />
                  {t('profile.editProfile')}
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Key size={16} className="mr-2" />
                  {t('profile.changePassword')}
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-2 border-primary-600 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={18} className="mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                      <p className="text-gray-800">{user?.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                      <p className="text-gray-800">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                      <p className="text-gray-800">{user?.mobile || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                      <p className="text-gray-800">{user?.location}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Account Type</label>
                      <p className="text-gray-800 capitalize">{user?.userType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Member Since</label>
                      <p className="text-gray-800">January 2024</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Verification Status</label>
                      <p className="text-gray-800">{user?.isVerified ? 'Verified' : 'Not Verified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
                      <p className="text-gray-800">4.8/5 (125 reviews)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">My Listings</h3>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                    Add New Listing
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userListings.map((listing) => (
                        <tr key={listing.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{listing.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{listing.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              listing.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{listing.views}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{listing.inquiries}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">My Posts</h3>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                    Create New Post
                  </button>
                </div>

                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">{post.title}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">{post.likes} likes</span>
                        <span className="mr-4">{post.comments} comments</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">My Jobs</h3>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                    Post New Job
                  </button>
                </div>

                <div className="space-y-4">
                  {userJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-1">{job.title}</h4>
                          <p className="text-sm text-gray-500">Posted {job.posted}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          job.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {job.applications} applications received
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Saved Items</h3>
                <div className="space-y-4">
                  {savedItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                            {item.type}
                          </span>
                          <h4 className="text-lg font-medium text-gray-800 mt-2">{item.title}</h4>
                          {'price' in item && <p className="text-primary-600 font-medium mt-1">{item.price}</p>}
                          {'seller' in item && <p className="text-sm text-gray-500 mt-1">Seller: {item.seller}</p>}
                          {'author' in item && <p className="text-sm text-gray-500 mt-1">By {item.author}</p>}
                          {'date' in item && <p className="text-sm text-gray-500 mt-1">Posted {item.date}</p>}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <BookmarkCheck size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;