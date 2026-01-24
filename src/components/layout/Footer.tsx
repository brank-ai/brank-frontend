'use client';

import { useState } from 'react';
import { LearnMoreModal } from '@/components/ui';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-bg-base py-12 sm:py-16 md:py-20 border-t border-subtle relative shadow-[0_-1px_0_0_rgba(255,255,255,0.03)_inset]">
        {/* Volumetric Top Highlight Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main CTA Section */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight mb-6 sm:mb-8 md:mb-12">
              If AI doesn't know <span className="italic text-glow">about your brand,</span> consumers won't either.
            </h2>

            {/* CTA Button - Volumetric White Style */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="
                  bg-bg-elevated
                  text-text-primary
                  border border-subtle
                  px-6 py-2.5 sm:px-8 sm:py-3
                  rounded-lg
                  text-sm sm:text-base font-medium
                  shadow-soft-tile-xs
                  hover:bg-text-secondary
                  active:shadow-deep-field-sm
                  active:scale-[0.98]
                  transition-all duration-300
                  whitespace-nowrap
                "
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Footer Links - Subtle divider */}
          <div
            className="
              flex flex-col md:flex-row items-center justify-between
              border-t border-white/[0.05]
              pt-6 sm:pt-8
              text-xs sm:text-sm
            "
          >
            <div className="text-text-muted mb-6 md:mb-0">
              © 2024 Brank Inc
            </div>

            <div className="flex items-start gap-10 sm:gap-16 md:gap-24">
              {/* About */}
              <div>
                <h4 className="text-text-primary font-medium mb-4 text-sm">
                  About
                </h4>
                <ul className="space-y-3 text-text-muted text-sm">
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="hover:text-text-primary transition-colors duration-300">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      Brand Kit
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-text-primary font-medium mb-4 text-sm">
                  Contact
                </h4>
                <ul className="space-y-3 text-text-muted text-sm">
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-text-primary font-medium mb-4 text-sm">
                  Legal
                </h4>
                <ul className="space-y-3 text-text-muted text-sm">
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition-colors duration-300">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LearnMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
