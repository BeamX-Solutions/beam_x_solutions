import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  hasNotification?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, hasNotification = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isBlogPostPage = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.2 },
    }),
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: 'https://blog.beamxsolutions.com/', external: true },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <style>
        {`
          @keyframes pulse-glow {
            0% { box-shadow: 0 0 4px rgba(78, 205, 196, 0.3); }
            50% { box-shadow: 0 0 8px rgba(78, 205, 196, 0.5); }
            100% { box-shadow: 0 0 4px rgba(78, 205, 196, 0.3); }
          }
          .contact-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          .contact-border::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #4ECDC4;
            transition: width 0.3s ease;
          }
          .contact-border:hover::after {
            width: 100%;
          }
          .contact-icon {
            transition: transform 0.3s ease;
          }
          .contact-link:hover .contact-icon {
            transform: translateY(-2px);
          }
          @media (prefers-reduced-motion: reduce) {
            .contact-glow {
              animation: none;
              box-shadow: 0 0 4px rgba(78, 205, 196, 0.4);
            }
            .contact-icon {
              transition: none;
            }
          }
        `}
      </style>
      <header
        className={`fixed ${hasNotification ? 'top-16' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isBlogPostPage
            ? 'bg-white shadow-md py-3'
            : 'bg-transparent backdrop-blur-sm py-5'
        }`}
      >
        <div className="container-custom mx-auto flex items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-4">
            <img
              src="/Beamx-Logo-Colour.png"
              alt="BeamX Solutions Logo"
              className="h-12 w-auto max-w-[200px] transition-transform duration-300 hover:scale-105"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.external) {
                // External link opens in new tab; intercept click to prevent GTM link decoration (_gl params)
                const baseClass = `relative font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled || isBlogPostPage ? 'text-gray-700 hover:text-primary' : 'text-gray-200 hover:text-white'
                }`;
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={baseClass}
                    onClick={(e) => {
                      // Prevent GTM or other handlers from decorating the URL
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.nativeEvent && typeof (e.nativeEvent as any).stopImmediatePropagation === 'function') {
                        (e.nativeEvent as any).stopImmediatePropagation();
                      }
                      window.open(item.path, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    {item.name}
                  </a>
                );
              }

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    item.name === 'Contact Us'
                      ? `relative font-semibold transition-all duration-300 contact-glow contact-border flex items-center gap-1.5 px-2 py-1 rounded-md ${
                          isScrolled || isBlogPostPage
                            ? isActive
                              ? 'text-secondary'
                              : 'text-gray-700 hover:text-secondary'
                            : isActive
                              ? 'text-white'
                              : 'text-gray-200 hover:text-white'
                        }`
                      : `relative font-medium transition-all duration-300 hover:scale-105 ${
                          isScrolled || isBlogPostPage
                            ? isActive
                              ? 'text-primary'
                              : 'text-gray-700 hover:text-primary'
                            : isActive
                              ? 'text-white'
                              : 'text-gray-200 hover:text-white'
                        }`
                  }
                  aria-label={item.name === 'Contact Us' ? 'Contact Us' : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {item.name === 'Contact Us' ? (
                        <span className="contact-link flex items-center gap-1.5">
                          {item.name}
                          <Mail className="contact-icon" size={16} />
                        </span>
                      ) : (
                        item.name
                      )}
                      {isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-current"
                          layoutId="navbar-indicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled || isBlogPostPage ? 'text-gray-900' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled || isBlogPostPage ? 'text-gray-900' : 'text-white'} size={24} />
            )}
          </button>

          {/* Mobile Dropdown Menu */}
          <motion.div
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg md:hidden overflow-hidden z-40"
            initial="hidden"
            animate={isMobileMenuOpen ? 'visible' : 'hidden'}
            variants={menuVariants}
          >
            <nav className="flex flex-col items-center py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate={isMobileMenuOpen ? 'visible' : 'hidden'}
                  variants={menuItemVariants}
                  className="w-full text-center"
                >
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.nativeEvent && typeof (e.nativeEvent as any).stopImmediatePropagation === 'function') {
                          (e.nativeEvent as any).stopImmediatePropagation();
                        }
                        setIsMobileMenuOpen(false);
                        window.open(item.path, '_blank', 'noopener,noreferrer');
                      }}
                      className="block text-lg font-medium px-4 py-3 transition-all text-gray-800 hover:text-primary hover:bg-primary/5"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <NavLink
                      to={item.path}
                      end
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        item.name === 'Contact Us'
                          ? `text-lg font-semibold px-6 py-4 contact-glow contact-border flex items-center justify-center gap-2 transition-all mx-4 my-1 rounded-md ${
                              isActive
                                ? 'text-secondary bg-secondary/10'
                                : 'text-gray-800 hover:text-secondary hover:bg-secondary/5'
                            }`
                          : `block text-lg font-medium px-4 py-3 transition-all ${
                              isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-gray-800 hover:text-primary hover:bg-primary/5'
                            }`
                      }
                      aria-label={item.name === 'Contact Us' ? 'Contact Us' : undefined}
                    >
                      {item.name === 'Contact Us' ? (
                        <span className="contact-link flex items-center gap-2">
                          {item.name}
                          <Mail className="contact-icon" size={20} />
                        </span>
                      ) : (
                        item.name
                      )}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>
      </header>
    </>
  );
};

export default Navbar;