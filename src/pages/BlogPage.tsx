import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import CTASection from '../components/CTASection';
import SubscribeButton from '../components/SubscribeButton'; // Import the new component
import { blogPosts } from '../data/blogPosts';

const BlogPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Blog</title>
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
              <h1 className="text-white mb-6">Our Blog</h1>
              <p className="text-gray-100 text-lg mb-8">
                Insights, trends, and expert perspectives on data analytics, strategy, and AI.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Latest Insights"
            subtitle="Stay up to date with the latest trends and insights in data analytics, AI, and digital transformation."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-0">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 text-white bg-primary text-xs font-medium px-2 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-4">
                  <NavLink to={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </NavLink>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-3 mb-3">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <NavLink to={`/blog/${post.slug}`}>
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

      {/* Newsletter Section */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Subscribe to Our Newsletter"
            subtitle="Get our latest insights and updates delivered straight to your inbox."
            center
          />
          <SubscribeButton />
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

export default BlogPage;