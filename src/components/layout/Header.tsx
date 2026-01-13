'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, CalendlyModal } from '@/components/ui';

interface HeaderProps {
  showAnalyticsButton?: boolean;
}

export default function Header({ showAnalyticsButton = false }: HeaderProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-black px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <Image 
              src="/images/brank-logo.svg"
              alt="Brank Logo"
              width={24}
              height={24}
              className="text-white"
            />
            <span className="text-white text-xl font-semibold tracking-tight group-hover:bg-gradient-to-r group-hover:from-[#00FFBB] group-hover:to-[#00B7FF] group-hover:bg-clip-text group-hover:text-transparent transition-all">
              Brank
            </span>
          </Link>
          
          {/* Centered Analytics Button */}
          {showAnalyticsButton && (
            <Link 
              href="/progress?brand=Apple"
              className="inline-flex px-10 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-100 transition-all duration-150 items-center gap-3 [&:active]:scale-95"
            >
              <span>Check out Brank Analytics</span>
              
              {/* Right arrow icon */}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
          
          <div>
            <Button 
              variant="white" 
              size="md"
              className="px-6 py-2.5 text-sm font-medium rounded-md"
              onClick={() => setIsCalendlyOpen(true)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </header>

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </>
  );
}