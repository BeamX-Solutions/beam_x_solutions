import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Helmet } from 'react-helmet-async';
import CTASection from '../components/CTASection';
import ReactMarkdown from 'react-markdown';

// ─────────────────────────────────────────────
// ICON COMPONENTS
// ─────────────────────────────────────────────

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface CategoryResult {
  score: number;
  max: number;
  grade: string;
  percentage: number;
  insights: string[];
}

interface BeaconResult {
  total_score: number;
  readiness_level: string;
  breakdown: {
    financial_health: CategoryResult;
    customer_strength: CategoryResult;
    operational_maturity: CategoryResult;
    financial_intelligence: CategoryResult;
    growth_resilience: CategoryResult;
  };
  flags: {
    critical: string[];
    opportunities: string[];
  };
  advisory: string;
  context: {
    industry: string;
    yearsInBusiness: string;
    primaryPainPoint: string;
    businessName: string;
  };
  email_sent: boolean;
}

interface FormData {
  fullName: string;
  email: string;
  businessName: string;
  industry: string;
  yearsInBusiness: string;
  cashFlow: string;
  profitMargin: string;
  cashRunway: string;
  paymentSpeed: string;
  repeatCustomerRate: string;
  acquisitionChannel: string;
  pricingPower: string;
  founderDependency: string;
  processDocumentation: string;
  inventoryTracking: string;
  expenseAwareness: string;
  profitPerProduct: string;
  pricingStrategy: string;
  businessTrajectory: string;
  revenueDiversification: string;
  digitalPayments: string;
  formalRegistration: string;
  infrastructure: string;
  bankingRelationship: string;
  primaryPainPoint: string;
}

// ─────────────────────────────────────────────
// SCORE COLOUR HELPER
// ─────────────────────────────────────────────

function gradeColor(grade: string): string {
  if (["A", "B+"].includes(grade)) return "text-green-600";
  if (grade === "B") return "text-blue-600";
  if (grade === "C+") return "text-yellow-600";
  return "text-red-600";
}

