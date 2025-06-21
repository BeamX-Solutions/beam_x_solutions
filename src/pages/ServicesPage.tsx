import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Database, Globe, Brain, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <BarChart className="h-12 w-12 text-primary" />,
      title: "Dashboards & Insights",
      description: "Track what matters, spot trends, and stay updated in one view with intuitive, real-time dashboards.",
      features: [
        "Custom dashboard creation",
        "Real-time trend analysis",
        "Unified data visualization"
      ],
      imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      icon: <Database className="h-12 w-12 text-primary" />,
      title: "Data Infrastructure",
      description: "Get clean, connected data that powers smarter decisions fast with robust and scalable systems.",
      features: [
        "Data quality management",
        "Efficient data pipelines",
        "Scalable infrastructure"
      ],
      imageUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "Web & Automation",
      description: "Launch-ready sites and systems built to convert, automate, and grow your business efficiently.",
      features: [
        "Responsive web development",
        "Automation workflows",
        "Scalable system design"
      ],
      imageUrl: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      icon: <Brain className="h-12 w-12 text-primary" />,
      title: "AI Models & Predictive Tools",
      description: "Deploy practical AI tools from churn alerts to demand forecasts without hiring a data team.",
      features: [
        "Custom AI model deployment",
        "Predictive analytics",
        "Automated insights generation"
      ],
      imageUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-gray-200 text-lg md:text-xl mb-10">
                Transform your business with tailored data solutions, from strategy to execution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <SectionHeader
            title="What We Deliver"
            subtitle="Discover our expertise in turning data into actionable growth opportunities."
            center
          />
          <div className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 opacity-50 blur-xl -z-10" />
            <motion.div
              className="flex flex-col items-center space-y-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={{
                    hidden: { opacity: 0, y: 60, scale: 0.95 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { delay: i * 0.3, duration: 0.8, type: "spring", stiffness: 100 }
                    })
                  }}
                  className="relative w-full max-w-5xl group"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-md" />
                  <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform group-hover:-translate-y-3 transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                        <motion.img
                          src={service.imageUrl}
                          alt={`${service.title} Image`}
                          className="w-full h-full object-cover rounded-xl"
                          initial={{ rotate: -5 }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-6">
                          {service.icon}
                          <h3 className="text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-base text-gray-700">
                              <ArrowRight className="h-5 w-5 text-primary mr-3" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <motion.div
                          className="w-0 h-1 bg-primary origin-left"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: index * 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Unlock Your Potential?"
        subtitle="Let’s collaborate to transform your data into a competitive advantage."
        primaryButtonText="Get in Touch"
        primaryButtonHref="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonHref="/case-studies"
      />
    </>
  );
};

export default ServicesPage;