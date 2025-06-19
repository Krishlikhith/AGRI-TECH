import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tractor } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center">
              <Tractor className="h-8 w-8 text-primary-700" />
              <span className="ml-2 text-2xl font-heading font-bold text-primary-700">{t('app.name')}</span>
            </Link>
            <h2 className="mt-6 text-3xl font-heading font-bold text-gray-800">{t('auth.login')}</h2>
            <p className="mt-2 text-gray-600">
              {t('auth.dontHaveAccount')} <Link to="/register" className="text-primary-600 hover:text-primary-700">{t('auth.register')}</Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-100 text-error-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('auth.password')}
                </label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                {t('auth.rememberMe')}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              {isLoading ? 'Logging in...' : t('auth.login')}
            </button>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-gray-600">
              By continuing, you agree to AGRI TECH's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block md:w-1/2">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
          <div className="h-full w-full bg-primary-900 bg-opacity-75 flex items-center justify-center">
            <div className="max-w-md text-center p-8">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Empowering Indian Farmers</h2>
              <p className="text-gray-200">
                Join thousands of farmers across India who are using AGRI TECH to improve their agricultural knowledge and business opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;