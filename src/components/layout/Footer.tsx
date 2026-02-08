'use client';

import { useState } from 'react';
import { LearnMoreModal } from '@/components/ui';
import { Twitter, Send, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-bg-base py-8 sm:py-16 md:py-20 border-t border-subtle relative shadow-[0_-1px_0_0_rgba(255,255,255,0.03)_inset]">
        {/* Volumetric Top Highlight Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main CTA Section */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight leading-tight mb-4 sm:mb-6 md:mb-10">
              If AI doesn't know{' '}
              <span className="italic text-glow">about your brand,</span>{' '}
              consumers won't either.
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
            <div className="text-text-muted mb-6 md:mb-0 hidden md:block">
              © 2026 Brank Inc
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:flex md:items-start md:gap-24 w-full md:w-auto">
              {/* About */}
              <div>
                <h4 className="text-text-primary font-medium mb-3 sm:mb-4 text-xs sm:text-sm">
                  About
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-text-muted text-xs sm:text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/pricing"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Brand Kit
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="hidden md:block">
                <h4 className="text-text-primary hidden md:flex font-medium mb-3 sm:mb-4 text-xs sm:text-sm">
                  Contact
                </h4>
                {/* Desktop - Text Links */}
                <ul className="hidden md:flex md:flex-col space-y-2 sm:space-y-3 text-text-muted text-xs sm:text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>

              </div>

              {/* Legal */}
              <div>
                <h4 className="text-text-primary font-medium mb-3 sm:mb-4 text-xs sm:text-sm">
                  Legal
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-text-muted text-xs sm:text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-text-primary transition-colors duration-300"
                    >
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Mobile - Icon Links */}
              <div className="md:hidden mt-10 flex justify-left w-full">
                <div className="flex md:hidden gap-4">
                  <a
                    href="#"
                    className="text-text-muted hover:text-text-primary transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-text-muted hover:text-text-primary transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-text-muted hover:text-text-primary transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-text-muted hover:text-text-primary transition-colors duration-300"
                    aria-label="Telegram"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>

            <div className="text-text-muted mt-10 md:mb-0 flex w-full justify-left md:hidden">
              © 2026 Brank Inc
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
