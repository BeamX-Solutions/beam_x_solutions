import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote, Building, AlertCircle, CheckCircle, BarChart } from 'lucide-react';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const caseStudies = [
  {
    id: 1,
    slug: "maple-maven-designs",
    title: "Maple Maven Designs",
    logo: "/logo34.png",
    description: "Transformed Maple Maven Designs’ digital presence with a conversion-optimized website, strategic growth consulting, and business intelligence systems.",
    companyDescription: "Maple Maven Designs is a premium interior design studio redefining space aesthetics for modern homeowners and organizations.",
    issue: "Maple Maven Designs’ outdated digital presence didn’t reflect their sophisticated brand or support growth. They needed a website to attract high-value leads, convert visitors into clients, and streamline operations with data-driven insights. The business lacked visibility into client behavior, a centralized system for tracking leads and invoices, and scalable service delivery methods.",
    solution: [
      {
        title: "Strategic Growth Consultation",
        description: "Conducted monthly advisory sessions with action plans, pricing reviews, and competitor intelligence to position Maple Maven for higher-ticket projects."
      },
      {
        title: "Premium Website with Analytics",
        description: "Developed a conversion-optimized website (maplemavendesign.com) with embedded performance tracking for user behavior, inquiry funnel drop-offs, and traffic source ROI."
      },
      {
        title: "KPI Dashboard",
        description: "Built a live metrics dashboard providing real-time insights into revenue trends, client value, service utilization, and acquisition channel performance."
      },
      {
        title: "Centralized CRM & Data Management",
        description: "Integrated a lead management and invoicing system for seamless client tracking from inquiry to payment, with automated follow-ups."
      },
      {
        title: "Client Experience Automation",
        description: "Launched an onboarding workflow and feedback system to reduce manual handoffs and capture structured client insights post-project."
      },
      {
        title: "On-Demand Growth Support",
        description: "Provided ongoing digital intelligence support, including performance audits and tailored marketing funnel optimization."
      }
    ],
    screenshots: [
      "/maple_home_page.PNG",
      "/maven_portfolio.PNG",
      "/maven_contact.PNG"
    ],
    results: {
      metrics: [
        { metric: "Lead Conversion Rate", before: "~4%", after: "12%", impact: "+200%" },
        { metric: "Client Onboarding Time", before: "3–5 days", after: "<24 hours (automated)", impact: "Significant reduction" },
        { metric: "Quote-to-Close Ratio", before: "1 in 5", after: "1 in 2", impact: "Improved efficiency" },
        { metric: "Revenue Visibility", before: "Manual + Delayed", after: "Real-Time Dashboard", impact: "Enhanced decision-making" },
        { metric: "Operational Efficiency", before: "Fragmented systems", after: "Centralized CRM + Billing", impact: "Streamlined operations" }
      ],
      quote: {
        text: "BeamX didn’t just build our site, they redesigned our business operations. We now attract the kind of clients we always wanted, and we’re finally growing with confidence.",
        author: "Emeka, CEO, Maple Maven Designs"
      }
    },
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
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 bg-gradient-primary bg-opacity-75 z-0">
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
              className="mx-auto mb-6 h-24 object-contain"
            />
            <h1 className="text-white text-4xl font-bold mb-6">{caseStudy.title}</h1>
            <p className="text-gray-100 text-lg mb-8">{caseStudy.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 max-w-5xl">
          {/* About */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-sm mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-900">About {caseStudy.title}</h2>
            </div>
            <p className="text-gray-600">{caseStudy.companyDescription}</p>
          </motion.div>

          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-sm mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-900">The Challenge</h2>
            </div>
            <p className="text-gray-600">{caseStudy.issue}</p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-sm mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Solution</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.solution.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{`${index + 1}. ${item.title}`}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Website Showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-sm mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Website Showcase</h2>
            </div>
            <p className="text-gray-600 mb-4">Maple Maven Design’s new website, optimized for conversions</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.screenshots.map((src, index) => (
                <motion.img
                  key={index}
                  src={src}
                  alt={`Maple Maven Design website screenshot ${index + 1}`}
                  className="max-w-full h-auto max-h-64 rounded-lg shadow-sm border border-green-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-sm mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-900">The Results</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-green-50">
                    <th className="p-3 font-semibold text-green-500">Metric</th>
                    <th className="p-3 font-semibold text-green-500">Before</th>
                    <th className="p-3 font-semibold text-green-500">After BeamX</th>
                    <th className="p-3 font-semibold text-orange-500">Impact Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudy.results.metrics.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-3 text-gray-900">{row.metric}</td>
                      <td className="p-3 text-gray-600">{row.before}</td>
                      <td className="p-3 text-gray-600">{row.after}</td>
                      <td className="p-3 text-orange-500">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <Quote className="h-8 w-8 text-green-500 mb-4" />
              <p className="text-gray-600 italic mb-4">{caseStudy.results.quote.text}</p>
              <p className="text-gray-900 font-medium">{caseStudy.results.quote.author}</p>
            </div>
          </motion.div>

          {/* Website Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <a href={caseStudy.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="text-sm">
                Visit {caseStudy.title} Website
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Build Your Growth System?"
        subtitle="Let’s discuss how BeamX can transform your business with data-driven solutions."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default CaseStudyDetailPage;