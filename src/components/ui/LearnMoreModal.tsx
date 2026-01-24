'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  brandName: string;
  website: string;
  email: string;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    website: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ brandName: '', website: '', email: '' });
      setIsSubmitted(false);
      setIsSubmitting(false);
      setError(null);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.brandName.trim()) {
      setError('Please enter your brand name');
      return false;
    }
    if (!formData.website.trim()) {
      setError('Please enter your website');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // TODO: Replace with actual API endpoint
      await fetch('/api/learn-more', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Silently handle - we show success anyway since API doesn't exist yet
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Modal - centered using inset and margin auto */}
      <div
        ref={modalRef}
        style={{
          position: 'fixed',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
        className="
          w-[calc(100%-2rem)] max-w-md
          bg-bg-surface
          border border-subtle
          rounded-2xl
          shadow-soft-tile
          p-6 sm:p-8
          animate-fadeIn
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            w-8 h-8
            flex items-center justify-center
            rounded-full
            text-text-muted hover:text-text-primary
            hover:bg-white/5
            transition-all duration-200
          "
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue-700 rounded-l-2xl" />

        {isSubmitting ? (
          /* Loading State */
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6">
              <svg className="w-full h-full animate-spin text-brand-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <p className="text-text-secondary text-sm">Processing your request...</p>
          </div>
        ) : isSubmitted ? (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-blue-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">We will reach out to you!</h3>
            <p className="text-text-secondary text-sm">
              Our team will send your brand insights to your email shortly.
            </p>
            <button
              onClick={onClose}
              className="
                mt-6 px-6 py-2.5
                text-sm font-medium
                rounded-lg
                text-text-primary
                shadow-soft-tile-xs
                hover:brightness-110
                active:shadow-deep-field-sm
                active:scale-[0.98]
                transition-all duration-300
              "
            >
              Close
            </button>
          </div>
        ) : (
          /* Form State */
          <>
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">
              Get insights for your brand
            </h2>
            <p className="text-text-muted text-sm mb-6">
              Enter your details and we&apos;ll send you a comprehensive brand analysis via email.
            </p>

            <form id="learn-more-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Brand Name */}
              <div>
                <label htmlFor="brandName" className="block text-sm text-text-secondary mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Inc"
                  className="
                    w-full px-4 py-3
                    bg-bg-base
                    border border-subtle
                    rounded-lg
                    text-text-primary
                    placeholder-text-subtle
                    shadow-deep-field-sm
                    focus:outline-none focus:border-brand-blue-700/50
                    transition-colors duration-200
                  "
                />
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm text-text-secondary mb-1.5">
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. acme.com"
                  className="
                    w-full px-4 py-3
                    bg-bg-base
                    border border-subtle
                    rounded-lg
                    text-text-primary
                    placeholder-text-subtle
                    shadow-deep-field-sm
                    focus:outline-none focus:border-brand-blue-700/50
                    transition-colors duration-200
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-text-secondary mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. you@company.com"
                  className="
                    w-full px-4 py-3
                    bg-bg-base
                    border border-subtle
                    rounded-lg
                    text-text-primary
                    placeholder-text-subtle
                    shadow-deep-field-sm
                    focus:outline-none focus:border-brand-blue-700/50
                    transition-colors duration-200
                  "
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
            </form>

            {/* Submit button - outside form space-y-4 for proper spacing */}
            <button
              type="submit"
              form="learn-more-form"
              disabled={isSubmitting}
              className="
                w-full mt-8 px-6 py-3
                text-sm font-medium
                rounded-lg
                text-text-primary
                bg-brand-blue-700
                hover:bg-brand-blue-600
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-[0.98]
                transition-all duration-300
                flex items-center justify-center gap-2
              "
              onClick={handleSubmit}
            >
              Get Brand Insights
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { LearnMoreModal };
