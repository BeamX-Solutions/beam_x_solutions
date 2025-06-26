import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Shield } from 'lucide-react';
import CountUp from 'react-countup';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'mission' | 'vision' | 'goal'>('mission');
  const phrases = ["Data-Centered", "Globally Proven", "Locally Rooted"];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showFinalHeader, setShowFinalHeader] = React.useState(false);

  React.useEffect(() => {
    if (currentIndex < phrases.length - 1) {
      const timer = setTimeout(() => setCurrentIndex((prev) => prev + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => setShowFinalHeader(true), 2000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex]);

  const stats = [
    {
      value: 75,
      label: "Faster Insights",
      description:
        "We engineer data flows and analytics systems to deliver faster insights that fuel smarter decisions and business growth.",
      suffix: "%",
    },
    {
      value: 90,
      label: "AI Adoption Success",
      description:
        "With 90% of our clients successfully adopting Gen AI solutions, we help you maximize AI technology to grow your business.",
      suffix: "%",
    },
    {
      value: 100,
      label: "Results-Focused",
      description:
        "Our client-centric approach ensures measurable growth through improved efficiency, increased revenue, or optimized costs.",
      suffix: "%",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className={`relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden ${
          !showFinalHeader ? 'min-h-screen flex items-center' : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-primary z-0" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center min-h-[150px]">
            {!showFinalHeader ? (
              <motion.h2
                key={phrases[currentIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="text-white text-3xl md:text-4xl font-bold leading-snug"
              >
                {phrases[currentIndex]}
              </motion.h2>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-white mb-6">About Us</h1>
                <p className="text-gray-100 text-lg mb-8">
                  We're passionate about helping businesses leverage data to drive growth, 
                  innovation, and competitive advantage.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Render other sections and footer only when animation is complete */}
      {showFinalHeader && (
        <>
          {/* Mission, Vision & Goal Section */}
          <section className="section bg-gray-50">
            <div className="container-custom">
              <SectionHeader
                title="Our Mission & Values"
                subtitle="Guided by a clear mission and strong core values, we're committed to delivering excellence in everything we do."
                center
              />

              {/* Toggle Tabs */}
              <div className="mb-16 max-w-3xl mx-auto">
                <div className="flex justify-center mb-6">
                  {['mission', 'vision', 'goal'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as 'mission' | 'vision' | 'goal')}
                      className={`px-6 py-2 font-medium transition-colors duration-300 border border-gray-200 ${
                        tab === 'mission'
                          ? 'rounded-l-lg'
                          : tab === 'goal'
                          ? 'rounded-r-lg'
                          : ''
                      } ${
                        activeTab === tab
                          ? 'bg-primary text-white border-primary'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab === 'mission' ? 'Mission' : tab === 'vision' ? 'Vision' : 'Goal'}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white text-gray-800 p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  {activeTab === 'mission' && (
                    <p className="text-lg">
                      To convert data into intelligent business decisions through strategy-first solutions that drive real growth and measurable results.
                    </p>
                  )}
                  {activeTab === 'vision' && (
                    <p className="text-lg">
                      To become the go-to intelligence partner for ambitious businesses worldwide, using smart technology so any company can compete through data-led solutions and AI.
                    </p>
                  )}
                  {activeTab === 'goal' && (
                    <p className="text-lg">
                      To empower 500+ growth-focused businesses with intelligent systems that save 10,000+ hours through automation while delivering measurable ROI across operations, finance, and customer retention.
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Award,
                    title: "Excellence",
                    description:
                      "We strive for excellence in every aspect of our work, from technical implementation to client communication.",
                  },
                  {
                    icon: Users,
                    title: "Collaboration",
                    description:
                      "We believe in the power of collaboration, working closely with our clients and on our team.",
                  },
                  {
                    icon: Target,
                    title: "Innovation",
                    description:
                      "We continuously explore new technologies and methodologies to deliver innovative solutions.",
                  },
                  {
                    icon: Shield,
                    title: "Integrity",
                    description:
                      "We operate with integrity, maintaining the highest ethical standards in all our interactions.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-primary bg-opacity-10 p-3 rounded-lg w-fit mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="section bg-white">
            <div className="container-custom">
              <SectionHeader
                title="Our Impact"
                subtitle="Delivering measurable results through data-driven solutions."
                center
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {/* Background Accent */}
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="text-4xl font-bold text-primary mb-4">
                        <CountUp
                          start={0}
                          end={stat.value}
                          duration={3}
                          suffix={stat.suffix}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                      <p className="text-gray-600 text-sm">{stat.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section (Footer) */}
          <CTASection
            title="Ready to Transform Your Data Strategy?"
            subtitle="Let's discuss how we can help you unlock the full potential of your data."
            primaryButtonText="Get Started"
            primaryButtonHref="/contact"
            secondaryButtonText="Explore Services"
            secondaryButtonHref="/services"
          />
        </>
      )}
    </>
  );
};

export default AboutPage;