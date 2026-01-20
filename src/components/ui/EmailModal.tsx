'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  planName,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail('');
        setIsLoading(false);
        setIsSuccess(false);
        setError('');
      }, 300); // Wait for modal close animation
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/pricing-inquiry', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, plan: planName }),
      // });
      
      setIsSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        className="
          relative w-full max-w-md
          bg-bg-elevated
          rounded-2xl
          shadow-soft-tile
          border border-subtle
          p-6 sm:p-8
          animate-scaleIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            text-text-muted hover:text-text-primary
            transition-colors duration-200
          "
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
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

        {/* Modal Content */}
        {!isSuccess ? (
          <>
            <h2 className="text-text-primary text-2xl font-semibold mb-2">
              {planName ? `Get Started with ${planName}` : 'Get Started'}
            </h2>
            <p className="text-text-muted text-sm mb-6">
              Enter your email and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-text-secondary text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="
                    w-full
                    px-4 py-3
                    bg-bg-surface
                    text-text-primary
                    placeholder-text-muted
                    rounded-lg
                    border border-subtle
                    shadow-deep-field-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-white/20
                    focus:border-white/20
                    transition-all duration-200
                  "
                  disabled={isLoading}
                />
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-text-primary text-xl font-semibold mb-2">
              Thank you!
            </h3>
            <p className="text-text-muted text-sm">
              We'll be in touch soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { EmailModal };

