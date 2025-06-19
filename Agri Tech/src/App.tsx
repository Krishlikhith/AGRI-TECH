import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import MarketplacePage from './pages/MarketplacePage';
import OrderPage from './pages/OrderPage';
import AddListingPage from './pages/AddListingPage';
import JobsPage from './pages/JobsPage';
import WeatherPage from './pages/WeatherPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <JobProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="marketplace/order/:productId" element={<OrderPage />} />
                <Route path="marketplace/add-listing" element={<AddListingPage />} />
                <Route path="jobs" element={<JobsPage />} />
                <Route path="weather" element={<WeatherPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </JobProvider>
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;