import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

interface FormData {
  Dependents: number;
  Gender: string;
  Married: string;
  Education: string;
  Self_Employed: string;
  ApplicantIncome: number;
  CoapplicantIncome: number;
  LoanAmount: number;
  Loan_Amount_Term: number;
  Credit_History: number;
  Property_Area: string;
}

interface PredictionResult {
  approval_probability: number;
  prediction: string;
}

const LoanApprovalPredictor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Dependents: 0,
    Gender: "Male",
    Married: "Yes",
    Education: "Graduate",
    Self_Employed: "No",
    ApplicantIncome: 0,
    CoapplicantIncome: 0,
    LoanAmount: 0,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: "Semiurban",
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { Dependents, ApplicantIncome, CoapplicantIncome, LoanAmount, Loan_Amount_Term, Credit_History } = formData;

    if (
      Dependents < 0 ||
      ApplicantIncome < 0 ||
      CoapplicantIncome < 0 ||
      LoanAmount < 0 ||
      Loan_Amount_Term < 0 ||
      Credit_History < 0
    ) {
      setError("All numeric fields must be non-negative.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      Dependents: parseInt(Dependents.toString()),
      ApplicantIncome: parseFloat(ApplicantIncome.toString()),
      CoapplicantIncome: parseFloat(CoapplicantIncome.toString()),
      LoanAmount: parseFloat(LoanAmount.toString()),
      Loan_Amount_Term: parseFloat(Loan_Amount_Term.toString()),
      Credit_History: parseFloat(Credit_History.toString()),
      Gender_Male: formData.Gender === "Male" ? 1 : 0,
      Married_Yes: formData.Married === "Yes" ? 1 : 0,
      Education_Not_Graduate: formData.Education === "Not Graduate" ? 1 : 0,
      Self_Employed_Yes: formData.Self_Employed === "Yes" ? 1 : 0,
      Property_Area_Semiurban: formData.Property_Area === "Semiurban" ? 1 : 0,
      Property_Area_Urban: formData.Property_Area === "Urban" ? 1 : 0,
    };

    try {
      const response = await fetch("https://<your-render-url>.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(90000), // 90s timeout
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${errorData.detail || "Unknown error"}`
        );
      }

      const data: PredictionResult = await response.json();
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
              <h1 className="text-white text-4xl font-bold mb-6">Loan Approval Predictor</h1>
              <p className="text-gray-100 text-lg mb-8">
                Automated lending decisions that are faster, smarter, and more accurate than manual reviews.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section bg-gray-50 relative z-10 pt-12">
        <div className="container-custom mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dependents</label>
                    <input
                      type="number"
                      name="Dependents"
                      value={formData.Dependents}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      placeholder="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Married</label>
                    <select
                      name="Married"
                      value={formData.Married}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Education</label>
                    <select
                      name="Education"
                      value={formData.Education}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                    >
                      <option>Graduate</option>
                      <option>Not Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Self Employed</label>
                    <select
                      name="Self_Employed"
                      value={formData.Self_Employed}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Area</label>
                    <select
                      name="Property_Area"
                      value={formData.Property_Area}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                    >
                      <option>Semiurban</option>
                      <option>Urban</option>
                      <option>Rural</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Credit History</label>
                    <select
                      name="Credit_History"
                      value={formData.Credit_History}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="1">Good (1)</option>
                      <option value="0">Poor (0)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Applicant Income <span className="text-xs text-gray-500">(USD/month)</span>
                    </label>
                    <input
                      type="number"
                      name="ApplicantIncome"
                      value={formData.ApplicantIncome}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0"
                      className="mt-1 block w-full border border-negative rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Coapplicant Income <span className="text-xs text-gray-500">(USD/month)</span>
                    </label>
                    <input
                      type="number"
                      name="CoapplicantIncome"
                      value={formData.CoapplicantIncome}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Loan Amount <span className="text-xs text-gray-500">(in USD)</span>
                    </label>
                    <input
                      type="number"
                      name="LoanAmount"
                      value={formData.LoanAmount}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Loan Amount Term <span className="text-xs text-gray-500">(in months)</span>
                    </label>
                    <input
                      type="number"
                      name="Loan_Amount_Term"
                      value={formData.Loan_Amount_Term}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      placeholder="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className={`w-full py-2 text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Predict Loan Approval'}
                </Button>
              </form>

              {result && (
                <div
                  className={`mt-6 p-4 rounded-md ${
                    result.prediction === 'APPROVED' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <h2 className="text-lg font-semibold">
                    {result.prediction === 'APPROVED' ? '✅ Loan Approved' : '❌ Loan Denied'}
                  </h2>
                  <p>Approval Probability: {(result.approval_probability * 100).toFixed(2)}%</p>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-100 rounded-md">
                  <h2 className="text-lg font-semibold">Error</h2>
                  <p>{error}</p>
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

export default LoanApprovalPredictor;