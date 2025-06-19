import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets, MapPin, TrendingUp, TrendingDown, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';

// Sample data for locations
const locations = [
  'Delhi, India',
  'Mumbai, Maharashtra',
  'Bangalore, Karnataka',
  'Chennai, Tamil Nadu',
  'Kolkata, West Bengal',
  'Hyderabad, Telangana',
  'Lucknow, Uttar Pradesh',
  'Jaipur, Rajasthan',
  'Chandigarh, Punjab',
  'Bhopal, Madhya Pradesh'
];

// Sample weather data for demonstration
const sampleWeatherData = {
  main: {
    temp: 28,
    feels_like: 32,
    humidity: 65,
    temp_max: 32,
    temp_min: 24
  },
  weather: [
    {
      description: 'Partly cloudy',
      icon: 'cloud'
    }
  ],
  wind: {
    speed: 12
  },
  rain: {
    '1h': 0
  },
  list: [
    { dt: Date.now() / 1000, main: { temp_max: 32, temp_min: 24 }, weather: [{ icon: 'sun' }] },
    { dt: (Date.now() / 1000) + 86400, main: { temp_max: 30, temp_min: 22 }, weather: [{ icon: 'cloud' }] },
    { dt: (Date.now() / 1000) + 172800, main: { temp_max: 28, temp_min: 20 }, weather: [{ icon: 'rain' }] },
    { dt: (Date.now() / 1000) + 259200, main: { temp_max: 31, temp_min: 23 }, weather: [{ icon: 'sun' }] },
    { dt: (Date.now() / 1000) + 345600, main: { temp_max: 29, temp_min: 21 }, weather: [{ icon: 'cloud' }] },
    { dt: (Date.now() / 1000) + 432000, main: { temp_max: 33, temp_min: 25 }, weather: [{ icon: 'sun' }] },
    { dt: (Date.now() / 1000) + 518400, main: { temp_max: 27, temp_min: 19 }, weather: [{ icon: 'rain' }] }
  ],
  advisories: [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rain Expected',
      message: 'Heavy rainfall expected in the next 48 hours. Ensure proper drainage in fields.'
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Planting Conditions',
      message: 'Current weather conditions are favorable for planting winter crops.'
    }
  ]
};

// Sample crop predictions data
const sampleCropPredictions = [
  { id: 1, name: 'Rice', currentPrice: 2500, priceChange: 150, prediction: 2650, trend: 'up' },
  { id: 2, name: 'Wheat', currentPrice: 2200, priceChange: -80, prediction: 2120, trend: 'down' },
  { id: 3, name: 'Sugarcane', currentPrice: 350, priceChange: 25, prediction: 375, trend: 'up' },
  { id: 4, name: 'Cotton', currentPrice: 5800, priceChange: -200, prediction: 5600, trend: 'down' },
  { id: 5, name: 'Maize', currentPrice: 1800, priceChange: 100, prediction: 1900, trend: 'up' }
];

