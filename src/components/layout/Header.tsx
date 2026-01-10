import Image from 'next/image';
import { Button } from '@/components/ui';

export default function Header() {
  return (
    <header className="w-full bg-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src="/images/brank-logo.svg"
            alt="Brank Logo"
            width={20}
            height={20}
            className="text-white"
          />
          <span className="text-white text-base font-normal">
            Brank-AI
          </span>
        </div>
        
        <div>
          <Button 
            variant="white" 
            size="md"
            className="px-6 py-2.5 text-sm font-medium rounded-md"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </header>
  );
}