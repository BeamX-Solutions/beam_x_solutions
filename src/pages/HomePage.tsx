import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
              <h1 className="text-white font-bold mb-6">
                Unlock The Power Of Your <span className="text-secondary">Data</span>
              </h1>
              <p className="text-gray-100 text-lg mb-8 max-w-lg">
                We help businesses leverage the full potential of their data through expert data strategy, 
                business intelligence, and AI solutions. Our team of data scientists and AI specialists brings 
                years of experience in transforming raw data into strategic insights. From predictive analytics 
                to custom dashboards, we tailor solutions to meet your unique business needs. Whether you're 
                looking to optimize operations, enhance customer experiences, or drive revenue growth, BeamX 
                Solutions is your trusted partner in the data-driven world.
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
                description: "We start with your business goals, not the latest tech trends. Every solution is built to move your specific metrics. Our process begins with a thorough analysis of your current data landscape, ensuring alignment with your long-term objectives."
              },
              {
                icon: <Server className="h-8 w-8 text-blue-500" />,
                title: "Built to Scale",
                description: "Our systems grow with you. No expensive rebuilds when you hit your next milestone. We design scalable architectures that adapt to your evolving needs, from startups to enterprise-level operations."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
                title: "Value-Led",
                description: "We care about ROI, not buzzwords. If it doesn’t make you money or save you time, we don’t build it. Our solutions are rigorously tested to deliver measurable financial and operational benefits."
              },
              {
                icon: <Database className="h-8 w-8 text-blue-500" />,
                title: "Insight + Action",
                description: "Pretty dashboards are useless without smart automation. We give you both the data and the systems that act on it. Our AI-driven tools provide real-time decision-making support tailored to your industry."
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
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