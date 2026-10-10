import React from 'react';
import { Gift } from 'lucide-react';

interface NavbarProps {
  partnerName: string;
  onOpenSurprise: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ partnerName, onOpenSurprise }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/70 backdrop-blur-md border-b border-rose-100/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in script/display face */}
        <a
          href="#"
          className="font-script text-2xl sm:text-3xl font-bold text-rose-800 tracking-wide whitespace-nowrap shrink-0 hover:text-rose-600 transition-colors"
        >
          Forever {partnerName}
        </a>

        {/* Zone 2: 4-5 single-line concise navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <a
            href="#"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#romantic-message"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
          >
            Love Letter
          </a>
          <a
            href="#memory-lane"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
          >
            Memory Lane
          </a>
          <a
            href="#reasons"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
          >
            Why I Love You
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSurprise}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-full shadow-sm shadow-rose-900/10 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Secret Wish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
