import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const caseStudies = [
  {
    id: 1,
    slug: "maple-maven-designs",
    title: "Maple Maven Designs",
    description: "Developed a modern, user-friendly website to enhance their online presence and drive business growth.",
    image: "/logo34.png",
  },
];

const CaseStudiesPage: React.FC = () => {
  return (
    <>
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
              <h1 className="text-white mb-6">Case Studies</h1>
              <p className="text-gray-100 text-lg mb-8">
                Explore real-world examples of how we transform data into actionable solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Our Success Stories"
            subtitle="Discover how BeamX Solutions has driven innovation and efficiency for our clients."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-0">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-contain bg-white p-4"
                  />
                </div>
                <div className="p-4">
                  <NavLink to={`/case-studies/${study.slug}`}>
                    <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {study.title}
                    </h2>
                  </NavLink>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{study.description}</p>
                  <NavLink to={`/case-studies/${study.slug}`}>
                    <Button variant="primary" className="text-sm">
                      Read More
                    </Button>
                  </NavLink>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Let's discuss how we can tailor a solution for your needs."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default CaseStudiesPage;