import React from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BarChart3, BrainCircuit, Database, LineChart, Server } from 'lucide-react';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import TestimonialCard from '../components/TestimonialCard';
import CTASection from '../components/CTASection';
import LogoScroller from '../components/LogoScroller';
import NotificationBanner from '../components/NotificationBanner';

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Check for subscription confirmation
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const confirmed = urlParams.get('confirmed');
    const name = urlParams.get('name');
    
    if (confirmed === 'true' && name) {
      setNotificationMessage(`Welcome to BeamX Solutions, ${decodeURIComponent(name)}! Your subscription is confirmed and you'll receive our latest insights and updates.`);
      setShowNotification(true);
      
      // Clean up URL parameters
      navigate('/', { replace: true });
    }
  }, [location.search, navigate]);

  const testimonials = [
    {
      quote: "BeamX didn't just build our site, they redesigned our business operations. We now attract the kind of clients we always wanted, and we're finally growing with confidence.",
      author: "Emeka Dioha",
      position: "CEO",
      company: "Maple Maven Designs",
      avatar: "/first-person1.jpg"
    },
    {
      quote: "BeamX joined us as a data partner and first provided a real-time dashboard and a model informing us 30 days before customers are likely to churn. In just 90 days, we improved retention by 28%, our team saves over 20 hours weekly, and we've cut $10K in annual costs.",
      author: "Franklin Chigozie",
      position: "Co-founder",
      company: "AffixDot.com",
      avatar: "/affix_rep.jpg"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      slug: "beacon",
      title: "Beacon - Business Assessment",
      description: "Evaluate your business readiness with detailed insights and tailored growth strategies.",
      image: "/web_and_workflow.jpeg",
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

  const handleTryNow = (slug: string, externalLink?: string, landingLink?: string) => {
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    } else if (landingLink) {
      navigate(landingLink);
    } else {
      navigate(`/products/${slug}`);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Home</title>
      </Helmet>

      {/* Notification Banner */}
      {showNotification && (
        <NotificationBanner
          message={notificationMessage}
          type="success"
          duration={8000}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Hero Section */}
      <section className={`relative ${showNotification ? 'pt-44' : 'pt-32'} pb-20 md:${showNotification ? 'pt-52' : 'pt-40'} md:pb-28 lg:${showNotification ? 'pt-68' : 'pt-56'} lg:pb-32 overflow-hidden transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20 z-10" />
        
        <div className="container-custom relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white font-bold mb-4 text-4xl md:text-5xl">
                There is gold in your <span className="text-secondary">Data</span>, we help you unlock it.
              </h1>
              <p className="text-white text-base md:text-lg mb-6">
                Leverage BeamX Solutions expertise in business intelligence and AI to uncover hidden opportunities, optimize operations, increase revenue, and fuel long-term innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="https://calendly.com/beamxsolutions" variant="white" icon>
                  Book Free Consultation
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
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <LineChart className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-900">Data Insights Overview</h3>
                  </div>
                  <span className="text-sm font-medium text-secondary bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                    +32% Growth
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-2 h-32">
                    <div className="flex-1 bg-primary bg-opacity-20 rounded-t-md" style={{ height: '60%' }} />
                    <div className="flex-1 bg-secondary bg-opacity-20 rounded-t-md" style={{ height: '80%' }} />
                    <div className="flex-1 bg-accent bg-opacity-20 rounded-t-md" style={{ height: '40%' }} />
                    <div className="flex-1 bg-primary bg-opacity-20 rounded-t-md" style={{ height: '70%' }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4</span>
                  </div>
                </div>

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

      {/* Featured Products Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Featured Products"
            subtitle="Explore our cutting-edge products designed to empower your business with intelligent solutions."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-0">
            {featuredProducts.map((product, index) => (
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
                icon: <BrainCircuit className="h-8 w-8 text-blue-500" />,
                title: "Strategy First",
                description: "We align solutions with your business goals, using data analytics to drive measurable results."
              },
              {
                icon: <Server className="h-8 w-8 text-blue-500" />,
                title: "Built to Scale",
                description: "Our scalable AI solutions grow with your business, from startup to enterprise."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
                title: "Value-Led",
                description: "We focus on ROI, delivering business intelligence that saves time and boosts profits."
              },
              {
                icon: <Database className="h-8 w-8 text-blue-500" />,
                title: "Insight + Action",
                description: "Our AI-driven tools provide real-time insights and automation for smarter decisions."
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
                <div className="bg-blue-50 p-3 rounded-lg w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb- 3">{item.title}</h3>
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
            title="What our Clients Say"
            subtitle="Hear what our clients have to say about their experience working with BeamX Solutions."
            center
          />
          
          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <TestimonialCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      position={testimonial.position}
                      company={testimonial.company}
                      avatar={testimonial.avatar}
                      delay={0}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentTestimonial === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Ready to See What’s Possible?"
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