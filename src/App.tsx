import React, { useState, useEffect, Component, ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, HelmetData } from 'react-helmet-async';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import LoanApprovalPredictor from './pages/LoanApprovalPredictor';
import ScorecardPredictor from './pages/ScorecardPredictor';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

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
            <p className="text-gray-600 mb-6">Please try refreshing the page or return to the blog.</p>
            <a href="/blog" className="text-blue-600 hover:underline">
              Back to Blog
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
    '/case-studies': 'BeamX Solutions | Case Studies',
    '/tools/loan-approval-predictor': 'BeamX Solutions | Loan Approval Predictor',
    '/tools/business-health-assessment': 'BeamX Solutions | Business Health Assessment',
    '/blog': 'BeamX Solutions | Blog',
    '/contact': 'BeamX Solutions | Contact Us',
    '/privacy-policy': 'BeamX Solutions | Privacy Policy',
  };

  useEffect(() => {
    if (lastPath !== location.pathname + location.search) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 200);
      const title = pageTitles[location.pathname] || document.title; // Use document.title as fallback
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

  // Removed custom helmetContext as it's not compatible with HelmetProvider's context prop

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout isLoading={isLoading} />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="tools/loan-approval-predictor" element={<LoanApprovalPredictor />} />
            <Route path="tools/business-health-assessment" element={<ScorecardPredictor />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;