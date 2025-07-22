import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'; // Changed to react-helmet-async
import { Globe, Database, BarChart, Brain, Bot, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <BarChart className="h-10 w-10 text-green-500" />,
      title: "Managed Intelligence Services",
      description: "Get the insights that matter most with managed intelligence services that show your North Star metrics and help you make better decisions.",
      features: [
        "Customizable dashboards",
        "Real-time data visualization",
        "Actionable insights delivery"
      ],
      imageUrl: "/insights_and_dashboards.webp"
    },
    {
      icon: <Globe className="h-10 w-10 text-green-500" />,
      title: "Websites & Workflow Engineering",
      description: "We build websites that actually convert and create automated workflows that save you hours every day.",
      features: [
        "High-conversion web design",
        "Automated workflow integration",
        "Scalable and responsive solutions"
      ],
      imageUrl: "/web_and_workflow.jpeg"
    },
    {
      icon: <Database className="h-10 w-10 text-green-500" />,
      title: "Data Infrastructure & Automation",
      description: "We clean, connect, and automate your data so every team has the insights they need in real time.",
      features: [
        "Robust database setup",
        "Seamless API integration",
        "Automated data pipelines"
      ],
      imageUrl: "/data_infrastructure.webp"
    },
    {
      icon: <Brain className="h-10 w-10 text-green-500" />,
      title: "AI & Machine Learning Models",
      description: "We deploy smart models that predict customer behavior, catch fraud, and identify your most valuable opportunities.",
      features: [
        "Predictive modeling",
        "Fraud detection systems",
        "Opportunity identification"
      ],
      imageUrl: "/ai_and_machine_learning.webp"
    },
    {
      icon: <Bot className="h-10 w-10 text-green-500" />,
      title: "Custom AI Agents",
      description: "Think of them as digital employees that handle support tickets, qualify leads, analyze data, and streamline your operations 24/7.",
      features: [
        "Automated support ticket handling",
        "Lead qualification automation",
        "24/7 data analysis"
      ],
      imageUrl: "/custom_ai_agents.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Services</title>
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
              <h1 className="text-white mb-6">Our Services</h1>
              <p className="text-gray-100 text-lg mb-8">
                Empowering your business with innovative, data-driven solutions tailored to your growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Our Expertise"
            subtitle="Explore how we transform data into actionable growth opportunities for your business."
            center
          />
          <div className="space-y-12 mt-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <motion.div
                  className="w-40 h-[90px] flex-shrink-0"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <img
                    src={service.imageUrl}
                    alt={`${service.title} illustration`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {service.icon}
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-base mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <ArrowRight className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.div
                    className="w-0 h-0.5 bg-primary origin-left mt-4"
                    whileInView={{ width: "50%" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to See What's Possible?"
        subtitle="Let's discuss how we can tailor a solution for your needs."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Our Tools"
        secondaryButtonHref="/tools"
      />
    </>
  );
};

export default ServicesPage;