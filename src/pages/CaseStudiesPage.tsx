import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
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

const flagshipTools = [
  {
    id: 1,
    slug: "loan-approval-predictor",
    title: "Loan Approval Predictor",
    description: "Automated lending decisions that are faster, smarter, and more accurate than manual reviews.",
    image: "/loan_approval.jpg",
  },
  {
    id: 2,
    slug: "scorecard-predictor",
    title: "Scorecard Predictor",
    description: "Evaluate your business readiness with detailed insights and tailored growth strategies.",
    image: "/web_and_workflow.jpeg", // Update with appropriate image path
  },
];

const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isWaking, setIsWaking] = useState<Record<string, boolean>>({});

  const handleTryNow = async (slug: string) => {
    if (slug === "loan-approval-predictor" || slug === "scorecard-predictor") {
      setIsWaking((prev) => ({ ...prev, [slug]: true }));
      try {
        const baseUrl = slug === "loan-approval-predictor" 
          ? "https://loan-approval-api-11n8.onrender.com/" 
          : "https://beamx-scorecard.onrender.com/";
        const response = await fetch(baseUrl, { method: "HEAD" });
        if (!response.ok) {
          throw new Error("Failed to wake backend.");
        }
      } catch {
        console.error(`Failed to wake backend for ${slug}.`);
      } finally {
        setIsWaking((prev) => ({ ...prev, [slug]: false }));
      }
    }
    navigate(`/tools/${slug}`);
  };

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
              <h1 className="text-white mb-6">Tools & Case Studies</h1>
              <p className="text-gray-100 text-lg mb-8">
                Explore real-world examples and innovative tools that transform data into actionable solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flagship Products/Tools Grid */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Flagship Products & Tools"
            subtitle="Explore our cutting-edge tools designed to empower your business with intelligent solutions."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-0">
            {flagshipTools.map((tool, index) => (
              <motion.article
                key={tool.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="p-4">
                  <NavLink to={`/tools/${tool.slug}`}>
                    <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {tool.title}
                    </h2>
                  </NavLink>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{tool.description}</p>
                  <Button
                    variant="primary"
                    className="text-sm"
                    onClick={() => handleTryNow(tool.slug)}
                    disabled={isWaking[tool.slug] || false}
                  >
                    {isWaking[tool.slug] ? "Waking Backend..." : "Try Now"}
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section bg-gray-50">
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