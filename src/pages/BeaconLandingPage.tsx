import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';

const BeaconLandingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Beacon - Business Assessment Tools | BeamX Solutions</title>
        <meta
          name="description"
          content="Discover where your business stands and get actionable insights to grow. Choose from our free assessment or go deeper with Beacon Pro."
        />
      </Helmet>

      {/* Hero Section - Clean & Bold */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-primary overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 py-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Know Your Business.
              <br />
              <span className="text-secondary">
                Grow Your Business.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get a clear picture of your business health in minutes.
              Actionable insights. Zero guesswork.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#choose"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See How It Works
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Simple 3 Steps */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Simple. Fast. Actionable.
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get your personalized business assessment in three easy steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Answer Questions",
                description: "Quick questions about your business operations, finances, and goals."
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our system analyzes your responses and generates insights instantly."
              },
              {
                step: "03",
                title: "Get Your Roadmap",
                description: "Receive personalized recommendations to accelerate growth."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-6xl font-bold text-primary/30 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Preview Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                See What You'll Get
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Receive a professional PDF report with your personalized business assessment, complete with scores, insights, and actionable recommendations.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Executive Summary", desc: "Your overall score and business maturity level" },
                  { title: "Score Breakdown", desc: "Performance across all key business areas" },
                  { title: "Strategic Insights", desc: "AI-powered analysis of your strengths and gaps" },
                  { title: "Action Steps", desc: "Prioritized recommendations to accelerate growth" }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Report Mockup */}
            <motion.div
              className="relative h-[500px] hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Page 3 - Recommendations (back) */}
              <motion.div
                className="absolute top-8 right-0 w-72 bg-white rounded-lg shadow-2xl overflow-hidden"
                style={{ transform: 'rotate(6deg)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-4">
                  <div className="h-1 w-48 bg-gradient-to-r from-blue-600 to-blue-400 rounded mb-4" />
                  <div className="text-xs font-bold text-blue-600 mb-3">Strategic Advisory & Recommendations</div>
                  <div className="text-[8px] text-orange-500 font-semibold mb-2">Strategic Insights</div>
                  <div className="space-y-2">
                    <div className="bg-slate-50 rounded p-2">
                      <div className="h-1.5 w-full bg-slate-200 rounded mb-1" />
                      <div className="h-1.5 w-4/5 bg-slate-200 rounded mb-1" />
                      <div className="h-1.5 w-3/5 bg-slate-200 rounded" />
                    </div>
                    <div className="bg-slate-50 rounded p-2">
                      <div className="h-1.5 w-full bg-slate-200 rounded mb-1" />
                      <div className="h-1.5 w-2/3 bg-slate-200 rounded" />
                    </div>
                  </div>
                  <div className="text-[8px] text-orange-500 font-semibold mt-3 mb-2">Action Steps</div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-slate-100 rounded" />
                    <div className="h-1.5 w-5/6 bg-slate-100 rounded" />
                    <div className="h-1.5 w-4/5 bg-slate-100 rounded" />
                  </div>
                </div>
              </motion.div>

              {/* Page 2 - Executive Summary (middle) */}
              <motion.div
                className="absolute top-16 left-8 w-72 bg-white rounded-lg shadow-2xl overflow-hidden"
                style={{ transform: 'rotate(-3deg)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="border-2 border-blue-600 m-3 rounded p-3">
                  <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded mb-3" />
                  <div className="text-xs font-bold text-blue-600 mb-3">Executive Summary</div>
                  <div className="flex justify-between mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="text-center">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <div className="w-4 h-4 bg-orange-400 rounded-full" />
                        </div>
                        <div className="h-1 w-8 bg-slate-200 rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-blue-600 mb-2">Overall Assessment</div>
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#e2e8f0" strokeWidth="6" fill="none" />
                        <circle cx="32" cy="32" r="28" stroke="#3b82f6" strokeWidth="6" fill="none" strokeDasharray="176" strokeDashoffset="70" strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">61/100</span>
                    </div>
                    <div className="text-[10px] text-slate-600">Business Maturity Level: <span className="font-semibold">Developing</span></div>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <div className="text-xs font-bold text-blue-600 mb-2">Score Breakdown</div>
                  <div className="bg-orange-500 text-white text-[8px] py-1 px-2 rounded-t flex justify-between font-medium">
                    <span>Category</span>
                    <span>Score</span>
                  </div>
                  {[
                    { name: 'Financial Health', score: '76%' },
                    { name: 'Growth Readiness', score: '44%' },
                    { name: 'Digital Maturity', score: '56%' },
                    { name: 'Operations', score: '68%' }
                  ].map((row, i) => (
                    <div key={i} className={`text-[8px] py-1 px-2 flex justify-between ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      <span className="text-slate-600">{row.name}</span>
                      <span className="font-medium text-slate-900">{row.score}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Page 1 - Cover (front) */}
              <motion.div
                className="absolute top-44 left-36 w-72 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-lg shadow-2xl overflow-hidden"
                style={{ transform: 'rotate(2deg)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="p-6 h-80 flex flex-col justify-between relative">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/30 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700/30 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10">
                    <img
                      src="/Beamx-Logo-Colour.png"
                      alt="BeamX Solutions"
                      className="h-8 w-auto mb-6 brightness-0 invert"
                    />
                    <h3 className="text-white text-3xl font-bold leading-tight">
                      Business<br />
                      Assessment<br />
                      Report
                    </h3>
                  </div>

                  <div className="relative z-10">
                    <div className="text-blue-200 text-xs mb-1">Prepared By</div>
                    <div className="text-white text-sm font-medium mb-3">BeamX Solutions</div>
                    <div className="text-blue-200 text-xs mb-1">Generated on</div>
                    <div className="text-white text-sm font-medium">November 03, 2025</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Choose Your Assessment - Main CTA Section */}
      <section id="choose" className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Choose Your Assessment
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start with the basics or go deep with advanced analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Beacon - Free */}
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Beacon</h3>
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                  Free
                </span>
              </div>

              <p className="text-slate-600 mb-8 text-lg">
                AI-powered insights with a professional PDF report. Perfect to get started.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "4 key performance areas",
                  "15 strategic questions",
                  "AI-powered insights & PDF report",
                  "Instant score breakdown",
                  "5-7 minutes to complete"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.a
                href="/products/beacon"
                className="block w-full text-center bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Assessment
              </motion.a>
            </motion.div>

            {/* Beacon Pro */}
            <motion.div
              className="bg-gradient-primary rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Beacon Pro</h3>
                <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  Advanced
                </span>
              </div>

              <p className="text-white/70 mb-8 text-lg">
                Go deeper with expanded analysis, benchmarking, and priority action plans.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "6 business pillars analyzed",
                  "40+ in-depth questions",
                  "Competitive benchmarking",
                  "Priority action plan",
                  "Extended PDF report",
                  "10-15 minutes to complete"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <Check className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.a
                href="/products/beacon-pro"
                className="block w-full text-center bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Pro Assessment
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - Minimal */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "500+", label: "Assessments" },
              { value: "4.9/5", label: "Rating" },
              { value: "95%", label: "Recommend" },
              { value: "5 min", label: "Average Time" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Single Impactful Quote */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl md:text-3xl text-slate-700 font-medium mb-8 leading-relaxed">
              "In just 5 minutes, I got more clarity on my business than I expected.
              The recommendations were spot-on."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img
                src="/first-person1.jpg"
                alt="Customer"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-slate-900">Emeka Dioha</p>
                <p className="text-slate-500">CEO, Maple Maven Designs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Clean & Bold */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to unlock your business potential?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Start your free assessment today. No credit card required.
            </p>
            <motion.a
              href="#choose"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-5 rounded-full text-xl font-semibold hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Now
              <ArrowRight className="h-6 w-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BeaconLandingPage;
