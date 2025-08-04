import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

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

const BusinessAssessmentV2: React.FC = () => {
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
  const [pdfLoading, setPdfLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BusinessAssessmentInput, string>>>({});
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

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

  const downloadPDF = async () => {
    setPdfLoading(true);
    setError(null);

    try {
      const response = await fetch("https://beamx-scorecard-v2.onrender.com/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(90000),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const companyName = formData.company_name ? formData.company_name.replace(/\s+/g, '_') : 'business';
      a.download = `${companyName}_assessment_report.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const error = err as Error;
      if (error.name === "TimeoutError") {
        setError("PDF generation timed out. Please try again.");
      } else {
        setError(error.message || "Failed to generate PDF. Check your connection or server status.");
      }
    } finally {
      setPdfLoading(false);
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
        <title>BeamX Solutions | Business Assessment V2</title>
        <meta
          name="description"
          content="Evaluate your business readiness with BeamX Solutions' Universal Business Assessment Version 2, providing enhanced insights and tailored growth strategies powered by AI."
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
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Universal Business Assessment V2</h1>
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

                <div className="mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={handlePrivacyChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
                        Privacy Policy
                      </a>{' '}
                      and consent to being contacted regarding my assessment results.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !privacyAgreed}
                  className={`w-full py-3 text-sm font-medium ${loading || !privacyAgreed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Generate Assessment V2'}
                </Button>
              </form>

              {result && (
                <div className="mt-8 p-6 rounded-md bg-green-50">
                  <h2 className="text-lg font-semibold text-green-800">Assessment Results V2</h2>
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
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={downloadPDF}
                    disabled={pdfLoading}
                    className={`mt-4 w-full py-3 text-sm font-medium ${pdfLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {pdfLoading ? 'Generating PDF...' : 'Download PDF Report'}
                  </Button>
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

export default BusinessAssessmentV2;