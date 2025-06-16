import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CompanyLogo = () => (
  <img
    src="/beam-x-logo3.jpg"
    alt="Beam X Logo"
    className="w-20 h-20 object-contain"
  />
);

const Loading: React.FC = () => {
  useEffect(() => {
    console.log('Loading component mounted'); // Debug: Log when rendered
    return () => console.log('Loading component unmounted'); // Debug: Log when unmounted
  }, []);

  return (
    <div className="absolute inset-0 bg-white flex items-center justify-center z-40 opacity-100">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulsing background circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-600 bg-opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Logo */}
        <CompanyLogo />
      </motion.div>
    </div>
  );
};

export default Loading;