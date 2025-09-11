import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Helmet } from 'react-helmet-async';
import CTASection from '../components/CTASection';
import ReactMarkdown from 'react-markdown';

// TypeScript interface defining the structure of scorecard input data
interface ScorecardInput {
  revenue: string;
  profit_margin_known: string;
  monthly_expenses: string; // Changed from monthly_burn for better user understanding
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
  "Education", "E-commerce", "Hospitality", "Real Estate", "Non-Profit", "Other"
];

const BusinessAssessment: React.FC = () => {
  // State to store form input values
  const [formData, setFormData] = useState<ScorecardInput>({
    revenue: "",
    profit_margin_known: "",
    monthly_expenses: "", // Updated field name
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

  // Handler function for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field-specific error when user starts typing/selecting
    if (formErrors[name as keyof ScorecardInput]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  // Form submission handler with validation and API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // List of all required fields for validation
    const requiredFields: (keyof ScorecardInput)[] = [
      "revenue", "profit_margin_known", "monthly_expenses", "cac_tracked", "retention_rate",
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

    // Display validation errors and stop submission if any exist
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fill out all required fields.");
      return;
    }

    // Set loading state and clear previous results/errors
    setLoading(true);
    setError(null);
    setResult(null);
    setFormErrors({});

    try {
      // Make API call to generate business scorecard
      const response = await fetch("https://beamx-scorecard.onrender.com/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(90000), // 90 second timeout
      });

      // Handle non-200 HTTP responses
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      // Parse successful response and update state
      const data: ScorecardResult = await response.json();
      setResult(data);
    } catch (err) {
      const error = err as Error;
      
      // Handle timeout errors with user-friendly message
      if (error.name === "TimeoutError") {
        setError("Request timed out. The server may be starting up. Please try again.");
      } else {
        setError(error.message || "Request failed. Check your connection or server status.");
      }
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
        <title>BeamX Solutions | Business Assessment</title>
        <meta name="description" content="Evaluate your business readiness with BeamX Solutions' Business Assessment tool, providing detailed insights and tailored growth strategies." />
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
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Business Assessment</h1>
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
                      ["Unknown", "≤$1K", "$1K–$5K", "$5K–$20K", "$20K+"],
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
                      "CAC Tracked",
                      ["Yes", "No"],
                      "Do you track CAC?",
                      "Customer Acquisition Cost tracking status."
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
                      "CRM Usage",
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
                      ["0 (solo)", "1–3", "4–10", "11–50", "50+"],
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

                {/* Form submission button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className={`w-full py-3 text-sm font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Generate Scorecard'}
                </Button>
              </form>

              {/* Results display section */}
              {result && (
                <div className="mt-8 p-6 rounded-md bg-green-50">
                  <h2 className="text-lg font-semibold text-green-800">Scorecard Results</h2>
                  <p className="text-gray-700">Total Score: {result.total_score}/100 ({result.label})</p>
                  
                  {/* Score breakdown display */}
                  <ul className="list-disc pl-5 mt-2 text-gray-700">
                    <li>Financial Health: {result.breakdown.financial}/25</li>
                    <li>Growth Readiness: {result.breakdown.growth}/25</li>
                    <li>Digital Maturity: {result.breakdown.digital}/25</li>
                    <li>Operational Efficiency: {result.breakdown.operations}/25</li>
                  </ul>
                  
                  {/* AI-generated advisory section */}
                  <p className="mt-4 text-gray-700">
                    <strong>Advisory:</strong>
                  </p>
                  <div className="mt-2 p-4 bg-white border border-gray-200 rounded-md">
                    <ReactMarkdown>{result.advisory}</ReactMarkdown>
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