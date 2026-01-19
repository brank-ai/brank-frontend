'use client';

import React, { useState, FormEvent } from 'react';
import { ProModalProps } from '@/types';

const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Submit the email (for now, just log it)
    console.log('Email submitted:', email);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-bg-base/90 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container - Soft Tile Style v2.0 */}
      <div
        className="
          relative
          rounded-xl
          shadow-soft-tile
          p-8
          max-w-md w-full mx-4
          z-10
        "
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="
            absolute top-4 right-4
            text-text-muted
            hover:text-text-primary
            transition-all duration-300
            active:scale-95
          "
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content */}
        <div className="pr-8">
          <h2 className="text-text-primary text-xl font-medium tracking-tight mb-6">
            To access PRO features reach out to us
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`
                      w-full px-4 py-3
                      bg-bg-depressed
                      text-text-primary
                      placeholder:text-text-subtle
                      rounded-lg
                      shadow-deep-field-sm
                      border ${error ? 'border-accent-error/50' : 'border-transparent'}
                      focus:outline-none
                      transition-all duration-300
                    `}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="
                    px-6 py-3
                    bg-text-primary
                    text-bg-base
                    text-sm font-medium
                    rounded-lg
                    shadow-soft-tile-xs
                    hover:bg-text-secondary
                    active:shadow-deep-field-sm
                    active:scale-[0.98]
                    transition-all duration-300
                  "
                >
                  Submit
                </button>
              </div>
              {error && (
                <p className="text-accent-error text-sm">{error}</p>
              )}
            </form>
          ) : (
            <div
              className="
                flex items-start gap-3
                p-4
                bg-accent-success/10
                rounded-lg
                border border-accent-success/20
              "
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-success flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <p className="text-accent-success font-medium mb-1">Success!</p>
                <p className="text-text-muted text-sm">
                  Thank you for your interest. We will reach out to you shortly at {email}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProModal };
