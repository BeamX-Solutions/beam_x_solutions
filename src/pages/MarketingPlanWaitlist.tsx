import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, TrendingUp, Target, BarChart3, Users } from 'lucide-react';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const MarketingPlanWaitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Audience Targeting",
      description: "AI-powered customer segmentation and persona development"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Growth Strategies",
      description: "Data-driven marketing tactics tailored to your industry"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Budget Optimization",
      description: "Smart allocation recommendations across marketing channels"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Campaign Planning",
      description: "Complete campaign roadmaps with timelines and KPIs"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Marketing Plan Generator - Coming Soon | BeamX Solutions</title>
        <meta name="description" content="Join the waitlist for BeamX Solutions' AI Marketing Plan Generator. Get comprehensive, data-driven marketing strategies tailored to your business." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block bg-secondary bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Coming Soon
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              AI Marketing Plan Generator
            </h1>
            <p className="text-gray-100 text-lg md:text-xl mb-8">
              Generate comprehensive, data-driven marketing strategies tailored to your business goals and target audience in minutes, not weeks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Get
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our AI-powered tool will analyze your business and generate a complete marketing strategy with actionable insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white p-3 rounded-lg w-fit mx-auto mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join the Waitlist
              </h2>
              <p className="text-gray-600 text-lg">
                Be the first to know when our AI Marketing Plan Generator launches. 
                Get early access and exclusive benefits.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              {isSubmitted ? (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for joining our waitlist. We'll notify you as soon as the AI Marketing Plan Generator is ready.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>What's next?</strong> We'll send you updates on our progress and give you early access when we launch.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    fullWidth
                    className="py-3"
                  >
                    {isLoading ? 'Joining Waitlist...' : 'Join the Waitlist'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By joining our waitlist, you agree to receive updates about the AI Marketing Plan Generator. 
                    You can unsubscribe at any time.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Early Access Benefits
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our waitlist and get exclusive perks when we launch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Free First Plan",
                description: "Get your first AI-generated marketing plan completely free",
                icon: "🎁"
              },
              {
                title: "Priority Support",
                description: "Direct access to our team for questions and guidance",
                icon: "⚡"
              },
              {
                title: "Exclusive Updates",
                description: "Behind-the-scenes updates on development and new features",
                icon: "📧"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Marketing?"
        subtitle="While you wait for our AI Marketing Plan Generator, explore our other services to boost your business growth."
        primaryButtonText="Explore Services"
        primaryButtonHref="/services"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
      />
    </>
  );
};

export default MarketingPlanWaitlist;