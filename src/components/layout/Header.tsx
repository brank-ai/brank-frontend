'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LearnMoreModal } from '@/components/ui';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-bg-base px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
            <Image
              src="/images/brank-logo.svg"
              alt="Brank Logo"
              width={20}
              height={20}
              className="text-text-primary sm:w-6 sm:h-6"
            />
            <span className="text-text-primary text-lg sm:text-xl font-medium tracking-tight transition-all group-hover:text-glow">
              Brank
            </span>
          </Link>

          {/* Navigation & CTA */}
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Pricing Link - Hidden on mobile */}
            <Link
              href="/pricing"
              className="hidden sm:block text-text-muted hover:text-text-primary transition-colors duration-300 text-sm font-medium"
            >
              Pricing
            </Link>

            {/* CTA Button - Volumetric Soft Tile Style v2.0 */}
            <button
              className="
                px-4 py-2 sm:px-6 sm:py-2.5
                text-xs sm:text-sm font-medium
                rounded-lg
                text-text-primary
                shadow-soft-tile-xs
                hover:brightness-110
                active:shadow-deep-field-sm
                active:scale-[0.98]
                transition-all duration-300
              "
              onClick={() => setIsModalOpen(true)}
            >
              Learn More
            </button>
          </div>
        </div>
      </header>

      <LearnMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
