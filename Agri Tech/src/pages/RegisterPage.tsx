import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tractor } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    userType: 'farmer',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        location: formData.location,
        userType: formData.userType as 'farmer' | 'buyer' | 'expert',
        password: formData.password,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center">
              <Tractor className="h-8 w-8 text-primary-700" />
              <span className="ml-2 text-2xl font-heading font-bold text-primary-700">{t('app.name')}</span>
            </Link>
            <h2 className="mt-6 text-3xl font-heading font-bold text-gray-800">{t('auth.register')}</h2>
            <p className="mt-2 text-gray-600">
              {t('auth.alreadyHaveAccount')} <Link to="/login" className="text-primary-600 hover:text-primary-700">{t('auth.login')}</Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-100 text-error-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.mobile')}
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.location')}
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.userType')}
              </label>
              <select
                id="userType"
                name="userType"
                required
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="farmer">{t('auth.farmer')}</option>
                <option value="buyer">{t('auth.buyer')}</option>
                <option value="expert">{t('auth.expert')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              {isLoading ? 'Registering...' : t('auth.register')}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              By registering, you agree to AGRI TECH's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/1466134/pexels-photo-1466134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
          <div className="h-full w-full bg-primary-900 bg-opacity-70 flex items-center justify-center">
            <div className="max-w-lg text-center p-8">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Join the Agricultural Revolution</h2>
              <p className="text-xl text-gray-200 mb-6">
                Connect with other farmers, find buyers, access knowledge, and grow your agricultural business.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                <div className="bg-white/10 p-3 rounded">
                  <div className="text-2xl font-bold text-white">20K+</div>
                  <div className="text-gray-200 text-sm">Farmers</div>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <div className="text-2xl font-bold text-white">5K+</div>
                  <div className="text-gray-200 text-sm">Buyers</div>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <div className="text-2xl font-bold text-white">300+</div>
                  <div className="text-gray-200 text-sm">Experts</div>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-gray-200 text-sm">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;