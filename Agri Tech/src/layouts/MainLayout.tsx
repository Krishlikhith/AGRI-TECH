import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Tractor, Globe, User, ChevronDown, Bookmark } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';

const MainLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const { savedJobs } = useJobs();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/community', label: t('nav.community') },
    { path: '/marketplace', label: t('nav.marketplace') },
    { path: '/jobs', label: t('nav.jobs') },
    { path: '/weather', label: t('nav.weather') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-primary-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Tractor className="h-8 w-8" />
              <span className="text-xl font-heading font-bold">{t('app.name')}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hover:text-white transition-colors ${
                    isActive(link.path) ? 'font-semibold border-b-2 border-white' : 'text-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/jobs/saved"
                className={`hover:text-white transition-colors flex items-center ${
                  isActive('/jobs/saved') ? 'font-semibold border-b-2 border-white' : 'text-gray-100'
                }`}
              >
                <Bookmark className="w-4 h-4 mr-1" />
                <span>Saved ({savedJobs.length})</span>
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-100 hover:text-white"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                >
                  <Globe size={18} />
                  <span>{languages.find(lang => lang.code === i18n.language)?.name || 'English'}</span>
                  <ChevronDown size={16} />
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-100 hover:text-white">
                    <User size={18} />
                    <span>{user?.name.split(' ')[0]}</span>
                  </Link>
                </div>
              ) : (
                <div className="space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-100 hover:text-white"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-100 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-700 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 ${
                    isActive(link.path) ? 'font-semibold' : 'text-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/jobs/saved"
                className={`block py-2 flex items-center ${
                  isActive('/jobs/saved') ? 'font-semibold' : 'text-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Bookmark className="w-4 h-4 mr-1" />
                <span>Saved Jobs ({savedJobs.length})</span>
              </Link>
              <div className="pt-3 border-t border-primary-600">
                {/* Language Selector */}
                <div className="mb-4">
                  <div className="text-sm text-gray-300 mb-2">Language</div>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`text-left py-1 px-2 rounded ${
                          i18n.language === lang.code
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-100 hover:bg-primary-600'
                        }`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Auth Buttons */}
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="block py-2 text-gray-100 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-gray-100 hover:text-white"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="block py-2 text-gray-100 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/register"
                      className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md text-center transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-primary-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2">
                <Tractor className="h-8 w-8" />
                <span className="text-xl font-heading font-bold">{t('app.name')}</span>
              </Link>
              <p className="mt-2 text-gray-300">{t('app.tagline')}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              <ul className="space-y-2">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      className="text-gray-300 hover:text-white"
                      onClick={() => changeLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">support@agritech.com</p>
              <p className="text-gray-300 mt-2">+91 9876543210</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AGRI TECH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;