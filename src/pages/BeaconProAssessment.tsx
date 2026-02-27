import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { Helmet } from 'react-helmet-async';
import CTASection from '../components/CTASection';
import ReactMarkdown from 'react-markdown';

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
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
}

interface BeaconProResult {
  total_score: number;
  readiness_level: string;
  breakdown: {
    financial_health: CategoryResult;
    customer_strength: CategoryResult;
    operational_maturity: CategoryResult;
    financial_intelligence: CategoryResult;
    growth_resilience: CategoryResult;
  };
  flags: { critical: string[]; opportunities: string[] };
  advisory: string;
  context: {
    industry: string;
    yearsInBusiness: string;
    primaryPainPoint: string;
    businessName: string;
  };
}

interface FormData {
  fullName: string; email: string; businessName: string; industry: string; yearsInBusiness: string;
  cashFlow: string; profitMargin: string; cashRunway: string; paymentSpeed: string;
  repeatCustomerRate: string; acquisitionChannel: string; pricingPower: string;
  founderDependency: string; processDocumentation: string; inventoryTracking: string;
  expenseAwareness: string; profitPerProduct: string; pricingStrategy: string;
  businessTrajectory: string; revenueDiversification: string;
  digitalPayments: string; formalRegistration: string; infrastructure: string; bankingRelationship: string;
  primaryPainPoint: string;
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const gradeColor = (g: string) =>
  ["A","B+"].includes(g) ? "text-green-600" : g === "B" ? "text-blue-600" : g === "C+" ? "text-yellow-600" : "text-red-600";

const barColor = (pct: number) =>
  pct >= 70 ? "bg-amber-600" : pct >= 50 ? "bg-amber-400" : "bg-red-500";

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const FormSelect: React.FC<{
  name: keyof FormData; label: string; options: string[]; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string; helperText?: string;
}> = ({ name, label, options, placeholder, value, onChange, error, helperText }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <select id={name} name={name} value={value} onChange={onChange}
      className={`block w-full border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-amber-500 focus:border-amber-500 focus:outline-none`}>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const CategoryCard: React.FC<{ name: string; cat: CategoryResult; icon: string }> = ({ name, cat, icon }) => (
  <div className="bg-white rounded-lg border border-amber-200 p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-gray-800 text-sm">{name}</span>
      </div>
      <span className={`text-lg font-bold ${gradeColor(cat.grade)}`}>{cat.grade}</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div className={`${barColor(cat.percentage)} h-2 rounded-full transition-all`} style={{ width: `${cat.percentage}%` }} />
      </div>
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{cat.score}/{cat.max}</span>
    </div>
  </div>
);

const TypingCursor = () => (
  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
    className="inline-block w-0.5 h-4 bg-amber-600 ml-0.5 align-middle" />
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const BeaconProAssessment: React.FC = () => {
  // Wake up backend on mount
  useEffect(() => { fetch('/api/wake-scorecard-backend').catch(() => {}); }, []);

  const emptyForm: FormData = {
    fullName: '', email: '', businessName: '', industry: '', yearsInBusiness: '',
    cashFlow: '', profitMargin: '', cashRunway: '', paymentSpeed: '',
    repeatCustomerRate: '', acquisitionChannel: '', pricingPower: '',
    founderDependency: '', processDocumentation: '', inventoryTracking: '',
    expenseAwareness: '', profitPerProduct: '', pricingStrategy: '',
    businessTrajectory: '', revenueDiversification: '',
    digitalPayments: '', formalRegistration: '', infrastructure: '', bankingRelationship: '',
    primaryPainPoint: '',
  };

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [emailConsent, setEmailConsent] = useState(false);

  // Streaming state
  const [scoreData, setScoreData] = useState<Omit<BeaconProResult, 'advisory'> | null>(null);
  const [streamedAdvisory, setStreamedAdvisory] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingDone, setStreamingDone] = useState(false);
  const [fullResult, setFullResult] = useState<BeaconProResult | null>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const advisoryRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll advisory div while streaming
  useEffect(() => {
    if (isStreaming && advisoryRef.current) {
      advisoryRef.current.scrollTop = advisoryRef.current.scrollHeight;
    }
  }, [streamedAdvisory, isStreaming]);

  // Assemble fullResult once streaming completes
  useEffect(() => {
    if (scoreData && streamingDone && streamedAdvisory && !fullResult) {
      setFullResult({ ...scoreData, advisory: streamedAdvisory });
    }
  }, [scoreData, streamingDone, streamedAdvisory, fullResult]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (formErrors[name as keyof FormData]) setFormErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleDownloadPDF = async () => {
    if (!fullResult) return;
    setPdfLoading(true);
    try {
      const res = await fetch('https://beamx-scorecard-v2.onrender.com/download-pdf', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: fullResult, formData }),
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) throw new Error('PDF generation failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `Beacon_Pro_${formData.businessName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      window.URL.revokeObjectURL(url);
    } catch { alert('PDF download failed. Your report was sent to your email.'); }
    finally { setPdfLoading(false); }
  };

  const handleEmailResults = async () => {
    if (!fullResult) return;
    if (!modalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalEmail)) {
      setModalError('Please enter a valid email address.'); return;
    }
    setEmailLoading(true); setModalError('');
    try {
      const res = await fetch('https://beamx-scorecard-v2.onrender.com/email-results', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: modalEmail, result: fullResult, formData }),
        signal: AbortSignal.timeout(90000),
      });
      let data: any = {};
      try { data = await res.json(); } catch (_) {}
      if (!res.ok) throw new Error(data?.detail || 'Email failed');
      setModalSuccess(true);
      setTimeout(() => {
        setShowEmailModal(false); setModalSuccess(false);
        setModalEmail(''); setModalError('');
        setEmailSuccess(true);
        setTimeout(() => setEmailSuccess(false), 6000);
      }, 2000);
    } catch (err) {
      const e = err as Error;
      if (e.name === 'TimeoutError') {
        setModalSuccess(true);
        setTimeout(() => {
          setShowEmailModal(false); setModalSuccess(false);
          setEmailSuccess(true); setTimeout(() => setEmailSuccess(false), 6000);
        }, 2000);
      } else { setModalError('Failed to send. Please try again.'); }
    } finally { setEmailLoading(false); }
  };

  const handleShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent('I just completed the Beacon Pro AI Assessment by BeamX Solutions! 🚀✨')}&url=${encodeURIComponent('https://beamxsolutions.com/products/beacon-pro')}&hashtags=BeaconPro,BeamXSolutions`,
      '_blank', 'width=600,height=400'
    );
    setShareMessage('Thanks for sharing! 🎉');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof FormData, string>> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach(f => { if (!formData[f]) errors[f] = 'Required.'; });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email.';
    if (Object.keys(errors).length) { setFormErrors(errors); setError('Please fill out all required fields.'); return; }

    setLoading(true); setError(null);
    setScoreData(null); setStreamedAdvisory(''); setStreamingDone(false); setFullResult(null);
    setFormErrors({});

    try {
      const response = await fetch('https://beamx-scorecard-v2.onrender.com/generate-report-stream', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${await response.text()}`);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const event = JSON.parse(raw);
            if (event.type === 'score') {
              setScoreData(event.data);
              setIsStreaming(true);
              setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }
            if (event.type === 'token') setStreamedAdvisory(p => p + event.data);
            if (event.type === 'done') { setStreamingDone(true); setIsStreaming(false); }
            if (event.type === 'error') throw new Error(event.data);
          } catch (_) {}
        }
      }
    } catch (err) {
      const e = err as Error;
      setLoading(false); setIsStreaming(false);
      setError(e.message === 'Failed to fetch'
        ? 'The server is starting up. Please wait a moment and try again.' : e.message);
    }
  };

  const categoryMeta = [
    { key: 'financial_health' as const, label: 'Financial Health', icon: '💰' },
    { key: 'customer_strength' as const, label: 'Customer Strength', icon: '🤝' },
    { key: 'operational_maturity' as const, label: 'Operational Maturity', icon: '⚙️' },
    { key: 'financial_intelligence' as const, label: 'Financial Intelligence', icon: '📊' },
    { key: 'growth_resilience' as const, label: 'Growth & Resilience', icon: '📈' },
  ];

  return (
    <>
      <Helmet>
        <title>BeamX Solutions | Beacon Pro – AI Business Assessment</title>
        <meta name="description" content="Beacon Pro: AI-powered deep diagnostic. A personalised advisory written by AI — specific to your business, industry, and challenges." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Beacon <span className="text-secondary">Pro</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              The same 5-dimension health check — but your advisory is written live by AI, personalised to your exact business, industry, and challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section bg-gray-50 relative z-10 pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg" style={{ border: '1px solid #e8d5a3' }}>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Contact */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Contact Information</h2>
                  <p className="text-sm text-gray-500 mb-4">Your AI-generated report will be emailed to the address below.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {(['fullName','email','businessName'] as const).map(field => (
                      <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                          {field === 'fullName' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Business Name'} <span className="text-red-500">*</span>
                        </label>
                        <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={formData[field]} onChange={handleChange}
                          placeholder={field === 'fullName' ? 'Your full name' : field === 'email' ? 'your@email.com' : 'Your business name'}
                          className={`block w-full border ${formErrors[field] ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:outline-none focus:border-amber-500`} />
                        {formErrors[field] && <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>}
                      </div>
                    ))}
                    <FormSelect name="industry" label="Industry" value={formData.industry} onChange={handleChange} error={formErrors.industry}
                      placeholder="Select your industry"
                      options={["Retail/Trade","Food & Beverage","Professional Services","Beauty & Personal Care","Logistics & Transportation","Manufacturing/Production","Hospitality","Construction/Trades","Healthcare Services","Education/Training","Agriculture","Other"]} />
                    <FormSelect name="yearsInBusiness" label="Years in Business" value={formData.yearsInBusiness} onChange={handleChange} error={formErrors.yearsInBusiness}
                      placeholder="Select years in business" options={["Less than 1 year","1-3 years","3-5 years","5-10 years","10+ years"]} />
                  </div>
                  <p className="text-sm mt-3 p-3 rounded-md" style={{ backgroundColor: '#fffbee', color: '#92680a', border: '1px solid #e8d5a3' }}>
                    <strong>Note:</strong> Your AI-generated PDF report will be automatically sent to the email above.
                  </p>
                </div>

                {/* S1 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 1: Financial Health</h2>
                  <p className="text-sm text-gray-500 mb-4">Cash, profit, and payment cycles.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="cashFlow" label="Cash Flow Situation" value={formData.cashFlow} onChange={handleChange} error={formErrors.cashFlow}
                      placeholder="Select cash flow status" options={["Consistent surplus","Breaking even","Unpredictable (some surplus, some deficit)","Burning cash consistently","Don't know"]} />
                    <FormSelect name="profitMargin" label="Profit Margin" value={formData.profitMargin} onChange={handleChange} error={formErrors.profitMargin}
                      placeholder="Select profit margin range" options={["30%+","20-30%","10-20%","5-10%","Less than 5% or negative","Don't know"]} />
                    <FormSelect name="cashRunway" label="Cash Runway" value={formData.cashRunway} onChange={handleChange} error={formErrors.cashRunway}
                      placeholder="How long can you operate without revenue?" helperText="If revenue stopped today, how long could you keep going?"
                      options={["6+ months","3-6 months","1-3 months","Less than 1 month","Would close immediately"]} />
                    <FormSelect name="paymentSpeed" label="Payment Collection Speed" value={formData.paymentSpeed} onChange={handleChange} error={formErrors.paymentSpeed}
                      placeholder="How fast do customers pay?" options={["Same day (cash/instant)","1-7 days","8-30 days","31-60 days","60+ days"]} />
                  </div>
                </div>

                {/* S2 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 2: Customer Strength</h2>
                  <p className="text-sm text-gray-500 mb-4">Loyalty, acquisition, and pricing power.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="repeatCustomerRate" label="Repeat Customer Rate" value={formData.repeatCustomerRate} onChange={handleChange} error={formErrors.repeatCustomerRate}
                      placeholder="What % of customers return?" options={["70%+ repeat customers","50-70% repeat","30-50% repeat","10-30% repeat","Less than 10% repeat"]} />
                    <FormSelect name="acquisitionChannel" label="Primary Acquisition Channel" value={formData.acquisitionChannel} onChange={handleChange} error={formErrors.acquisitionChannel}
                      placeholder="How do most customers find you?" options={["Referrals/word-of-mouth","Walk-ins/location visibility","Organic social media","Repeat business relationships","Paid advertising","Cold outreach","Don't know"]} />
                    <FormSelect name="pricingPower" label="Pricing Power" value={formData.pricingPower} onChange={handleChange} error={formErrors.pricingPower}
                      placeholder="If you raised prices 10%, what happens?" helperText="Estimate the impact of a 10% price increase today."
                      options={["Tested increases successfully","Most customers would stay","Some would leave but still profitable","Would lose most customers","Don't know"]} />
                  </div>
                </div>

                {/* S3 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 3: Operational Maturity</h2>
                  <p className="text-sm text-gray-500 mb-4">How well the business runs without you.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="founderDependency" label="Founder Dependency" value={formData.founderDependency} onChange={handleChange} error={formErrors.founderDependency}
                      placeholder="How long can the business run without you?" options={["Runs 2+ weeks without me","Can step away 1 week","2-3 days max","Can't miss even 1 day","Must be there daily"]} />
                    <FormSelect name="processDocumentation" label="Process Documentation" value={formData.processDocumentation} onChange={handleChange} error={formErrors.processDocumentation}
                      placeholder="How documented are your processes?" options={["Comprehensive written processes","Some key processes documented","Trained others, mostly in my head","Everything in my head only","No consistent processes"]} />
                    <FormSelect name="inventoryTracking" label="Inventory Tracking" value={formData.inventoryTracking} onChange={handleChange} error={formErrors.inventoryTracking}
                      placeholder="How do you track inventory?" options={["Digital real-time system","Regular manual/spreadsheet","Weekly physical count","Only when running low","Don't track","Not applicable (service business)"]} />
                  </div>
                </div>

                {/* S4 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 4: Financial Intelligence</h2>
                  <p className="text-sm text-gray-500 mb-4">Understanding the numbers behind your business.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="expenseAwareness" label="Expense Awareness" value={formData.expenseAwareness} onChange={handleChange} error={formErrors.expenseAwareness}
                      placeholder="How well do you know your monthly expenses?" options={["Know exact amounts and percentages","Know roughly","General idea","Would have to look up","No idea"]} />
                    <FormSelect name="profitPerProduct" label="Profit Per Product/Service" value={formData.profitPerProduct} onChange={handleChange} error={formErrors.profitPerProduct}
                      placeholder="Do you know which offerings make most profit?" options={["Know margins on each offering","Good sense of what's profitable","Know revenue only, not profit","Haven't analyzed","All seem about the same"]} />
                    <FormSelect name="pricingStrategy" label="Pricing Strategy" value={formData.pricingStrategy} onChange={handleChange} error={formErrors.pricingStrategy}
                      placeholder="How do you set your prices?" options={["Cost + margin + market research","Match competitors","Cost + markup (no market analysis)","What feels right","No strategy"]} />
                  </div>
                </div>

                {/* S5 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Section 5: Growth & Resilience</h2>
                  <p className="text-sm text-gray-500 mb-4">Trajectory, diversification, and operating environment.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect name="businessTrajectory" label="Business Trajectory" value={formData.businessTrajectory} onChange={handleChange} error={formErrors.businessTrajectory}
                      placeholder="How is revenue trending year-on-year?" options={["Growing 20%+","Growing 5-20%","Stable (±5%)","Declining 5-20%","Declining 20%+","Less than 1 year old"]} />
                    <FormSelect name="revenueDiversification" label="Revenue Diversification" value={formData.revenueDiversification} onChange={handleChange} error={formErrors.revenueDiversification}
                      placeholder="How many income streams do you have?" options={["4+ streams/customer types","2-3 streams","Primary + side income","Single product/customer type","Dependent on 1-2 major customers"]} />
                    <FormSelect name="digitalPayments" label="Digital Payment Adoption" value={formData.digitalPayments} onChange={handleChange} error={formErrors.digitalPayments}
                      placeholder="What % of payments are digital?" options={["80%+ digital","50-80% digital","20-50% digital","Less than 20% digital"]} />
                    <FormSelect name="formalRegistration" label="Business Registration Status" value={formData.formalRegistration} onChange={handleChange} error={formErrors.formalRegistration}
                      placeholder="Is your business formally registered?" options={["Fully registered and tax compliant","Registered, behind on taxes","In process of registering","Not registered"]} />
                    <FormSelect name="infrastructure" label="Infrastructure Reliability" value={formData.infrastructure} onChange={handleChange} error={formErrors.infrastructure}
                      placeholder="How reliable is power, internet, and supply chain?" options={["Consistent power/internet/supply","Mostly reliable with backups","Frequent disruptions","Major challenges daily"]} />
                    <FormSelect name="bankingRelationship" label="Banking Relationship" value={formData.bankingRelationship} onChange={handleChange} error={formErrors.bankingRelationship}
                      placeholder="What is your relationship with banks?" options={["Strong, accessed loans/credit","Accounts but no credit","Minimal interaction","No bank relationship"]} />
                  </div>
                </div>

                {/* Pain Point */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Primary Challenge</h2>
                  <p className="text-sm text-gray-500 mb-4">The AI uses this to focus your advisory on what matters most.</p>
                  <FormSelect name="primaryPainPoint" label="Biggest challenge right now?" value={formData.primaryPainPoint} onChange={handleChange} error={formErrors.primaryPainPoint}
                    placeholder="Select your primary pain point"
                    options={["Getting more customers/sales","Managing cash flow/getting paid","Hiring or managing staff","Keeping costs under control","Too busy/overwhelmed","Inconsistent quality/delivery","Don't know where to focus","Competition/market changes","Actually doing well, want to optimize"]} />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 p-4 rounded-md" style={{ background: '#fffbee', border: '1px solid #e8d5a3' }}>
                  <input type="checkbox" id="emailConsent" checked={emailConsent} onChange={e => setEmailConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded" style={{ accentColor: '#B8860B' }} />
                  <label htmlFor="emailConsent" className="text-sm text-gray-700">
                    I consent to receive my AI-generated assessment and PDF report via email at the address provided.
                  </label>
                </div>

                <button type="submit" disabled={loading || !emailConsent}
                  className="w-full py-3 text-sm font-semibold text-white rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: loading || !emailConsent ? '#999' : 'linear-gradient(135deg, #B8860B, #d4af37)' }}>
                  {loading ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Analyzing your business...
                    </>
                  ) : (
                    <><SparkleIcon /> Generate My Beacon Pro Report</>
                  )}
                </button>
              </form>

              {/* Email Modal */}
              {showEmailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6" style={{ borderTop: '4px solid #B8860B' }}>
                    {modalSuccess ? (
                      <div className="flex flex-col items-center justify-center py-4 text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#fffbee', border: '2px solid #B8860B' }}>
                          <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="#B8860B" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Report Sent!</h3>
                        <p className="text-sm text-gray-500">Your PDF is on its way to <strong>{modalEmail}</strong></p>
                        <p className="text-xs text-gray-400 mt-3">This window will close automatically…</p>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Email PDF Report</h3>
                        <p className="text-sm text-gray-500 mb-4">Enter the email to send the report to.</p>
                        <input type="email" value={modalEmail} onChange={e => { setModalEmail(e.target.value); setModalError(''); }}
                          placeholder="recipient@email.com"
                          className="block w-full border border-gray-300 rounded-md p-3 text-sm mb-2 focus:outline-none" />
                        {modalError && <p className="text-red-500 text-xs mb-3">{modalError}</p>}
                        {emailLoading && <p className="text-xs text-gray-500 mb-3">Generating PDF and sending… May take up to 60 seconds.</p>}
                        <div className="flex gap-3 mt-4">
                          <button onClick={() => { setShowEmailModal(false); setModalEmail(''); setModalError(''); }} disabled={emailLoading}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                            Cancel
                          </button>
                          <button onClick={handleEmailResults} disabled={emailLoading}
                            className="flex-1 px-4 py-2 rounded-md text-sm font-semibold text-white disabled:opacity-50"
                            style={{ backgroundColor: '#B8860B' }}>
                            {emailLoading ? 'Sending…' : 'Send Report'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ── RESULTS ── */}
              <AnimatePresence>
                {(scoreData || isStreaming) && (
                  <motion.div ref={resultsRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="results-section mt-10 space-y-8">

                    {/* Status banner */}
                    <div className="p-4 rounded-md flex items-start gap-3" style={{ backgroundColor: '#fffbee', borderLeft: '4px solid #B8860B' }}>
                      <SparkleIcon />
                      <p className="text-sm" style={{ color: '#92680a' }}>
                        <strong>Scores ready!</strong>{' '}
                        {isStreaming ? 'The AI is writing your personalised advisory below...' : 'Your AI advisory is complete.'}
                      </p>
                    </div>

                    {/* Email success */}
                    {emailSuccess && (
                      <div className="p-4 rounded-lg flex items-center gap-4" style={{ backgroundColor: '#e6f4ea', border: '1.5px solid #34a853' }}>
                        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#34a853' }}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: '#1e7e34' }}>Report sent!</p>
                          <p className="text-xs mt-0.5" style={{ color: '#2d6a4f' }}>Check your inbox — your PDF is on the way.</p>
                        </div>
                      </div>
                    )}

                    {/* Score card */}
                    {scoreData && (
                      <div className="p-6 rounded-lg" style={{ border: '2px solid #B8860B', backgroundColor: '#fffbee' }}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#B8860B', opacity: 0.8 }}>Beacon Pro Score</p>
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#B8860B' }}>PRO</span>
                            </div>
                            <p className="text-5xl font-bold" style={{ color: '#B8860B' }}>
                              {scoreData.total_score}<span className="text-2xl font-normal">/100</span>
                            </p>
                            <p className="text-xl font-semibold mt-1 text-gray-700">{scoreData.readiness_level}</p>
                          </div>
                          <div className="text-sm space-y-1 text-gray-600">
                            <p><strong>Business:</strong> {scoreData.context.businessName}</p>
                            <p><strong>Industry:</strong> {scoreData.context.industry}</p>
                            <p><strong>Years:</strong> {scoreData.context.yearsInBusiness}</p>
                            <p><strong>Focus:</strong> {scoreData.context.primaryPainPoint}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Categories */}
                    {scoreData && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Score Breakdown</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categoryMeta.map(({ key, label, icon }) => (
                            <CategoryCard key={key} name={label} cat={scoreData.breakdown[key]} icon={icon} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Flags */}
                    {scoreData && (scoreData.flags.critical.length > 0 || scoreData.flags.opportunities.length > 0) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {scoreData.flags.critical.length > 0 && (
                          <div className="rounded-lg p-4" style={{ backgroundColor: '#fff5f5', border: '1px solid #ffcccc' }}>
                            <h4 className="font-bold mb-3 text-sm" style={{ color: '#cc0000' }}>🚨 Critical Flags</h4>
                            <ul className="space-y-2">
                              {scoreData.flags.critical.map(f => (
                                <li key={f} className="text-sm px-3 py-1.5 rounded" style={{ color: '#cc0000', backgroundColor: '#ffe8e8' }}>{f.replace(/_/g, ' ')}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {scoreData.flags.opportunities.length > 0 && (
                          <div className="rounded-lg p-4" style={{ backgroundColor: '#fffbee', border: '1px solid #e8d5a3' }}>
                            <h4 className="font-bold mb-3 text-sm" style={{ color: '#B8860B' }}>✅ Opportunity Flags</h4>
                            <ul className="space-y-2">
                              {scoreData.flags.opportunities.map(f => (
                                <li key={f} className="text-sm px-3 py-1.5 rounded" style={{ color: '#92680a', backgroundColor: '#fff3d0' }}>{f.replace(/_/g, ' ')}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Streaming advisory */}
                    {(streamedAdvisory || isStreaming) && (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-lg font-bold text-gray-800">AI-Powered Strategic Advisory</h3>
                          {isStreaming ? (
                            <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: '#fffbee', color: '#B8860B', border: '1px solid #e8d5a3' }}>
                              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                                className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: '#B8860B' }} />
                              Writing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: '#e6f4ea', color: '#1e7e34', border: '1px solid #b3dfc0' }}>
                              ✓ Complete
                            </span>
                          )}
                        </div>
                        <div ref={advisoryRef} className="bg-white rounded-lg p-6"
                          style={{ border: '1px solid #e8d5a3', maxHeight: isStreaming ? '600px' : 'none', overflowY: isStreaming ? 'auto' : 'visible' }}>
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown components={{
                              h2: ({ children }) => <h2 style={{ color: '#B8860B', fontSize: '17px', fontWeight: 700, marginTop: '24px', marginBottom: '10px', borderBottom: '1px solid #e8d5a3', paddingBottom: '6px' }}>{children}</h2>,
                              h3: ({ children }) => <h3 style={{ color: '#8B6914', fontSize: '15px', fontWeight: 600, marginTop: '16px', marginBottom: '8px' }}>{children}</h3>,
                              p: ({ children }) => <p style={{ color: '#333', lineHeight: '1.7', marginBottom: '12px' }}>{children}</p>,
                              ul: ({ children }) => <ul style={{ paddingLeft: '20px', marginBottom: '16px', listStyleType: 'disc' }}>{children}</ul>,
                              li: ({ children }) => <li style={{ color: '#444', lineHeight: '1.7', marginBottom: '6px' }}>{children}</li>,
                              strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#111' }}>{children}</strong>,
                              hr: () => <hr style={{ borderColor: '#e8d5a3', margin: '24px 0' }} />,
                            }}>
                              {streamedAdvisory}
                            </ReactMarkdown>
                            {isStreaming && <TypingCursor />}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action buttons — shown only after streaming is complete */}
                    {streamingDone && fullResult && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Take Action</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                          <button onClick={handleDownloadPDF} disabled={pdfLoading}
                            className="flex items-center gap-2 px-6 py-3 text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
                            style={{ backgroundColor: '#B8860B' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#9a7009')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#B8860B')}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {pdfLoading ? 'Generating...' : 'Download PDF Report'}
                          </button>
                          <button onClick={() => { setModalEmail(formData.email); setShowEmailModal(true); setEmailSuccess(false); }}
                            className="flex items-center gap-2 px-6 py-3 text-white rounded-md text-sm font-semibold"
                            style={{ backgroundColor: '#1a1a2e' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2d2d4e')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1a1a2e')}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                            Email Me Results
                          </button>
                          <button onClick={handleShare}
                            className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-md text-sm font-semibold">
                            <XIcon /> Share on X
                          </button>
                        </div>
                        {shareMessage && <p className="mt-4 text-sm font-medium" style={{ color: '#B8860B' }}>{shareMessage}</p>}
                      </motion.div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Let's build a custom growth plan for your specific situation."
        primaryButtonText="Book a Free Strategy Call"
        primaryButtonHref="https://calendly.com/beamxsolutions"
        secondaryButtonText="Try Beacon (Standard)"
        secondaryButtonHref="/products/beacon-assessment"
      />
    </>
  );
};

export default BeaconProAssessment;