import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  position, 
  company,
  delay = 0
}) => {
  return (
    <motion.div
      className="card p-8 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Quote className="h-10 w-10  text-green-500 mb-6" />
      <p className="text-gray-700 mb-6 italic">{quote}</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600 text-sm">{position}, {company}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;