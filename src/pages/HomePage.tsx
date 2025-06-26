import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BrainCircuit, Database, LineChart, Server, Users } from 'lucide-react';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import TestimonialCard from '../components/TestimonialCard';
import CTASection from '../components/CTASection';
import LogoScroller from '../components/LogoScroller';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20 z-10" />
        
        <div className="container-custom relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white font-bold mb-6">
                Transforming Data Into <span className="text-secondary">Strategic Assets</span>
              </h1>
              <p className="text-gray-100 text-lg mb-8 max-w-lg">
                We help businesses leverage the full potential of their data through expert data strategy, 
                business intelligence, and AI solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" variant="white" icon>
                  Contact Us
                </Button>
                <Button href="/services" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" icon>
                  Our Services
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative bg-white p-6 rounded-xl shadow-xl">
                {/* Header with Metric */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <LineChart className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-900">Data Insights Overview</h3>
                  </div>
                  <span className="text-sm font-medium text-secondary bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                    +32% Growth
                  </span>
                </div>

                {/* Simple Bar Chart */}
                <div className="mb-6">
                  <div className="flex items-end gap-2 h-32">
                    <div className="flex-1 bg-primary bg-opacity-20 rounded-t-md transition-all duration-300 hover:bg-opacity-30" style={{ height: '60%' }} />
                    <div className="flex-1 bg-secondary bg-opacity-20 rounded-t-md transition-all duration-300 hover:bg-opacity-30" style={{ height: '80%' }} />
                    <div className="flex-1 bg-accent bg-opacity-20 rounded-t-md transition-all duration-300 hover:bg-opacity-30" style={{ height: '40%' }} />
                    <div className="flex-1 bg-primary bg-opacity-20 rounded-t-md transition-all duration-300 hover:bg-opacity-30" style={{ height: '70%' }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4</span>
                  </div>
                </div>

                {/* Supporting Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <Database className="h-6 w-6 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Data Points</p>
                      <p className="text-xs text-gray-500">1.2M</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <BrainCircuit className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Accuracy</p>
                      <p className="text-xs text-gray-500">98%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LogoScroller />
      
      {/* Why Choose Us Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Why Choose BeamX Solutions"
            subtitle="Partner with us to transform your data into actionable insights and drive business growth."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BrainCircuit className="h-8 w-8 text-green-500" />,
                title: "Strategy First",
                description: "We start with your business goals, not the latest tech trends. Every solution is built to move your specific metrics."
              },
              {
                icon: <Server className="h-8 w-8 text-green-500" />,
                title: "Built to Scale",
                description: "Our systems grow with you. No expensive rebuilds when you hit your next milestone."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-green-500" />,
                title: "Value-Led",
                description: "We care about ROI, not buzzwords. If it doesn’t make you money or save you time, we don’t build it."
              },
              {
                icon: <Database className="h-8 w-8 text-green-500" />,
                title: "Insight + Action",
                description: "Pretty dashboards are useless without smart automation. We give you both the data and the systems that act on it."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-green-50 p-3 rounded-lg w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Don't just take our word for it. Here's what our clients have to say about working with BeamX Solutions."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="BeamX didn’t just build our site, they redesigned our business operations. We now attract the kind of clients we always wanted, and we’re finally growing with confidence."
              author="Emeka Dioha"
              position="CEO"
              company="Maple Maven Designs"
              delay={0}
            />
            <TestimonialCard
              quote="The team at BeamX Solutions delivered a BI solution that exceeded our expectations. Their expertise and attention to detail made all the difference."
              author="Michael Chen"
              position="Director of Analytics"
              company="Global Retail Group"
              delay={1}
            />
            <TestimonialCard
              quote="Working with BeamX on our AI initiative has given us a competitive edge in our industry. Their approach is both innovative and practical."
              author="Jennifer Martinez"
              position="VP of Operations"
              company="HealthPlus Systems"
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Data Strategy?"
        subtitle="Let's discuss how we can help you unlock the full potential of your data."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default HomePage;