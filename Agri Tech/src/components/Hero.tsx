import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Tractor, Users, ShoppingBag, Briefcase, Play, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-accent-500/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-secondary-500/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 animate-grow">
              {t('home.welcome')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-lg mx-auto lg:mx-0">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/marketplace"
                className="group bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-accent-500/25"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t('home.browseMarketplace')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/community"
                className="group bg-white text-primary-800 hover:bg-gray-100 px-8 py-4 rounded-full flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg"
              >
                <Users className="w-5 h-5" />
                <span>{t('home.joinCommunity')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              {/* Main Image */}
              <img
                src="https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg"
                alt="Indian Farmer"
                className="rounded-2xl shadow-2xl w-full max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              
              {/* Stats Card */}
              <div className="absolute -right-4 -bottom-4 bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform">
                <div className="text-primary-800 font-bold text-2xl">20,000+</div>
                <div className="text-gray-600">Farmers Connected</div>
              </div>

              {/* Floating Achievement Card */}
              <div className="absolute -left-4 -top-4 bg-accent-500 text-white p-4 rounded-xl shadow-xl transform hover:scale-105 transition-transform">
                <div className="font-bold">#1 Platform</div>
                <div className="text-sm opacity-90">for Indian Farmers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-primary-100 text-primary-700 p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('marketplace.title')}</h3>
              <p className="text-gray-600 leading-relaxed">Buy and sell agricultural products directly with other farmers and suppliers.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-primary-100 text-primary-700 p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('community.title')}</h3>
              <p className="text-gray-600 leading-relaxed">Connect with farmers and experts to share knowledge and experiences.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-primary-100 text-primary-700 p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('jobs.title')}</h3>
              <p className="text-gray-600 leading-relaxed">Find agricultural jobs and hire skilled labor for your farm.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-primary-100 text-primary-700 p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('tutorials.title')}</h3>
              <p className="text-gray-600 leading-relaxed">Learn modern farming techniques through expert-led video tutorials.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">Trusted by Farmers Across India</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of farmers who are already benefiting from our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/2382973/pexels-photo-2382973.jpeg"
                alt="Success Story"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Increased Crop Yield</h3>
              <p className="text-gray-600">"Using the knowledge shared in the community, I improved my crop yield by 40% this season."</p>
              <div className="mt-4 text-sm text-gray-500">- Rajesh Kumar, Punjab</div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/2382889/pexels-photo-2382889.jpeg"
                alt="Success Story"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Better Market Prices</h3>
              <p className="text-gray-600">"I now sell my produce directly to buyers and get 25% better prices than before."</p>
              <div className="mt-4 text-sm text-gray-500">- Lakshmi Devi, Karnataka</div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/2382934/pexels-photo-2382934.jpeg"
                alt="Success Story"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Techniques</h3>
              <p className="text-gray-600">"The tutorials helped me adopt modern farming techniques and reduce water usage."</p>
              <div className="mt-4 text-sm text-gray-500">- Mohammed Khan, Maharashtra</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;