import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from './Loading';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  isLoading: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isLoading }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if we're on homepage with notification
  const hasNotification = location.pathname === '/' && 
    new URLSearchParams(location.search).get('confirmed') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isScrolled={isScrolled} hasNotification={hasNotification} />
      <main className="flex-grow relative">
        {isLoading && <Loading />}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;