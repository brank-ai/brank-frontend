'use client';

import { useState } from 'react';
import { CalendlyModal } from '@/components/ui';

export default function Footer() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-black py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main CTA Section */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 sm:mb-6 md:mb-8">
              If AI doesn't{' '}
              <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">surface</span>
            </h2>
            <h2 className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 sm:mb-6 md:mb-8">
              your brand,{' '}
            </h2>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 sm:mb-8 md:mb-12">
              consumers won't either.
            </h2>
            
            {/* CTA Button */}
            <div className="flex items-center justify-center">
              <button 
                onClick={() => setIsCalendlyOpen(true)}
                className="bg-white text-black px-6 py-2.5 sm:px-8 sm:py-3 rounded text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Learn More
              </button>
            </div>
          </div>
        
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-800 pt-6 sm:pt-8 text-xs sm:text-sm">
          <div className="text-gray-400 mb-6 md:mb-0">
            © 2024 Brank Inc
          </div>
          
          <div className="flex items-center gap-6 sm:gap-8">
            {/* About */}
            <div>
              <h4 className="text-white font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">About</h4>
              <ul className="space-y-0.5 sm:space-y-1 text-gray-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brand Kit</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-white font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">Contact</h4>
              <ul className="space-y-0.5 sm:space-y-1 text-gray-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-white font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">Legal</h4>
              <ul className="space-y-0.5 sm:space-y-1 text-gray-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <CalendlyModal
      isOpen={isCalendlyOpen}
      onClose={() => setIsCalendlyOpen(false)}
    />
    </>
  );
}