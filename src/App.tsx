import React, { useState, useEffect, Component, ReactNode } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import ProductsDetailPage from './pages/ProductsDetailPage';
import LoanApprovalPredictor from './pages/LoanApprovalPredictor';
import BeaconAssessment from './pages/BeaconAssessment';
import ManagedIntelligencePage from './pages/ManagedIntelligencePage';
import MarketingPlanWaitlist from './pages/MarketingPlanWaitlist';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import BeaconProAssessment from './pages/BeaconProAssessment';
import BeaconPage from './pages/BeaconPage';

// Component to handle external redirects
const ExternalRedirect: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Redirecting to blog...</h2>
        <p className="text-gray-600 mb-6">If you are not redirected automatically, <a href={url} className="text-blue-600 hover:underline">click here</a>.</p>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Something went wrong.</h2>
            <p className="text-gray-600 mb-6">Please try refreshing the page.</p>
            <a href="/" className="text-blue-600 hover:underline">
              Back to Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [lastPath, setLastPath] = useState<string | null>(null);

  const pageTitles: { [key: string]: string } = {
    '/': 'BeamX Solutions | Home',
    '/about': 'BeamX Solutions | About Us',
    '/services': 'BeamX Solutions | Services',
    '/products': 'BeamX Solutions | Products',
    '/products/loan-approval-model': 'BeamX Solutions | Loan Approval Model',
    '/products/beacon': 'Beacon - Business Assessment Tools | BeamX Solutions',
    '/products/beacon-assessment': 'BeamX Solutions | Beacon - Business Assessment',
    '/products/beacon-pro-assessment': 'BeamX Solutions | Beacon Pro - Advanced Business Assessment',
    '/contact': 'BeamX Solutions | Contact Us',
    '/privacy-policy': 'BeamX Solutions | Privacy Policy',
    '/managed-intelligence': 'BeamX Solutions | Managed Intelligence Services',
  };

  useEffect(() => {
    if (lastPath !== location.pathname + location.search) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 200);
      const title = pageTitles[location.pathname] || document.title;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname + location.search,
          title: title,
        },
      });
      console.log('Pushed to dataLayer:', {
        path: location.pathname + location.search,
        title: title,
      });
      setLastPath(location.pathname + location.search);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.search]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout isLoading={isLoading} />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductsDetailPage />} />
            <Route path="products/loan-approval-model" element={<LoanApprovalPredictor />} />
            <Route path="products/beacon" element={<BeaconPage />} />
            <Route path="products/beacon-assessment" element={<BeaconAssessment />} />
            <Route path="products/beacon-pro-assessment" element={<BeaconProAssessment />} />
            <Route path="products/luna/waitlist" element={<MarketingPlanWaitlist />} />
            {/* Redirects from old /tools routes to /products */}
            <Route path="tools" element={<Navigate to="/products" replace />} />
            <Route path="tools/*" element={<Navigate to="/products" replace />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="managed-intelligence" element={<ManagedIntelligencePage />} />
            {/* Redirect old blog URLs to external blog */}
            <Route path="blog" element={<ExternalRedirect url="https://blog.beamxsolutions.com/" />} />
            <Route path="blog/*" element={<ExternalRedirect url="https://blog.beamxsolutions.com/" />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;