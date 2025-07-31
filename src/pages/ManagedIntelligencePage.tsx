import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';

const ManagedIntelligencePage: React.FC = () => {
  const packages = [
    {
      title: "Quarterly Accelerator",
      price: "$398",
      savings: "Save $199",
      features: [
        "First month FREE",
        "Free data audit (worth $1,000)",
        "Priority setup (2-week delivery)"
      ],
      ctaText: "Claim Your Spot Now",
      ctaHref: "/contact?package=quarterly",
      isPopular: true
    },
    {
      title: "Semi-Annual Dominator",
      price: "$896",
      savings: "Save $298",
      features: [
        "First month FREE",
        "Free competitor intelligence report (worth $2,500)",
        "Quarterly strategy session",
        "Custom ROI tracking dashboard"
      ],
      ctaText: "Lock In Maximum Savings",
      ctaHref: "/contact?package=semi-annual",
      isPopular: false
    }
  ];

  const testimonials = [
    {
      quote: "In 60 days, we identified a $47K revenue leak and optimized our sales process for 23% faster closes.",
      author: "Franklin Chigozie, Co-Founder, Affixdot"
    },
    {
      quote: "The ROI was immediate. First month alone, we saved $8K by killing an underperforming campaign.",
      author: "Daniel Gates, CMO, Sidewalk Restaurant"
    }
  ];

  const faqs = [
    {
      question: "What if I don't have clean data?",
      answer: "Perfect! Data cleanup is included. We've handled messier situations than yours."
    },
    {
      question: "Can I really cancel after the commitment?",
      answer: "Absolutely. After your commitment period, cancel anytime with 30 days notice."
    },
    {
      question: "What if this doesn't work for my industry?",
      answer: "60-day money-back guarantee covers this. But we've delivered results across 6+ industries."
    }
  ];

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Managed Intelligence Services</title>
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
            <p className="text-gray-100 text-lg mb-4">
              Stop Guessing. Start Growing with Data-Driven Decisions.
            </p>
            <p className="text-green-300 font-semibold mb-8">
              LIMITED TIME: Get Your First Month FREE + Setup Worth $2,000 at No Charge <br />
              Offer valid in August 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Finally, Business Intelligence That Actually Works"
            subtitle="Are you tired of making costly decisions based on gut feeling only? While your competitors are flying blind, you could be making data-backed moves that give you a competitive advantage."
            center
          />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Problem</h3>
              <p className="text-gray-600">
                Most businesses are sitting on goldmines of data but have no idea how to turn it into growth. They're either drowning in spreadsheets or paying $15K+ for consultants who take months to deliver basic insights.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Solution</h3>
              <p className="text-gray-600">
                Our Managed Intelligence Services give you a dedicated data science team's output for less than what most companies spend on software licenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="What You Get Every Month"
            subtitle="Comprehensive intelligence solutions tailored to your business."
            center
          />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: "Business Health Dashboard",
                value: "Usually $3,000 setup",
                features: [
                  "One unified view of your company's performance",
                  "Real-time tracking of your most critical KPIs",
                  "Beautiful, executive-ready visualizations"
                ]
              },
              {
                title: "Monthly Intelligence Reports",
                value: "Usually $1,500/month",
                features: [
                  "Professional insights presentation ready for board meetings",
                  "Clear ROI recommendations for your next moves",
                  "Performance analysis vs. industry benchmarks"
                ]
              },
              {
                title: "24/7 AI Business Agent",
                value: "Usually $500/month",
                features: [
                  "Ask any business question, get instant answers",
                  "Works through Slack or web",
                  "Like having a data analyst on call 24/7"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-green-500 font-medium mb-4">{item.value}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Early-Adopter Offer - Expires August 30th"
            subtitle="Choose Your Game-Changing Package"
            center
          />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 relative ${pkg.isPopular ? 'border-green-500' : ''}`}
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
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-3xl font-bold text-primary mb-2">{pkg.price}</p>
                <p className="text-green-500 font-medium mb-4">{pkg.savings}</p>
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
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                >
                  {pkg.ctaText}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Act Now Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Why You Need to Act NOW"
            subtitle="Don't miss out on this limited-time offer."
            center
          />
          <ul className="space-y-4 mt-8 max-w-2xl mx-auto">
            {[
              "Your competitors are making moves - Every day without data insights is market share lost",
              "Q3 planning window closing - Prepare for Q4 optimization opportunities",
              "Limited capacity - We only onboard few clients per quarter (5 spots left)",
              "Launch offer expiration - Regular price returns to $597/month on September 1st, 2025"
            ].map((reason, index) => (
              <motion.li
                key={index}
                className="flex items-center text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <span className="text-red-500 font-bold mr-2">❌</span>
                {reason}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Real Results from Real Clients"
            subtitle="See what our clients are saying about our Managed Intelligence Services."
            center
          />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Star className="h-6 w-6 text-yellow-500 mb-4" />
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Your 60-Day 'Profit or It's Free' Guarantee"
            subtitle="We're confident in our results. If you don't identify cost savings or revenue opportunities in your first 60 days, we'll refund every penny AND you keep the dashboard."
            center
          />
          <p className="text-center text-gray-600 mt-4">
            94% of our clients see ROI in the first 30 days.
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Still on the Fence? Here's What Others Paid"
            subtitle="Compare our solution to traditional approaches."
            center
          />
          <ul className="space-y-4 mt-8 max-w-2xl mx-auto">
            {[
              "Hiring data analyst: $75K+ annually + benefits",
              "Consulting firm: $3K+ for basic dashboard",
              "Enterprise BI software: $5K+ setup + $2K/month",
              "DIY approach: 40+ hours monthly + opportunity cost",
              "BeamX Managed Intelligence: $199/month (first month FREE) + guaranteed results"
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <span className={`font-bold mr-2 ${index === 4 ? 'text-green-500' : 'text-red-500'}`}>
                  {index === 4 ? '✅' : '❌'}
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="FAQ - Get Your Answers Fast"
            subtitle="Common questions about our Managed Intelligence Services."
            center
          />
          <div className="space-y-6 mt-8 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Don't Let Your Competitors Win While You're Still Thinking
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Your business generates data every single day. That's either competitive intelligence working FOR you, or opportunities slipping away. The companies thriving in 2025 won't be the ones with the best products; they'll be the ones with the best data.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact?package=quarterly"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              Secure Quarterly Spot - $398
            </a>
            <a
              href="/contact?package=semi-annual"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              Lock In Semi-Annual - $896
            </a>
          </div>
          <p className="text-gray-600 mt-4">
            🔒 Secure checkout • Instant confirmation • Setup begins immediately
          </p>
          <p className="text-gray-600 mt-4">
            Questions? Call now: <a href="tel:+14143506035" className="text-primary hover:underline">+1-414-350-6035</a><br />
            Prefer email? <a href="mailto:info@beamxsolutions.com" className="text-primary hover:underline">info@beamxsolutions.com</a>
          </p>
        </div>
      </section>

      {/* Standard CTA Section */}
      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Secure your spot now and start leveraging data-driven insights."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Back to Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default ManagedIntelligencePage;