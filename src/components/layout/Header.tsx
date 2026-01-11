'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, CalendlyModal } from '@/components/ui';

export default function Header() {
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