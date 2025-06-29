import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  position, 
  company,
  avatar,
  delay = 0
}) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
    >
      {/* Quote Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <MessageCircle className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={avatar || `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face`}
            alt={`${author} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-lg italic text-center mb-6 leading-relaxed">
        "{quote}"
      </blockquote>

      {/* Author Info */}
      <div className="text-center">
        <p className="font-semibold text-gray-900 text-lg">{author}</p>
        <p className="text-gray-600 text-sm">{position}, {company}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;