const WeatherPage: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [cropPredictions, setCropPredictions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Bangalore, Karnataka');
  const [searchInput, setSearchInput] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get the API key from Vite environment variables
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        
        // Check if API key is valid (not the placeholder)
        if (API_KEY && API_KEY !== 'your_openweathermap_api_key_here') {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=Bangalore,Karnataka,IN&appid=${API_KEY}&units=metric`
          );
          setWeatherData(response.data);
          
          // Simulate AI-based crop predictions
          try {
            const predictions = await axios.post('/api/crop-predictions', {
              weather: response.data,
              location: 'Karnataka'
            });
            setCropPredictions(predictions.data);
          } catch (error) {
            // Use sample data if API is not available
            setCropPredictions(sampleCropPredictions);
          }
        } else {
          // Use sample data when API key is not available or is placeholder
          console.warn('Weather API key not configured or is placeholder, using sample data');
          setWeatherData(sampleWeatherData);
          setCropPredictions(sampleCropPredictions);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Fallback to sample data
        setWeatherData(sampleWeatherData);
        setCropPredictions(sampleCropPredictions);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setSearchInput('');
    setShowLocationDropdown(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowLocationDropdown(true);
  };

  const filteredLocations = locations.filter(loc => 
    loc.toLowerCase().includes(searchInput.toLowerCase())
  );

  const renderWeatherIcon = (icon: string, size = 24) => {
    switch (icon) {
      case 'sun':
        return <Sun size={size} className="text-yellow-500" />;
      case 'rain':
        return <CloudRain size={size} className="text-blue-500" />;
      case 'cloud':
      default:
        return <Cloud size={size} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            {t('weather.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Check the weather forecast and crop price predictions to make informed farming decisions.
          </p>
        </div>

        {/* Location Selector */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
              <span className="pl-4 text-gray-500">
                <MapPin size={20} />
              </span>
              <input
                type="text"
                placeholder="Search location..."
                className="w-full px-3 py-3 focus:outline-none"
                value={searchInput}
                onChange={handleSearchInputChange}
                onFocus={() => setShowLocationDropdown(true)}
              />
            </div>
            
            {showLocationDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredLocations.map((loc, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleLocationChange(loc)}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Current Weather */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl font-semibold">{location}</h2>
                <p className="text-5xl font-bold mt-2">{weatherData?.main?.temp}°C</p>
                <p className="text-xl mt-1">{weatherData?.weather[0]?.description}</p>
              </div>
              
              <div className="text-center">
                {renderWeatherIcon(weatherData?.weather[0]?.icon, 80)}
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-6 md:mt-0">
                <div className="flex flex-col items-center">
                  <Wind className="h-8 w-8 mb-2" />
                  <span className="text-sm">Wind</span>
                  <span className="font-semibold">{weatherData?.wind?.speed} km/h</span>
                </div>
                <div className="flex flex-col items-center">
                  <Droplets className="h-8 w-8 mb-2" />
                  <span className="text-sm">Humidity</span>
                  <span className="font-semibold">{weatherData?.main?.humidity}%</span>
                </div>
                <div className="flex flex-col items-center">
                  <CloudRain className="h-8 w-8 mb-2" />
                  <span className="text-sm">Rain</span>
                  <span className="font-semibold">{weatherData?.rain?.['1h'] || 0}%</span>
                </div>
                <div className="flex flex-col items-center">
                  <Thermometer className="h-8 w-8 mb-2" />
                  <span className="text-sm">Feels like</span>
                  <span className="font-semibold">{weatherData?.main?.feels_like}°C</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-blue-400">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                {t('weather.forecast')}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {weatherData?.list?.slice(0, 7).map((day: any, index: number) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="font-semibold">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-xs text-blue-100">{new Date(day.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <div className="my-2">
                      {renderWeatherIcon(day.weather[0].icon)}
                    </div>
                    <p className="font-semibold">{Math.round(day.main.temp_max)}°</p>
                    <p className="text-sm text-blue-100">{Math.round(day.main.temp_min)}°</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crop Price Predictions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{t('weather.cropPrices')}</h2>
                  <button className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                    View All <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price (₹/q)</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction (7 days)</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cropPredictions?.map((crop: any) => (
                        <tr key={crop.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm font-medium text-gray-800">{crop.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">₹{crop.currentPrice}</td>
                          <td className={`py-4 px-4 text-sm ${crop.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {crop.priceChange >= 0 ? '+' : ''}{crop.priceChange}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">₹{crop.prediction}</td>
                          <td className="py-4 px-4">
                            {crop.trend === 'up' ? (
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-red-600" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>* Predictions are based on historical data, weather patterns, and market trends.</p>
                  <p>* Last updated: {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agricultural Advisories */}
          <div>
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Agricultural Advisories</h2>
                
                <div className="space-y-4">
                  {weatherData?.advisories?.map((advisory: any) => (
                    <div
                      key={advisory.id}
                      className={`p-4 rounded-lg ${
                        advisory.type === 'warning'
                          ? 'bg-yellow-50 border-l-4 border-yellow-500'
                          : 'bg-blue-50 border-l-4 border-blue-500'
                      }`}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0">
                          {advisory.type === 'warning' ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <Cloud className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className={`text-sm font-medium ${
                            advisory.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                          }`}>
                            {advisory.title}
                          </h3>
                          <p className={`mt-1 text-sm ${
                            advisory.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
                          }`}>
                            {advisory.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Soil Moisture Status</h3>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Low</span>
                      <span>Optimal</span>
                      <span>High</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                      <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Current soil moisture levels are optimal for most crops in the region.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;