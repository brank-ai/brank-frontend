'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBrandName?: string;
}

interface FormData {
  brandName: string;
  email: string;
}

type SubmitAction = 'check-now' | 'email';

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({
  isOpen,
  onClose,
  initialBrandName,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    brandName: initialBrandName || '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAction, setSubmitAction] = useState<SubmitAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ brandName: initialBrandName || '', email: '' });
      setIsSubmitting(false);
      setSubmitAction(null);
      setError(null);
    }
  }, [isOpen, initialBrandName]);

  // Update brand name when initialBrandName changes and modal is open
  useEffect(() => {
    if (isOpen && initialBrandName) {
      setFormData(prev => ({ ...prev, brandName: initialBrandName }));
    }
  }, [isOpen, initialBrandName]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isSubmitting]);

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      !isSubmitting &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const isValidDomain = (value: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(value.trim());
  };

  const validateForm = (): boolean => {
    if (!formData.brandName.trim()) {
      setError('Please enter your brand domain');
      return false;
    }
    if (!isValidDomain(formData.brandName)) {
      setError('Please enter a valid domain (e.g. google.com, apple.com)');
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

  const submitRequest = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/brand-insight-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_name: formData.brandName.trim(),
          email: formData.email.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error || `Request failed (${response.status})`
        );
      }

      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      toast.error(message);
      return false;
    }
  };

  const handleCheckNow = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitAction('check-now');
    setError(null);

    const success = await submitRequest();

    if (success) {
      onClose();
      router.push(
        `/progress?brand=${encodeURIComponent(formData.brandName.trim())}`
      );
      return;
    }

    setIsSubmitting(false);
    setSubmitAction(null);
  };

  const handleEmailInsights = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitAction('email');
    setError(null);

    const success = await submitRequest();

    if (success) {
      onClose();
      toast.success(
        "We're processing your brand insights. You'll receive them in your inbox shortly."
      );
    }

    setIsSubmitting(false);
    setSubmitAction(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Modal */}
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
          disabled={isSubmitting}
          className="
            absolute top-4 right-4 z-10
            w-8 h-8
            flex items-center justify-center
            rounded-full
            text-text-muted hover:text-text-primary
            hover:bg-white/5
            transition-all duration-200
            disabled:opacity-50
          "
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isSubmitting ? (
          /* Loading State */
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6">
              <svg
                className="w-full h-full animate-spin text-[#22C55E]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-text-secondary text-sm">
              {submitAction === 'check-now'
                ? 'Setting up your brand analytics...'
                : 'Submitting your request...'}
            </p>
          </div>
        ) : (
          /* Form State */
          <>
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">
              Analyse your brand
            </h2>
            <p className="text-text-muted text-sm mb-6">
              Enter your brand details to get AI-powered visibility insights.
            </p>

            <form
              id="brand-insight-form"
              onSubmit={e => e.preventDefault()}
              className="space-y-4"
            >
              {/* Brand Domain */}
              <div>
                <label
                  htmlFor="brandName"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Brand Domain
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="e.g. google.com, apple.com"
                  className="
                    w-full px-4 py-3
                    bg-bg-base
                    border border-subtle
                    rounded-lg
                    text-text-primary
                    placeholder-text-subtle
                    shadow-deep-field-sm
                    focus:outline-none focus:border-[#22C55E]/50
                    transition-colors duration-200
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-text-secondary mb-1.5"
                >
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
                    focus:outline-none focus:border-[#22C55E]/50
                    transition-colors duration-200
                  "
                />
              </div>

              {/* Error message */}
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </form>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              {/* Check Insights Now */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCheckNow}
                className="
                  w-full px-6 py-3
                  text-sm font-medium
                  rounded-lg
                  text-bg-base
                  bg-text-primary
                  hover:bg-text-secondary
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.98]
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                {/* <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg> */}
                Check Insights Now (~30s)
              </button>
              <p className="text-text-subtle text-xs text-center">
                View your brand analytics instantly. May take up to 30 seconds
                to fetch results.
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-subtle" />
                <span className="text-text-subtle text-xs">or</span>
                <div className="flex-1 h-px bg-subtle" />
              </div>

              {/* Get Insights via Email */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleEmailInsights}
                className="
                  w-full px-6 py-3
                  text-sm font-medium
                  rounded-lg
                  text-text-primary
                  bg-bg-elevated
                  border border-subtle
                  shadow-soft-tile-xs
                  hover:bg-bg-surface
                  hover:border-text-muted/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.98]
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Get Insights via Email
              </button>
              <p className="text-text-subtle text-xs text-center">
                We&apos;ll process your brand and deliver a detailed report to
                your inbox.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { LearnMoreModal };
