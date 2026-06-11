import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, ClipboardList, Target, LayoutDashboard, FileText, Bot, ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import Button from '../components/Button';

const faqs = [
  {
    question: "How long does setup take?",
    answer: "For audits and workshops, we typically complete the work within 2 to 4 weeks. Business Reporting dashboards take 2 to 3 weeks to build depending on your data setup. For most services, we can get started within 5 to 7 business days of your first call."
  },
  {
    question: "What kind of data do I need to give you?",
    answer: "It depends on the service, but most commonly we work with sales records, customer data, expense reports, and any existing reports you already run. If you use accounting software, a CRM, or even a spreadsheet to track your business, that is enough to get started. We will tell you exactly what we need before we begin."
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We treat your data with strict confidentiality. We sign an NDA before any engagement and follow secure data handling practices throughout. Your data is never shared with third parties."
  },
  {
    question: "What happens if I cancel?",
    answer: "There are no long-term contracts. You can cancel a monthly service with 30 days' notice. For one-off engagements like audits or workshops, there are no cancellation charges once the work is underway."
  },
  {
    question: "Can I see an example of what I will get?",
    answer: "Yes. Book a free 20-minute conversation and we will show you a sample deliverable relevant to your business. You will know exactly what you are getting before you commit."
  },
  {
    question: "Do I need to be technical?",
    answer: "Not at all. Everything we deliver is written in plain English. Our dashboards are designed to be understood without any data or technical background. If something is unclear, we explain it until it makes sense."
  },
  {
    question: "What if I do not have a lot of data yet?",
    answer: "That is fine. Many of our clients start with limited data and we help them identify what to track going forward. Even with basic records, we can usually find useful insights. The important thing is starting, not waiting until everything is perfect."
  }
];

const reportingSubServices = [
  {
    icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
    title: "Business Health Dashboard",
    features: [
      "One screen that shows you everything that matters about your business, updated in real time",
      "Built to be clear enough to share with your team or investors",
      "Tailored to your business, not a generic template"
    ]
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Monthly Intelligence Reports",
    features: [
      "A monthly report written in plain English that tells you what is working, what is not, and what to do next",
      "Specific recommendations on where to invest more and where to cut",
      "Comparisons that show you how your business stacks up against others like it"
    ]
  },
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: "24/7 AI Business Agent",
    features: [
      "Ask questions about your business in Slack or on the web, get instant answers backed by your real numbers",
      "It does not replace thinking, but it removes the hours you spend digging for basic facts",
      "Built specifically for your business, not a generic chatbot"
    ]
  }
];

const standaloneServices = [
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "Customer Analysis",
    description: "We show you which customers, products, and segments are making you money, breaking even, or costing you. You leave with a clear profit picture and a specific action list."
  },
  {
    icon: <ClipboardList className="h-10 w-10 text-primary" />,
    title: "Business Profitability Audit",
    description: "A full review of your business to show what is working, where you are losing money, and what to fix first. We look at your customers, costs, channels, operations, and revenue streams, then give you a clear action plan."
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: "Marketing Plan Workshop",
    description: "A guided session where we build a practical marketing plan around your customers, your budget, and your business goals, not generic advice that does not fit. Powered by Luna, our AI marketing planning tool.",
    href: "/marketing-plan-workshop"
  }
];

const ServicesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

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
                Practical help for business owners who want to understand their numbers, fix what is not working, and grow with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Not ready callout */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="container-custom mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-sm text-center sm:text-left">
            <span className="font-semibold">Not ready to commit?</span> Book a 20 minute conversation. We will look at your business and tell you if this is the right fit. No pressure.
          </p>
          <a
            href="https://calendly.com/beamxsolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-primary whitespace-nowrap hover:underline"
          >
            <Calendar className="h-4 w-4" />
            Book a free call
          </a>
        </div>
      </div>

      {/* Standalone Services */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Choose the Support Your Business Needs"
            subtitle="One-off engagements built around your specific situation and goals."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {standaloneServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg w-fit p-3 mb-4 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed flex-1 mb-4">{service.description}</p>
                {service.href && (
                  <Button href={service.href} variant="outline" icon>
                    Learn More
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Reporting */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Business Reporting"
            subtitle="An ongoing service that keeps you on top of your business with real-time data, monthly reports, and an AI agent that answers your questions."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {reportingSubServices.map((sub, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-2">{sub.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{sub.title}</h3>
                </div>
                <ul className="space-y-3">
                  {sub.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/business-reporting" variant="primary" icon>
              Learn More About Business Reporting
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 max-w-3xl">
          <SectionHeader
            title="Common Questions"
            subtitle="Everything you need to know before getting started."
            center
          />
          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="You have read enough. Let us look at your business."
        subtitle="Book a free 30 minute conversation. We will tell you exactly where to focus first to make more money."
        primaryButtonText="Book a call"
        primaryButtonHref="https://calendly.com/beamxsolutions"
        secondaryButtonText="See Our Products"
        secondaryButtonHref="/products"
      />
    </>
  );
};

export default ServicesPage;
