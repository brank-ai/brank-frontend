'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Reveal } from '@/components/ui';
import { useOneShotTyping } from '@/hooks/useOneShotTyping';

/* ============================================
   CONSTANTS
   ============================================ */

const TAB_NAMES = ['Discover', 'Shop', 'Connect', 'Book'] as const;
type TabName = (typeof TAB_NAMES)[number];

const TAB_MESSAGES: Record<TabName, string> = {
  Discover: 'Tell me about this business',
  Shop: 'What products do you have?',
  Connect: "I'd like to leave my contact information",
  Book: 'I want to book an appointment',
};

const TAB_DESCRIPTIONS: Record<TabName, string> = {
  Discover:
    'Your brand info surfaces automatically when users ask about your business.',
  Shop: 'Products displayed with prices and buy buttons, right inside the conversation.',
  Connect:
    'Customers can reach out through a built-in contact form.',
  Book: 'Appointment booking integrated directly into the chat experience.',
};

const TAB_LOADING_MESSAGES: Record<TabName, string> = {
  Discover: 'Loading business information...',
  Shop: 'Loading product information...',
  Connect: 'Loading contact form...',
  Book: 'Loading available dates...',
};

const AUTO_CYCLE_DELAY = 5000; // ms between auto-advance
const MANUAL_PAUSE_DURATION = 10000; // ms pause after manual click
const RESPONSE_DELAY = 400; // ms after typing completes before loading shows
const LOADING_DURATION = 1000; // ms loading state shows before response
const STAGGER_DELAY = 150; // ms between each response element

/* ============================================
   TYPOGRAPHY HELPERS (matching MainContentSection)
   ============================================ */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-bg-surface border border-white/[0.05] text-text-secondary shadow-soft-tile-xs mb-6 tracking-wide uppercase">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-text-primary text-glow mb-4 sm:mb-6 leading-tight leading-[1.2]">
      {children}
    </h2>
  );
}

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p className="md:text-base text-xs text-text-secondary leading-relaxed mb-8">
      {children}
    </p>
  );
}

/* ============================================
   FEATURE LIST BUTTON (matching MainContentSection)
   ============================================ */

interface FeatureListButtonProps {
  title: string;
  description: string;
  active: boolean;
  onClick?: () => void;
}

