import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Star } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';

const ManagedIntelligencePage: React.FC = () => {
  const benefits = [
    {
      title: "Business Health Dashboard",
      description: [
        "Unified view of key metrics with real-time tracking.",
        "Executive-ready visualizations to guide decisions.",
        "Customizable to your business needs."
      ],
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "Monthly Intelligence Reports",
      description: [
        "Clear, actionable insights tailored to your business.",
        "Includes ROI recommendations based on data analysis.",
        "Benchmarked against industry standards."
      ],
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "24/7 AI Business Agent",
      description: [
        "Instant answers to business questions via Slack or web.",
        "Acts like an on-call data analyst for your team.",
        "Reduces decision-making time with quick insights."
      ],
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    }
  ];

  const packages = [
    {
      title: "Quarterly Plan",
      price: "$597/3 months",
      features: ["Dashboard setup", "Monthly reports", "AI agent access"],
      ctaText: "Get Started",
      ctaHref: "https://paystack.shop/pay/beamxsolutions-quarterly"
    },
    {
      title: "Semi-Annual Plan",
      price: "$995/6 months",
      // Option 1: Savings in features list (commented out, uncomment to use)
      // features: [
      //   "First month free (Save $199 compared to Quarterly Plan)",
      //   "All Quarterly features",
      //   "Quarterly strategy session",
      //   "Custom ROI dashboard"
      // ],
      features: [
        "First month free",
        "All Quarterly features",
        "Quarterly strategy session",
        "Custom ROI dashboard"
      ],
      ctaText: "Get Started",
      ctaHref: "https://paystack.shop/pay/beamxsolutions-6months",
      isPopular: true
    }
  ];

  const testimonials = [
    {
      quote: "Partnering with BeamX cut our reporting time by 75%. We’re making faster decisions, with clearer data and far less confusion. It’s been a game-changer for how we operate.",
      author: "Franklin Chigozie, Co-Founder, Affixdot"
    },
    {
      quote: "Their insights saved us $8K in the first month by optimizing our marketing campaigns.",
      author: "Daniel Gates, CMO, Sidewalk Restaurant"
    }
  ];

  const faqs = [
    {
      question: "What if my data is messy?",
      answer: "We include data cleanup in our service, turning disorganized data into clear insights."
    },
    {
      question: "Will I get monthly reports?",
      answer: "Absolutely. We will provide you reports on your data with insights to help you move forward."
    },
    {
      question: "Will this work for my industry?",
      answer: "Our solutions are tailored to your business, with proven results across multiple industries."
    }
  ];

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Managed Intelligence Services</title>
        <meta name="description" content="Transform your data into actionable insights with BeamX's Managed Intelligence Services. Get real-time dashboards, expert reports, and AI-driven answers." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-white mb-6">Managed Intelligence Services</h1>
            <p className="text-gray-100 text-lg mb-8">
              Turn your data into a competitive advantage with clear, actionable insights that drive growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Why Choose Our Intelligence Services?"
            subtitle="We simplify your data to deliver insights that matter, helping you make smarter decisions faster."
            center
          />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {benefit.icon}
                  <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                  {benefit.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Trusted by Businesses Like Yours"
            subtitle="See how our clients are achieving real results with our services."
            center
          />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Star className="h-5 w-5 text-yellow-500 mb-3" />
                <p className="text-gray-600 text-sm mb-4">{testimonial.quote}</p>
                <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Flexible Plans for Your Business"
            subtitle="Choose a plan that fits your needs and start leveraging data-driven insights."
            center
          />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg border ${pkg.isPopular ? 'border-green-500' : 'border-gray-100'} transition-all duration-300 relative`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {pkg.isPopular && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{pkg.price}</p>
                {pkg.isPopular && (
                  <p className="text-sm text-green-600 font-semibold mb-4">
                    Save $199 compared to Quarterly Plan
                  </p>
                )}
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={pkg.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                >
                  {pkg.ctaText}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="frequently Asked Questions"
            subtitle="Get answers to help you make an informed decision."
            center
          />
          <div className="space-y-4 mt-8 max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Unlock Your Data's Potential?"
        subtitle="Schedule a consultation to see how our Managed Intelligence Services can drive your business forward."
        primaryButtonText="Book a Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Back to Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default ManagedIntelligencePage;