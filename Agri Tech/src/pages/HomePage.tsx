import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { ArrowRight, Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

// Sample data for featured content
const featuredProducts = [
  {
    id: 1,
    title: 'Organic Fertilizer',
    price: '₹850',
    image: 'https://images.pexels.com/photos/5504960/pexels-photo-5504960.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Bangalore, Karnataka'
  },
  {
    id: 2,
    title: 'Wheat Seeds (5kg)',
    price: '₹450',
    image: 'https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Ludhiana, Punjab'
  },
  {
    id: 3,
    title: 'Drip Irrigation Kit',
    price: '₹2,100',
    image: 'https://images.pexels.com/photos/3029868/pexels-photo-3029868.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Nashik, Maharashtra'
  },
  {
    id: 4,
    title: 'Hand Tractor',
    price: '₹15,000',
    image: 'https://images.pexels.com/photos/2181188/pexels-photo-2181188.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Coimbatore, Tamil Nadu'
  }
];

const trendingTopics = [
  {
    id: 1,
    title: 'Best practices for rice farming in monsoon',
    author: 'Ramesh Singh',
    comments: 28,
    likes: 156
  },
  {
    id: 2,
    title: 'Organic pest control methods for vegetable farms',
    author: 'Priya Verma',
    comments: 42,
    likes: 203
  },
  {
    id: 3,
    title: 'How to increase cotton yield with less water',
    author: 'Ahmed Khan',
    comments: 19,
    likes: 87
  }
];

const recentJobs = [
  {
    id: 1,
    title: 'Farm Laborers Needed for Harvest Season',
    location: 'Guntur, Andhra Pradesh',
    salary: '₹500/day',
    type: 'Seasonal'
  },
  {
    id: 2,
    title: '2 Acres Rice Field for Lease',
    location: 'Thanjavur, Tamil Nadu',
    salary: '₹35,000/season',
    type: 'Land Lease'
  },
  {
    id: 3,
    title: 'Agricultural Engineer Required',
    location: 'Pune, Maharashtra',
    salary: '₹30,000/month',
    type: 'Permanent'
  }
];

const weatherData = {
  location: 'Delhi, India',
  temperature: '32°C',
  description: 'Partly Cloudy',
  humidity: '65%',
  wind: '10 km/h',
  rain: '20%'
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-gray-800">
              {t('home.featuredProducts')}
            </h2>
            <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                  <p className="text-primary-700 font-semibold mt-1">{product.price}</p>
                  <p className="text-gray-500 text-sm mt-1">{product.location}</p>
                  <button className="mt-3 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics & Weather */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trending Topics */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-gray-800">
                  {t('home.trendingTopics')}
                </h2>
                <Link to="/community" className="text-primary-600 hover:text-primary-700 flex items-center">
                  View All <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {trendingTopics.map((topic) => (
                  <div 
                    key={topic.id} 
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg text-gray-800">{topic.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">Posted by {topic.author}</p>
                    <div className="flex mt-3 text-gray-600 text-sm">
                      <span className="mr-4">{topic.comments} comments</span>
                      <span>{topic.likes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{t('weather.today')}</h2>
                  <Link to="/weather" className="text-blue-100 hover:text-white text-sm flex items-center">
                    Forecast <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <Cloud className="h-8 w-8 mr-2" />
                      <span className="text-2xl font-bold">{weatherData.temperature}</span>
                    </div>
                    <p className="text-blue-100 mt-1">{weatherData.description}</p>
                    <p className="text-blue-100 mt-4">{weatherData.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-blue-100 mb-2">
                      <Droplets size={16} className="mr-1" />
                      <span>Humidity: {weatherData.humidity}</span>
                    </div>
                    <div className="flex items-center justify-end text-blue-100 mb-2">
                      <Wind size={16} className="mr-1" />
                      <span>Wind: {weatherData.wind}</span>
                    </div>
                    <div className="flex items-center justify-end text-blue-100">
                      <Thermometer size={16} className="mr-1" />
                      <span>Rain: {weatherData.rain}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-400">
                  <h3 className="text-lg font-semibold mb-2">Crop Advisory</h3>
                  <p className="text-blue-100 text-sm">
                    Ideal conditions for wheat sowing. Ensure proper drainage in rice fields due to expected rainfall in the next 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-gray-800">
              {t('home.recentJobs')}
            </h2>
            <Link to="/jobs" className="text-primary-600 hover:text-primary-700 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {job.type}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{job.title}</h3>
                <p className="text-gray-500 mb-1">{job.location}</p>
                <p className="text-primary-700 font-medium mb-4">{job.salary}</p>
                <button className="w-full py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Join Our Growing Community</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 mb-8">
            Connect with thousands of farmers, buyers, and agricultural experts across India. Share knowledge, trade products, and grow together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-primary-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium">
              Register Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;