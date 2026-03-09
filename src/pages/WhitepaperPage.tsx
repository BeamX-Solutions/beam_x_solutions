import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, Download, BarChart3, Brain, Target, Shield } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const WhitepaperPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    botField: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName.trim() || !formData.email.trim()) {
      setError('Please fill in the required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.botField) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/whitepaper-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsUnlocked(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const highlights = [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Market Opportunity",
      description: "Deep analysis of the $34-86B business intelligence market and the underserved African SME segment."
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Technical Architecture",
      description: "How BeamX's AI pipeline uses structured prompt chains, fine-tuned models, and RAG for strategy-grade outputs."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Product Deep Dives",
      description: "Detailed breakdowns of Beacon, Stellar, and Luna — three products covering the full business lifecycle."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "2025-2027 Roadmap",
      description: "From foundation to agentic AI capabilities — the strategic vision for scaling across Africa and the US."
    },
  ];

  const WHITEPAPER_PDF_URL = '/BeamX_White_Paper_March_2026.pdf';

  return (
    <>
      <Helmet>
        <title>White Paper: Blending Instinct with Intelligence | BeamX Solutions</title>
        <meta name="description" content="Download the BeamX white paper on how AI-powered tools are reshaping SME growth in African markets." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-secondary bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                Technical White Paper — March 2026
              </div>
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Blending Instinct{' '}
                <span className="text-secondary">with Intelligence</span>
              </h1>
              <p className="text-gray-100 text-lg mb-8 leading-relaxed">
                How AI-Powered Tools Are Reshaping SME Growth in African Markets.
                A comprehensive look at the market opportunity, technical architecture,
                and strategic vision behind BeamX Solutions.
              </p>
              <div className="flex items-center gap-4 text-gray-200 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>18 Pages</span>
                </div>
                <span>•</span>
                <span>By Obinna Nweke</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 w-72 transform rotate-2">
                  <div className="h-2 w-32 bg-gradient-to-r from-primary to-secondary rounded mb-6" />
                  <div className="text-xs font-bold text-primary mb-2">BEAMX SOLUTIONS</div>
                  <div className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                    Blending Instinct<br />with Intelligence
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-2 w-full bg-gray-200 rounded" />
                    <div className="h-2 w-4/5 bg-gray-200 rounded" />
                    <div className="h-2 w-3/5 bg-gray-200 rounded" />
                  </div>
                  <div className="text-xs text-gray-400">Technical White Paper</div>
                  <div className="text-xs text-gray-400">March 2026</div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-secondary text-white rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
                  Free Download
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Summary Preview (Ungated) */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <SectionHeader
              title="Executive Summary"
              subtitle="A preview of what's inside — download the full paper for the complete analysis."
            />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The global small and medium enterprise landscape is undergoing a fundamental shift.
              Businesses that once thrived on founder intuition and manual processes are now competing
              against data-native companies with real-time visibility into every dimension of their operations.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              BeamX Solutions exists to eliminate that gap. Founded in 2023, BeamX is a data and digital
              intelligence firm that builds AI-powered products specifically engineered for growth-stage
              businesses. Over 500 businesses across Nigeria and the United States have used BeamX's products.
            </p>
            <p className="text-gray-500 text-sm italic">
              The full paper covers market analysis, technical architecture, product deep dives, a composite case study, and the 2025–2027 roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="What's Inside"
            subtitle="18 pages of market analysis, technical architecture, and strategic insight."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-primary bg-opacity-10 p-3 rounded-lg w-fit mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gate / Download Section */}
      <section className="section bg-white" id="download">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title={isUnlocked ? 'Your White Paper is Ready' : 'Download the Full White Paper'}
              subtitle={isUnlocked
                ? 'Thank you! Click below to download your copy.'
                : 'Enter your details to get instant access to the full 18-page white paper.'}
              center
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white shadow-lg rounded-xl p-8"
            >
              {isUnlocked ? (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Access Granted!</h3>
                  <p className="text-gray-600 mb-6">
                    A copy has also been sent to your email. Click below to download now.
                  </p>
                  <a
                    href={WHITEPAPER_PDF_URL}
                    download="BeamX_White_Paper_March_2026.pdf"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download White Paper (PDF)
                  </a>
                  <div className="mt-6 bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>Want to discuss what you've read?</strong>{' '}
                      <a
                        href="https://calendly.com/beamxsolutions/connect"
                        className="underline hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Schedule a conversation with our team.
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your company name"
                    />
                  </div>
                  {/* Honeypot - same pattern as ContactPage */}
                  <div hidden>
                    <label htmlFor="botField">Don't fill this out:</label>
                    <input
                      type="text"
                      id="botField"
                      name="botField"
                      value={formData.botField}
                      onChange={handleChange}
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-lg bg-error bg-opacity-10 text-error"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    fullWidth
                    icon
                  >
                    {isSubmitting ? 'Processing...' : 'Get Free Access'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Your information will only be used to send you the white paper
                    and relevant updates from BeamX Solutions. You can unsubscribe at any time.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Explore What BeamX Can Do?"
        subtitle="Start with a free Beacon assessment or schedule a conversation with our team."
        primaryButtonText="Try Beacon Free"
        primaryButtonHref="/products/beacon"
        secondaryButtonText="Book a Conversation"
        secondaryButtonHref="https://calendly.com/beamxsolutions/connect"
      />
    </>
  );
};

export default WhitepaperPage;