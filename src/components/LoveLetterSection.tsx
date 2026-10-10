import React, { useState } from 'react';
import { Heart, Feather, Sparkles, Copy, Check, Quote } from 'lucide-react';
import { BirthdayData } from '../data/birthdayData';

interface LoveLetterSectionProps {
  data: BirthdayData;
  onEditRequested?: () => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({ data, onEditRequested }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLetter = () => {
    const fullText = `${data.letterTitle}\n\n${data.letterParagraphs.join('\n\n')}\n\n${data.letterClosing}\n${data.senderName}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="romantic-message" className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-[#FFF9F9] via-[#FFF3F5] to-[#FFF9F9]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-rose-500 font-script text-3xl sm:text-4xl mb-2">
            <span>Special Message for You</span>
            <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-rose-950 font-poppins">
            Dil Ki Baat, Sirf Tumhare Liye
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-lg mx-auto">
            {data.letterSubtitle}
          </p>
        </div>

        {/* Vintage Parchment Love Letter Card */}
        <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 md:p-16 border-2 border-[#FCE7F3] shadow-2xl shadow-rose-950/5 overflow-hidden transition-all duration-300">
          
          {/* Subtle Decorative Golden Border Inner Inset */}
          <div className="absolute inset-2 sm:inset-4 border border-[#FBCFE8]/60 rounded-2xl pointer-events-none" />

          {/* Decorative Corner Filigree flourishes */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-rose-300 font-script text-2xl select-none">
            ❧
          </div>
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-rose-300 font-script text-2xl select-none">
            ☙
          </div>
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-rose-300 font-script text-2xl select-none">
            ❦
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-rose-300 font-script text-2xl select-none">
            ❦
          </div>

          {/* Letter Wax Seal Stamp Accent */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-700 via-rose-600 to-red-800 shadow-md shadow-rose-900/20 flex items-center justify-center border-2 border-rose-300/60 ring-4 ring-rose-100">
              <Heart className="w-6 h-6 fill-rose-100 text-rose-100" />
            </div>
          </div>

          {/* Letter Salutation */}
          <div className="text-center mb-8">
            <h3 className="font-handwriting text-3xl sm:text-5xl text-rose-900 font-bold mb-2">
              Meri Pyaari {data.partnerName},
            </h3>
            <p className="text-xs uppercase tracking-widest text-rose-400 font-medium">
              A Love Letter on Your {data.age || 18}th Birthday
            </p>
          </div>

          {/* Heartfelt Paragraphs (Hindi / Hinglish with deep emotion) */}
          <div className="space-y-6 text-stone-700 font-poppins text-base sm:text-lg leading-relaxed relative z-10">
            {data.letterParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="first-letter:text-3xl first-letter:font-handwriting first-letter:font-bold first-letter:text-rose-600 first-letter:mr-1 text-justify sm:text-left"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Romantic Hindi Shayari Card Quote */}
          <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/70 text-center relative">
            <Quote className="w-6 h-6 text-rose-300 mx-auto mb-2 opacity-60" />
            <p className="font-handwriting text-xl sm:text-2xl text-rose-900 font-semibold leading-relaxed">
              "Khuda kare har saal tumhara janamdin yunhi aaye,<br />
              Har lamha tumhare honton par pyari si hansi khilaaye!"
            </p>
            <span className="text-xs text-rose-500 font-medium mt-2 inline-block">
              ✨ Happy Birthday to My Heartbeat ✨
            </span>
          </div>

          {/* Letter Sign-off & Sender Signature */}
          <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm text-stone-500 italic">
                {data.letterClosing}
              </p>
              <p className="font-handwriting text-2xl sm:text-4xl text-rose-700 font-bold mt-1">
                {data.senderName} ❤️
              </p>
            </div>

            {/* Quick Action Buttons: Copy & Customize */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLetter}
                className="px-3.5 py-1.5 text-xs rounded-full border border-rose-200 bg-white hover:bg-rose-50 text-rose-800 transition-colors flex items-center gap-1.5 shadow-sm"
                title="Copy message to WhatsApp / SMS"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-rose-500" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>

              {onEditRequested && (
                <button
                  onClick={onEditRequested}
                  className="px-3.5 py-1.5 text-xs rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Feather className="w-3.5 h-3.5 text-rose-600" />
                  <span>Customize Text</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
