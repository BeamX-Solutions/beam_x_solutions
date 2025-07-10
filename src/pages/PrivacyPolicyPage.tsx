import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - BeamX Solutions</title>
        <meta name="description" content="Learn about BeamX Solutions' privacy policy, detailing how we handle your data with care and transparency." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white mb-6">Privacy Policy</h1>
              <p className="text-gray-100 text-lg mb-8">
                Discover how BeamX Solutions protects your data with transparency and robust security measures.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Commitment to Privacy</h2>
              <p className="text-gray-600 mb-8">
                At BeamX Solutions, we are dedicated to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect your data when you engage with our website and services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-6">
                We may collect personal details like your name, email, and contact information when you visit our site, subscribe to updates, or reach out. We also gather non-personal data, such as browsing patterns, to enhance our services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-6">
                Your data helps us deliver and improve our services, respond to your inquiries, send relevant updates, and personalize your experience. Aggregated data may be used for analytics, always in compliance with legal standards.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-6">
                We do not sell your personal information. It may be shared with trusted third-party providers (e.g., for hosting or analytics) under strict confidentiality. Disclosure may occur if required by law or to protect our rights.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Security Measures</h2>
              <p className="text-gray-600 mb-6">
                We employ advanced security measures, including encryption and secure servers, to shield your data from unauthorized access or misuse. While no online transmission is fully secure, we urge you to stay vigilant.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-600 mb-6">
                You can access, correct, or delete your personal data. Opt out of marketing emails by contacting us at <a href="mailto:info@beamxsolutions.com" className="text-primary hover:underline">info@beamxsolutions.com</a>. We honor your preferences swiftly.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 mb-6">
                Cookies enhance your experience and help us analyze site usage. Manage your preferences via browser settings. Details are available in our forthcoming Cookie Policy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. International Data Transfers</h2>
              <p className="text-gray-600 mb-6">
                Your data may be processed internationally. We adhere to data protection laws and relevant regulations like NDPR and GDPR depending on your industry and location, thereby implementing safeguards for cross-border transfers.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-600 mb-6">
                Updates to this policy will be posted here with a revised date. We recommend periodic reviews to stay informed.
              </p>

              <p className="text-gray-600 mt-8">
                Last Updated: June 21, 2025<br />
                For more inquiries, reach us at <a href="mailto:info@beamxsolutions.com" className="text-primary hover:underline">info@beamxsolutions.com</a>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Secure Your Data Journey?"
        subtitle="Let's work together to ensure your privacy and data integrity."
        primaryButtonText="Get in Touch"
        primaryButtonHref="/contact"
        secondaryButtonText="View Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default PrivacyPolicyPage;