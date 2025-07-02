import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  '/logo34.png',
  '/CA-logo-main.png',
  '/Rotary_Logo_Lekki.png',
  '/affix.PNG',
  '/slots logo.png',
  '/montech_logo.png',
  '/Crestique_logo.png',
  '/herbility_logo.png',
];

const LogoScroller: React.FC = () => {
  const repeatedLogos = [...logos, ...logos]; // Duplicate for seamless scroll

  return (
    <section className="bg-gray-100 py-10 overflow-hidden">
      <div className="container-custom">
        <h2 className="text-center text-sm font-bold text-gray-600 mb-4 tracking-wide uppercase">
          Trusted by Leading Brands
        </h2>
      </div>
      <div className="relative w-full">
        <motion.div
          className="flex items-center gap-20 animate-scroll"
          initial={{ x: 0 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 20,
          }}
        >
          {repeatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 h-16 flex items-center justify-center">
              <img
                src={logo}
                alt={`Company ${index + 1}`}
                className="h-16 max-w-none object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoScroller;
