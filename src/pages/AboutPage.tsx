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

  const teamMembers = [
    {
      name: "Obinna Nweke",
      role: "CEO & Founder",
      bio: "With over 15 years of experience in data science and AI, Obinna leads our team in developing cutting-edge analytics solutions.",
      image: "/second-person.jpg",
    },
    {
      name: "Michael Chen",
      role: "Lead AI Engineer",
      bio: "Michael specializes in building scalable AI systems, ensuring seamless integration and optimal performance for our clients.",
      image: "https://via.placeholder.com/300x300?text=Michael+Chen",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Strategy",
      bio: "Sarah drives our client success by crafting data-driven strategies that align with business goals and deliver measurable results.",
      image: "https://via.placeholder.com/300x300?text=Sarah+Johnson",
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
          <section className="section bg-white">
            <div className="container-custom">
              <SectionHeader
                title="Our Mission & Values"
                subtitle="Guided by a clear mission and strong core values, we're committed to delivering excellence in everything we do."
                center
              />

              {/* Toggle Tabs */}
              <div className="mb-12 max-w-3xl mx-auto">
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
            </div>
          </section>

          {/* Our Approach to Data Excellence */}
          <section className="section bg-gray-50">
            <div className="container-custom">
              <SectionHeader
                title="Our Approach to Data Excellence"
                subtitle="A step-by-step process to transform your data into actionable success."
                center
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    step: 1,
                    title: "Insight",
                    description: "We extract valuable insights from your business and industry data.",
                  },
                  {
                    step: 2,
                    title: "Connectivity",
                    description: "Insights in isolation might point to a faster horse, not a car. We stay connected to the latest technology and AI solutions to best help your business achieve their goals.",
                  },
                  {
                    step: 3,
                    title: "Execution",
                    description: "We don’t stop at recommendations; our unmatched execution style makes us the best partners to bring those ideas to light and help them scale.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-lg font-bold">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
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

          {/* Meet Our Team Section */}
          <section className="section bg-gray-50">
            <div className="container-custom">
              <SectionHeader
                title="Meet Our Team"
                subtitle="Our dedicated experts are passionate about driving your success through innovative data solutions."
                center
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
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