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
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-black border border-gray-800 p-8 max-w-md w-full mx-4 z-10">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-150 active:scale-95"
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
          <h2 className="text-white text-xl font-normal mb-6">
            To acess PRO features reach out to us
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
                    className={`w-full px-4 py-3 bg-[#2F2F2F33] text-white placeholder:text-gray-500 border ${
                      error ? 'border-red-500' : 'border-gray-800'
                    } focus:outline-none focus:border-gray-600`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] text-black text-sm font-medium hover:opacity-90 transition-all duration-150 rounded-md active:scale-95"
                >
                  Submit
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </form>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-green-900 bg-opacity-20 border border-green-500">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500 flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <p className="text-green-500 font-medium mb-1">Success!</p>
                <p className="text-gray-300 text-sm">
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

