import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const caseStudies = [
  {
    id: 1,
    slug: "maple-maven-designs",
    title: "Maple Maven Designs",
    logo: "/logo34.png",
    description: "Developed a modern, user-friendly website to enhance their online presence and drive business growth.",
    companyDescription: "Maple Maven Designs is a boutique interior design firm specializing in creating unique, personalized spaces for residential and commercial clients. Known for their innovative approach and attention to detail, they aim to transform environments into functional and aesthetically pleasing spaces.",
    issue: "Maple Maven Designs struggled with an outdated online presence that failed to showcase their portfolio effectively. Their previous website was not user-friendly, lacked mobile optimization, and did not reflect the brand's quality and creativity, resulting in missed opportunities for client engagement.",
    solution: "BeamX Solutions designed and developed a modern, responsive website with a clean design, intuitive navigation, and a dynamic portfolio showcase. We implemented SEO best practices to improve visibility and integrated a user-friendly CMS for easy content updates, ensuring the site aligned with their brand identity and business goals.",
    results: "The new website led to a 40% increase in online inquiries within the first three months. Client engagement improved due to the enhanced user experience, and the optimized site ranked higher in search engine results, driving more organic traffic to Maple Maven Designs.",
    websiteUrl: "https://www.maplemavendesigns.com",
  },
];

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find((study) => study.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Case Study Not Found</h2>
          <p className="text-gray-600 mb-6">The case study you're looking for does not exist.</p>
          <NavLink to="/case-studies" className="text-blue-600 hover:underline">
            Back to Case Studies
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 bg-gradient-primary">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <img
              src={caseStudy.logo}
              alt={`${caseStudy.title} Logo`}
              className="mx-auto mb-6 h-32 object-contain"
            />
            <h1 className="text-white mb-6">{caseStudy.title}</h1>
            <p className="text-gray-100 text-lg mb-8">{caseStudy.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">About {caseStudy.title}</h2>
            <p className="text-gray-600 mb-8">{caseStudy.companyDescription}</p>

            <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
            <p className="text-gray-600 mb-8">{caseStudy.issue}</p>

            <h2 className="text-2xl font-semibold mb-4">Our Solution</h2>
            <p className="text-gray-600 mb-8">{caseStudy.solution}</p>

            <h2 className="text-2xl font-semibold mb-4">The Results</h2>
            <p className="text-gray-600 mb-8">{caseStudy.results}</p>

            <div className="text-center">
              <a href={caseStudy.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="text-sm">
                  Visit {caseStudy.title} Website
                </Button>
              </a>
            </div>
          </motion.div>
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

export default CaseStudyDetailPage;