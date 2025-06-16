import React, { useState, useEffect, Component, ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';

// Simple Error Boundary component
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

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('Route changed to:', location.pathname); // Debug: Log route changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('Loading state ended for:', location.pathname); // Debug: Log loading end
    }, 1500); // Increased to 1.5s for visibility
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout isLoading={isLoading} />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;