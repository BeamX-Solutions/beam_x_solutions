import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

interface ScorecardInput {
  revenue: string;
  profit_margin_known: string;
  monthly_burn: string;
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

interface ScorecardResult {
  score: number;
  label: string;
  sub_scores: {
    financial: number;
    growth: number;
    digital: number;
    operations: number;
  };
  insights: string;
}

const industries = [
  "Technology",
  "Healthcare",
  "Retail",
  "Finance",
  "Manufacturing",
  "Education",
  "Hospitality",
  "Real Estate",
  "Non-Profit",
  "Other"
];

const ScorecardPredictor: React.FC = () => {
  const [formData, setFormData] = useState<ScorecardInput>({
    revenue: "",
    profit_margin_known: "",
    monthly_burn: "",
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
  const [result, setResult] = useState<ScorecardResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ScorecardInput, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name as keyof ScorecardInput]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof ScorecardInput)[] = [
      "revenue", "profit_margin_known", "monthly_burn", "cac_tracked", "retention_rate",
      "digital_campaigns", "analytics_tools", "crm_used", "data_mgmt", "sops_doc",
      "team_size", "pain_point", "industry"
    ];
    const errors: Partial<Record<keyof ScorecardInput, string>> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required.";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setFormErrors({});

    try {
      const response = await fetch("https://beamx-scorecard-api.onrender.com/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(90000), // 90s timeout
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data: ScorecardResult = await response.json();
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

  return (
    <>
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
              <h1 className="text-white text-4xl font-bold mb-6">Scorecard Predictor</h1>
              <p className="text-gray-100 text-lg mb-8">
                Evaluate your business readiness with detailed insights and tailored growth strategies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section bg-gray-50 relative z-10 pt-12 pb-16">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Business Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Revenue</label>
                      <select
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.revenue ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.revenue !== ""}>Select revenue</option>
                        <option value="Under $10K">Under $10K</option>
                        <option value="$10K–$50K">$10K–$50K</option>
                        <option value="$50K–$250K">$50K–$250K</option>
                        <option value="$250K–$1M">$250K–$1M</option>
                        <option value="Over $1M">Over $1M</option>
                      </select>
                      {formErrors.revenue && <p className="text-red-500 text-xs mt-1">{formErrors.revenue}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profit Margin Known</label>
                      <select
                        name="profit_margin_known"
                        value={formData.profit_margin_known}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.profit_margin_known ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.profit_margin_known !== ""}>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formErrors.profit_margin_known && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.profit_margin_known}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Burn</label>
                      <select
                        name="monthly_burn"
                        value={formData.monthly_burn}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.monthly_burn ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.monthly_burn !== ""}>Select burn rate</option>
                        <option value="Unknown">Unknown</option>
                        <option value="≤$1K">≤$1K</option>
                        <option value="$1K–$5K">$1K–$5K</option>
                        <option value="$5K–$20K">$5K–$20K</option>
                        <option value="$20K+">$20K+</option>
                      </select>
                      {formErrors.monthly_burn && <p className="text-red-500 text-xs mt-1">{formErrors.monthly_burn}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CAC Tracked</label>
                      <select
                        name="cac_tracked"
                        value={formData.cac_tracked}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.cac_tracked ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.cac_tracked !== ""}>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formErrors.cac_tracked && <p className="text-red-500 text-xs mt-1">{formErrors.cac_tracked}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Retention Rate</label>
                      <select
                        name="retention_rate"
                        value={formData.retention_rate}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.retention_rate ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.retention_rate !== ""}>Select rate</option>
                        <option value="<10%">{`<10%`}</option>
                        <option value="10–25%">10–25%</option>
                        <option value="25–50%">25–50%</option>
                        <option value="50–75%">50–75%</option>
                        <option value="75%+">75%+</option>
                      </select>
                      {formErrors.retention_rate && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.retention_rate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Digital Campaigns</label>
                      <select
                        name="digital_campaigns"
                        value={formData.digital_campaigns}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.digital_campaigns ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.digital_campaigns !== ""}>Select frequency</option>
                        <option value="No">No</option>
                        <option value="Sometimes">Sometimes</option>
                        <option value="Consistently">Consistently</option>
                      </select>
                      {formErrors.digital_campaigns && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.digital_campaigns}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Analytics Tools</label>
                      <select
                        name="analytics_tools"
                        value={formData.analytics_tools}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.analytics_tools ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.analytics_tools !== ""}>Select tools</option>
                        <option value="No">No</option>
                        <option value="Basic tools (Excel, etc.)">Basic tools (Excel, etc.)</option>
                        <option value="Advanced or custom dashboards">Advanced or custom dashboards</option>
                      </select>
                      {formErrors.analytics_tools && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.analytics_tools}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CRM Used</label>
                      <select
                        name="crm_used"
                        value={formData.crm_used}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.crm_used ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.crm_used !== ""}>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formErrors.crm_used && <p className="text-red-500 text-xs mt-1">{formErrors.crm_used}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data Management</label>
                      <select
                        name="data_mgmt"
                        value={formData.data_mgmt}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.data_mgmt ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.data_mgmt !== ""}>Select approach</option>
                        <option value="Scattered or manual">Scattered or manual</option>
                        <option value="Somewhat structured">Somewhat structured</option>
                        <option value="Centralized and automated">Centralized and automated</option>
                      </select>
                      {formErrors.data_mgmt && <p className="text-red-500 text-xs mt-1">{formErrors.data_mgmt}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SOPs Documented</label>
                      <select
                        name="sops_doc"
                        value={formData.sops_doc}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.sops_doc ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.sops_doc !== ""}>Select</option>
                        <option value="No">No</option>
                        <option value="Somewhat">Somewhat</option>
                        <option value="Fully documented">Fully documented</option>
                      </select>
                      {formErrors.sops_doc && <p className="text-red-500 text-xs mt-1">{formErrors.sops_doc}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                      <select
                        name="team_size"
                        value={formData.team_size}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.team_size ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.team_size !== ""}>Select size</option>
                        <option value="0 (solo)">0 (solo)</option>
                        <option value="1–3">1–3</option>
                        <option value="4–10">4–10</option>
                        <option value="11–50">11–50</option>
                        <option value="50+">50+</option>
                      </select>
                      {formErrors.team_size && <p className="text-red-500 text-xs mt-1">{formErrors.team_size}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pain Point</label>
                      <select
                        name="pain_point"
                        value={formData.pain_point}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.pain_point ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.pain_point !== ""}>Select pain point</option>
                        <option value="Not growing">Not growing</option>
                        <option value="Systems are chaotic">Systems are chaotic</option>
                        <option value="Don't know what to optimize">Don't know what to optimize</option>
                        <option value="Need funding">Need funding</option>
                        <option value="Growing fast, need structure">Growing fast, need structure</option>
                      </select>
                      {formErrors.pain_point && <p className="text-red-500 text-xs mt-1">{formErrors.pain_point}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`block w-full border ${
                          formErrors.industry ? 'border-red-300' : 'border-gray-300'
                        } rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled={formData.industry !== ""}>Select industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                      {formErrors.industry && <p className="text-red-500 text-xs mt-1">{formErrors.industry}</p>}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className={`w-full py-3 text-sm font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Get Scorecard'}
                </Button>
              </form>

              {result && (
                <div className="mt-8 p-6 rounded-md bg-green-100">
                  <h2 className="text-lg font-semibold">Scorecard Results</h2>
                  <p className="text-gray-700">Total Score: {result.score}/100 ({result.label})</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Financial: {result.sub_scores.financial}/25</li>
                    <li>Growth: {result.sub_scores.growth}/25</li>
                    <li>Digital: {result.sub_scores.digital}/25</li>
                    <li>Operations: {result.sub_scores.operations}/25</li>
                  </ul>
                  <p className="mt-4 text-gray-700"><strong>Insights:</strong> {result.insights}</p>
                </div>
              )}

              {error && (
                <div className="mt-8 p-6 bg-red-100 rounded-md">
                  <h2 className="text-lg font-semibold text-red-800">Error</h2>
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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

export default ScorecardPredictor;