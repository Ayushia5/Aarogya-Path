import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { initAuthListener } from './services/auth';

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Providers = lazy(() => import('./pages/Providers/Providers'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const CostEstimator = lazy(() => import('./pages/CostEstimator/CostEstimator'));
const ProviderDetail = lazy(() => import('./pages/Providers/ProviderDetail'));
const About = lazy(() => import('./pages/About'));

// Loading component
const PageSkeleton = () => (
  <div className="p-8 max-w-7xl mx-auto space-y-6">
    <div className="skeleton h-12 w-1/3 rounded-lg"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="skeleton h-32 rounded-2xl"></div>
      <div className="skeleton h-32 rounded-2xl"></div>
      <div className="skeleton h-32 rounded-2xl"></div>
      <div className="skeleton h-32 rounded-2xl"></div>
    </div>
    <div className="skeleton h-64 rounded-2xl"></div>
  </div>
);

function App() {
  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/providers/:id" element={<ProviderDetail />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cost-estimator/*"
              element={
                <ProtectedRoute>
                  <CostEstimator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