function barColor(pct: number): string {
  if (pct >= 70) return "bg-blue-600";
  if (pct >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

// ─────────────────────────────────────────────
// REUSABLE SELECT COMPONENT
// ─────────────────────────────────────────────

interface SelectProps {
  name: keyof FormData;
  label: string;
  options: string[];
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  helperText?: string;
}

const FormSelect: React.FC<SelectProps> = ({ name, label, options, placeholder, value, onChange, error, helperText }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// ─────────────────────────────────────────────
// CATEGORY SCORE CARD
// ─────────────────────────────────────────────

const CategoryCard: React.FC<{ name: string; cat: CategoryResult; icon: string }> = ({ name, cat, icon }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-gray-800 text-sm">{name}</span>
      </div>
      <span className={`text-lg font-bold ${gradeColor(cat.grade)}`}>{cat.grade}</span>
    </div>
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div className={`${barColor(cat.percentage)} h-2 rounded-full transition-all`} style={{ width: `${cat.percentage}%` }} />
      </div>
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{cat.score}/{cat.max}</span>
    </div>
    {cat.insights.length > 0 && (
      <ul className="space-y-1">
        {cat.insights.map((ins, i) => (
          <li key={i} className="text-xs text-gray-600 flex gap-1">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>{ins}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const BusinessAssessment: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', businessName: '', industry: '', yearsInBusiness: '',
    cashFlow: '', profitMargin: '', cashRunway: '', paymentSpeed: '',
    repeatCustomerRate: '', acquisitionChannel: '', pricingPower: '',
    founderDependency: '', processDocumentation: '', inventoryTracking: '',
    expenseAwareness: '', profitPerProduct: '', pricingStrategy: '',
    businessTrajectory: '', revenueDiversification: '',
    digitalPayments: '', formalRegistration: '', infrastructure: '', bankingRelationship: '',
    primaryPainPoint: '',
  });

  const [result, setResult] = useState<BeaconResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [emailConsent, setEmailConsent] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalError, setModalError] = useState('');

  const handleDownloadPDF = async () => {
    if (!result) return;
    setPdfLoading(true);
    try {
      const response = await fetch('https://beamx-scorecard.onrender.com/download-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result, formData }),
        signal: AbortSignal.timeout(60000),
      });
      if (!response.ok) throw new Error('PDF generation failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Beacon_Assessment_${formData.businessName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('PDF download failed. Your report was also sent to your email automatically.');
    } finally {
      setPdfLoading(false);
    }
  };

  const handleEmailResults = async () => {
    if (!result) return;
    if (!modalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalEmail)) {
      setModalError('Please enter a valid email address.');
      return;
    }
    setEmailLoading(true);
    try {
      const response = await fetch('https://beamx-scorecard.onrender.com/email-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: modalEmail, result, formData }),
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) throw new Error('Email failed');
      setShowEmailModal(false);
      setModalEmail('');
      setModalError('');
      setResult(prev => prev ? { ...prev, email_sent: true } : prev);
    } catch (err) {
      setModalError('Failed to send. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleShare = () => {
    const msg = `I just completed the Beacon Business Assessment by BeamX Solutions! 🚀`;
    const url = 'https://beamxsolutions.com/tools/business-assessment';
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(url)}&hashtags=BeaconAssessment,BeamXSolutions`,
      '_blank', 'width=600,height=400'
    );
    setShareMessage('Thanks for sharing! 🎉');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required = Object.keys(formData) as (keyof FormData)[];
    const errors: Partial<Record<keyof FormData, string>> = {};
    required.forEach(field => { if (!formData[field]) errors[field] = 'This field is required.'; });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setFormErrors({});

    try {
      const response = await fetch('https://beamx-scorecard.onrender.com/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(90000),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error ${response.status}: ${errText}`);
      }

      const data: BeaconResult = await response.json();
      setResult(data);

      setTimeout(() => {
        document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      const e = err as Error;
      setError(e.name === 'TimeoutError'
        ? 'Request timed out. The server may be starting up. Please try again in a moment.'
        : e.message || 'Request failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const categoryMeta = [
    { key: 'financial_health', label: 'Financial Health', icon: '💰' },
    { key: 'customer_strength', label: 'Customer Strength', icon: '🤝' },
    { key: 'operational_maturity', label: 'Operational Maturity', icon: '⚙️' },
    { key: 'financial_intelligence', label: 'Financial Intelligence', icon: '📊' },
    { key: 'growth_resilience', label: 'Growth & Resilience', icon: '📈' },
  ] as const;

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Beacon - Business Assessment</title>
        <meta name="description" content="Evaluate your business readiness with BeamX Solutions' Beacon assessment tool. Get detailed scores, insights, and tailored growth strategies." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary bg-opacity-75 z-0" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Beacon – Business Assessment</h1>
            <p className="text-gray-100 text-lg md:text-xl mb-8">
              A comprehensive health check across 5 business dimensions. Get your score, uncover hidden risks, and receive a personalized growth advisory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section bg-gray-50 relative z-10 pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* ── Section: Contact Info ── */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Contact Information</h2>
                  <p className="text-sm text-gray-500 mb-4">Your results will be emailed to the address below.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}
                        className={`block w-full border ${formErrors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:outline-none focus:border-blue-500`}
                        placeholder="Your full name" />
                      {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        className={`block w-full border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:outline-none focus:border-blue-500`}
                        placeholder="your@email.com" />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                    {/* Business Name */}
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name <span className="text-red-500">*</span></label>
                      <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange}
                        className={`block w-full border ${formErrors.businessName ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:outline-none focus:border-blue-500`}
                        placeholder="Your business name" />
                      {formErrors.businessName && <p className="text-red-500 text-xs mt-1">{formErrors.businessName}</p>}
                    </div>
                    {/* Industry */}
                    <FormSelect name="industry" label="Industry" value={formData.industry} onChange={handleChange} error={formErrors.industry}
                      placeholder="Select your industry"
                      options={["Retail/Trade","Food & Beverage","Professional Services","Beauty & Personal Care","Logistics & Transportation","Manufacturing/Production","Hospitality","Construction/Trades","Healthcare Services","Education/Training","Agriculture","Other"]} />
                    {/* Years in Business */}
                    <FormSelect name="yearsInBusiness" label="Years in Business" value={formData.yearsInBusiness} onChange={handleChange} error={formErrors.yearsInBusiness}
                      placeholder="Select years in business"
                      options={["Less than 1 year","1-3 years","3-5 years","5-10 years","10+ years"]} />
                  </div>
                  <p className="text-sm text-blue-700 mt-3 bg-blue-50 p-3 rounded-md">
                    <strong>Note:</strong> Your detailed PDF report will be automatically sent to the email address above. Please double-check it before submitting.
                  </p>
                </div>

                {/* ── Section 1: Financial Health ── */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 1: Financial Health</h2>
                  <p className="text-sm text-gray-500 mb-4">How your business manages cash, profit, and payment cycles.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="cashFlow" label="Cash Flow Situation" value={formData.cashFlow} onChange={handleChange} error={formErrors.cashFlow}
                      placeholder="Select cash flow status"
                      options={["Consistent surplus","Breaking even","Unpredictable (some surplus, some deficit)","Burning cash consistently","Don't know"]} />
                    <FormSelect name="profitMargin" label="Profit Margin" value={formData.profitMargin} onChange={handleChange} error={formErrors.profitMargin}
                      placeholder="Select profit margin range"
                      options={["30%+","20-30%","10-20%","5-10%","Less than 5% or negative","Don't know"]} />
                    <FormSelect name="cashRunway" label="Cash Runway" value={formData.cashRunway} onChange={handleChange} error={formErrors.cashRunway}
                      placeholder="How long can you operate without revenue?"
                      helperText="If revenue stopped today, how long could you keep the lights on?"
                      options={["6+ months","3-6 months","1-3 months","Less than 1 month","Would close immediately"]} />
                    <FormSelect name="paymentSpeed" label="Payment Collection Speed" value={formData.paymentSpeed} onChange={handleChange} error={formErrors.paymentSpeed}
                      placeholder="How fast do customers pay you?"
                      options={["Same day (cash/instant)","1-7 days","8-30 days","31-60 days","60+ days"]} />
                  </div>
                </div>

                {/* ── Section 2: Customer Strength ── */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 2: Customer Strength</h2>
                  <p className="text-sm text-gray-500 mb-4">Loyalty, acquisition, and pricing power.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="repeatCustomerRate" label="Repeat Customer Rate" value={formData.repeatCustomerRate} onChange={handleChange} error={formErrors.repeatCustomerRate}
                      placeholder="What % of customers return?"
                      options={["70%+ repeat customers","50-70% repeat","30-50% repeat","10-30% repeat","Less than 10% repeat"]} />
                    <FormSelect name="acquisitionChannel" label="Primary Acquisition Channel" value={formData.acquisitionChannel} onChange={handleChange} error={formErrors.acquisitionChannel}
                      placeholder="How do most customers find you?"
                      options={["Referrals/word-of-mouth","Walk-ins/location visibility","Organic social media","Repeat business relationships","Paid advertising","Cold outreach","Don't know"]} />
                    <FormSelect name="pricingPower" label="Pricing Power" value={formData.pricingPower} onChange={handleChange} error={formErrors.pricingPower}
                      placeholder="If you raised prices 10%, what happens?"
                      helperText="Estimate what would happen if you increased prices by 10% today."
                      options={["Tested increases successfully","Most customers would stay","Some would leave but still profitable","Would lose most customers","Don't know"]} />
                  </div>
                </div>

                {/* ── Section 3: Operational Maturity ── */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 3: Operational Maturity</h2>
                  <p className="text-sm text-gray-500 mb-4">How well your business runs when you're not in the room.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="founderDependency" label="Founder Dependency" value={formData.founderDependency} onChange={handleChange} error={formErrors.founderDependency}
                      placeholder="How long can the business run without you?"
                      options={["Runs 2+ weeks without me","Can step away 1 week","2-3 days max","Can't miss even 1 day","Must be there daily"]} />
                    <FormSelect name="processDocumentation" label="Process Documentation" value={formData.processDocumentation} onChange={handleChange} error={formErrors.processDocumentation}
                      placeholder="How documented are your processes?"
                      options={["Comprehensive written processes","Some key processes documented","Trained others, mostly in my head","Everything in my head only","No consistent processes"]} />
                    <FormSelect name="inventoryTracking" label="Inventory Tracking" value={formData.inventoryTracking} onChange={handleChange} error={formErrors.inventoryTracking}
                      placeholder="How do you track inventory?"
                      options={["Digital real-time system","Regular manual/spreadsheet","Weekly physical count","Only when running low","Don't track","Not applicable (service business)"]} />
                  </div>
                </div>

                {/* ── Section 4: Financial Intelligence ── */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 4: Financial Intelligence</h2>
                  <p className="text-sm text-gray-500 mb-4">How well you understand the numbers behind your business.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="expenseAwareness" label="Expense Awareness" value={formData.expenseAwareness} onChange={handleChange} error={formErrors.expenseAwareness}
                      placeholder="How well do you know your monthly expenses?"
                      options={["Know exact amounts and percentages","Know roughly","General idea","Would have to look up","No idea"]} />
                    <FormSelect name="profitPerProduct" label="Profit Per Product/Service" value={formData.profitPerProduct} onChange={handleChange} error={formErrors.profitPerProduct}
                      placeholder="Do you know which offerings make the most profit?"
                      options={["Know margins on each offering","Good sense of what's profitable","Know revenue only, not profit","Haven't analyzed","All seem about the same"]} />
                    <FormSelect name="pricingStrategy" label="Pricing Strategy" value={formData.pricingStrategy} onChange={handleChange} error={formErrors.pricingStrategy}
                      placeholder="How do you set your prices?"
                      options={["Cost + margin + market research","Match competitors","Cost + markup (no market analysis)","What feels right","No strategy"]} />
                  </div>
                </div>

                {/* ── Section 5: Growth & Resilience ── */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 5: Growth & Resilience</h2>
                  <p className="text-sm text-gray-500 mb-4">Your trajectory, diversification, and contextual business environment.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="businessTrajectory" label="Business Trajectory" value={formData.businessTrajectory} onChange={handleChange} error={formErrors.businessTrajectory}
                      placeholder="How is your revenue trending year-on-year?"
                      options={["Growing 20%+","Growing 5-20%","Stable (±5%)","Declining 5-20%","Declining 20%+","Less than 1 year old"]} />
                    <FormSelect name="revenueDiversification" label="Revenue Diversification" value={formData.revenueDiversification} onChange={handleChange} error={formErrors.revenueDiversification}
                      placeholder="How many income streams do you have?"
                      options={["4+ streams/customer types","2-3 streams","Primary + side income","Single product/customer type","Dependent on 1-2 major customers"]} />
                    <FormSelect name="digitalPayments" label="Digital Payment Adoption" value={formData.digitalPayments} onChange={handleChange} error={formErrors.digitalPayments}
                      placeholder="What % of payments are digital/electronic?"
                      options={["80%+ digital","50-80% digital","20-50% digital","Less than 20% digital"]} />
                    <FormSelect name="formalRegistration" label="Business Registration Status" value={formData.formalRegistration} onChange={handleChange} error={formErrors.formalRegistration}
                      placeholder="Is your business formally registered?"
                      options={["Fully registered and tax compliant","Registered, behind on taxes","In process of registering","Not registered"]} />
                    <FormSelect name="infrastructure" label="Infrastructure Reliability" value={formData.infrastructure} onChange={handleChange} error={formErrors.infrastructure}
                      placeholder="How reliable is your power, internet, and supply chain?"
                      options={["Consistent power/internet/supply","Mostly reliable with backups","Frequent disruptions","Major challenges daily"]} />
                    <FormSelect name="bankingRelationship" label="Banking Relationship" value={formData.bankingRelationship} onChange={handleChange} error={formErrors.bankingRelationship}
                      placeholder="What is your relationship with banks or financial institutions?"
                      options={["Strong, accessed loans/credit","Accounts but no credit","Minimal interaction","No bank relationship"]} />
                  </div>
                </div>

                {/* ── Section: Primary Pain Point ── */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Primary Challenge</h2>
                  <p className="text-sm text-gray-500 mb-4">This helps us tailor your advisory to what matters most right now.</p>
                  <FormSelect name="primaryPainPoint" label="What is your biggest challenge right now?" value={formData.primaryPainPoint} onChange={handleChange} error={formErrors.primaryPainPoint}
                    placeholder="Select your primary pain point"
                    options={["Getting more customers/sales","Managing cash flow/getting paid","Hiring or managing staff","Keeping costs under control","Too busy/overwhelmed","Inconsistent quality/delivery","Don't know where to focus","Competition/market changes","Actually doing well, want to optimize"]} />
                </div>

                {/* Email Consent */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-md border">
                  <input type="checkbox" id="emailConsent" checked={emailConsent} onChange={e => setEmailConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <label htmlFor="emailConsent" className="text-sm text-gray-700">
                    I consent to receive my assessment results and PDF report via email at the address provided above.
                  </label>
                </div>

                <Button type="submit" variant="primary" disabled={loading || !emailConsent}
                  className={`w-full py-3 text-sm font-semibold ${loading || !emailConsent ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {loading ? 'Generating your assessment...' : 'Generate My Beacon Report'}
                </Button>
              </form>

              {/* ── EMAIL MODAL ── */}
              {showEmailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Email PDF Report</h3>
                    <p className="text-sm text-gray-500 mb-4">Enter the email address you'd like the report sent to.</p>
                    <input
                      type="email"
                      value={modalEmail}
                      onChange={e => { setModalEmail(e.target.value); setModalError(''); }}
                      placeholder="recipient@email.com"
                      className="block w-full border border-gray-300 rounded-md p-3 text-sm mb-2 focus:outline-none focus:border-[#0066cc]"
                    />
                    {modalError && <p className="text-red-500 text-xs mb-3">{modalError}</p>}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => { setShowEmailModal(false); setModalEmail(''); setModalError(''); }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEmailResults}
                        disabled={emailLoading}
                        className="flex-1 px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors disabled:opacity-50"
                        style={{ backgroundColor: '#0066cc' }}
                      >
                        {emailLoading ? 'Sending...' : 'Send Report'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── RESULTS ── */}
              {result && (
                <div className="results-section mt-10 space-y-8">

                  {/* Report generated banner */}
                  <div className="p-4 rounded-md flex items-start gap-3" style={{ backgroundColor: '#e8f0fb', borderLeft: '4px solid #0066cc' }}>
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="#0066cc" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm" style={{ color: '#0066cc' }}>
                      <strong>Assessment complete!</strong> Your results are ready below. Use the buttons at the bottom to download or share your report.
                    </p>
                  </div>

                  {/* Overall Score */}
                  <div className="p-6 rounded-lg border-2" style={{ borderColor: '#0066cc', backgroundColor: '#f0f5ff' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: '#0066cc', opacity: 0.8 }}>Beacon Score</p>
                        <p className="text-5xl font-bold" style={{ color: '#0066cc' }}>
                          {result.total_score}<span className="text-2xl font-normal">/100</span>
                        </p>
                        <p className="text-xl font-semibold mt-1" style={{ color: '#FF8C00' }}>{result.readiness_level}</p>
                      </div>
                      <div className="text-sm space-y-1 text-gray-600">
                        <p><strong>Business:</strong> {result.context.businessName}</p>
                        <p><strong>Industry:</strong> {result.context.industry}</p>
                        <p><strong>Years:</strong> {result.context.yearsInBusiness}</p>
                        <p><strong>Focus:</strong> {result.context.primaryPainPoint}</p>
                      </div>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Score Breakdown</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categoryMeta.map(({ key, label, icon }) => (
                        <CategoryCard key={key} name={label} cat={result.breakdown[key]} icon={icon} />
                      ))}
                    </div>
                  </div>

                  {/* Flags */}
                  {(result.flags.critical.length > 0 || result.flags.opportunities.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.flags.critical.length > 0 && (
                        <div className="rounded-lg p-4" style={{ backgroundColor: '#fff5f5', border: '1px solid #ffcccc' }}>
                          <h4 className="font-bold mb-3" style={{ color: '#cc0000' }}>🚨 Critical Flags</h4>
                          <ul className="space-y-2">
                            {result.flags.critical.map(f => (
                              <li key={f} className="text-sm px-3 py-1.5 rounded" style={{ color: '#cc0000', backgroundColor: '#ffe8e8' }}>
                                {f.replace(/_/g, ' ')}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {result.flags.opportunities.length > 0 && (
                        <div className="rounded-lg p-4" style={{ backgroundColor: '#fff8ee', border: '1px solid #ffd699' }}>
                          <h4 className="font-bold mb-3" style={{ color: '#FF8C00' }}>✅ Opportunity Flags</h4>
                          <ul className="space-y-2">
                            {result.flags.opportunities.map(f => (
                              <li key={f} className="text-sm px-3 py-1.5 rounded" style={{ color: '#cc6600', backgroundColor: '#ffeedd' }}>
                                {f.replace(/_/g, ' ')}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Strategic Advisory */}
                  {result.advisory && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Strategic Advisory</h3>
                      <div className="bg-white rounded-lg p-6 prose prose-sm max-w-none" style={{ border: '1px solid #ccdcf5' }}>
                        <ReactMarkdown
                          components={{
                            h2: ({ children }) => <h2 style={{ color: '#0066cc', fontSize: '17px', fontWeight: 700, marginTop: '24px', marginBottom: '10px' }}>{children}</h2>,
                            h3: ({ children }) => <h3 style={{ color: '#FF8C00', fontSize: '15px', fontWeight: 600, marginTop: '16px', marginBottom: '8px' }}>{children}</h3>,
                            p: ({ children }) => <p style={{ color: '#333', lineHeight: '1.7', marginBottom: '12px' }}>{children}</p>,
                            ul: ({ children }) => <ul style={{ paddingLeft: '20px', marginBottom: '16px', listStyleType: 'disc' }}>{children}</ul>,
                            li: ({ children }) => <li style={{ color: '#444', lineHeight: '1.7', marginBottom: '6px' }}>{children}</li>,
                            strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#111' }}>{children}</strong>,
                            hr: () => <hr style={{ borderColor: '#ccdcf5', margin: '24px 0' }} />,
                          }}
                        >
                          {result.advisory}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}

                  {/* Take Action */}
                  <div className="text-center py-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Take Action</h3>
                    <div className="flex flex-wrap justify-center gap-4">

                      {/* Download PDF */}
                      <button
                        onClick={handleDownloadPDF}
                        disabled={pdfLoading}
                        className="flex items-center gap-2 px-6 py-3 text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
                        style={{ backgroundColor: '#0066cc' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0052a3')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0066cc')}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {pdfLoading ? 'Generating...' : 'Download PDF Report'}
                      </button>

                      {/* Email Results — opens modal */}
                      <button
                        onClick={() => { setModalEmail(formData.email); setShowEmailModal(true); }}
                        className="flex items-center gap-2 px-6 py-3 text-white rounded-md text-sm font-semibold transition-colors"
                        style={{ backgroundColor: '#FF8C00' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cc7000')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF8C00')}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                          <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                        </svg>
                        Email Me Results
                      </button>

                      {/* Share on X */}
                      <button
                        onClick={() => handleShare()}
                        className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-md text-sm font-semibold transition-colors"
                      >
                        <XIcon />
                        Share on X
                      </button>
                    </div>
                    {shareMessage && (
                      <p className="mt-4 text-sm font-medium" style={{ color: '#0066cc' }}>{shareMessage}</p>
                    )}
                  </div>

                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Let's build a custom growth plan for your specific situation."
        primaryButtonText="Book a Free Strategy Call"
        primaryButtonHref="https://calendly.com/beamxsolutions"
        secondaryButtonText="Explore Our Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default BusinessAssessment;