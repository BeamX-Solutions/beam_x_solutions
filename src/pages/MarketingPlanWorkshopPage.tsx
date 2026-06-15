import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Calendar, Video, FileText, Users } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import Button from '../components/Button';

const MarketingPlanWorkshopPage: React.FC = () => {
  const idealFor = [
    "You have been marketing by instinct and you know it is time to do it properly",
    "You are spending money on marketing but cannot clearly see what is working",
    "You want a strategy that actually fits your business, not a copy-paste from somewhere else"
  ];

  const howItWorks = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Book your session",
      description: "Reserve one of the 8 spots available this month."
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Fill out a short pre-session form",
      description: "A few quick questions about your business so we hit the ground running."
    },
    {
      icon: <Video className="h-6 w-6 text-primary" />,
      title: "Show up on Zoom",
      description: "We build your plan together, live, in 60 minutes."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Walk away with your plan",
      description: "Leave with a document you own and can start using immediately."
    }
  ];

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Marketing Plan Workshop</title>
        <meta name="description" content="A 60-minute live session with Obinna Nweke to build a personalized marketing plan for your business, powered by BeamX Luna." />
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
            <h1 className="text-white mb-6">Marketing Plan Workshop</h1>
            <p className="text-gray-100 text-lg mb-8">
              A real, structured marketing plan for your business, built live with you in 60 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-gray-700 text-lg leading-relaxed"
          >
            <p>
              You already know your business. You know your product, your customers, and what you
              are trying to build. What you probably do not have is a clear, structured marketing
              plan that ties it all together.
            </p>
            <p>That is exactly what this session is for.</p>
            <p>
              In 60 minutes on Zoom, we sit down together and build your marketing plan from
              scratch, tailored specifically to your business, your market, and where you want to
              go. A real plan, built live, that you can start using the moment we are done.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What you walk away with</h3>
              <p className="text-gray-600 text-base">
                Your own personalized BeamX Luna marketing plan covering your target market, your
                messaging, your channels, how you will generate leads, convert them, and keep them
                coming back. Delivered as a document you own.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* This is for you if */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="This Is For You If"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
            {idealFor.map((point, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Here Is How It Works"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg w-fit mx-auto p-3 mb-4 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-700 font-medium mt-10">
            Only 8 sessions available each month. Once they are booked, that is it until the
            following month.
          </p>
        </div>
      </section>

      {/* Meet your strategist */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6 max-w-3xl">
          <SectionHeader
            title="Meet Your Strategist"
            center
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 bg-white rounded-xl p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            <img
              src="/obinna-headshot.jpeg"
              alt="Obinna Nweke"
              className="w-40 h-40 rounded-full object-cover flex-shrink-0"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Obinna Nweke <span className="text-gray-500 font-normal">— Lead Consultant, BeamX Solutions</span>
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                He has worked with some of the most recognized brands in the world, leading
                Nigerian banks, and dozens of small businesses across Nigeria and the United States.
              </p>
              <p className="text-gray-600 text-sm mb-3">
                He holds an MS in Applied Statistics, an MBA, and is on track to become a Chartered
                Marketer.
              </p>
              <p className="text-gray-600 text-sm">
                When you book this session, you are getting a strategist who has done this at the
                highest level, focused entirely on your business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing / Buy */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm text-center"
          >
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">8 spots per month</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">₦100,000</span>
              <span className="text-xl text-gray-400 line-through">₦250,000</span>
            </div>
            <Button href="#" variant="primary" icon fullWidth>
              Book a Session
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Build Your Marketing Plan?"
        subtitle="Book your session today before this month's spots are gone."
        primaryButtonText="Book a Session"
        primaryButtonHref="#"
        secondaryButtonText="Back to Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default MarketingPlanWorkshopPage;
