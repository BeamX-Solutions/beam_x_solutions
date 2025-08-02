import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Mail, Phone, Clock, ChevronDown } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const ContactPage: React.FC = () => {
  // State for FAQ expansion
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  // State for form handling
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    botField: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // FAQ data
  const faqs = [
    {
      question: "What industries do you work with?",
      answer: "We work with clients across various industries including retail, financial services, logistics, e-commerce, and more. Our data solutions are adaptable to the specific needs and challenges of each industry."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on scope and complexity. A small BI implementation might take 4-6 weeks, while a comprehensive data transformation could span several months. We'll provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, we offer various support and maintenance options to ensure the continued success of your data solutions. We can provide training, regular check-ins, system monitoring, updates, and dedicated support as needed."
    },
    {
      question: "How do you handle data security and privacy?",
      answer: "We take data security and privacy extremely seriously. We implement robust security measures, follow industry best practices, and ensure compliance with relevant regulations like NDPR and GDPR depending on your industry and location."
    },
    {
      question: "Can you work with our existing systems and tools?",
      answer: "Yes, we design our solutions to integrate with your existing infrastructure whenever possible. We have experience working with a wide range of data systems, analytics platforms, and business applications."
    },
    {
      question: "What makes BeamX Solutions different from other data consultancies?",
      answer: "We combine deep technical expertise with business acumen to deliver solutions that not only solve technical challenges but also drive real business value. Our collaborative approach, focus on knowledge transfer, and commitment to long-term success set us apart."
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.message.trim()) return 'Message is required';
    if (formData.botField) return 'Bot detected';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          botField: '',
        });
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Contact Us</title>
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary z-0" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white mb-6">Contact Us</h1>
              <p className="text-gray-100 text-lg mb-8">
                Have questions or ready to start your data journey? Get in touch with our team.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Information and Form Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader
                title="Get In Touch"
                subtitle="We'd love to hear from you. Contact us using the form or the information below."
              />
              
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">
                      Springfield Ave<br />
                      Chicago, IL 60625
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 mb-1">
                        <a href="mailto:info@beamxsolutions.com" className="hover:text-primary transition-colors">
                          info@beamxsolutions.com
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 mb-1">
                        <a href="tel:+14146506035" className="hover:text-primary transition-colors">
                          +1 414 650 6035
                        </a>
                      </p>
                      <p className="text-gray-600 mb-1">
                        <a href="tel:+2348164711076" className="hover:text-primary transition-colors">
                          +234 816 471 1076
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Business Hours</h3>
                </div>
                <p className="text-gray-600 mb-1">Monday - Friday: 9am - 5pm</p>
                <p className="text-gray-600">Saturday - Sunday: Closed</p>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="How can we help you?"
                  />
                </div>
                <div hidden>
                  <label htmlFor="botField">Don’t fill this out:</label>
                  <input
                    type="text"
                    id="botField"
                    name="botField"
                    value={formData.botField}
                    onChange={handleChange}
                  />
                </div>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-lg bg-success bg-opacity-10 text-success"
                  >
                    Your message has been sent successfully. We'll get back to you soon!
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-lg bg-error bg-opacity-10 text-error"
                  >
                    {errorMessage}
                  </motion.div>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-3 rounded-lg text-white text-lg font-medium transition-colors ${
                      isSubmitting ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and process."
            center
          />
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl mb-4 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  aria-expanded={expandedFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className={`text-xl font-semibold ${expandedFAQ === index ? 'text-primary' : 'text-gray-900'}`}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                      expandedFAQ === index ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0 }}
                  animate={{ height: expandedFAQ === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 px-6 pb-6">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;