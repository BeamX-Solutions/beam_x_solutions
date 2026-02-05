import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { NavLink, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const successStories = [
  {
    id: 1,
    slug: "maple-maven-designs",
    title: "Maple Maven Designs",
    description: "Developed a modern, user-friendly website to enhance their online presence and drive business growth.",
    image: "/logo34.png",
  },
  {
    id: 2,
    slug: "affixdot",
    title: "Affixdot",
    description: "Built a comprehensive insights and reporting infrastructure to transform Affixdot into a data-driven event platform.",
    image: "/affix.PNG",
  },
  {
    id: 3,
    slug: "perficient-logistics",
    title: "Perficient Logistics",
    description: "Created a seamless bookings landing page and executed targeted ad campaigns to drive customer acquisition and streamline logistics operations.",
    image: "/logo--2--2.png",
  },
];

const products = [
  {
    id: 1,
    slug: "beacon",
    title: "Beacon - Business Assessment",
    description: "Evaluate your business readiness with detailed insights and tailored growth strategies.",
    image: "/web_and_workflow.jpeg",
    landingLink: "/beacon-landing",
  },
  {
    id: 2,
    slug: "beacon-pro",
    title: "Beacon Pro - Advanced Business Assessment",
    description: "Evaluate your business across six key pillars with enhanced AI-powered insights and tailored strategies.",
    image: "/ai_and_machine_learning.webp",
    landingLink: "/beacon-landing",
  },
  {
    id: 3,
    slug: "luna",
    title: "Luna - AI Marketing Plan Generator",
    description: "Generate comprehensive, data-driven marketing strategies tailored to your business goals and target audience.",
    image: "/gen-ai-strategy.webp",
    externalLink: "https://luna.beamxsolutions.com",
  },
  {
    id: 4,
    slug: "stellar",
    title: "Stellar - Business Idea Validator",
    description: "Validate your business ideas with AI-powered analysis, market insights, and feasibility assessments before you invest.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80",
    externalLink: "https://stellar.beamxsolutions.com",
  },
];

const models = [
  {
    id: 1,
    slug: "loan-approval-model",
    title: "Loan Approval Model",
    description: "Automated lending decisions that are faster, smarter, and more accurate than manual reviews.",
    image: "/loan_approval.jpg",
  },
];

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTryNow = (slug: string, externalLink?: string, landingLink?: string) => {
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    } else if (landingLink) {
      navigate(landingLink);
    } else {
      navigate(`/products/${slug}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Products</title>
      </Helmet>
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white mb-6">Products & Success Stories</h1>
              <p className="text-gray-100 text-lg mb-8">
                Explore real-world examples and innovative products that transform data into actionable solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Our Products"
            subtitle="Explore our cutting-edge products designed to empower your business with intelligent solutions."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-0">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="p-4">
                  {product.externalLink ? (
                    <a href={product.externalLink} target="_blank" rel="noopener noreferrer">
                      <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                      </h2>
                    </a>
                  ) : (
                    <NavLink to={product.landingLink || `/products/${product.slug}`}>
                      <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                      </h2>
                    </NavLink>
                  )}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
                  <Button
                    variant="primary"
                    className="text-sm"
                    onClick={() => handleTryNow(product.slug, product.externalLink, product.landingLink)}
                  >
                    Try Now
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Our Models"
            subtitle="Powerful AI and machine learning models built to solve complex business challenges."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-0">
            {models.map((model, index) => (
              <motion.article
                key={model.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.title}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="p-4">
                  <NavLink to={`/products/${model.slug}`}>
                    <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {model.title}
                    </h2>
                  </NavLink>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{model.description}</p>
                  <Button
                    variant="primary"
                    className="text-sm"
                    onClick={() => handleTryNow(model.slug)}
                  >
                    Try Now
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Our Success Stories"
            subtitle="Discover how BeamX Solutions has driven innovation and efficiency for our clients."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-0">
            {successStories.map((story, index) => (
              <motion.article
                key={story.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-contain bg-white p-4"
                  />
                </div>
                <div className="p-4">
                  <NavLink to={`/products/${story.slug}`}>
                    <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {story.title}
                    </h2>
                  </NavLink>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{story.description}</p>
                  <NavLink to={`/products/${story.slug}`}>
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

      <CTASection
        title="Ready to See What's Possible?"
        subtitle="Let's discuss how we can tailor a solution for your needs."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default ProductsPage;