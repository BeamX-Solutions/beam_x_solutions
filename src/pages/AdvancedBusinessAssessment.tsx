import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

// Icons for sharing buttons
const ShareIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
  </svg>
);

interface BusinessAssessmentInput {
  full_name: string;
  company_name: string;
  email: string;
  revenue: string;
  revenue_trend: string;
  profit_margin_known: string;
  profit_margin: string;
  cash_flow: string;
  financial_planning: string;
  customer_acquisition: string;
  customer_cost_awareness: string;
  customer_retention: string;
  repeat_business: string;
  marketing_budget: string;
  online_presence: string;
  customer_feedback: string;
  record_keeping: string;
  inventory_management: string;
  scheduling_systems: string;
  quality_control: string;
  supplier_relationships: string;
  team_size: string;
  hiring_process: string;
  employee_training: string;
  delegation: string;
  performance_tracking: string;
  payment_systems: string;
  data_backup: string;
  communication_tools: string;
  website_functionality: string;
  social_media_use: string;
  market_knowledge: string;
  competitive_advantage: string;
  customer_segments: string;
  pricing_strategy: string;
  growth_planning: string;
  business_type: string;
  business_age: string;
  primary_challenge: string;
  main_goal: string;
  location_importance: string;
}

interface BusinessAssessmentResult {
  scores: {
    financial: number;
    growth: number;
    operations: number;
    team: number;
    digital: number;
    strategic: number;
  };
  total_score: number;
  max_score: number;
  insight: string;
  assessment_data: BusinessAssessmentInput;
}

