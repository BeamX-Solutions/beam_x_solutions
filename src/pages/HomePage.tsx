import React from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import Seo from '../components/Seo';
import { ORGANIZATION_SCHEMA } from '../lib/siteConfig';
import { motion } from 'framer-motion';
import { BarChart3, BrainCircuit, Database, LineChart, Server, Clock, User } from 'lucide-react';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import TestimonialCard from '../components/TestimonialCard';
import CTASection from '../components/CTASection';
import LogoScroller from '../components/LogoScroller';
import NotificationBanner from '../components/NotificationBanner';
import SubscribeButton from '../components/SubscribeButton';

interface LiveBlogPost {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: number | null;
  authors: { name: string } | null;
  categories: { name: string } | null;
}

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [livePosts, setLivePosts] = React.useState<LiveBlogPost[]>([]);
  const [postsLoading, setPostsLoading] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const url = `${import.meta.env.VITE_BLOG_SUPABASE_URL}/rest/v1/posts?select=title,slug,excerpt,featured_image,read_time,authors(name),categories(name)&is_published=eq.true&order=published_at.desc&limit=3`;
    fetch(url, {
      headers: {
        apikey: import.meta.env.VITE_BLOG_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_BLOG_SUPABASE_ANON_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLivePosts(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setPostsLoading(false));
  }, []);

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
      quote: "Every route and every client has different economics. We could feel the business growing but could not tell which parts were truly profitable. BeamX showed us the numbers behind our trips and clients. We now make sharper decisions about who to grow with and how to protect our margins as we scale across Lagos and Abuja.",
      author: "Emmanuel Nwadinobi",
      position: "CEO",
      company: "Perficient Logistics",
      avatar: "/team-emmanuel.png"
    },
    {
      quote: "As a platform business, we had data coming from different tools but no single view of what was actually happening. BeamX built us an executive dashboard that brought everything into one place. We can now see our users, revenue, retention, and growth across cities in real time. It changed how we run the business day to day.",
      author: "Franklin Chigozie",
      position: "Co-founder",
      company: "Affixdot",
      avatar: "/affix_rep.jpg"
    },
    {
      quote: "Running a creative business, it is easy to get lost in the work and miss what the numbers are saying. BeamX helped us see exactly where we were making money, rethink how we attract clients, and choose better work. The result is we are now more focused, more selective with clients, and growing faster with real clarity.",
      author: "Emeka Dioha",
      position: "CEO",
      company: "Maple Maven Designs",
      avatar: "/first-person1.jpg"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      slug: "beacon",
      brand: "Beacon",
      title: "Business Health Check",
      description: "Understand your sales, customers, costs, and operations, then see what to fix first.",
      forLine: "For existing business owners",
      cta: "Check My Business",
      image: "/predictive_analysis.webp",
      landingLink: "/products/beacon",
    },
    {
      id: 3,
      slug: "luna",
      brand: "Luna",
      title: "Marketing Plan Builder",
      description: "Get a marketing plan built around your customers and your budget, not generic advice that does not fit your business.",
      forLine: "For businesses ready to market better",
      cta: "Build My Plan",
      image: "/gen-ai-strategy.webp",
      externalLink: "https://luna.beamxsolutions.com",
    },
    {
      id: 4,
      slug: "stellar",
      brand: "Stellar",
      title: "Business Idea Validator",
      description: "Check if your business idea is worth pursuing before you spend time, money, and energy on it.",
      forLine: "For new ideas and expansion plans",
      cta: "Test My Idea",
      image: "/ai_and_machine_learning.webp",
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
      <Seo
        title="BeamX Solutions | Data Analytics & AI Consulting"
        description="BeamX Solutions provides expert data strategy, business intelligence, and AI consulting to help businesses unlock their data's potential and drive growth."
        path="/"
        jsonLd={[
          ORGANIZATION_SCHEMA,
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'BeamX Solutions',
            url: 'https://beamxsolutions.com',
          },
        ]}
      />

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
                Turn Your Data into Your <span className="text-secondary">Biggest Competitive Advantage</span>
              </h1>
              <p className="text-white text-base md:text-lg mb-6">
                We combine advanced analytics, custom AI solutions, and intelligent product development to help you see what's working, eliminate hidden losses, and build AI-powered capabilities that drive real, sustainable growth.
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
            title="Tools to Help You Understand and Grow Your Business"
            subtitle="Use BeamX tools to check your business health, create a practical marketing plan, and test new ideas before spending money."
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
                  <span className="text-xs font-medium text-primary uppercase tracking-wide mb-1 block">{product.brand}</span>
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
                  <p className="text-xs text-gray-400 mb-3">{product.forLine}</p>
                  <Button
                    variant="primary"
                    className="text-sm"
                    onClick={() => handleTryNow(product.slug, product.externalLink, product.landingLink)}
                  >
                    {product.cta}
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
            title="What Working with BeamX Solutions Looks Like"
            subtitle="Straight answers. Practical plans. Real results."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BrainCircuit className="h-8 w-8 text-blue-500" />,
                title: "We Speak Your Language",
                description: "You will not sit through a presentation full of charts you cannot read. We explain everything in plain English so you can make decisions with confidence."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
                title: "We Focus on What Pays",
                description: "Every recommendation we make is tied to one question: will this make you more money or save you money? If the answer is no, we do not waste your time on it."
              },
              {
                icon: <Server className="h-8 w-8 text-blue-500" />,
                title: "We Stay Until It Works",
                description: "Most consultants hand you a report and disappear. We help you put the changes in place and stay close enough to know if they worked."
              },
              {
                icon: <Database className="h-8 w-8 text-blue-500" />,
                title: "We Have Done This Before",
                description: "Obinna has shaped decisions for McDonald's, T-Mobile, and Samsung. The same level of thinking now works for growing businesses that deserve it."
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
            title="What Changes After Working with BeamX"
            subtitle="Clearer business. Better operations. Stronger growth."
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
      
      {/* Blog Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeader
            title="From Our Blog"
            subtitle="Insights, guides, and thought leadership from the BeamX team to help you make smarter data-driven decisions."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsLoading ? (
              [0, 1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))
            ) : (
              livePosts.map((post, index) => (
                <motion.a
                  key={post.slug}
                  href={`https://blog.beamxsolutions.com/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {post.categories?.name && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                        {post.categories.name}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {post.authors?.name && (
                        <div className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>{post.authors.name}</span>
                        </div>
                      )}
                      {post.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.read_time} min read</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <Button href="https://blog.beamxsolutions.com/" variant="outline" icon>
              View All Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Get sharper at running your business."
            subtitle="One short, practical idea every week to help you grow with more clarity. Unsubscribe anytime."
            center
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SubscribeButton />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="You have read enough. Let us look at your business."
        subtitle="Book a free 30 minute conversation. We will tell you exactly where to focus first to make more money."
        primaryButtonText="Book a call"
        primaryButtonHref="https://calendly.com/beamxsolutions"
        secondaryButtonText="See Our Work"
        secondaryButtonHref="/products"
      />
    </>
  );
};

export default HomePage;