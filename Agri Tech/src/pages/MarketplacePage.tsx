import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Filter, SlidersHorizontal, MapPin, Phone, PlusCircle } from 'lucide-react';

// Sample data for marketplace products
const products = [
  {
    id: 1,
    title: 'Organic Fertilizer (50kg)',
    price: 850,
    image: 'https://images.pexels.com/photos/5504960/pexels-photo-5504960.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Green Earth Organics',
    location: 'Bangalore, Karnataka',
    phone: '+91 9876543210',
    category: 'fertilizers',
    description: 'Premium quality organic fertilizer made from composted plant matter and animal waste. Perfect for all types of crops. Rich in nitrogen, phosphorus, and potassium.',
    rating: 4.5,
    reviews: 78
  },
  {
    id: 2,
    title: 'Wheat Seeds (5kg)',
    price: 450,
    image: 'https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Punjab Seed Store',
    location: 'Ludhiana, Punjab',
    phone: '+91 9876543211',
    category: 'seeds',
    description: 'High-yield wheat seeds suitable for North Indian climate. Drought resistant variety with excellent disease resistance.',
    rating: 4.7,
    reviews: 124
  },
  {
    id: 3,
    title: 'Drip Irrigation Kit (1 Acre)',
    price: 2100,
    image: 'https://images.pexels.com/photos/3029868/pexels-photo-3029868.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Water Save Solutions',
    location: 'Nashik, Maharashtra',
    phone: '+91 9876543212',
    category: 'equipment',
    description: 'Complete drip irrigation kit for 1 acre of land. Includes pipes, drippers, filters, and connectors. Saves up to 60% water compared to traditional irrigation.',
    rating: 4.8,
    reviews: 93
  },
  {
    id: 4,
    title: 'Hand Tractor',
    price: 15000,
    image: 'https://images.pexels.com/photos/2181188/pexels-photo-2181188.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Farm Machinery Ltd',
    location: 'Coimbatore, Tamil Nadu',
    phone: '+91 9876543213',
    category: 'equipment',
    description: 'Lightweight hand tractor perfect for small to medium farms. 5.5 HP diesel engine with tilling attachment. Fuel efficient and easy to operate.',
    rating: 4.2,
    reviews: 47
  },
  {
    id: 5,
    title: 'Organic Pesticide (2L)',
    price: 380,
    image: 'https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Eco Protect',
    location: 'Pune, Maharashtra',
    phone: '+91 9876543214',
    category: 'fertilizers',
    description: 'Neem-based organic pesticide safe for all crops. Controls a wide range of pests without harming beneficial insects. USDA certified organic.',
    rating: 4.6,
    reviews: 89
  },
  {
    id: 6,
    title: 'Rice Seeds (10kg)',
    price: 780,
    image: 'https://images.pexels.com/photos/4025605/pexels-photo-4025605.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Andhra Agro',
    location: 'Guntur, Andhra Pradesh',
    phone: '+91 9876543215',
    category: 'seeds',
    description: 'High-yielding rice variety suitable for South Indian climate. Early maturing (110-115 days) with excellent grain quality.',
    rating: 4.4,
    reviews: 62
  },
  {
    id: 7,
    title: 'Manual Weeder',
    price: 350,
    image: 'https://images.pexels.com/photos/5698639/pexels-photo-5698639.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Agri Tools',
    location: 'Indore, Madhya Pradesh',
    phone: '+91 9876543216',
    category: 'tools',
    description: 'Ergonomic manual weeder for efficient weed removal between crop rows. Stainless steel blade with comfortable wooden handle.',
    rating: 4.3,
    reviews: 38
  },
  {
    id: 8,
    title: 'Sprayer Pump (16L)',
    price: 1200,
    image: 'https://images.pexels.com/photos/17303994/pexels-photo-17303994/free-photo-of-a-man-washing-his-car-with-pressure-washer.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: 'Spray Tech',
    location: 'Ahmedabad, Gujarat',
    phone: '+91 9876543217',
    category: 'tools',
    description: 'Battery-operated backpack sprayer with 16L capacity. 8 hours of continuous operation on a single charge. Adjustable nozzle for different spray patterns.',
    rating: 4.5,
    reviews: 72
  }
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'seeds', name: 'Seeds' },
  { id: 'fertilizers', name: 'Fertilizers' },
  { id: 'tools', name: 'Tools' },
  { id: 'equipment', name: 'Equipment' }
];

const MarketplacePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<typeof products[0] | null>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'min') {
      setPriceRange([parseInt(value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], parseInt(value)]);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      searchTerm === '' || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      product.category === selectedCategory;
    
    const matchesPrice = 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            {t('marketplace.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Buy and sell seeds, fertilizers, tools, and equipment directly from other farmers and suppliers.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder={t('marketplace.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <button 
              className="md:hidden flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => navigate('/marketplace/add-listing')}
                className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-primary-600"
              >
                <PlusCircle size={20} />
                <span>Add Listing</span>
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="mt-4 p-4 border-t border-gray-200 md:hidden">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category.id
                          ? 'bg-primary-100 text-primary-800 border border-primary-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Min (₹)</label>
                    <input
                      type="number"
                      name="min"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={handlePriceChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Max (₹)</label>
                    <input
                      type="number"
                      name="max"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block md:w-1/4">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <SlidersHorizontal size={18} className="mr-2" />
                    Filters
                  </h3>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">{t('marketplace.categories')}</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            type="radio"
                            id={category.id}
                            name="category"
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor={category.id} className="ml-2 text-gray-700">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">₹{priceRange[0].toLocaleString()}</span>
                        <span className="text-gray-600">₹{priceRange[1].toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Min (₹)</label>
                          <input
                            type="number"
                            name="min"
                            min="0"
                            max={priceRange[1]}
                            value={priceRange[0]}
                            onChange={handlePriceChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Max (₹)</label>
                          <input
                            type="number"
                            name="max"
                            min={priceRange[0]}
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/marketplace/add-listing')}
                  className="w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  <PlusCircle size={18} className="mr-2" />
                  {t('marketplace.addListing')}
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:w-3/4">
            {viewingProduct ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src={viewingProduct.image}
                      alt={viewingProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-semibold text-gray-800">{viewingProduct.title}</h2>
                      <button 
                        onClick={() => setViewingProduct(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(viewingProduct.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">
                        {viewingProduct.rating} ({viewingProduct.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-primary-600">₹{viewingProduct.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Including GST</p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                      <p className="text-gray-600">{viewingProduct.description}</p>
                    </div>
                    
                    <div className="mt-6 py-4 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Seller Information</h3>
                      <p className="font-medium text-gray-800">{viewingProduct.seller}</p>
                      <p className="flex items-center text-gray-600 mt-1">
                        <MapPin size={16} className="mr-1" />
                        {viewingProduct.location}
                      </p>
                      <p className="flex items-center text-gray-600 mt-1">
                        <Phone size={16} className="mr-1" />
                        {viewingProduct.phone}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={() => navigate(`/marketplace/order/${viewingProduct.id}`)}
                        className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors"
                      >
                        Order Now
                      </button>
                      <button className="px-4 py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-md font-medium transition-colors">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setViewingProduct(product)}
                    >
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white py-1 px-2 rounded-full text-sm font-semibold text-primary-600">
                          ₹{product.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                        <p className="text-gray-500 text-sm mt-1 flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {product.location}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">Seller: {product.seller}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-gray-600 text-xs ml-1">
                              ({product.reviews})
                            </span>
                          </div>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded capitalize">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <ShoppingBag size={48} className="mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;