const AdvancedBusinessAssessment: React.FC = () => {
  const [formData, setFormData] = useState<BusinessAssessmentInput>({
    full_name: "",
    company_name: "",
    email: "",
    revenue: "",
    revenue_trend: "",
    profit_margin_known: "",
    profit_margin: "",
    cash_flow: "",
    financial_planning: "",
    customer_acquisition: "",
    customer_cost_awareness: "",
    customer_retention: "",
    repeat_business: "",
    marketing_budget: "",
    online_presence: "",
    customer_feedback: "",
    record_keeping: "",
    inventory_management: "",
    scheduling_systems: "",
    quality_control: "",
    supplier_relationships: "",
    team_size: "",
    hiring_process: "",
    employee_training: "",
    delegation: "",
    performance_tracking: "",
    payment_systems: "",
    data_backup: "",
    communication_tools: "",
    website_functionality: "",
    social_media_use: "",
    market_knowledge: "",
    competitive_advantage: "",
    customer_segments: "",
    pricing_strategy: "",
    growth_planning: "",
    business_type: "",
    business_age: "",
    primary_challenge: "",
    main_goal: "",
    location_importance: "",
  });
  const [result, setResult] = useState<BusinessAssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BusinessAssessmentInput, string>>>({});
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name as keyof BusinessAssessmentInput]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyAgreed(e.target.checked);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleShare = (platform: string) => {
    const baseMessage = "I just completed an advanced business assessment with BeamX Solutions! 🚀";
    const url = "https://beamxsolutions.com/advanced-business-assessment";
    const hashtags = "BusinessGrowth,BeamXSolutions,AdvancedAssessment";
    
    let shareUrl = '';
    
    switch (platform) {
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(baseMessage)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(baseMessage)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(baseMessage)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing like other platforms
        // This will copy the message to clipboard for manual posting
        navigator.clipboard.writeText(`${baseMessage} ${url} #BusinessGrowth #BeamXSolutions #AdvancedAssessment`);
        setShareMessage('Message copied! Open Instagram and paste in your story or post. 📱');
        setTimeout(() => setShareMessage(''), 4000);
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShareMessage('Thanks for sharing! 🎉');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://beamxsolutions.com/advanced-business-assessment');
      setShareMessage('Link copied to clipboard! 📋');
      setTimeout(() => setShareMessage(''), 3000);
    } catch (err) {
      setShareMessage('Unable to copy link. Please copy manually.');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields: (keyof BusinessAssessmentInput)[] = [
      "full_name",
      "company_name",
      "email",
      "revenue",
      "revenue_trend",
      "profit_margin_known",
      "profit_margin",
      "cash_flow",
      "financial_planning",
      "customer_acquisition",
      "customer_cost_awareness",
      "customer_retention",
      "repeat_business",
      "marketing_budget",
      "online_presence",
      "customer_feedback",
      "record_keeping",
      "inventory_management",
      "scheduling_systems",
      "quality_control",
      "supplier_relationships",
      "team_size",
      "hiring_process",
      "employee_training",
      "delegation",
      "performance_tracking",
      "payment_systems",
      "data_backup",
      "communication_tools",
      "website_functionality",
      "social_media_use",
      "market_knowledge",
      "competitive_advantage",
      "customer_segments",
      "pricing_strategy",
      "growth_planning",
      "business_type",
      "business_age",
      "primary_challenge",
      "main_goal",
      "location_importance"
    ];
    const errors: Partial<Record<keyof BusinessAssessmentInput, string>> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required.";
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!privacyAgreed) {
      setError("You must agree to the Privacy Policy to submit the assessment.");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fill out all required fields correctly.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setFormErrors({});

    try {
      const response = await fetch("https://beamx-scorecard-v2.onrender.com/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(90000),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data: BusinessAssessmentResult = await response.json();
      setResult(data);
    } catch (err) {
      const error = err as Error;
      if (error.name === "TimeoutError") {
        setError("Request timed out. The server may be starting up. Please try again.");
      } else {
        setError(error.message || "Request failed. Check your connection or server status.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    name: keyof BusinessAssessmentInput,
    label: string,
    type: string,
    placeholder: string,
    helperText?: string
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full border ${
            formErrors[name] ? 'border-red-300' : 'border-gray-300'
          } rounded-md p-3 text-sm focus:ring-primary focus:border-primary focus:outline-none transition-colors`}
          aria-invalid={!!formErrors[name]}
          aria-describedby={`${name}-error ${name}-helper`}
        />
      </div>
      {helperText && (
        <p id={`${name}-helper`} className="text-xs text-gray-500 mt-1">
          {helperText}
        </p>
      )}
      {formErrors[name] && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-1">
          {formErrors[name]}
        </p>
      )}
    </div>
  );

  const renderSelect = (
    name: keyof BusinessAssessmentInput,
    label: string,
    options: string[],
    placeholder: string,
    helperText?: string
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`block w-full border ${
            formErrors[name] ? 'border-red-300' : 'border-gray-300'
          } rounded-md p-3 text-sm focus:ring-primary focus:border-primary focus:outline-none transition-colors`}
          aria-invalid={!!formErrors[name]}
          aria-describedby={`${name}-error ${name}-helper`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {helperText && (
        <p id={`${name}-helper`} className="text-xs text-gray-500 mt-1">
          {helperText}
        </p>
      )}
      {formErrors[name] && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-1">
          {formErrors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Advanced Business Assessment</title>
        <meta
          name="description"
          content="Evaluate your business readiness with BeamX Solutions' Advanced Business Assessment, providing enhanced insights and tailored growth strategies powered by AI."
        />
      </Helmet>
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0"/>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Advanced Business Assessment</h1>
            <p className="text-gray-100 text-lg md:text-xl mb-8">
              Evaluate your business across six key pillars with enhanced insights and tailored growth strategies powered by AI.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-gray-50 relative z-10 pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              {error && (
                <div className="mb-6 p-4 bg-red-100 rounded-md">
                  <h2 className="text-lg font-semibold text-red-800">Error</h2>
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderInput(
                      "full_name",
                      "Full Name",
                      "text",
                      "Enter your full name",
                      "Your full name for follow-up contact."
                    )}
                    {renderInput(
                      "company_name",
                      "Company Name",
                      "text",
                      "Enter your company name",
                      "The name of your business or organization."
                    )}
                    {renderInput(
                      "email",
                      "Email Address",
                      "email",
                      "Enter your email address",
                      "Your email for assessment results and follow-up."
                    )}
                  </div>

                  {/* Email Notice */}
                  <p className="text-sm text-blue-700 mt-2">
                    <strong>Kindly note:</strong> Your advanced assessment results will be automatically sent to the email address provided above. Please ensure you enter the correct email address to receive your detailed PDF report and personalized recommendations.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Health</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "revenue",
                      "Annual Revenue",
                      ["Under $10K", "$10K–$50K", "$50K–$250K", "$250K–$1M", "$1M–$5M", "Over $5M"],
                      "Select annual revenue range",
                      "Your business's total annual revenue."
                    )}
                    {renderSelect(
                      "revenue_trend",
                      "Revenue Trend",
                      ["Declining", "Flat", "Growing slowly (<10%)", "Growing moderately (10-25%)", "Growing rapidly (>25%)"],
                      "Select revenue trend",
                      "How your revenue is trending over time."
                    )}
                    {renderSelect(
                      "profit_margin_known",
                      "Profit Margin Awareness",
                      ["Yes, I track it closely", "Roughly know it", "No idea"],
                      "Do you know your profit margin?",
                      "Indicate how well you track profit margins."
                    )}
                    {renderSelect(
                      "profit_margin",
                      "Profit Margin",
                      ["N/A", "Breaking even/Loss", "1-10%", "10-20%", "20-30%", "30%+"],
                      "Select profit margin",
                      "Your business's profit margin percentage."
                    )}
                    {renderSelect(
                      "cash_flow",
                      "Cash Flow",
                      ["Negative (spending savings)", "Break-even", "Positive but tight", "Healthy buffer", "Strong reserves"],
                      "Select cash flow status",
                      "Your business's cash flow situation."
                    )}
                    {renderSelect(
                      "financial_planning",
                      "Financial Planning",
                      ["No formal planning", "Basic budgeting", "Monthly financial reviews", "Detailed forecasting"],
                      "Select planning level",
                      "Your approach to financial planning."
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Growth & Marketing</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "customer_acquisition",
                      "Customer Acquisition",
                      ["Word of mouth only", "Some marketing efforts", "Consistent marketing", "Multi-channel strategy"],
                      "Select acquisition strategy",
                      "How you attract new customers."
                    )}
                    {renderSelect(
                      "customer_cost_awareness",
                      "Customer Acquisition Cost Awareness",
                      ["No idea", "Rough estimate", "Track precisely"],
                      "Do you track CAC?",
                      "How well you track customer acquisition costs."
                    )}
                    {renderSelect(
                      "customer_retention",
                      "Customer Retention",
                      ["Don't track", "High turnover", "Average retention", "Strong retention", "Excellent loyalty"],
                      "Select retention level",
                      "How well you retain customers."
                    )}
                    {renderSelect(
                      "repeat_business",
                      "Repeat Business",
                      ["Rarely", "Occasionally", "Frequently", "Majority of revenue"],
                      "Select repeat business frequency",
                      "How often customers return."
                    )}
                    {renderSelect(
                      "marketing_budget",
                      "Marketing Budget",
                      ["No budget", "Under 5% of revenue", "5-10% of revenue", "Over 10% of revenue"],
                      "Select budget allocation",
                      "Percentage of revenue spent on marketing."
                    )}
                    {renderSelect(
                      "online_presence",
                      "Online Presence",
                      ["No website/social", "Basic website", "Active online presence", "Strong digital brand"],
                      "Select online presence level",
                      "Strength of your digital footprint."
                    )}
                    {renderSelect(
                      "customer_feedback",
                      "Customer Feedback",
                      ["Don't collect", "Informal feedback", "Surveys/reviews", "Systematic feedback loops"],
                      "Select feedback process",
                      "How you collect customer feedback."
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Operations & Systems</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "record_keeping",
                      "Record Keeping",
                      ["Paper/scattered files", "Basic digital files", "Accounting software", "Integrated business software"],
                      "Select record-keeping method",
                      "How you manage financial and operational records."
                    )}
                    {renderSelect(
                      "inventory_management",
                      "Inventory Management",
                      ["N/A", "Manual tracking", "Basic systems", "Automated systems"],
                      "Select inventory management",
                      "How you manage inventory (if applicable)."
                    )}
                    {renderSelect(
                      "scheduling_systems",
                      "Scheduling Systems",
                      ["Paper calendar", "Basic digital calendar", "Scheduling software", "Integrated workflow"],
                      "Select scheduling system",
                      "Tools used for scheduling."
                    )}
                    {renderSelect(
                      "quality_control",
                      "Quality Control",
                      ["No formal process", "Basic checks", "Standard procedures", "Systematic quality management"],
                      "Select quality control process",
                      "How you ensure product/service quality."
                    )}
                    {renderSelect(
                      "supplier_relationships",
                      "Supplier Relationships",
                      ["N/A", "Transactional only", "Good relationships", "Strategic partnerships"],
                      "Select supplier relationship level",
                      "Your relationship with suppliers."
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Team & Management</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "team_size",
                      "Team Size",
                      ["Solo operation", "2-5 people", "6-15 people", "16-50 people", "50+ people"],
                      "Select team size",
                      "Number of employees or team members."
                    )}
                    {renderSelect(
                      "hiring_process",
                      "Hiring Process",
                      ["N/A", "Informal hiring", "Basic process", "Structured interviews", "Comprehensive system"],
                      "Select hiring process",
                      "Your approach to hiring."
                    )}
                    {renderSelect(
                      "employee_training",
                      "Employee Training",
                      ["N/A", "On-the-job learning", "Basic training", "Formal programs"],
                      "Select training level",
                      "How you train employees."
                    )}
                    {renderSelect(
                      "delegation",
                      "Delegation",
                      ["Do everything myself", "Delegate basic tasks", "Delegate important work", "Team runs independently"],
                      "Select delegation level",
                      "How you delegate tasks."
                    )}
                    {renderSelect(
                      "performance_tracking",
                      "Performance Tracking",
                      ["No tracking", "Informal feedback", "Regular check-ins", "Formal performance reviews"],
                      "Select tracking method",
                      "How you track employee performance."
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Digital Adoption</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "payment_systems",
                      "Payment Systems",
                      ["Cash/check only", "Basic card processing", "Multiple payment options", "Advanced payment tech"],
                      "Select payment systems",
                      "Payment methods your business accepts."
                    )}
                    {renderSelect(
                      "data_backup",
                      "Data Backup",
                      ["No system", "Manual backups", "Cloud storage", "Automated backup systems"],
                      "Select backup system",
                      "How you back up business data."
                    )}
                    {renderSelect(
                      "communication_tools",
                      "Communication Tools",
                      ["Phone/email only", "Basic messaging", "Team communication apps", "Integrated communication"],
                      "Select communication tools",
                      "Tools used for team communication."
                    )}
                    {renderSelect(
                      "website_functionality",
                      "Website Functionality",
                      ["No website", "Basic info site", "Interactive features", "E-commerce/booking enabled"],
                      "Select website functionality",
                      "Capabilities of your business website."
                    )}
                    {renderSelect(
                      "social_media_use",
                      "Social Media Use",
                      ["No presence", "Occasional posts", "Regular updates", "Strategic content marketing"],
                      "Select social media strategy",
                      "How you use social media."
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Strategic Position</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "market_knowledge",
                      "Market Knowledge",
                      ["Limited knowledge", "Basic awareness", "Good understanding", "Deep market insights"],
                      "Select market knowledge level",
                      "Your understanding of the market."
                    )}
                    {renderSelect(
                      "competitive_advantage",
                      "Competitive Advantage",
                      ["Not sure", "Price/cost", "Quality/service", "Unique offering", "Market position"],
                      "Select competitive advantage",
                      "What sets your business apart."
                    )}
                    {renderSelect(
                      "customer_segments",
                      "Customer Segments",
                      ["Serve everyone", "1-2 main types", "Well-defined segments", "Specialized niches"],
                      "Select customer segments",
                      "Your target customer groups."
                    )}
                    {renderSelect(
                      "pricing_strategy",
                      "Pricing Strategy",
                      ["Match competitors", "Cost-plus margin", "Value-based pricing", "Dynamic/strategic pricing"],
                      "Select pricing strategy",
                      "How you set prices."
                    )}
                    {renderSelect(
                      "growth_planning",
                      "Growth Planning",
                      ["No plans", "Vague goals", "Basic plan", "Detailed strategy"],
                      "Select growth planning level",
                      "Your approach to business growth."
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Context</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "business_type",
                      "Business Type",
                      [
                        "Retail/E-commerce", "Service Business", "Restaurant/Food", "Healthcare/Medical",
                        "Construction/Trades", "Professional Services", "Manufacturing", "Technology/Software",
                        "Consulting", "Other"
                      ],
                      "Select business type",
                      "The type of business you operate."
                    )}
                    {renderSelect(
                      "business_age",
                      "Business Age",
                      ["Less than 1 year", "1-3 years", "3-10 years", "10+ years"],
                      "Select business age",
                      "How long your business has been operating."
                    )}
                    {renderSelect(
                      "primary_challenge",
                      "Primary Challenge",
                      [
                        "Not enough customers", "Too busy to grow systematically", "Inconsistent revenue",
                        "Managing costs/expenses", "Finding good employees", "Competition/pricing pressure",
                        "Keeping up with technology", "Time management/work-life balance"
                      ],
                      "Select primary challenge",
                      "The main challenge your business faces."
                    )}
                    {renderSelect(
                      "main_goal",
                      "Main Goal",
                      [
                        "Increase revenue/sales", "Improve profitability", "Scale the business",
                        "Reduce time commitment", "Build systems/processes", "Expand to new markets",
                        "Improve quality/service", "Prepare for succession/sale"
                      ],
                      "Select main goal",
                      "Your primary business goal."
                    )}
                    {renderSelect(
                      "location_importance",
                      "Location Importance",
                      ["Fully location-dependent", "Mostly local", "Regional reach", "National/global"],
                      "Select location importance",
                      "How important location is to your business."
                    )}
                  </div>
                </div>

                {/* Email Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="emailConsent"
                    checked={privacyAgreed}
                    onChange={handlePrivacyChange}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="emailConsent" className="text-sm text-gray-700">
                    I consent to receive the results of this assessment via email.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !privacyAgreed}
                  className={`w-full py-3 text-sm font-medium ${loading || !privacyAgreed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Generate Advanced Assessment'}
                </Button>
              </form>

              {result && (
                <div className="mt-8 space-y-6">
                  {/* Email Confirmation Message */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 text-sm flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>
                        <strong>Results generated!</strong> A detailed PDF report has been sent to <strong>{formData.email}</strong>
                      </span>
                    </p>
                  </div>

                  <div className="p-6 rounded-md bg-green-50 border border-green-200">
                    <h2 className="text-lg font-semibold text-green-800">Advanced Assessment Results</h2>
                    <p className="text-gray-700">Total Score: {result.total_score}/{result.max_score}</p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700">
                      <li>Financial Health: {result.scores.financial}/25</li>
                      <li>Growth & Marketing: {result.scores.growth}/25</li>
                      <li>Operations & Systems: {result.scores.operations}/25</li>
                      <li>Team & Management: {result.scores.team}/25</li>
                      <li>Digital Adoption: {result.scores.digital}/25</li>
                      <li>Strategic Position: {result.scores.strategic}/25</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      <strong>Insights:</strong>
                    </p>
                    <div
                      className="mt-2 p-4 bg-white border border-gray-200 rounded-md"
                      dangerouslySetInnerHTML={{ __html: result.insight
                        .replace(/\n/g, '<br>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                        .replace(/(\d+\.\s)/g, '<br>$1')
                        .replace(/- ([^*]+)/g, '<li>$1</li>')
                        .replace(/^(<li>.*<\/li>)$/, '<ul>$1</ul>')
                      }}
                    />
                  </div>

                  <div className="p-6 rounded-md bg-purple-50 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                      <ShareIcon />
                      Share Your Achievement
                    </h3>
                    <p className="text-purple-700 text-sm mb-4">
                      Let others know you're taking your business growth seriously!
                    </p>
                    {shareMessage && (
                      <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">
                        {shareMessage}
                      </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button
                        onClick={() => handleShare('x')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-colors text-sm"
                      >
                        <XIcon />
                        X
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors text-sm"
                      >
                        <LinkedInIcon />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                      >
                        <FacebookIcon />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('instagram')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-md transition-all text-sm"
                      >
                        <InstagramIcon />
                        Instagram
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Let's discuss how we can tailor a solution for your needs."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default AdvancedBusinessAssessment;