import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'; // Changed to react-helmet-async
import Button from '../components/Button';
import CTASection from '../components/CTASection';

interface FormData {
  Dependents: number | undefined;
  Gender: string;
  Married: string;
  Education: string;
  Self_Employed: string;
  ApplicantIncome: number | undefined;
  CoapplicantIncome: number | undefined;
  LoanAmount: number | undefined;
  Loan_Amount_Term: number | undefined;
  Credit_Score: number | undefined;
  Property_Area: string;
}

interface PredictionResult {
  approval_probability: number;
  prediction: string;
}

const LoanApprovalPredictor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Dependents: undefined,
    Gender: "",
    Married: "",
    Education: "",
    Self_Employed: "",
    ApplicantIncome: undefined,
    CoapplicantIncome: undefined,
    LoanAmount: undefined,
    Loan_Amount_Term: undefined,
    Credit_Score: undefined,
    Property_Area: "",
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? (value === '' ? undefined : parseFloat(value)) : value;
    
    setFormData({ ...formData, [name]: parsedValue });
    
    // Clear error for the field when user starts typing
    if (formErrors[name as keyof FormData]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { Dependents, ApplicantIncome, CoapplicantIncome, LoanAmount, Loan_Amount_Term, Credit_Score, Gender, Married, Education, Self_Employed, Property_Area } = formData;

    // Validation
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (Dependents === undefined || Dependents < 0) errors.Dependents = "Number of dependents must be non-negative";
    if (ApplicantIncome === undefined || ApplicantIncome < 0) errors.ApplicantIncome = "Applicant income must be non-negative";
    if (CoapplicantIncome === undefined || CoapplicantIncome < 0) errors.CoapplicantIncome = "Coapplicant income must be non-negative";
    if (LoanAmount === undefined || LoanAmount < 0) errors.LoanAmount = "Loan amount must be non-negative";
    if (Loan_Amount_Term === undefined || Loan_Amount_Term < 0) errors.Loan_Amount_Term = "Loan term must be non-negative";
    if (Credit_Score === undefined || Credit_Score < 0 || Credit_Score > 850) errors.Credit_Score = "Credit score must be between 0 and 850";
    if (!Gender) errors.Gender = "Please select a gender";
    if (!Married) errors.Married = "Please select marital status";
    if (!Education) errors.Education = "Please select education level";
    if (!Self_Employed) errors.Self_Employed = "Please select employment status";
    if (!Property_Area) errors.Property_Area = "Please select property area";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setFormErrors({});

    const payload = {
      Dependents: parseInt(Dependents!.toString()),
      ApplicantIncome: parseFloat(ApplicantIncome!.toString()),
      CoapplicantIncome: parseFloat(CoapplicantIncome!.toString()),
      LoanAmount: parseFloat(LoanAmount!.toString()),
      Loan_Amount_Term: parseFloat(Loan_Amount_Term!.toString()),
      Credit_History: Credit_Score! >= 600 ? 1 : 0,
      Gender_Male: Gender === "Male" ? 1 : 0,
      Married_Yes: Married === "Yes" ? 1 : 0,
      Education_Not_Graduate: Education === "Not Graduate" ? 1 : 0,
      Self_Employed_Yes: Self_Employed === "Yes" ? 1 : 0,
      Property_Area_Semiurban: Property_Area === "Semiurban" ? 1 : 0,
      Property_Area_Urban: Property_Area === "Urban" ? 1 : 0,
    };

    try {
      const response = await fetch("https://loan-approval-api-11n8.onrender.com/predict", {
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
      <Helmet>
        <title>BeamX Solutions | Loan Approval Predictor</title>
        <meta name="description" content="Use BeamX Solutions' Loan Approval Predictor to get faster, smarter, and more accurate automated lending decisions." />
      </Helmet>
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
              <h1 className="text-white text-4xl font-bold mb-6">Sample Loan Approval Model</h1>
              <p className="text-gray-100 text-lg mb-8">
                This sample model streamlines loan approvals, making lending decisions faster, more efficient, and highly accurate. BeamX Solutions can customize and deploy a tailored solution for your business to reduce manual reviews and boost operational effectiveness.
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
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                        className={`block w-full border ${formErrors.Gender ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled>Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {formErrors.Gender && <p className="text-red-500 text-xs mt-1">{formErrors.Gender}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Married
                      </label>
                      <select
                        name="Married"
                        value={formData.Married}
                        onChange={handleChange}
                        className={`block w-full border ${formErrors.Married ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled>Select your marital status</option>
                        <option value="Yes">Married</option>
                        <option value="No">Single</option>
                      </select>
                      {formErrors.Married && <p className="text-red-500 text-xs mt-1">{formErrors.Married}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Education
                      </label>
                      <select
                        name="Education"
                        value={formData.Education}
                        onChange={handleChange}
                        className={`block w-full border ${formErrors.Education ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled>Select your education level</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Not Graduate">Not Graduate</option>
                      </select>
                      {formErrors.Education && <p className="text-red-500 text-xs mt-1">{formErrors.Education}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Self Employed
                      </label>
                      <select
                        name="Self_Employed"
                        value={formData.Self_Employed}
                        onChange={handleChange}
                        className={`block w-full border ${formErrors.Self_Employed ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled>Select your employment status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formErrors.Self_Employed && <p className="text-red-500 text-xs mt-1">{formErrors.Self_Employed}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Area
                      </label>
                      <select
                        name="Property_Area"
                        value={formData.Property_Area}
                        onChange={handleChange}
                        className={`block w-full border ${formErrors.Property_Area ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                      >
                        <option value="" disabled>Select your property area</option>
                        <option value="Semiurban">Semiurban</option>
                        <option value="Urban">Urban</option>
                        <option value="Rural">Rural</option>
                      </select>
                      {formErrors.Property_Area && <p className="text-red-500 text-xs mt-1">{formErrors.Property_Area}</p>}
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Applicant Income <span className="text-xs text-gray-500">(USD/month)</span>
                      </label>
                      <input
                        type="number"
                        name="ApplicantIncome"
                        value={formData.ApplicantIncome ?? ''}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="Enter monthly income"
                        className={`block w-full border ${formErrors.ApplicantIncome ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                        required
                      />
                      {formErrors.ApplicantIncome && <p className="text-red-500 text-xs mt-1">{formErrors.ApplicantIncome}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Coapplicant Income <span className="text-xs text-gray-500">(USD/month)</span>
                      </label>
                      <input
                        type="number"
                        name="CoapplicantIncome"
                        value={formData.CoapplicantIncome ?? ''}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="Enter coapplicant income"
                        className={`block w-full border ${formErrors.CoapplicantIncome ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                        required
                      />
                      {formErrors.CoapplicantIncome && <p className="text-red-500 text-xs mt-1">{formErrors.CoapplicantIncome}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Credit Score <span className="text-xs text-gray-500">(0–850)</span>
                      </label>
                      <input
                        type="number"
                        name="Credit_Score"
                        value={formData.Credit_Score ?? ''}
                        onChange={handleChange}
                        min="0"
                        max="850"
                        step="1"
                        placeholder="Enter credit score"
                        className={`block w-full border ${formErrors.Credit_Score ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                        required
                      />
                      {formErrors.Credit_Score && <p className="text-red-500 text-xs mt-1">{formErrors.Credit_Score}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dependents
                      </label>
                      <input
                        type="number"
                        name="Dependents"
                        value={formData.Dependents ?? ''}
                        onChange={handleChange}
                        min="0"
                        step="1"
                        placeholder="Enter number of dependents"
                        className={`block w-full border ${formErrors.Dependents ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                        required
                      />
                      {formErrors.Dependents && <p className="text-red-500 text-xs mt-1">{formErrors.Dependents}</p>}
                    </div>
                  </div>
                </div>

                {/* Loan Details */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Loan Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Amount <span className="text-xs text-gray-500">(USD)</span>
                      </label>
                      <input
                        type="number"
                        name="LoanAmount"
                        value={formData.LoanAmount ?? ''}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="Enter loan amount"
                        className={`block w-full border ${formErrors.LoanAmount ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                        required
                      />
                      {formErrors.LoanAmount && <p className="text-red-500 text-xs mt-1">{formErrors.LoanAmount}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Amount Term <span className="text-xs text-gray-500">(months)</span>
                      </label>
                      <input
                        type="number"
                        name="Loan_Amount_Term"
                        value={formData.Loan_Amount_Term ?? ''}
                        onChange={handleChange}
                        min="0"
                        step="1"
                        placeholder="Enter loan term"
                        className={`block w-full border ${formErrors.Loan_Amount_Term ? 'border-red-300' : 'border-gray-300'} rounded-md p-3 text-sm focus:ring-primary focus:border-primary placeholder-gray-400`}
                        required
                      />
                      {formErrors.Loan_Amount_Term && <p className="text-red-500 text-xs mt-1">{formErrors.Loan_Amount_Term}</p>}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className={`w-full py-3 text-sm font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Predict Loan Approval'}
                </Button>
              </form>

              {result && (
                <div
                  className={`mt-8 p-6 rounded-md ${
                    result.prediction === 'APPROVED' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <h2 className="text-lg font-semibold">
                    {result.prediction === 'APPROVED' ? '✅ Loan Approved' : '❌ Loan Denied'}
                  </h2>
                  <p className="text-gray-700">Approval Probability: {(result.approval_probability * 100).toFixed(2)}%</p>
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

export default LoanApprovalPredictor;