import React from 'react';
import { Heart, Sparkles, SlidersHorizontal } from 'lucide-react';
import { BirthdayData } from '../data/birthdayData';

interface FooterProps {
  data: BirthdayData;
  onOpenCustomizer: () => void;
  onOpenSurprise: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onOpenCustomizer, onOpenSurprise }) => {
  return (
    <footer className="relative bg-gradient-to-t from-rose-100/60 via-pink-50/50 to-transparent pt-16 pb-24 border-t border-rose-150">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Decorative flourish */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-12 bg-rose-300/60" />
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          <div className="h-px w-12 bg-rose-300/60" />
        </div>

        <p className="font-handwriting text-3xl sm:text-4xl text-rose-900 font-bold mb-2">
          Happy {data.age || 18}th Birthday, {data.partnerName}!
        </p>
        <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
          "Tumhare aane se har lamha tyohaar ban gaya." May your year ahead be as luminous, peaceful and lovely as your heart.
        </p>

        {/* Action button cluster */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={onOpenSurprise}
            className="px-5 py-2 text-xs font-semibold rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Birthday Surprise 🎁</span>
          </button>
          
          <button
            onClick={onOpenCustomizer}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-white hover:bg-rose-50 text-rose-800 border border-rose-200 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
            <span>Quick Edit & Guide</span>
          </button>
        </div>

        <div className="text-xs text-stone-400">
          Crafted with love by <span className="text-rose-700 font-semibold">{data.senderName}</span> for{' '}
          <span className="text-rose-700 font-semibold">{data.partnerName}</span> · Forever & Always
        </div>
      </div>
    </footer>
  );
};