function FeatureListButton({
  title,
  description,
  active,
  onClick,
}: FeatureListButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer
        ${
          active
            ? 'bg-gradient-surface shadow-soft-tile-sm border-white/[0.05]'
            : 'border-white/[0.02] hover:bg-bg-surface-light hover:border-white/[0.05]'
        }
      `}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full md:h-8 bg-[#22C55E] rounded-r-full shadow-glow-cyan" />
      )}
      <h3
        className={`text-base sm:text-lg font-medium mb-1 transition-colors duration-300 ${active ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'}`}
      >
        {title}
      </h3>
      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* ============================================
   STAGGERED REVEAL ELEMENT
   ============================================ */

function RevealElement({
  show,
  delay,
  children,
}: {
  show: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [show, delay]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2'
      }`}
    >
      {children}
    </div>
  );
}

/* ============================================
   RESPONSE CONTENT COMPONENTS
   ============================================ */

function DiscoverResponse({ show }: { show: boolean }) {
  return (
    <div className="space-y-3">
      <RevealElement show={show} delay={0}>
        <div className="flex gap-2">
          <div className="w-32 h-20 bg-white/[0.06] rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
          <div className="w-32 h-20 bg-white/[0.06] rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.08]" />
            <svg className="w-5 h-5 text-gray-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY}>
        <h4 className="font-semibold text-sm text-gray-100">Your Business Name</h4>
        <p className="text-xs text-gray-400 mt-0.5">
          Your products and services, discoverable by millions on ChatGPT.
        </p>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 2}>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span>https://example.com</span>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 3}>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>hello@example.com</span>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 4}>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>+1 (555) 123-4567</span>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 5}>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>123 Main St, City, State</span>
        </div>
      </RevealElement>
    </div>
  );
}

function ShopResponse({ show }: { show: boolean }) {
  const products = [
    { name: 'Product Name', desc: 'Product description', price: '$XX.XX' },
    { name: 'Product Name', desc: 'Product description', price: '$XX.XX' },
    { name: 'Product Name', desc: 'Product description', price: '$XX.XX' },
  ];

  return (
    <div>
      <RevealElement show={show} delay={0}>
        <h4 className="font-semibold text-sm text-gray-100 mb-3">Shop our products</h4>
      </RevealElement>
      <div className="flex gap-2 overflow-hidden">
        {products.map((product, i) => (
          <RevealElement key={i} show={show} delay={STAGGER_DELAY * (i + 1)}>
            <div className="flex-shrink-0 w-28">
              <div className="w-28 h-24 bg-white/[0.06] rounded-lg mb-2 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-gray-200 truncate">{product.name}</p>
              <p className="text-[10px] text-gray-500 truncate">{product.desc}</p>
              <p className="text-xs font-semibold text-gray-200 mt-1">{product.price}</p>
              <button className="w-full mt-1.5 bg-white text-gray-900 text-[10px] font-medium py-1.5 rounded-full">
                Buy
              </button>
            </div>
          </RevealElement>
        ))}
      </div>
    </div>
  );
}

function ConnectResponse({ show }: { show: boolean }) {
  return (
    <div className="space-y-2.5">
      <RevealElement show={show} delay={0}>
        <h4 className="font-semibold text-sm text-gray-100">Get in touch</h4>
        <p className="text-[10px] text-gray-500 mt-0.5">Tell us how we can help you</p>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY}>
        <div>
          <label className="text-[10px] font-medium text-gray-400 block mb-0.5">Name</label>
          <div className="w-full h-7 bg-white/[0.06] border border-white/[0.1] rounded-md px-2 flex items-center">
            <span className="text-[10px] text-gray-500">Your name</span>
          </div>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 2}>
        <div>
          <label className="text-[10px] font-medium text-gray-400 block mb-0.5">Email</label>
          <div className="w-full h-7 bg-white/[0.06] border border-white/[0.1] rounded-md px-2 flex items-center">
            <span className="text-[10px] text-gray-500">your@email.com</span>
          </div>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 3}>
        <div>
          <label className="text-[10px] font-medium text-gray-400 block mb-0.5">Phone</label>
          <div className="w-full h-7 bg-white/[0.06] border border-white/[0.1] rounded-md px-2 flex items-center">
            <span className="text-[10px] text-gray-500">(555) 123-4567</span>
          </div>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 4}>
        <div>
          <label className="text-[10px] font-medium text-gray-400 block mb-0.5">Message</label>
          <div className="w-full h-12 bg-white/[0.06] border border-white/[0.1] rounded-md px-2 pt-1">
            <span className="text-[10px] text-gray-500">How can we help you?</span>
          </div>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 5}>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-green-500 rounded flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-[10px] text-gray-400">I agree to be contacted about this request</span>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY * 6}>
        <button className="w-full bg-white text-gray-900 text-xs font-medium py-2 rounded-lg mt-1">
          Send message
        </button>
      </RevealElement>
    </div>
  );
}

function BookResponse({ show }: { show: boolean }) {
  const dates = [
    ['Sat, Feb 7', 'Sun, Feb 8'],
    ['Mon, Feb 9', 'Tue, Feb 10'],
    ['Wed, Feb 11', 'Thu, Feb 12'],
  ];

  return (
    <div>
      <RevealElement show={show} delay={0}>
        <div className="w-full h-24 bg-white/[0.06] rounded-lg mb-3 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        </div>
      </RevealElement>

      <RevealElement show={show} delay={STAGGER_DELAY}>
        <h4 className="font-semibold text-sm text-gray-100 mb-3">Select a date</h4>
      </RevealElement>

      {dates.map((row, i) => (
        <RevealElement key={i} show={show} delay={STAGGER_DELAY * (i + 2)}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {row.map((date) => (
              <button
                key={date}
                className="border border-white/[0.1] rounded-lg py-2 px-3 text-xs text-gray-300 hover:bg-white/[0.06] text-center"
              >
                {date}
              </button>
            ))}
          </div>
        </RevealElement>
      ))}
    </div>
  );
}

/* ============================================
   IPHONE FRAME COMPONENT
   ============================================ */

interface IPhoneFrameProps {
  activeTab: number;
  displayText: string;
  isTyping: boolean;
  showLoading: boolean;
  showResponse: boolean;
}

function IPhoneFrame({
  activeTab,
  displayText,
  isTyping,
  showLoading,
  showResponse,
}: IPhoneFrameProps) {
  const tabName = TAB_NAMES[activeTab] as TabName;

  return (
    <div className="relative mx-auto w-[305px] sm:w-[305px]">
      {/* iPhone outer shell — light grey bezel */}
      <div className="relative bg-[#f0f0f0] rounded-[2.5rem] p-[8.5px] shadow-2xl border border-white/20">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a1a] rounded-full z-20" />

        {/* Screen — dark mode */}
        <div className="relative bg-[#212121] rounded-[2rem] overflow-hidden h-[580px] sm:h-[560px]">
          {/* ChatGPT Header */}
          <div className="pt-10 pb-2 px-3 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-xs font-medium text-gray-200">
                ChatGPT 5.2 <span className="text-gray-500">&gt;</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 8v3m0 0v3m0-3h3m-3 0h-3" />
              </svg>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3" strokeWidth={2} />
              </svg>
            </div>
          </div>

          {/* Chat content area - absolute fill below header */}
          <div className="absolute left-0 right-0 top-[52px] bottom-0 flex flex-col">
            {/* Messages area - scrollable, leaves room for input bar */}
            <div className="flex-1 px-3 pt-[20px] pb-14 overflow-y-auto">
              {/* User message bubble */}
              {displayText && (
                <div className="flex justify-end mb-3">
                  <div className="bg-white/[0.08] rounded-2xl px-3 py-2 max-w-[85%]">
                    <p className="text-xs text-gray-200">
                      {displayText}
                      {isTyping && (
                        <span className="inline-block w-0.5 h-3 bg-gray-200 ml-0.5 animate-pulse align-text-bottom" />
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Loading state */}
              {showLoading && !showResponse && (
                <div className="flex items-start gap-2 mb-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4092-.6765zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0974-2.3616l2.603-1.5018 2.6032 1.5018v3.0036l-2.6032 1.5018-2.603-1.5018z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 italic">
                      {TAB_LOADING_MESSAGES[tabName]}
                    </p>
                    <div className="flex gap-1 mt-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Response content */}
              <div className="mt-1">
                {tabName === 'Discover' && (
                  <DiscoverResponse show={showResponse} />
                )}
                {tabName === 'Shop' && (
                  <ShopResponse show={showResponse} />
                )}
                {tabName === 'Connect' && (
                  <ConnectResponse show={showResponse} />
                )}
                {tabName === 'Book' && (
                  <BookResponse show={showResponse} />
                )}
              </div>
            </div>

            {/* Bottom input bar - fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-2 pb-3 pt-1 bg-[#212121]">
              <div className="flex items-center gap-2 border border-white/[0.12] rounded-full px-3 py-1.5">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-[10px] text-gray-500 flex-1">Just a demo</span>
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center mt-1.5">
          <div className="w-28 h-1 bg-black/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

export default function ChatGPTDemoSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const autoCycleRef = useRef<ReturnType<typeof setTimeout>>();
  const manualPauseRef = useRef<ReturnType<typeof setTimeout>>();
  const isPausedRef = useRef(false);

  const currentTabName = TAB_NAMES[activeTab] as TabName;
  const currentMessage = TAB_MESSAGES[currentTabName];

  // Typing animation
  const { displayText, isTyping, isComplete } = useOneShotTyping({
    text: currentMessage,
    speed: 40,
    startDelay: 200,
    enabled: true,
  });

  // Typing complete → show loading → show response
  useEffect(() => {
    if (!isComplete) {
      setShowLoading(false);
      setShowResponse(false);
      return;
    }
    // Show loading after a brief pause
    const loadingTimeout = setTimeout(() => setShowLoading(true), RESPONSE_DELAY);
    // Show response after loading duration
    const responseTimeout = setTimeout(
      () => setShowResponse(true),
      RESPONSE_DELAY + LOADING_DURATION
    );
    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(responseTimeout);
    };
  }, [isComplete]);

  // Auto-cycle logic
  const advanceTab = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % TAB_NAMES.length);
  }, []);

  useEffect(() => {
    if (isPausedRef.current) return;

    autoCycleRef.current = setTimeout(() => {
      advanceTab();
    }, AUTO_CYCLE_DELAY);

    return () => {
      if (autoCycleRef.current) clearTimeout(autoCycleRef.current);
    };
  }, [activeTab, advanceTab]);

  const handleTabClick = useCallback((index: number) => {
    setActiveTab(index);
    isPausedRef.current = true;

    // Clear existing timers
    if (autoCycleRef.current) clearTimeout(autoCycleRef.current);
    if (manualPauseRef.current) clearTimeout(manualPauseRef.current);

    // Resume auto-cycle after pause
    manualPauseRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, MANUAL_PAUSE_DURATION);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoCycleRef.current) clearTimeout(autoCycleRef.current);
      if (manualPauseRef.current) clearTimeout(manualPauseRef.current);
    };
  }, []);

  const features = TAB_NAMES.map((name) => ({
    title: name,
    description: TAB_DESCRIPTIONS[name],
  }));

  return (
    <div className="w-full bg-bg-base overflow-hidden">
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.02] 2xl:min-h-screen 2xl:flex 2xl:flex-col 2xl:justify-center">
        <Reveal variant="fadeUp" duration={1.2} y={30}>
          {/* Desktop Layout */}
          <div className="hidden sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-end">
            {/* Left: Content */}
            <div className="order-1">
              <Badge>AI-Powered Storefront</Badge>
              <SectionHeading>
                Your brand, inside every{' '}
                <br className="hidden sm:block" />
                <span className="text-text-muted">AI conversation.</span>
              </SectionHeading>
              <SectionText>
                See how your business appears when customers ask ChatGPT about
                you. From discovery to booking — all inside the chat.
              </SectionText>

              <div className="space-y-2 sm:space-y-3">
                {features.map((feature, index) => (
                  <FeatureListButton
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    active={activeTab === index}
                    onClick={() => handleTabClick(index)}
                  />
                ))}
              </div>
            </div>

            {/* Right: iPhone Visual */}
            <div className="relative order-2 flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div
                style={{
                  transform: 'rotateY(-10deg) rotateX(3deg) rotateZ(4deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <IPhoneFrame
                  activeTab={activeTab}
                  displayText={displayText}
                  isTyping={isTyping}
                  showLoading={showLoading}
                  showResponse={showResponse}
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-10 bg-gradient-to-br from-green-500/10 via-orange-400/5 to-transparent blur-[100px] -z-10 rounded-full pointer-events-none" />
            </div>
          </div>

          {/* Mobile Layout - Tab pills + iPhone */}
          <div className="sm:hidden">
            <Badge>AI-Powered Storefront</Badge>
            <SectionHeading>
              Your brand, inside every{' '}
              <span className="text-text-muted">AI conversation.</span>
            </SectionHeading>
            <SectionText>
              See how your business appears when customers ask ChatGPT about
              you. From discovery to booking — all inside the chat.
            </SectionText>

            {/* Tab pills row */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
              {TAB_NAMES.map((name, index) => (
                <button
                  key={name}
                  onClick={() => handleTabClick(index)}
                  className={`
                    flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      activeTab === index
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                    }
                  `}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* iPhone frame */}
            <div className="flex justify-center">
              <IPhoneFrame
                activeTab={activeTab}
                displayText={displayText}
                isTyping={isTyping}
                showLoading={showLoading}
                showResponse={showResponse}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
