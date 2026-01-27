import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Helmet } from 'react-helmet-async';
import CTASection from '../components/CTASection';
import ReactMarkdown from 'react-markdown';

// Icons for sharing buttons
const ShareIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
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

// TypeScript interface defining the structure of scorecard input data
interface ScorecardInput {
  fullName: string;
  email: string;
  revenue: string;
  profit_margin_known: string;
  monthly_expenses: string;
  cac_tracked: string;
  retention_rate: string;
  digital_campaigns: string;
  analytics_tools: string;
  crm_used: string;
  data_mgmt: string;
  sops_doc: string;
  team_size: string;
  pain_point: string;
  industry: string;
}

// TypeScript interface for the API response structure
interface ScorecardResult {
  total_score: number;
  label: string;
  breakdown: {
    financial: number;
    growth: number;
    digital: number;
    operations: number;
  };
  advisory: string;
}

// Predefined list of business industry options for the dropdown
const industries = [
  "Technology", "Healthcare", "Retail", "Finance", "Manufacturing",
  "Education", "E-commerce", "Hospitality", "Logistics", "Real Estate", "Non-Profit", "Other"
];

const BusinessAssessment: React.FC = () => {
  // State to store form input values
  const [formData, setFormData] = useState<ScorecardInput>({
    fullName: "",
    email: "",
    revenue: "",
    profit_margin_known: "",
    monthly_expenses: "",
    cac_tracked: "",
    retention_rate: "",
    digital_campaigns: "",
    analytics_tools: "",
    crm_used: "",
    data_mgmt: "",
    sops_doc: "",
    team_size: "",
    pain_point: "",
    industry: "",
  });
  
  // State to store the scorecard results from API
  const [result, setResult] = useState<ScorecardResult | null>(null);
  
  // State to handle and display error messages
  const [error, setError] = useState<string | null>(null);
  
  // State to manage loading state during API calls
  const [loading, setLoading] = useState(false);
  
  // State to track field-specific validation errors
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ScorecardInput, string>>>({});

  // State for sharing
  const [shareMessage, setShareMessage] = useState('');

  // State for email consent checkbox
  const [emailConsent, setEmailConsent] = useState(false);

  // Debug effect to track result state changes
  useEffect(() => {
    console.log('Result state changed:', result);
  }, [result]);

  // Handler function for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field-specific error when user starts typing/selecting
    if (formErrors[name as keyof ScorecardInput]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  // Social sharing handlers
  const handleShare = (platform: string) => {
    const baseMessage = "I just completed a business assessment with BeamX Solutions! 🚀";
    const url = "https://beamxsolutions.com/business-assessment";
    const hashtags = "BusinessGrowth,BeamXSolutions,Assessment";
    
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
        navigator.clipboard.writeText(`${baseMessage} ${url} #BusinessGrowth #BeamXSolutions #Assessment`);
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

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://beamxsolutions.com/business-assessment');
      setShareMessage('Link copied to clipboard! 📋');
      setTimeout(() => setShareMessage(''), 3000);
    } catch (err) {
      setShareMessage('Unable to copy link. Please copy manually.');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  // Form submission handler with validation and API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // List of all required fields for validation
    const requiredFields: (keyof ScorecardInput)[] = [
      "fullName", "email", "revenue", "profit_margin_known", "monthly_expenses", "cac_tracked", "retention_rate",
      "digital_campaigns", "analytics_tools", "crm_used", "data_mgmt", "sops_doc",
      "team_size", "pain_point", "industry"
    ];
    
    // Check for empty required fields and build error object
    const errors: Partial<Record<keyof ScorecardInput, string>> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required.";
      }
    });

    // Validate email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Display validation errors and stop submission if any exist
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fill out all required fields.");
      return;
    }

    // Set loading state and clear previous results/errors
    setLoading(true);
    setError(null);
    setResult(null); // Clear previous result immediately
    setFormErrors({});

    try {
      console.log('Making API call with data:', formData); // Debug log
      
      // Make API call to generate business scorecard
      const response = await fetch("https://beamx-scorecard.onrender.com/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(90000), // 90 second timeout
      });

      // Handle non-200 HTTP responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText); // Debug log
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      // Parse successful response
      const data: ScorecardResult = await response.json();
      console.log('Received API response:', data); // Debug log
      
      // Validate that we have all expected data
      if (!data || typeof data.total_score !== 'number' || !data.advisory) {
        console.error('Invalid API response structure:', data);
        throw new Error("Invalid response from server. Missing required data.");
      }
      
      // Update state with complete result
      setResult(data);
      console.log('Result state updated:', data); // Debug log
      
      // Scroll to results section after successful submission
      setTimeout(() => {
        const resultsSection = document.querySelector('.results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
    } catch (err) {
      const error = err as Error;
      console.error('Form submission error:', error); // Debug log
      
      // Handle timeout errors with user-friendly message
      if (error.name === "TimeoutError") {
        setError("Request timed out. The server may be starting up. Please try again.");
      } else {
        setError(error.message || "Request failed. Check your connection or server status.");
      }
      
      // Clear any partial results on error
      setResult(null);
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  // Reusable component for rendering select dropdowns with validation
  const renderSelect = (
    name: keyof ScorecardInput,
    label: string,
    options: string[],
    placeholder: string,
    helperText?: string
  ) => (
    <div>
      {/* Field label with required indicator */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      {/* Select dropdown with error styling */}
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
          {/* Render all options from the passed array */}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Helper text for field explanation */}
      {helperText && (
        <p id={`${name}-helper`} className="text-xs text-gray-500 mt-1">
          {helperText}
        </p>
      )}
      
      {/* Field-specific error message */}
      {formErrors[name] && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-1">
          {formErrors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* SEO metadata for the page */}
      <Helmet>
        <title>BeamX Solutions | Beacon - Business Assessment</title>
        <meta name="description" content="Evaluate your business readiness with BeamX Solutions' Business Assessment tool, Beacon, providing detailed insights and tailored growth strategies." />
      </Helmet>
      
      {/* Hero section with gradient background */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0"/>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Beacon - Business Assessment</h1>
            <p className="text-gray-100 text-lg md:text-xl mb-8">
              Evaluate your business readiness with detailed insights and tailored growth strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main form section */}
      <section className="section bg-gray-50 relative z-10 pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              {/* Error message display */}
              {error && (
                <div className="mb-6 p-4 bg-red-100 rounded-md">
                  <h2 className="text-lg font-semibold text-red-800">Error</h2>
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              {/* Main assessment form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name Input */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.fullName ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary focus:outline-none transition-colors`}
                        placeholder="Enter your full name"
                        aria-invalid={!!formErrors.fullName}
                        aria-describedby="fullName-error"
                      />
                      {formErrors.fullName && (
                        <p id="fullName-error" className="text-red-500 text-xs mt-1">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.email ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary focus:outline-none transition-colors`}
                        placeholder="Enter your email address"
                        aria-invalid={!!formErrors.email}
                        aria-describedby="email-error"
                      />
                      {formErrors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Notice */}
                  <p className="text-sm text-blue-700 mt-2">
                    <strong>Kindly note:</strong> Your assessment results will be automatically sent to the email address provided above. Please ensure you enter the correct email address to receive your detailed PDF report and personalized recommendations.
                  </p>
                </div>

                {/* Financial Details Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "revenue",
                      "Annual Revenue",
                      ["Under $10K", "$10K–$50K", "$50K–$250K", "$250K–$1M", "Over $1M"],
                      "Select annual revenue range",
                      "Your business's total annual revenue."
                    )}
                    {renderSelect(
                      "profit_margin_known",
                      "Profit Margin Known",
                      ["Yes", "No"],
                      "Do you know your profit margin?",
                      "Indicate if you track profit margins."
                    )}
                    {renderSelect(
                      "monthly_expenses",
                      "Monthly Expenses",
                      ["Unknown", "≤$500", "$500–$1K", "$1K–$5K", "$5K–$20K", "$20K+"],
                      "Select monthly expense range",
                      "Your business's total monthly operating expenses."
                    )}
                  </div>
                </div>

                {/* Growth Metrics Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Growth Metrics</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "cac_tracked",
                      "Customer Acquisition Cost (CAC) Tracked",
                      ["Yes", "No"],
                      "Do you track CAC?",
                      "Do you track the cost of acquiring each customer?"
                    )}
                    {renderSelect(
                      "retention_rate",
                      "Customer Retention Rate",
                      ["<10%", "10–25%", "25–50%", "50–75%", "75%+"],
                      "Select retention rate",
                      "Percentage of customers retained over time."
                    )}
                    {renderSelect(
                      "digital_campaigns",
                      "Digital Campaigns",
                      ["No", "Sometimes", "Consistently"],
                      "Select campaign frequency",
                      "How often you run digital marketing campaigns."
                    )}
                  </div>
                </div>

                {/* Digital Maturity Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Digital Maturity</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "analytics_tools",
                      "Analytics Tools",
                      ["No", "Basic tools (Excel, etc.)", "Advanced or custom dashboards"],
                      "Select analytics tools",
                      "Tools used for business analytics."
                    )}
                    {renderSelect(
                      "crm_used",
                      "Customer Relationship Management (CRM) Usage",
                      ["Yes", "No"],
                      "Do you use a CRM?",
                      "Customer Relationship Management system usage."
                    )}
                    {renderSelect(
                      "data_mgmt",
                      "Data Management",
                      ["Scattered or manual", "Somewhat structured", "Centralized and automated"],
                      "Select data management approach",
                      "How your business manages data."
                    )}
                  </div>
                </div>

                {/* Operational Details Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Operational Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderSelect(
                      "sops_doc",
                      "SOPs Documented",
                      ["No", "Somewhat", "Fully documented"],
                      "Select SOP documentation level",
                      "Standard Operating Procedures documentation status."
                    )}
                    {renderSelect(
                      "team_size",
                      "Team Size",
                      ["1 (solo)", "2–4", "5–10", "11–50", "50+"],
                      "Select team size",
                      "Number of employees or team members."
                    )}
                    {renderSelect(
                      "pain_point",
                      "Primary Pain Point",
                      [
                        "Not growing",
                        "Systems are chaotic",
                        "Don't know what to optimize",
                        "Need to reduce cost",
                        "Need funding",
                        "Need more clients/customers",
                        "Growing fast, need structure"
                      ],
                      "Select primary pain point",
                      "Main challenge your business faces."
                    )}
                    {renderSelect(
                      "industry",
                      "Industry",
                      industries,
                      "Select your industry",
                      "The sector your business operates in."
                    )}
                  </div>
                </div>

                {/* Email Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="emailConsent"
                    checked={emailConsent}
                    onChange={(e) => setEmailConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="emailConsent" className="text-sm text-gray-700">
                    I consent to receive the results of this assessment via email.
                  </label>
                </div>

                {/* Form submission button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !emailConsent}
                  className={`w-full py-3 text-sm font-medium ${loading || !emailConsent ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Generate Scorecard'}
                </Button>
              </form>

              {/* Results display section */}
              {result && (
                <div className="results-section mt-8 space-y-6">
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

                  {/* Main Results */}
                  <div className="p-6 rounded-md bg-green-50 border border-green-200">
                    <h2 className="text-lg font-semibold text-green-800 mb-4">
                      📊 Your Business Scorecard
                    </h2>
                    <p className="text-gray-700 mb-4 text-lg font-medium">
                      Total Score: <span className="text-green-600">{result.total_score}/100</span> ({result.label})
                    </p>
                    
                    {/* Score breakdown display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-4 rounded border">
                      <span className="block text-gray-700 font-semibold mb-1">Financial Health:</span>
                      <span className="text-lg text-blue-700">{result.breakdown.financial}/25</span>
                      </div>
                      <div className="bg-white p-4 rounded border">
                      <span className="block text-gray-700 font-semibold mb-1">Growth Readiness:</span>
                      <span className="text-lg text-green-700">{result.breakdown.growth}/25</span>
                      </div>
                      <div className="bg-white p-4 rounded border">
                      <span className="block text-gray-700 font-semibold mb-1">Digital Maturity:</span>
                      <span className="text-lg text-purple-700">{result.breakdown.digital}/25</span>
                      </div>
                      <div className="bg-white p-4 rounded border">
                      <span className="block text-gray-700 font-semibold mb-1">Operations Efficiency:</span>
                      <span className="text-lg text-orange-700">{result.breakdown.operations}/25</span>
                      </div>
                    </div>
                    
                    {/* AI-generated advisory section - Always show if we have advisory */}
                    {result.advisory && result.advisory.trim() && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          Advisory
                        </h3>
                        <div className="p-6 bg-white border border-gray-200 rounded-md prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              p: ({children}) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
                              ul: ({children}) => <ul className="list-disc pl-6 space-y-3 my-4">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal pl-6 space-y-3 my-4">{children}</ol>,
                              li: ({children}) => <li className="leading-relaxed text-gray-700 pl-2">{children}</li>,
                              strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                              h3: ({children}) => <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{children}</h3>,
                              h4: ({children}) => <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">{children}</h4>,
                            }}
                          >
                            {result.advisory
                              .replace(/•\s*/g, '\n- ')
                              .replace(/\*\s+\*\*/g, '\n- **')
                              .replace(/(\d+)\.\s+\*\*/g, '\n$1. **')
                            }
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                    
                    {/* Show loading state if advisory is missing */}
                    {(!result.advisory || !result.advisory.trim()) && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          🎯 Generating Your Personalized Advisory...
                        </h3>
                        <div className="p-6 bg-gray-100 border border-gray-200 rounded-md">
                          <div className="animate-pulse">
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social Sharing Section */}
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

      {/* Call-to-action section at bottom of page */}
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

export default BusinessAssessment;