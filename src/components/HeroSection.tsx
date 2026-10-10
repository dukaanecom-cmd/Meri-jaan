import React from 'react';
import { Heart, Sparkles, ChevronDown, Calendar, Gift, Stars, Cake } from 'lucide-react';
import { BirthdayData } from '../data/birthdayData';
import { CountdownTimer } from './CountdownTimer';

interface HeroSectionProps {
  data: BirthdayData;
  onOpenSurprise: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, onOpenSurprise }) => {
  const scrollToNext = () => {
    const messageSection = document.getElementById('romantic-message');
    if (messageSection) {
      messageSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F3] to-[#FFF9F9]">
      {/* Decorative ambient gradient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-gradient-to-tr from-rose-200/40 via-pink-300/30 to-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* 18 Years Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200 shadow-sm shadow-rose-900/5 mb-6 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="text-xs sm:text-sm font-semibold text-rose-900 tracking-wide">
            {data.ageMilestoneTitle || `Celebrating ${data.age} Beautiful Years ✨`}
          </span>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
        </div>

        {/* Romantic Calligraphic Tagline */}
        <p className="font-script text-3xl sm:text-5xl lg:text-6xl text-rose-500 mb-2 leading-tight drop-shadow-sm select-none">
          Wishing the sweetest 18th birthday to...
        </p>

        {/* Primary Animated Heading with 18th Milestone & Partner's Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-rose-950 mb-6 font-poppins relative">
          <span className="bg-gradient-to-r from-rose-700 via-pink-600 to-rose-800 bg-clip-text text-transparent drop-shadow-sm">
            Happy 18th Birthday,
          </span>
          <br />
          <span className="font-handwriting text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-rose-600 drop-shadow-md inline-block transform hover:scale-105 transition-transform duration-300">
            {data.partnerName}!
          </span>
          <span className="inline-block ml-2 text-rose-500 animate-pulse">❤️</span>
        </h1>

        {/* Heartfelt Subtext in Hindi/Hinglish */}
        <p className="max-w-2xl text-base sm:text-xl text-stone-700 leading-relaxed font-light mb-6 px-2">
          {data.heroSubtext}
        </p>

        {/* 18th Birthday Elegant Countdown Timer with 12:00 AM Fireworks */}
        <CountdownTimer
          birthDateString={data.birthDate || '2008-10-11'}
          partnerName={data.partnerName}
          onOpenSurprise={onOpenSurprise}
        />

        {/* Action Buttons: Explore & Surprise CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10 mt-2">
          {/* Explore / Scroll Down Button */}
          <button
            onClick={scrollToNext}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Read 18th Birthday Letter</span>
            <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
          </button>

          {/* Secret Wish Trigger Button */}
          <button
            onClick={onOpenSurprise}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-rose-800 border border-rose-300 font-medium text-base shadow-md shadow-rose-900/5 hover:shadow-lg hover:border-rose-400 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
          >
            <Gift className="w-4 h-4 text-rose-500 group-hover:rotate-12 transition-transform" />
            <span>Open 18th Wish 🎁</span>
          </button>
        </div>

        {/* 18 Years Milestone Cards Strip (Same Design, Seamless Addition) */}
        {data.milestoneCards && (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mb-8">
            {data.milestoneCards.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-rose-200/80 shadow-xs hover:shadow-md transition-all text-center flex flex-col justify-center items-center"
              >
                <span className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600">
                  {item.number}
                </span>
                <span className="text-xs font-semibold text-rose-950 mt-0.5">
                  {item.label}
                </span>
                <span className="text-[10px] text-stone-500 mt-0.5 hidden sm:inline">
                  {item.sublabel}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Floating Quick Quote Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-rose-150 shadow-sm max-w-xl mx-auto flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          </div>
          <div>
            <p className="font-handwriting text-lg sm:text-xl text-rose-800 font-semibold">
              "{data.partnerNickname}" · Sweet 18
            </p>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Tu hi meri khushi, tu hi mera sukoon. Happy 18th Birthday to my favorite human in the universe!
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Gentle Scroll Down Bouncing Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-rose-400 hover:text-rose-700 transition-colors focus:outline-none"
        aria-label="Scroll to next section"
      >
        <span className="text-[11px] font-medium tracking-wider uppercase">Scroll Down</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};
