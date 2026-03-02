import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface RatingSubmitPayload {
  rating: number;
  label: string;
  feedback: string;
  assessmentId?: string; // optional — pass if you store the DB row id
}

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: RatingSubmitPayload) => Promise<void>;
  /** 'pro' uses gold theme, 'standard' uses blue */
  variant?: 'standard' | 'pro';
  businessName?: string;
}

// ─────────────────────────────────────────────
// RATING DEFINITIONS
// ─────────────────────────────────────────────

const RATINGS = [
  { value: 1, emoji: '😞', label: 'Poor',    description: 'Missed the mark entirely' },
  { value: 2, emoji: '😕', label: 'Off',     description: 'Result cannot be implemented' },
  { value: 3, emoji: '😐', label: 'Okay',    description: 'Somewhat relevant' },
  { value: 4, emoji: '😊', label: 'Great',   description: 'Mostly accurate, missed one aspect' },
  { value: 5, emoji: '🤩', label: 'Spot On', description: 'Perfectly captured my situation' },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  variant = 'standard',
  businessName,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const accent = variant === 'pro' ? '#B8860B' : '#0066cc';
  const accentLight = variant === 'pro' ? '#fffbee' : '#f0f5ff';
  const accentBorder = variant === 'pro' ? '#e8d5a3' : '#ccdcf5';

  const activeRating = hovered ?? selected;
  const activeInfo = activeRating ? RATINGS.find(r => r.value === activeRating) : null;

  const showFeedback = selected !== null && selected <= 3;

  const handleSubmit = async () => {
    if (!selected) return;
    setSubmitting(true);
    const info = RATINGS.find(r => r.value === selected)!;
    await onSubmit({ rating: selected, label: info.label, feedback });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      // Reset for next use
      setTimeout(() => {
        setSubmitted(false);
        setSelected(null);
        setFeedback('');
      }, 400);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            style={{ border: `2px solid ${accentBorder}` }}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${accentBorder}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Rate Your Report</h3>
                  {businessName && (
                    <p className="text-xs text-gray-500 mt-0.5">{businessName}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: accentLight, border: `2px solid ${accent}` }}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <p className="text-base font-bold text-gray-800 mb-1">Thanks for your feedback!</p>
                <p className="text-sm text-gray-500">It helps us make Beacon better for everyone.</p>
              </div>
            ) : (
              /* ── Rating UI ── */
              <div className="px-6 py-5 space-y-5">
                <p className="text-sm text-gray-600 text-center">
                  How well did your assessment capture your actual business situation?
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-2">
                  {RATINGS.map(r => (
                    <button
                      key={r.value}
                      onMouseEnter={() => setHovered(r.value)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setSelected(r.value)}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                      style={{
                        backgroundColor: selected === r.value ? accentLight : 'transparent',
                        border: selected === r.value ? `2px solid ${accent}` : '2px solid transparent',
                        transform: hovered === r.value || selected === r.value ? 'scale(1.12)' : 'scale(1)',
                      }}
                    >
                      <span className="text-2xl leading-none">{r.emoji}</span>
                      <span className="text-xs font-medium" style={{ color: selected === r.value ? accent : '#6b7280' }}>
                        {r.value}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active label */}
                <AnimatePresence mode="wait">
                  {activeInfo && (
                    <motion.div
                      key={activeInfo.value}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="text-center py-2 px-4 rounded-lg"
                      style={{ backgroundColor: accentLight }}
                    >
                      <p className="text-sm font-semibold" style={{ color: accent }}>{activeInfo.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{activeInfo.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Conditional feedback textarea for ratings ≤ 3 */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        What did we miss or get wrong? <span className="text-gray-400">(optional)</span>
                      </label>
                      <textarea
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        placeholder="e.g. The advisory didn't account for my seasonal cash flow..."
                        rows={3}
                        className="block w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none"
                        style={{ focusBorderColor: accent } as React.CSSProperties}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!selected || submitting}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: selected ? accent : '#9ca3af' }}
                  >
                    {submitting ? 'Submitting…' : 'Submit Rating'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;